import os


def get_CORS():
    return os.environ.get('BACKEND_CORS')


def get_DB_CONN():
    return os.environ.get('BACKEND_MYSQL_CONN')


def get_BOOKS():
    return os.environ.get('BACKEND_BOOKS')


def get_BOOK_DATA():
    return os.environ.get('BACKEND_BOOK_DATA')


def get_REGION():
    return os.environ.get('BACKEND_REGION')


def get_USERPOOL_ID():
    return os.environ.get('BACKEND_USERPOOL_ID')


def get_CLIENT_ID():
    return os.environ.get('BACKEND_CLIENT_ID')
