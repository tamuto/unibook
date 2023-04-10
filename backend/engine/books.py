import yaml
import os
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


def get_booklist(user_id):
    '''
    指定されたユーザIDの下にあるYaml一覧を取得する。
    '''
    folder = os.path.join(config.get_BOOKS(), user_id)
    return [make_item(f) for f in glob(f'{folder}/*.yaml')]


def get_book(book_id, user_id):
    '''
    指定されたユーザIDとブックIDのYamlを取得する。
    '''
    folder = config.get_BOOKS()
    return load_yaml(f'{folder}/{user_id}/{book_id}.yaml')


def share_book(sub_id, book_id, user_id):
    '''
    指定されたユーザIDとブックIDのシンボリックリンクを作成する。
    '''
    target_path = os.path.join('..', sub_id, f'{book_id}.yaml')
    link_dir = os.path.join(config.get_BOOKS(), user_id, f'{book_id}.yaml')
    os.symlink(target_path, link_dir)
