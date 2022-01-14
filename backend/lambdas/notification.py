import boto3
import json

sns = boto3.client('sns')

TOPIC_ARN = 'arn:aws:sns:us-east-1:331168945589:notifications'


def handler(event, context):
    records = event['Records']
    for record in records:
        message = json.loads(record['body'])
        sns.publish(
            TopicArn=TOPIC_ARN,
            Message=message['content'],
            MessageAttributes={
                "target": {
                    'DataType': 'String',
                    'StringValue': message['target']
                }
            })
