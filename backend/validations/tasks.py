from pydantic import ValidationError

from models.auth import UserInDB
from models.tasks import TaskInDB


def validate_task_owner(task: TaskInDB, user: UserInDB):
    if task.username != user.username:
        raise ValidationError
