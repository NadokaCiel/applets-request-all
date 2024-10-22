import appletsRequest, { getDefaults as getDefaults$1 } from 'applets-request';
export { AppletsRequest, createAppletsRequestInstance, default } from 'applets-request';

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

function getDataType(val) {
    return Object.prototype.toString.call(val);
}
function isPlainObject(val) {
    if (val === null || getDataType(val) !== "[object Object]") {
        return false;
    }
    var prototype = Object.getPrototypeOf(val);
    return prototype === null || prototype === Object.prototype;
}
function isUndefined(val) {
    return typeof val === "undefined";
}
function merge() {
    var objs = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        objs[_i] = arguments[_i];
    }
    if (objs.length === 0) {
        return Object.create(null);
    }
    var result = Object.create(null);
    function assignValue(val, key) {
        if (isPlainObject(result[key]) && isPlainObject(val)) {
            result[key] = merge(result[key], val);
        }
        else if (isPlainObject(val)) {
            result[key] = merge({}, val);
        }
        else if (Array.isArray(val)) {
            result[key] = merge(val);
        }
        else {
            result[key] = val;
        }
    }
    if (Array.isArray(objs[0])) {
        result = [];
    }
    else {
        result = Object.create(null);
    }
    objs.forEach(function (obj) {
        forEach(obj, assignValue);
    });
    return result;
}
/**
 * 遍历
 * @param {Object|Array} obj
 * @param fn
 */
function forEach(obj, fn) {
    if (typeof obj === "undefined" || obj === null) {
        return;
    }
    var arr = obj;
    // 如果obj是非object类型，例如：number，string等
    if (typeof obj !== "object") {
        arr = [obj];
    }
    if (Array.isArray(arr)) {
        arr.forEach(function (item, i) {
            fn.call(null, item, i, obj);
        });
        return;
    }
    Object.keys(arr).forEach(function (key) {
        fn.call(null, arr[key], key, arr);
    });
}
function getGlobal() {
    if (typeof wx !== "undefined") {
        return wx;
    }
    if (typeof my !== "undefined") {
        return my;
    }
    if (typeof swan !== "undefined") {
        return swan;
    }
    if (typeof tt !== "undefined") {
        return tt;
    }
    throw new TypeError("Unrecognized Platform");
}
/**
 * JSON parse data
 * @param data
 */
function dataParser(data) {
    if (typeof data !== "string") {
        return data;
    }
    try {
        return JSON.parse(data);
    }
    catch (e) {
        return data;
    }
}

function getRequestOptions(config) {
    var reqConfig = {
        url: config.url || "",
        method: config.method,
        data: config.data,
        header: config.headers,
        dataType: "json",
        timeout: config.timeout,
    };
    var dataType = config.dataType || "json";
    reqConfig.dataType = dataType;
    if (config.responseType && config.responseType !== "json") {
        reqConfig.dataType = "其他";
    }
    return reqConfig;
}

function getRequestOptions$1(config) {
    var reqConfig = {
        url: config.url || "",
        method: config.method,
        data: config.data,
        headers: config.headers,
        dataType: "json",
        timeout: config.timeout,
    };
    var dataType = config.dataType || "json";
    reqConfig.dataType = dataType;
    if (config.responseType && config.responseType !== "json") {
        reqConfig.dataType = "其他";
    }
    return reqConfig;
}

function getRequestOptions$2(config) {
    var reqConfig = {
        url: config.url || "",
        method: config.method,
        data: config.data,
        headers: config.headers,
        dataType: "json",
        timeout: config.timeout,
    };
    var dataType = config.dataType || "json";
    reqConfig.dataType = dataType;
    if (config.responseType && config.responseType !== "json") {
        reqConfig.dataType = "其他";
    }
    return reqConfig;
}

/*
 * @Author: youzhao.zhou
 * @Date: 2021-10-19 10:37:01
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2024-10-22 16:23:48
 * @Description 获取不同平台的http请求接口的配置
 */
function getReqConfig(config) {
    if (typeof wx !== "undefined") {
        return getRequestOptions(config);
    }
    if (typeof my !== "undefined") {
        return getRequestOptions$1(config);
    }
    if (typeof window !== "undefined") {
        return getRequestOptions$2(config);
    }
    return config;
}

/*
 * @Author: youzhao.zhou
 * @Date: 2021-10-19 10:37:50
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2024-10-22 16:23:51
 * @Description 获取不同平台http请求的接口方法
 */
