import json

import boto3

from constants import TOPIC_ARN, ALL_FILTER_ATTR, QUEUE_URL
from models.auth import UserInDB
from models.notification import QueueMessage

sns = boto3.client('sns')
sqs = boto3.client('sqs')


def subscribe(user: UserInDB):
    sns.subscribe(
        TopicArn=TOPIC_ARN,
        Protocol='email',
        Endpoint=user.email,
        Attributes={
            'FilterPolicy': json.dumps({'target': [user.username, ALL_FILTER_ATTR]})
        },
        ReturnSubscriptionArn=True
    )


def notify(message: QueueMessage):
    sqs.send_message(QueueUrl=QUEUE_URL, MessageBody=json.dumps(message.dict()))
