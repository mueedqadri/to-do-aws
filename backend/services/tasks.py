from datetime import datetime
from typing import List

import db
from db.tables import TasksTable
from models.notification import QueueMessage
from models.tasks import TaskInDB, Task
from services.notification import notify
from utils import get_current_iso_datetime


def create_new_task(task: TaskInDB):
    message = "Created new task: {}".format(task.description)
    queue_message_dict = {
        'content': message,
        'target': task.username
    }
    db.insert_item(TasksTable, task)
    notify(QueueMessage(**queue_message_dict))


def update_task(new_task: Task, old_task: TaskInDB):
    new_task: TaskInDB = old_task.copy(update=new_task.dict(exclude_unset=True))
    new_task.modified_at = get_current_iso_datetime()
    message = "Task Updated:\nOld Task: {}\nNew Task: {}".format(old_task.description, new_task.description)
    queue_message_dict = {
        'content': message,
        'target': new_task.username
    }
    db.insert_item(TasksTable, new_task)
    notify(QueueMessage(**queue_message_dict))


def get_task(task_id: str):
    task_dict = db.get_item(TasksTable, task_id)
    return TaskInDB(**task_dict)


def get_all_tasks(username: str):
    tasks: List[TaskInDB] = []
    search_key = 'username'
    responses = db.get_items(TasksTable, search_key, username)
    if responses:
        for response in responses:
            tasks.append(TaskInDB(**response))
        tasks.sort(key=lambda task: datetime.fromisoformat(task.modified_at), reverse=True)
    return tasks


def delete_task(task_id: str):
    task = get_task(task_id)
    message = "Deleted Task: {}".format(task.description)
    queue_message_dict = {
        'content': message,
        'target': task.username
    }
    db.delete_item(TasksTable, task_id)
    notify(QueueMessage(**queue_message_dict))
