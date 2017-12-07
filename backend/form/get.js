const AWS = require('aws-sdk'); // eslint-disable-line import/no-extraneous-dependencies
const dynamoDb = new AWS.DynamoDB.DocumentClient();

let generateHtml = function(data) {
  let formData = data.formInfo;
  let formId = data.id;
  return `
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport"
        content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>表单</title>
  <script src="https://cdn.bootcss.com/jquery/3.2.1/jquery.min.js"></script>
  <script src="https://cdn.bootcss.com/popper.js/1.12.9/umd/popper.min.js"></script>
  <script src="https://cdn.bootcss.com/bootstrap/4.0.0-beta.2/js/bootstrap.min.js"></script>
  <script src="https://cdn.bootcss.com/jquery-ui-bootstrap/0.5pre/assets/js/jquery-ui-1.10.0.custom.min.js"></script>
  <script src="https://d25xwuavfiu27c.cloudfront.net/js/form-render.min.js"></script>
</head>
<body>
<form action="/f/${formId}">

</form>
<script>
  $('form').formRender({
    dataType: 'json',
    formData: ${formData}
  });
</script>
</body>
</html>`
}

module.exports.handler = (event, context, callback) => {
  const params = {
    TableName: process.env.FORM_DYNAMODB_TABLE,
    Key: {
      id: event.pathParameters.formId,
    },
  };
  console.log(params);

  dynamoDb.get(params, (error, result) => {
    // handle potential errors
    if (error) {
      console.error(error);
      callback(null, {
        statusCode: error.statusCode || 501,
        headers: { 'Content-Type': 'text/plain' },
        body: 'couldn\'t fetch the form item.',
      });
      return;
    }

    // create a response
    const response = {
      statusCode: 200,
      headers: {'Content-Type': 'text/html'},
      body: generateHtml(result.Item)
    };
    callback(null, response);
  });
};
