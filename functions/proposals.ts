import "source-map-support";

import { DynamoDB } from "aws-sdk";

const dynamo = new DynamoDB.DocumentClient();

export const handler = async () => {
  try {
    const data = await dynamo
      .get({
        TableName: "inverse",
        Key: {
          field: "proposals",
        },
      })
      .promise();

    if (!data.Item) {
      return {
        statusCode: 404,
      };
    }

    return {
      blockNumber: data.Item.blockNumber,
      timestamp: data.Item.timestamp,
      proposals: data.Item.data,
    };
  } catch (err) {
    console.error(err);
  }
};
