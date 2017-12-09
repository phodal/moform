const baseTemplate = require('./templates/base');
const getBaseTemplate = baseTemplate.getBaseTemplate;

let bodyTemplate = `
<div class="container mt-3">
  <div class="build-wrap"></div>
</div>

<!-- Modal -->
<div class="modal fade" id="successModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">创建中。。</h5>
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
`

let scriptTemplate =
`
<script>
  jQuery(function ($) {
    var formBuilder = $('.build-wrap').formBuilder({
      controlPosition: "right",
      actionButtons: [],
      controlOrder: ["header",  "checkbox", "checkbox-group", "date", "hidden", "paragraph", "number", "radio-group", "select", "text", "textarea", "button"],
      dataType: "json",
      disabledActionButtons: ['clear', 'data'],
      onSave: function (event) {
        console.log(event)
        // $(event.target).button('loading');
        var formJson = formBuilder.actions.getData();
        if(!formJson || (!!formJson && formJson.length === 0)) {
          $('#successModal .modal-body').html('请填写表单的内容')
          $('#successModal').modal('show');
          return;
        }
        $('#successModal .modal-body').html('<i style="color: #eee" class="fa fa-refresh fa-spin"></i>')
        $('#successModal').modal('show');

        var baseUrl = location.protocol + '//' + location.host + '/f/'
        $.ajax({
          url: baseUrl,
          type: 'post',
          dataType: 'json',
          success: function (data) {
            var url = baseUrl + data.id;
            $('#successModal .modal-title').html('创建成功')
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
`

let baseHtml = getBaseTemplate('Moform - 开源的企业数据收集、整理和分析平台', bodyTemplate, scriptTemplate)
module.exports.handler = (event, context, callback) => {
  const response = {
    statusCode: 200,
    headers: {'Content-Type': 'text/html'},
    body: baseHtml,
  };
  callback(null, response);
};
