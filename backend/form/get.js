const AWS = require('aws-sdk'); // eslint-disable-line import/no-extraneous-dependencies
const dynamoDb = new AWS.DynamoDB.DocumentClient();

let generateHtml = function(data) {
  let formInfo = data.formInfo;
  let formTitle = '使用 Pho.im 提交您的数据';
  let formId = data.id;
  return `<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport"
        content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>${formTitle}</title>
  <link href="https://cdn.bootcss.com/font-awesome/4.7.0/css/font-awesome.css" rel="stylesheet">
  <link href="https://cdn.bootcss.com/bootstrap/4.0.0-beta.2/css/bootstrap.min.css" rel="stylesheet">
</head>
<body>
<!-- Navigation -->
<nav class="navbar navbar-light bg-light static-top">
  <div class="container">
    <a class="navbar-brand" href="#">表单</a>
    <a class="btn btn-primary" href="#">登录</a>
  </div>
</nav>

<div class="container">
  <div class="row">
    <form id="submitForm" action="/f/${formId}" method="post">
      <div class="form-info"></div>
      <button id="submitButton" type="submit" class="btn btn-default btn-success">
        提交
      </button>
    </form>
  </div>
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
</div>

<script src="https://cdn.bootcss.com/jquery/3.2.1/jquery.min.js"></script>
<script src="https://cdn.bootcss.com/popper.js/1.12.9/umd/popper.min.js"></script>
<script src="https://cdn.bootcss.com/bootstrap/4.0.0-beta.2/js/bootstrap.min.js"></script>
<script src="https://cdn.bootcss.com/jquery-ui-bootstrap/0.5pre/assets/js/jquery-ui-1.10.0.custom.min.js"></script>
<script src="https://cdn.pho.im/js/form-render.min.js"></script>
<script>
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
</script>
</body>
</html>

`
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
