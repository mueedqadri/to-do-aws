import boto3
from boto3.dynamodb.conditions import Key
from pydantic import BaseModel

from models.db import TableModel

db_resource = boto3.resource('dynamodb')


def get_table(table: str):
    return db_resource.Table(table)


def insert_item(table: TableModel, obj: BaseModel):
    db_table = get_table(table.name)
    db_table.put_item(Item=obj.dict())


def get_item(table: TableModel, value) -> dict:
    response_data = {}
    db_table = get_table(table.name)
    key = {table.primary_key: value}
    response = db_table.get_item(Key=key)
    if response.get('Item'):
        response_data = response.get('Item')
    return response_data


def get_items(table: TableModel, key: str, value):
    db_table = get_table(table.name)
    responses = db_table.query(
        IndexName=table.indexes[key],
        KeyConditionExpression=Key(key).eq(value))
    return responses.get('Items')


def delete_item(table: TableModel, value):
    db_table = get_table(table.name)
    key = {table.primary_key: value}
    db_table.delete_item(Key=key)
