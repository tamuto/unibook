from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import RedirectResponse

from .engine import books

from .utils import config

app = FastAPI()

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
def get_books():
    return books.get_booklist()
