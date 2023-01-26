import AWS from 'aws-sdk'
import * as dotenv from 'dotenv'

dotenv.config();


AWS.config.update({
    accessKeyId: process.env.accessKeyId,
    secretAccessKey: process.env.secretAccessKey,
    region: process.env.region,
});

const db = new AWS.DynamoDB.DocumentClient({convertEmptyValues: true});

export {
    db
}
