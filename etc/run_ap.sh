#!/bin/bash
export BACKEND_BOOKS=dist
export BACKEND_BOOK_DATA=dist
export BACKEND_MYSQL_CONN="mysql+pymysql://root:password@denv.host/test?charset=utf8"
export BACKEND_CORS=1
export BACKEND_REGION="ap-northeast-1"
export BACKEND_USERPOOL_ID="ap-northeast-1_7O1uV2QXg"
export BACKEND_CLIENT_ID="n85o401e4s27kn3nog8gmb2of"
poetry run flake8 backend
if [ $? -ne 0 ] ; then
    exit 1
fi
poetry run python -m uvicorn backend.main:app --host 0.0.0.0 --port 8000
