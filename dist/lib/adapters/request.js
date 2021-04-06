"use strict";
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
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("../helpers/utils");
var getReqConfig_1 = require("./getReqConfig");
var getRequestAdapter_1 = require("./getRequestAdapter");
var getRequestSuccess_1 = require("./getRequestSuccess");
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
    function getReqConfig(originalConfig) {
        var tmpConfig = utils_1.merge({}, originalConfig);
        tmpConfig.headers = originalConfig.headers;
        delete tmpConfig.header;
        delete tmpConfig.Adapter;
        return tmpConfig;
    }
    return new Promise(function (resolve, reject) {
        var Adapter = config.Adapter;
        var reqConfig = getReqConfig_1.default(config);
        var adapterConfig = getReqConfig(config);
        if (!Adapter) {
            throw new TypeError("Adapter is undefined or null");
        }
        var adapter = new Adapter(adapterConfig);
        var requestor = getRequestAdapter_1.default()(__assign(__assign({}, reqConfig), { success: function (res) {
                adapter.resolve(getRequestSuccess_1.default(res), resolve);
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
exports.default = request;
//# sourceMappingURL=request.js.map