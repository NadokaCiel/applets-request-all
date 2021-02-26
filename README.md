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

`appletsRequest`本身是`function`，可以直接调用，发送请求：

### `appletsRequest(config)`

```javascript
// Send a POST request
appletsRequest({
  method: "post",
  url: "/user/12345",
  data: {
    username: "tom",
    password: "********",
  },
});

// Send a GET request
appletsRequest({
  method: "get",
  url: "/article",
  params: {
    articleId: 1,
  },
  responseType: "json",
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
```

### appletsRequest(url[,config])`

```javascript
// Send a GET request (default method)
appletsRequest("/user/12345");
```

## Request method aliases

可以使用别名直接发送请求；

- appletsRequest.request(config);
- appletsRequest.get(url[, config]);
- appletsRequest.delete(url[, config]);
- appletsRequest.head(url[, config]);
- appletsRequest.options(url[, config]);
- appletsRequest.post(url[, data[, config]);
- appletsRequest.put(url[, data[, config]);

**_特别注意：使用别名方法时，不要在`config`中重新配置`url` `method`和`data`属性值。_**

## Request Config

下面列举的是`config`中所有有效的配置，其中只有`url`属性是必传的，如果`method`不传，默认为`get`

```javascript
{
  // `url` is the server URL that will be used for the request
  // 可以是绝对路径
  url: '/user',

  // `method` is the request method to be used when making the request
  method: 'get', // default

  // `baseURL` will be prepended to `url` unless `url` is absolute.
  // It can be convenient to set `baseURL` for an instance of appletsRequest to pass relative URLs
  // to methods of that instance.
  // 如果url是绝对路径，该值将被忽略
  baseURL: 'https://some-domain.com/api/',

  // `transformRequest` allows changes to the request data before it is sent to the server
  // This is only applicable for request methods 'PUT', 'POST', 'PATCH' and 'DELETE'
  // The last function in the array must return a string or an instance of Buffer, ArrayBuffer,
  // FormData or Stream
  // You may modify the headers object.
  transformRequest: [function (data, headers) {
    // Do whatever you want to transform the data

    return data;
  }],

  // `transformResponse` allows changes to the response data to be made before
  // it is passed to then/catch
  transformResponse: [function (data) {
    // Do whatever you want to transform the data

    return data;
  }],

  // `headers` are custom headers to be sent
  headers: {'X-Requested-With': 'XMLHttpRequest'},

  // `params` are the URL parameters to be sent with the request
  // Must be a plain object or a URLSearchParams object
  params: {
    ID: 12345
  },

  // `paramsSerializer` is an optional function in charge of serializing `params`
  // (e.g. https://www.npmjs.com/package/qs, http://api.jquery.com/jquery.param/)
  paramsSerializer: function (params) {
    return Qs.stringify(params, {arrayFormat: 'brackets'})
  },

  // `data` is the data to be sent as the request body
  // Only applicable for request methods 'PUT', 'POST', 'DELETE , and 'PATCH'
  // When no `transformRequest` is set, must be of one of the following types:
  // - string, plain object, ArrayBuffer, ArrayBufferView, URLSearchParams
  // - Browser only: FormData, File, Blob
  // - Node only: Stream, Buffer
  data: {
    firstName: 'Fred'
  },

  // syntax alternative to send data into the body
  // method post
  // only the value is sent, not the key
  data: 'Country=Brasil&City=Belo Horizonte',

  // `timeout` specifies the number of milliseconds before the request times out.
  // If the request takes longer than `timeout`, the request will be aborted.
  timeout: 1000, // default is `10000`

  // `withCredentials` indicates whether or not cross-site Access-Control requests
  // should be made using credentials
  withCredentials: false, // default

  // `adapter` allows custom handling of requests which makes testing easier.
  // Return a promise and supply a valid response (see lib/adapters/README.md).
  adapter: function (config) {
    /* ... */
  },

  // `responseType` indicates the type of data that the server will respond with
  // options are: 'arraybuffer', 'document', 'json', 'text', 'stream'
  //   browser only: 'blob'
  responseType: 'json', // default

  // `xsrfCookieName` is the name of the cookie to use as a value for xsrf token
  xsrfCookieName: 'XSRF-TOKEN', // default

  // `xsrfHeaderName` is the name of the http header that carries the xsrf token value
  xsrfHeaderName: 'X-XSRF-TOKEN', // default

  // `validateStatus` defines whether to resolve or reject the promise for a given
  // HTTP response status code. If `validateStatus` returns `true` (or is set to `null`
  // or `undefined`), the promise will be resolved; otherwise, the promise will be
  // rejected.
  validateStatus: function (status) {
    return status >= 200 && status < 300; // default
  },

  // `cancelToken` specifies a cancel token that can be used to cancel the request
  // (see Cancellation section below for details)
  cancelToken: new CancelToken(function (cancel) {
  }),
}
```

## Response Schema

响应数据包含的内容：

```javascript
{
  // `data` is the response that was provided by the server
  data: {},

  // `status` is the HTTP status code from the server response
  status: 200,

  // `headers` the HTTP headers that the server responded with
  // All header names are lower cased and can be accessed using the bracket notation.
  // Example: `response.headers['content-type']`
  headers: {},

  // `config` is the config that was provided to `appletsRequest` for the request
  config: {},

  // `originalRes` 是不同小程序request接口success中原始的返回值
  originalRes: {}
}
```

When using then, you will receive the response as follows:

```javascript
appletsRequest.get('/user/12345')
  .then(function (response) {
    console.log(response.data);
    console.log(response.status);
    console.log(response.headers);
    console.log(response.config);
    console.log(response.originalRes);
  });
```

## Handling Errors

### Error Schema

`catch`或`reject`中的错误数据

```javascript
{
  // `errMsg` String
  errMsg: "Network Error",

  // `status` is the HTTP status code from the server response
  // 或者值为`NETWORK_ERROR`和`TIMEOUT`
  status: 500,

  // 小程序接口返回的响应数据信息
  response: {},

  // `config` is the config that was provided to `appletsRequest` for the request
  config: {},

  // `extra` adapter开发者自定义数据，默认为`fail(err)`中返回的`err`
  extra: {}
}
```

```javascript
appletsRequest.get('/user/12345')
  .catch(function (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log('Error', error.errMsg);
    }
    console.log(error.config);
  });
```
