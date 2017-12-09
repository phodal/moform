const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();

const baseTemplate = require('../templates/results/base');
const getBaseTemplate = baseTemplate.getBaseTemplate;


const bodyTemplate =
`<div class="container mt-3">
  <table id="results" class="display" width="100%"></table>
</div>
`

let generateHtml = function(data) {
  let formsData = JSON.stringify(data);
  let scriptTemplate =
`<script>
$(document).ready(function () {
  var parsedFormsData = ${formsData};
  var dataSet = [];
  var columns = [];
  for (var i = 0; i < parsedFormsData.length; i++) {
    var formData = JSON.parse(parsedFormsData[i].formData).formData;
    var formArray = [];
    for (var j = 0; j < formData.length; j++) {
      formArray.push(formData[j].value)
    }
    dataSet.push(formArray)
  }

  let formInfo = JSON.parse(parsedFormsData[0].formData).formInfo;
  for (var i = 0; i < formInfo.length; i++) {
    var fieldInfo = formInfo[i];
    console.log(fieldInfo.type)
    if (fieldInfo.type !== 'header' && fieldInfo.type !== 'hidden' && fieldInfo.type !== 'paragraph') {
      columns.push({
        title: fieldInfo.label
      })
    }
  }

  console.log(dataSet, columns)
  $('#results').DataTable({
    "language": {
      "url": "https://cdn.datatables.net/plug-ins/1.10.16/i18n/Chinese.json"
    },
    dom: 'Bfrtip',
    buttons: [
      'copy', 'csv', 'excel', 'print'
    ],
    data: dataSet,
    columns: columns
  });
});
</script>`

  return getBaseTemplate('Moform - 开源的企业数据收集、整理和分析平台', bodyTemplate, scriptTemplate)
}

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
      headers: {'Content-Type': 'text/html'},
      body: generateHtml(result.Items),
    };
    callback(null, response);
  });
};
