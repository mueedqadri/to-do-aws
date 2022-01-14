from enum import IntEnum

from pydantic import BaseModel


class States(IntEnum):
    created = 0
    processing = 1
    completed = 2


class Task(BaseModel):
    description: str
    state: States = States.created


class TaskInDB(Task):
    id: str
    username: str
    created_at: str
    modified_at: str
