const shortid = require('shortid');
const AWS = require('aws-sdk');
const isObject = require('lodash.isobject');
const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.handler = (event, context, callback) => {
  console.log(event.body)
  let formInfo
  try {
    formInfo = JSON.parse(event.body)
  } catch (error) {
    callback(null, {
      statusCode: 400,
      headers: {'Content-Type': 'text/plain'},
      body: {
        error: error
      }
    });
    return;
  }

  if (!isObject(formInfo)) {
    callback(null, {
      statusCode: 400,
      headers: {'Content-Type': 'text/plain'},
      body: {
        error: '弄什么呢'
      }
    });
    return;
  }

  const timestamp = new Date().getTime();
  console.log(process.env.FORM_DYNAMODB_TABLE);
  const params = {
    TableName: process.env.FORM_DYNAMODB_TABLE,
    Item: {
      id: shortid.generate(),
      formInfo: event.body,
      userId: 'test',
      createdAt: timestamp
    }
  };

  console.log(params);
  dynamoDb.put(params, (error) => {
    if (error) {
      console.error(error);
      callback(null, {
        statusCode: error.statusCode || 501,
        headers: {'Content-Type': 'text/plain'},
        body: 'couldn\'t create the form item.',
      });
      return;
    }

    const response = {
      statusCode: 201,
      headers: {
        "Access-Control-Allow-Origin" : "*" // Required for CORS support to work
      },
      body: JSON.stringify(params.Item),
    };
    callback(null, response);
  });
};
