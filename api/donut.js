import { ListTablesCommand, DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
    UpdateCommand,
    PutCommand,
    DynamoDBDocumentClient,
    ScanCommand,
    DeleteCommand
} from "@aws-sdk/lib-dynamodb";

import crypto from "crypto";

const client = new DynamoDBClient({ region: 'us-west-1' });
const docClient = DynamoDBDocumentClient.from(client);

export const fetchDonuts = async () => {
    const command = new ScanCommand({
        ExpressionAttributeNames: { "#name": "name" },
        ProjectionExpression: "id, #name, favorited, price",
        TableName: "Donuts",
    });

    const response = await docClient.send(command);

    return response;
}

export const createDonut = async ({ name, favorited, price }) => {
    const uuid = crypto.randomUUID();
    const command = new PutCommand({
        TableName: "Donuts",
        Item: {
            id: uuid,
            name, 
            favorited,
            price,
        }
    });

    const response = await docClient.send(command);

    return response;
}

export const updateDonut = async ({ id, name, favorited, price }) => {
    const command = new UpdateCommand({
        TableName: "Donuts",
        Key: {
            id
        },
        ExpressionAttributeNames: {
            "#name": "name"
        },
        UpdateExpression: "set #name = :n, favorited = :f, price = :p",
        ExpressionAttributeValues: {
            ":n": name,
            ":f": favorited,
            ":p": price
        },
        ReturnValues: "ALL_NEW"
    });

    const response = await docClient.send(command);

    return response;

}

export const deleteDonut = async (id) => {
    const command = new DeleteCommand({
        TableName: "Donuts",
        Key: {
            id
        }
    });

    const response = await docClient.send(command);

    return response;
}