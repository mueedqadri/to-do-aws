import uuid
from typing import List

from fastapi import APIRouter, Depends, HTTPException, Path
from pydantic import ValidationError

from models.auth import User, UserInDB
from models.tasks import Task, TaskInDB
from services.auth import get_current_user
from services.tasks import create_new_task, get_all_tasks, get_task, delete_task, update_task
from utils import get_current_iso_datetime

router = APIRouter(
    prefix='/tasks',
    tags=['tasks'],
    dependencies=[Depends(get_current_user)]
)


async def validate_task(
        task_id: str = Path(...),
        current_user: UserInDB = Depends(get_current_user)
) -> TaskInDB:
    try:
        task = get_task(task_id)
        if task.username != current_user.username:
            raise ValidationError
        return task
    except ValidationError:
        raise HTTPException(status_code=404, detail='Task does not exist')


@router.post('/create')
async def create(
        task: Task, current_user: UserInDB = Depends(get_current_user)
):
    _task = TaskInDB(
        username=current_user.username,
        id=uuid.uuid4().hex,
        created_at=get_current_iso_datetime(),
        modified_at=get_current_iso_datetime(),
        **task.dict())
    create_new_task(_task)
    return {'message': 'Successfully added'}


@router.get('/fetch_all', response_model=List[TaskInDB])
async def fetch_all(current_user: User = Depends(get_current_user)):
    tasks = get_all_tasks(current_user.username)
    return tasks


@router.put('/update/{task_id}')
async def update(task: Task, old_task: TaskInDB = Depends(validate_task)):
    update_task(task, old_task)
    return {'message': 'update successful'}


@router.delete('/delete/{task_id}', dependencies=[Depends(validate_task)])
async def delete(task_id: str):
    delete_task(task_id)
    return {'message': 'deleted successful'}
