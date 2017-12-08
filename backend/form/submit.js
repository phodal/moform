const qs = require('qs');
const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();
const isObject = require('lodash.isobject');
const shortid = require('shortid');

module.exports.handler = (event, context, callback) => {
  console.log(event);
  console.log(event.body);
  let originUrl = event.requestContext.path;
  let formData = qs.parse(event.body);

  if (!isObject(formData)) {
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
  const params = {
    TableName: process.env.FORM_DATA_DYNAMODB_TABLE,
    Item: {
      id: shortid.generate(),
      formId: event.pathParameters.formId,
      formData: JSON.stringify(formData),
      userId: 'test',
      createdAt: timestamp
    }
  };

  console.log(params)
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

    callback(
      null,
      {
        statusCode: 200,
        body: `<h1>提交成功</h1>`,
        headers: {
          'Location': originUrl + '/success',
          'Content-Type': 'text/plain'
        }
      }
    );

  });
};
