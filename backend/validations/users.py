from models.auth import UserInDB
from utils import get_hash_string


def is_active_user(user: UserInDB):
    if not user.active:
        raise AttributeError('User is not active')


def is_user_exists(user: UserInDB):
    if user is None:
        raise ValueError('User already exits')


def validate_password(user: UserInDB, password: str):
    hashed_password = get_hash_string(password)
    if user.password != hashed_password:
        raise ValueError('Password incorrect')
