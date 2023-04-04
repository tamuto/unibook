import yaml
import os
from glob import glob

from ..utils import config
from ..engine.depends import get_current_user_id


def load_yaml(filename):
    with open(filename, 'r', encoding='utf-8') as f:
        return yaml.safe_load(f)


def make_item(filename):
    obj = load_yaml(filename)
    return {
        'book_id': obj['book_id'],
        'book_name': obj['book_name']
    }


def get_booklist(sub: dict):
    folder = os.path.join(config.get_BOOKS(), get_current_user_id(sub))
    if not os.path.exists(folder):
        os.makedirs(folder)
    return [make_item(f) for f in glob(f'{folder}/*.yaml')]


def get_book(book_id, payload: dict):
    folder = config.get_BOOKS()
    sub_id = get_current_user_id(payload)
    return load_yaml(f'{folder}/{sub_id}/{book_id}.yaml')
