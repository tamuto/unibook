from fastapi import FastAPI, Body
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import RedirectResponse

from .engine.depends import HeaderCheck
from .engine.depends import Payload
from .engine.depends import get_current_user_id

from .engine import books
from .engine import init
from .engine.records import DataManager

from .utils import config

app = FastAPI(dependencies=[HeaderCheck()])


app.mount('/static', StaticFiles(directory='dist', html=True), name='static')

if config.get_CORS() == '1':
    origins = ['http://localhost:8080']

    app.add_middleware(
        CORSMiddleware,
        allow_origins=origins,
        allow_credentials=True,
        allow_methods=['GET', 'POST', 'PUT', 'DELETE'],
        allow_headers=['*']
    )


@app.get('/')
def root():
    return RedirectResponse('/static')


@app.get('/api/init')
def get_user_info(payload: dict = Payload()):
    user_id = get_current_user_id(payload)
    return init.get_init(user_id)


@app.get('/api/books')
def get_books(payload: dict = Payload()):
    user_id = get_current_user_id(payload)
    return books.get_booklist(user_id)


@app.get('/api/books/{book_id}')
def get_book(book_id, payload: dict = Payload()):
    user_id = get_current_user_id(payload)
    return books.get_book(book_id, user_id)


@app.get('/data/{book_id}')
def get_data(book_id, payload: dict = Payload()):
    user_id = get_current_user_id(payload)
    with DataManager(book_id, user_id) as dm:
        return dm.query_all()


@app.get('/data/{book_id}/{record_no}')
def get_data_at(book_id, record_no, payload: dict = Payload()):
    user_id = get_current_user_id(payload)
    with DataManager(book_id, user_id) as dm:
        return dm.query(record_no)


@app.post('/data/{book_id}')
def insert_data(book_id, data=Body(...), payload: dict = Payload()):
    user_id = get_current_user_id(payload)
    with DataManager(book_id, user_id) as dm:
        return dm.insert(data)


@app.put('/data/{book_id}/{record_no}')
def update_data(book_id, record_no, data=Body(...), payload: dict = Payload()):
    user_id = get_current_user_id(payload)
    with DataManager(book_id, user_id) as dm:
        return dm.update(record_no, data)


@app.delete('/data/{book_id}/{record_no}')
def delete_data(book_id, record_no, payload: dict = Payload()):
    user_id = get_current_user_id(payload)
    with DataManager(book_id, user_id) as dm:
        return dm.delete(record_no)
