const AWS = require('aws-sdk');

const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.handler = (event, context, callback) => {
  let formId = event.pathParameters.formId;
  const params = {
    TableName: process.env.FORM_DATA_DYNAMODB_TABLE,
    FilterExpression: 'formId = :formId',
    ExpressionAttributeValues: {
      ':formId': formId,
    }
  };

  dynamoDb.scan(params, (error, result) => {
    if (error) {
      console.error(error);
      callback(null, {
        statusCode: error.statusCode || 501,
        headers: { 'Content-Type': 'text/plain' },
        body: 'couldn\'t fetch the logs.',
      });
      return;
    }

    const response = {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin" : "*" // Required for CORS support to work
      },
      body: JSON.stringify(result.Items),
    };
    callback(null, response);
  });
};
