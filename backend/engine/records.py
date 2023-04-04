import os
import sqlite3
from datetime import datetime
from dbcolls.sqlite3.Row import DictRow

from ..engine.books import get_current_user_id
from ..utils import config

sql_create_st_book_record = '''
CREATE TABLE st_book_record (
    book_id VARCHAR(36) NOT NULL,
    record_no INTEGER NOT NULL,
    edition INTEGER,
    active_flag CHAR(1) NOT NULL,
    create_date TIMESTAMP NOT NULL,
    update_date TIMESTAMP NOT NULL,
    PRIMARY KEY (book_id, record_no)
)
'''

sql_create_st_book_field = '''
CREATE TABLE st_book_field (
    book_id VARCHAR(36) NOT NULL,
    record_no INTEGER NOT NULL,
    field_name VARCHAR(128) NOT NULL,
    value VARCHAR(512),
    PRIMARY KEY (book_id, record_no, field_name)
)
'''

sql_select_record = "SELECT record_no FROM st_book_record WHERE active_flag = 'Y' ORDER BY record_no"
sql_select_field = "SELECT field_name, value FROM st_book_field WHERE record_no = :record_no"

sql_select_max = "SELECT COUNT(record_no) as last_no FROM st_book_record"
sql_insert_record = "INSERT INTO st_book_record VALUES (:book_id, :record_no, :edition, :active_flag, :create_date, :update_date)"
sql_insert_field = "INSERT INTO st_book_field VALUES (:book_id, :record_no, :field_name, :value)"

sql_update_record = "UPDATE st_book_record SET update_date = :update_date WHERE book_id = :book_id AND record_no = :record_no"
sql_update_field = "UPDATE st_book_field SET value = :value WHERE book_id = :book_id AND record_no = :record_no AND field_name = :field_name"

sql_delete_record = "UPDATE st_book_record SET active_flag = :active_flag, update_date = :update_date WHERE book_id = :book_id AND record_no = :record_no"


class DataManager:

    def __init__(self, book_id, payload: dict):
        folder = config.get_BOOK_DATA()
        sub_id = get_current_user_id(payload)
        self.book_id = book_id
        self.database = f'{folder}/{sub_id}/{self.book_id}.sqlite'
        new_flag = True
        if os.path.exists(self.database):
            new_flag = False
        self.conn = sqlite3.connect(self.database)
        self.conn.row_factory = DictRow
        if new_flag is True:
            self.conn.execute(sql_create_st_book_record)
            self.conn.execute(sql_create_st_book_field)
            self.conn.commit()

    def __enter__(self):
        return self

    def __exit__(self, ex_type, ex_value, trace):
        self.conn.close()

    def query_all(self):
        result = self.conn.execute(sql_select_record)
        return [self.query(r.record_no) for r in result]

    def query(self, record_no):
        result = self.conn.execute(sql_select_field, {'record_no': record_no})
        value = {r.field_name: r.value for r in result}
        value['_id'] = record_no
        return value

    def insert(self, data):
        max_record_no = self.conn.execute(sql_select_max).fetchone().last_no + 1
        self.conn.execute(sql_insert_record, {
            'book_id': self.book_id,
            'record_no': max_record_no,
            'active_flag': 'Y',
            'edition': 1,
            'create_date': datetime.now(),
            'update_date': datetime.now()
        })

        for field, value in data.items():
            self.conn.execute(sql_insert_field, {
                'book_id': self.book_id,
                'record_no': max_record_no,
                'field_name': field,
                'value': value
            })
        self.conn.commit()

    def update(self, record_no, data):
        self.conn.execute(sql_update_record, {
            'update_date': datetime.now(),
            'book_id': self.book_id,
            'record_no': record_no
        })
        for field, value in data.items():
            self.conn.execute(sql_update_field, {
                'value': value,
                'book_id': self.book_id,
                'record_no': record_no,
                'field_name': field
            })
        self.conn.commit()

    def delete(self, record_no):
        self.conn.execute(sql_delete_record, {
            'active_flag': 'N',
            'update_date': datetime.now(),
            'book_id': self.book_id,
            'record_no': record_no
        })
        self.conn.commit()
