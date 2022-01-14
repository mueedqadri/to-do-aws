from models.db import TableModel

USERS_STRUCTURE = {
    'name': 'users',
    'primary_key': 'username'
}

TASKS_STRUCTURE = {
    'name': 'tasks',
    'primary_key': 'id',
    'indexes': {
        'username': 'username_idx'
    }
}

UsersTable = TableModel(**USERS_STRUCTURE)
TasksTable = TableModel(**TASKS_STRUCTURE)
