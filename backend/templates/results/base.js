const headerTemplate = require('../header');
const header = headerTemplate.getHeader();

module.exports.getBaseTemplate = (title, body, script) => {
  // noinspection JSAnnotator
  return `<!DOCTYPE html>
<html lang="zh-cmn-Hans">
<head>
  <meta charset="UTF-8">
  <title>${title}</title>
  <meta name="keywords" content="表单,客户管理,短信,邮件,市场营销,数据收集,广告投放,数据分析,调查问卷,满意度调查,客户关系管理,crm,反馈表,登记表,办公OA" />
  <meta name="description" content="Moform 是一款基于 Serverless 架构的开源在线表单制作工具，同时也是强大的客户信息处理和关系管理系统。她可以帮助你轻松完成信息收集与整理，实现客户挖掘与消息推送，并开展持续营销。" />
  <link rel="stylesheet" href="https://cdn.pho.im/css/jquery-ui.min.css">
  <link href="https://cdn.bootcss.com/font-awesome/4.7.0/css/font-awesome.css" rel="stylesheet">
  <link href="https://cdn.bootcss.com/bootstrap/4.0.0-beta.2/css/bootstrap.min.css" rel="stylesheet">
  <link href="https://cdn.bootcss.com/datatables/1.10.16/css/jquery.dataTables.min.css" rel="stylesheet">
  <link href="https://cdn.datatables.net/buttons/1.4.2/css/buttons.dataTables.min.css" rel="stylesheet">
</head>
<body>

${header}

${body}

<script src="https://cdn.bootcss.com/jquery/3.2.1/jquery.min.js"></script>
<script src="https://cdn.bootcss.com/popper.js/1.12.9/umd/popper.min.js"></script>
<script src="https://cdn.bootcss.com/bootstrap/4.0.0-beta.2/js/bootstrap.min.js"></script>
<script src="https://cdn.bootcss.com/jquery-ui-bootstrap/0.5pre/assets/js/jquery-ui-1.10.0.custom.min.js"></script>
<script src="https://cdn.pho.im/js/form-render.min.js"></script>
<script src="https://cdn.bootcss.com/datatables/1.10.16/js/jquery.dataTables.min.js"></script>

<script src="https://cdn.datatables.net/buttons/1.4.2/js/dataTables.buttons.min.js"></script>
<script src="//cdn.datatables.net/buttons/1.4.2/js/buttons.flash.min.js"></script>
<script src="https://cdn.bootcss.com/jszip/3.1.5/jszip.min.js"></script>
<script src="//cdn.datatables.net/buttons/1.4.2/js/buttons.html5.min.js"></script>
<script src="//cdn.datatables.net/buttons/1.4.2/js/buttons.print.min.js"></script>
${script}
</body>

<footer class="footer">
  <div class="container">
    <p>
      <span class="text-muted">A Phodal's Idea</span>
    </p>
  </div>
</footer>
</html>`
}
