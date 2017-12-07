module.exports.handler = (event, context, callback) => {
  console.log(event);
  console.log(event.body);
  const response = {
    statusCode: 200,
    body: {},
  };
  callback(
    null,
    {
      statusCode: 302,
      body: '重定向中。。。',
      headers: {
        'Location': event.url + '/results',
        'Content-Type': 'text/plain'
      }
    }
  );
};
