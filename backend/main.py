from fastapi import FastAPI, Body
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import RedirectResponse

from .engine.books import HeaderCheck
from .engine.books import Payload

from .engine import books
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


@app.get('/api/books')
def get_books(payload: dict = Payload()):
    return books.get_booklist(payload)


@app.get('/api/books/{book_id}')
def get_book(book_id, payload: dict = Payload()):
    return books.get_book(book_id, payload)


@app.get('/data/{book_id}')
def get_data(book_id, payload: dict = Payload()):
    with DataManager(book_id, payload) as dm:
        return dm.query_all()


@app.get('/data/{book_id}/{record_no}')
def get_data_at(book_id, record_no, payload: dict = Payload()):
    with DataManager(book_id, payload) as dm:
        return dm.query(record_no)


@app.post('/data/{book_id}')
def insert_data(book_id, data=Body(...), payload: dict = Payload()):
    with DataManager(book_id, payload) as dm:
        return dm.insert(data)


@app.put('/data/{book_id}/{record_no}')
def update_data(book_id, record_no, data=Body(...), payload: dict = Payload()):
    with DataManager(book_id, payload) as dm:
        return dm.update(record_no, data)


@app.delete('/data/{book_id}/{record_no}')
def delete_data(book_id, record_no, payload: dict = Payload()):
    with DataManager(book_id, payload) as dm:
        return dm.delete(record_no)
