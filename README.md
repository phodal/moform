# moform

A Serverlesss form builder

Setup
---

### local development

``requirements``: docker

1.clone code

```
git clone https://github.com/phodal/moform
```

2.setup

```
yarn install
```

3.start simulate

```
$ yarn start

> moform@0.0.1 start /Users/phodal/repractise/moform
> sls simulate apigateway -p 5000

Serverless: Starting mock services.
Serverless:
Serverless: [GET /] => λ:index
Serverless: [POST /f/] => λ:formCreate
Serverless: [GET /f/{formId}] => λ:formGet
Serverless: [POST /f/{formId}] => λ:formSubmit
Serverless: [GET /f/{formId}/results] => λ:formResults
Serverless: [GET /user/{userId}] => λ:userGet
Serverless: Invoke URL: http://localhost:5000
Serverless: Creating event
Serverless: Invoking index
Serverless: Invoking function backend/index.handler
```

4.browser

open [http://localhost:5000/](http://localhost:5000/)


LICENSE
---

MIT

