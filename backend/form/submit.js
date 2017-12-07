module.exports.handler = (event, context, callback) => {
  console.log(event);
  console.log(event.body);
  let originUrl = event.requestContext.path;
  callback(
    null,
    {
      statusCode: 302,
      body: '重定向中。。。',
      headers: {
        'Location': originUrl + '/results',
        'Content-Type': 'text/plain'
      }
    }
  );
};
