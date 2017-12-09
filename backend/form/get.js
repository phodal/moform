const AWS = require('aws-sdk'); // eslint-disable-line import/no-extraneous-dependencies
const dynamoDb = new AWS.DynamoDB.DocumentClient();
const baseTemplate = require('../templates/base');
const getBaseTemplate = baseTemplate.getBaseTemplate;

let generateHtml = function(data) {
  let formInfo = data.formInfo;
  let formId = data.id;

  let bodyTemplate = `
<div class="container mt-5">
  <form id="submitForm" action="/f/${formId}" method="post">
    <div class="form-info"></div>
    <button id="submitButton" type="submit" class="btn btn-default btn-success">
      提交
    </button>
  </form>
</div>

<div class="modal fade" id="successModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">提交成功</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">

      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">确定</button>
      </div>
    </div>
  </div>
</div>`

  let scriptTemplate =
`<script>
window.formInfo = ${formInfo}
jQuery(function ($) {
  $('.form-info').formRender({
    dataType: 'json',
    formData: window.formInfo
  });

  $('#submitForm').on("submit", function (){
    event.preventDefault();
    $('#submitButton').prop('disabled', true);
    let filledData = $(this).serializeArray();
    $.ajax({
      url: '/f/${formId}',
      type: 'post',
      dataType: 'json',
      success: function (data) {
        $('#successModal .modal-body').html('提交成功')
        $('#successModal').modal('show');
      },
      error: function (data) {
        $('#submitButton').prop('disabled', false);
        console.log(data)
        $('#successModal .modal-title').html('提交失败')
        $('#successModal .modal-body').html(data.responseText)
        $('#successModal').modal('show');
      },
      data: {
        formInfo: window.formInfo,
        formData: filledData
      }
    });
  });
});
</script>`

  return getBaseTemplate('Moform - 开源的企业数据收集、整理和分析平台', bodyTemplate, scriptTemplate)
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
