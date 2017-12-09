const headerTemplate = require('./header');
const header = headerTemplate.getHeader();

module.exports.getBaseTemplate = (title, body, script) => {
  // noinspection JSAnnotator
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>${title}</title>
  <link rel="stylesheet" href="https://cdn.pho.im/css/jquery-ui.min.css">
  <link href="https://cdn.bootcss.com/bootstrap/4.0.0-beta.2/css/bootstrap.min.css" rel="stylesheet">
</head>
<body>

${header}

${body}

<script src="https://cdn.bootcss.com/jquery/3.2.1/jquery.min.js"></script>
<script src="https://cdn.bootcss.com/popper.js/1.12.9/umd/popper.min.js"></script>
<script src="https://cdn.bootcss.com/bootstrap/4.0.0-beta.2/js/bootstrap.min.js"></script>
<script src="https://cdn.bootcss.com/jquery-ui-bootstrap/0.5pre/assets/js/jquery-ui-1.10.0.custom.min.js"></script>

<script src="https://cdn.pho.im/js/form-builder.min.js"></script>
<script src="https://cdn.pho.im/js/form-render.min.js"></script>
<script src="https://cdn.pho.im/js/control_plugins/starRating.min.js"></script>
<script src="https://cdn.pho.im/js/control_plugins/textarea.trumbowyg.min.js"></script>

${script}
</body>
</html>`
}
