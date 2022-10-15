import yaml
from glob import glob

from ..utils import config


def load_yaml(filename):
    with open(filename, 'r', encoding='utf-8') as f:
        return yaml.safe_load(f)


def make_item(filename):
    obj = load_yaml(filename)
    return {
        'book_id': obj['book_id'],
        'book_name': obj['book_name']
    }


def get_booklist():
    folder = config.get_BOOKS()
    return [make_item(f) for f in glob(f'{folder}/*.yaml')]


def get_book(book_id):
    folder = config.get_BOOKS()
    return load_yaml(f'{folder}/{book_id}.yaml')
