from pydantic import BaseModel


class QueueMessage(BaseModel):
    content: str
    target: str
