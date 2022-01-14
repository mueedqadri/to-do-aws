from datetime import datetime, timedelta
from typing import Optional

import boto3
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from jose import jwt, JWTError
from pydantic import ValidationError

import db
from constants import DEFAULT_EXPIRY, JWT_ALGORITHM, SECRET
from db.tables import UsersTable
from models.auth import User, UserInDB
from utils import get_hash_string
from services.notification import subscribe
from validations.users import is_active_user, validate_password

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")
sns = boto3.client('sns')


def create_access_token(
        data: dict,
        expiry: Optional[timedelta] = timedelta(minutes=DEFAULT_EXPIRY)):
    _data = data.copy()
    expiry_time = datetime.utcnow() + expiry
    _data['exp'] = expiry_time
    return jwt.encode(_data, SECRET, algorithm=JWT_ALGORITHM)


def perform_authentication(username: str, password: str) -> UserInDB:
    try:
        user_dict = db.get_item(UsersTable, username)
        user = UserInDB(**user_dict)
        is_active_user(user)
        validate_password(user, password)
    except ValidationError:
        raise Exception('User is not present')
    return user


async def get_current_user(token: str = Depends(oauth2_scheme)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET, algorithms=[JWT_ALGORITHM])
        username = payload.get('sub')
        user_dict = db.get_item(UsersTable, username)
        user = UserInDB(**user_dict)
        is_active_user(user)
    except (JWTError, ValidationError):
        raise credentials_exception
    return user


def register_user(user: User):
    existing_user_dict = db.get_item(UsersTable, user.username)
    if existing_user_dict:
        raise ValueError('User already present')
    user.password = get_hash_string(user.password)
    new_user = UserInDB(**user.dict())
    db.insert_item(UsersTable, new_user)
    subscribe(new_user)
