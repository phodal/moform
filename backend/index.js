let baseHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Moform Builder</title>
  <link rel="stylesheet" href="https://d25xwuavfiu27c.cloudfront.net/css/jquery-ui.min.css">
  <link href="https://cdn.bootcss.com/bootstrap/4.0.0-beta.2/css/bootstrap.min.css" rel="stylesheet">
</head>
<body>

<div class="build-wrap"></div>

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

<script src="https://d25xwuavfiu27c.cloudfront.net/js/form-builder.min.js"></script>
<script src="https://d25xwuavfiu27c.cloudfront.net/js/form-render.min.js"></script>
<script src="https://d25xwuavfiu27c.cloudfront.net/js/control_plugins/starRating.min.js"></script>
<script src="https://d25xwuavfiu27c.cloudfront.net/js/control_plugins/textarea.trumbowyg.min.js"></script>
<script>
  jQuery(function ($) {
    var formBuilder = $('.build-wrap').formBuilder({
      controlPosition: "right",
      append: !1,
      actionButtons: [],
      controlOrder: ["header", "autocomplete", "button", "checkbox", "checkbox-group", "date", "hidden", "paragraph", "number", "radio-group", "select", "text", "textarea"],
      dataType: "json",
      disableFields: [],
      disabledAttrs: [],
      disabledActionButtons: [],
      disabledFieldButtons: {},
      editOnAdd: !1,
      defaultFields: [
        {
          "type": "header",
          "subtype": "h1",
          "label": "formBuilder 表单"
        },
        {
          "type": "text",
          "label": "你的名字是？",
          "className": "form-control",
          "name": "text-1512607631003",
          "subtype": "text"
        },
        {
          "type": "button",
          "label": "保存",
          "subtype": "button",
          "className": "btn btn-default",
          "name": "button-1512607599563",
          "style": "default"
        }],
      fields: [],
      fieldRemoveWarn: !1,
      inputSets: [],
      replaceFields: [],
      roles: {
        1: "Administrator"
      },
      notify: {
        error: function (log) {
          return console.error(log)
        },
        success: function (log) {
          return console.log(log)
        },
        warning: function (log) {
          return console.warn(log)
        }
      },
      onSave: function () {
        var formJson = formBuilder.actions.getData();
        $.ajax({
          url: 'https://www.pho.im/f',
          type: 'post',
          dataType: 'json',
          success: function (data) {
            var url = 'https://www.pho.im/f/'+ data.id;
            $('#successModal .modal-body').html('<p> 生成的表单地址是: <a href="' + url + '">' + url + '</a></p>')
            $('#successModal').modal('show');
          },
          data: JSON.stringify(formJson)
        });
        return formJson
      },
      onClearAll: function () {
        return null
      },
      prepend: !1,
      sortableControls: !1,
      stickyControls: {
        enable: !0,
        offset: {
          top: 5,
          bottom: "auto",
          right: "auto"
        }
      },
      templates: {},
      showActionButtons: !0,
      typeUserDisabledAttrs: {},
      typeUserAttrs: {},
      typeUserEvents: {},
      prefix: "form-builder-",
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
