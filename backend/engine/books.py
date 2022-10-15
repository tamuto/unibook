import yaml
from glob import glob

from ..utils import config


def make_item(filename):
    with open(filename, 'r', encoding='utf-8') as f:
        obj = yaml.safe_load(f)

    return {
        'book_id': obj['book_id'],
        'book_name': obj['book_name']
    }


def get_booklist():
    folder = config.get_BOOKS()
    return [make_item(f) for f in glob(f'{folder}/*.yaml')]
