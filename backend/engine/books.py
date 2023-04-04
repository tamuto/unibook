import yaml
import os
from glob import glob

from ..utils import config

from typing import Optional

import cognitojwt
from fastapi import Header
from fastapi import Depends
from fastapi import HTTPException


region = config.get_REGION()
userpool_id = config.get_USERPOOL_ID()
client_id = config.get_CLIENT_ID()


def get_current_user_id(payload):
    return payload['sub']


def load_yaml(filename):
    with open(filename, 'r', encoding='utf-8') as f:
        return yaml.safe_load(f)


def make_item(filename):
    obj = load_yaml(filename)
    return {
        'book_id': obj['book_id'],
        'book_name': obj['book_name']
    }


def get_booklist(payload: dict):
    folder = os.path.join(config.get_BOOKS(), get_current_user_id(payload))
    if not os.path.exists(folder):
        os.makedirs(folder)
    return [make_item(f) for f in glob(f'{folder}/*.yaml')]


def get_book(book_id, payload: dict):
    folder = config.get_BOOKS()
    sub_id = get_current_user_id(payload)
    return load_yaml(f'{folder}/{sub_id}/{book_id}.yaml')


def Payload():
    async def auth_check(authorization: Optional[str] = Header(None)):
        '''
        Depends() デコレータを利用して、リクエストに含まれるJWTトークンをデコードし、
        その中から必要な情報を抽出する。
        Amazon Cognitoで生成されたJWTトークンを復号化し、必要なペイロード情報を取得する。
        '''
        claims = await cognitojwt.decode_async(
            authorization,
            region,
            userpool_id,
            app_client_id=client_id,
            testmode=False
        )
        return claims

    return Depends(auth_check)


def HeaderCheck():
    async def header_check(authorization: Optional[str] = Header(None)):
        '''
        HTTPリクエストのヘッダーに含まれるauthorizationキーの値を取得し、
        その値が存在しない場合はエラーを出す。
        '''
        if not authorization:
            raise HTTPException(status_code=401, detail='Unauthorized')

    return Depends(header_check)
