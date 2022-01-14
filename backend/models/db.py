from pydantic import BaseModel


class TableModel(BaseModel):
    name: str
    primary_key: str
    indexes: dict = {}
