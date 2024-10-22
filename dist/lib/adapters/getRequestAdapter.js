"use strict";
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
/*
 * @Author: youzhao.zhou
 * @Date: 2021-10-19 10:37:50
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2024-10-22 16:23:51
 * @Description 获取不同平台http请求的接口方法
 */
var axios_1 = require("axios");
var utils_1 = require("../helpers/utils");
function getRequestAdapter() {
    if (typeof wx !== "undefined" || typeof my !== "undefined") {
        return utils_1.getGlobal().request;
    }
    if (typeof window !== "undefined") {
        return makeFetch;
    }
    throw new TypeError("Unrecognized Platform");
}
exports.default = getRequestAdapter;
function makeFetch() {
    return function myFetch(config) {
        axios_1.default
            .request(__assign({}, config))
            .then(function (response) {
            var _a;
            (_a = config === null || config === void 0 ? void 0 : config.success) === null || _a === void 0 ? void 0 : _a.call(config, response);
        })
            .catch(function (error) {
            var _a;
            (_a = config === null || config === void 0 ? void 0 : config.fail) === null || _a === void 0 ? void 0 : _a.call(config, error);
        })
            .finally(function () {
            var _a;
            (_a = config === null || config === void 0 ? void 0 : config.complete) === null || _a === void 0 ? void 0 : _a.call(config);
        });
    };
}
//# sourceMappingURL=getRequestAdapter.js.map