let baseHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Moform Builder</title>
  <link rel="stylesheet" href="https://cdn.pho.im/css/jquery-ui.min.css">
  <link href="https://cdn.bootcss.com/bootstrap/4.0.0-beta.2/css/bootstrap.min.css" rel="stylesheet">
</head>
<body>

<nav class="navbar navbar-light bg-light static-top">
  <div class="container">
    <a class="navbar-brand" href="#">表单</a>
    <a class="btn btn-primary" href="#">登录</a>
  </div>
</nav>

<div class="container">
  <div class="build-wrap"></div>
</div>

<!-- Modal -->
<div class="modal fade" id="successModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">创建成功</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">

      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">跳转</button>
      </div>
    </div>
  </div>
</div>

<script src="https://cdn.bootcss.com/jquery/3.2.1/jquery.min.js"></script>
<script src="https://cdn.bootcss.com/popper.js/1.12.9/umd/popper.min.js"></script>
<script src="https://cdn.bootcss.com/bootstrap/4.0.0-beta.2/js/bootstrap.min.js"></script>
<script src="https://cdn.bootcss.com/jquery-ui-bootstrap/0.5pre/assets/js/jquery-ui-1.10.0.custom.min.js"></script>

<script src="https://cdn.pho.im/js/form-builder.min.js"></script>
<script src="https://cdn.pho.im/js/form-render.min.js"></script>
<script src="https://cdn.pho.im/js/control_plugins/starRating.min.js"></script>
<script src="https://cdn.pho.im/js/control_plugins/textarea.trumbowyg.min.js"></script>
<script>
  jQuery(function ($) {
    var formBuilder = $('.build-wrap').formBuilder({
      controlPosition: "right",
      actionButtons: [],
      controlOrder: ["header",  "checkbox", "checkbox-group", "date", "hidden", "paragraph", "number", "radio-group", "select", "text", "textarea", "button"],
      dataType: "json",
      onSave: function (event) {
        console.log(event)
        // $(event.target).button('loading');
        var formJson = formBuilder.actions.getData();
        if(!formJson || (!!formJson && formJson.length === 0)) {
          $('#successModal .modal-body').html('请填写表单的内容')
          $('#successModal').modal('show');
          return;
        }
        $('#successModal .modal-body').html('<i class="fa fa-refresh fa-spin"></i>')
        $('#successModal').modal('show');

        var baseUrl = location.protocol + '//' + location.host + '/f/'
        $.ajax({
          url: baseUrl,
          type: 'post',
          dataType: 'json',
          success: function (data) {
            baseUrl + data.id;
            $('#successModal .modal-body').html('<p> 生成的表单地址是: <a href="' + url + '">' + url + '</a></p>')
            $('#successModal').modal('show');
          },
          data: JSON.stringify(formJson)
        });
        return formJson
      },
      i18n: {
        locale: 'zh-CN',
        url: 'js/lang',
        'zh-CN': {
          starRating: '评价'
        }
      }
    });
  });
</script>
</body>
</html>
`

module.exports.handler = (event, context, callback) => {
  const response = {
    statusCode: 200,
    headers: {'Content-Type': 'text/html'},
    body: baseHtml,
  };
  callback(null, response);
};
