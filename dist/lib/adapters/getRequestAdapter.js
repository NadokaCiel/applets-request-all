"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
 * @Author: youzhao.zhou
 * @Date: 2021-10-19 10:37:50
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2024-10-22 16:23:51
 * @Description 获取不同平台http请求的接口方法
 */
var utils_1 = require("../helpers/utils");
function getRequestAdapter() {
    if (typeof wx !== "undefined" || typeof my !== "undefined") {
        return utils_1.getGlobal().request;
    }
    if (typeof window !== "undefined") {
        return fetch;
    }
    throw new TypeError("Unrecognized Platform");
}
exports.default = getRequestAdapter;
//# sourceMappingURL=getRequestAdapter.js.map