function getRequestAdapter() {
    if (typeof wx !== "undefined" || typeof my !== "undefined") {
        return getGlobal().request;
    }
    if (typeof window !== "undefined") {
        return fetch;
    }
    throw new TypeError("Unrecognized Platform");
}

function requestSuccess(res) {
    if (isUndefined(res) || res === null) {
        return {
            headers: {},
            status: 200,
            data: {},
            response: res,
        };
    }
    return {
        headers: res.header,
        status: res.statusCode,
        data: dataParser(res.data),
        response: res,
    };
}

function requestSuccess$1(res) {
    if (isUndefined(res) || res === null) {
        return {
            headers: {},
            status: 200,
            data: {},
            response: res,
        };
    }
    return {
        headers: res.headers,
        status: res.status,
        data: dataParser(res.data),
        response: res,
    };
}

function requestSuccess$2(res) {
    if (isUndefined(res) || res === null) {
        return {
            headers: {},
            status: 200,
            data: {},
            response: res,
        };
    }
    return {
        headers: res.headers,
        status: res.status,
        data: dataParser(res.data),
        response: res,
    };
}

/*
 * @Author: youzhao.zhou
 * @Date: 2021-10-19 10:38:26
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2024-10-22 16:24:40
 * @Description 获取不同平台处理http返回值的处理对象
 */
function getRequestSuccess(requestRes) {
    if (typeof wx !== "undefined") {
        return requestSuccess(requestRes);
    }
    if (typeof my !== "undefined") {
        return requestSuccess$1(requestRes);
    }
    if (typeof window !== "undefined") {
        return requestSuccess$2(requestRes);
    }
    return requestRes;
}

/*
 * @Author: youzhao.zhou
 * @Date: 2021-02-04 16:09:10
 * @Last Modified by: youzhao.zhou
 * @Last Modified time: 2021-02-25 14:02:38
 * @Description request adapter
 *
 * 1. 执行成功需要返回IAppletsRequestResponse，执行失败即为reject返回IAppletsRequestAdapterError
 * 2. 如果取消返回IAppletsRequest.ICanceler
 */
function request(config) {
    /**
     * 获取错误类型
     * @param err
     * @param timeout
     * @returns NETWORK_ERROR | TIMEOUT
     * @example {
     *    msg: `Timeout of 2000 ms exceeded`,
     *    type: "TIMEOUT",
     *  }
     */
    function failType(err, timeout) {
        if (err &&
            (err.errMsg || "").toString().toLowerCase().includes("timeout")) {
            return {
                msg: "Timeout of " + (timeout || "") + " ms exceeded",
                type: "TIMEOUT",
            };
        }
        return {
            msg: "Network Error",
            type: "NETWORK_ERROR",
        };
    }
    function getReqConfig$1(originalConfig) {
        var tmpConfig = merge({}, originalConfig);
        tmpConfig.headers = originalConfig.headers;
        delete tmpConfig.header;
        delete tmpConfig.Adapter;
        return tmpConfig;
    }
    return new Promise(function (resolve, reject) {
        var Adapter = config.Adapter;
        var reqConfig = getReqConfig(config);
        var adapterConfig = getReqConfig$1(config);
        if (!Adapter) {
            throw new TypeError("Adapter is undefined or null");
        }
        var adapter = new Adapter(adapterConfig);
        var requestor = getRequestAdapter()(__assign(__assign({}, reqConfig), { success: function (res) {
                adapter.resolve(getRequestSuccess(res), resolve);
            },
            fail: function (err) {
                var errData = failType(err, reqConfig.timeout);
                var rejectData = {
                    errMsg: errData.msg,
                    status: errData.type,
                    extra: err,
                };
                adapter.reject(rejectData, reject);
            },
            complete: function () {
                requestor = null;
            } }));
        adapter.subscribeCancelEvent(function (reason) {
            reject(reason);
            requestor.abort();
            requestor = null;
        });
        if (typeof config.getRequestTask === "function") {
            config.getRequestTask(request);
        }
    });
}

function getAdapter(config) {
    return request(config);
}

appletsRequest.defaults.adapter = getAdapter;
function getDefaults() {
    var defaults = getDefaults$1();
    defaults.adapter = getAdapter;
    return defaults;
}

export { getDefaults };
//# sourceMappingURL=applets-request-all.es.js.map
