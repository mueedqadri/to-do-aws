from datetime import timedelta

from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import OAuth2PasswordRequestForm

from constants import TOKEN_EXPIRY
from models.auth import Token, User
from services.auth import create_access_token, perform_authentication, register_user

router = APIRouter(
    prefix="/auth",
    tags=["auth"],
)


@router.post('/login', response_model=Token)
async def login(form_data: OAuth2PasswordRequestForm = Depends()):
    try:
        user = perform_authentication(form_data.username, form_data.password)
    except Exception as e:
        raise HTTPException(status_code=400, detail='Incorrect username or password')
    access_token = create_access_token(
        data={'sub': user.username, 'scopes': form_data.scopes},
        expiry=timedelta(minutes=TOKEN_EXPIRY),
    )
    return {'access_token': access_token}


@router.post('/signup')
async def register(user: User):
    try:
        print(user)
        register_user(user)
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
    return {'message': 'successfully added'}

