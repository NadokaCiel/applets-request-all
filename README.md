# applets-request-all

基于`Promise` API 的接口请求库，对外接口和用法与`axios`类似；适配大部分小程序请求，weapp、wechat、alipay、百度小程序、抖音/头条小程序

## Features

- 支持 Promise API
- Interceptor request and response
- Transform request and response data
- Transform Config
- Cancel requests
- Automatic transforms for JSON data

## Platform

- Wechat - 微信小程序
- Alipay - 支付小程序
- Swan - 百度小程序
- Bytedance - 抖音/头条小程序

## Installing

Using npm:

```shell
npm install applets-request-all
```

Using yarn:

```shell
yarn add applets-request-all
```

## Example

`GET` Request：

```javascript
import appletsRequest from "applets-request-all";

// 获取一篇博客文章：
appletsRequest
  .get("/article?articleId=1")
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  })
  .then(function () {
    // always executed
  });

// 使用可选参数发送请求
appletsRequest
  .get("/article", {
    params: {
      articleId: 1,
    },
  })
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  })
  .then(function () {
    // always executed
  });

// 使用async/await
async function queryArticle() {
  try {
    const response = await appletsRequest.get("/article?articleId=1");
    console.log(response);
  } catch (error) {
    console.error(error);
  }
}
```

`POST` Request:

```javascript
import appletsRequest from "applets-request-all";

appletsRequest
  .post("/user", {
    username: "tom",
    password: "********",
  })
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  })
  .then(function () {
    // always executed
  });

// 同时执行多个请求
function queryUser() {
  return appletsRequest.get("/user/12345");
}

function queryArticle() {
  return appletsRequest.get("/article/1");
}

Promise.all([queryUser(), queryArticle()]).then(function (results) {
  const user = results[0];
  const article = results[1];
});
```

## appletsRequest API
