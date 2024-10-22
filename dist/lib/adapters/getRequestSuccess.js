"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
 * @Author: youzhao.zhou
 * @Date: 2021-10-19 10:38:26
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2024-10-22 16:24:40
 * @Description 获取不同平台处理http返回值的处理对象
 */
var requestSuccess_1 = require("./wechat/requestSuccess");
var requestSuccess_2 = require("./alipay/requestSuccess");
var requestSuccess_3 = require("./browser/requestSuccess");
function getRequestSuccess(requestRes) {
    if (typeof wx !== "undefined") {
        return requestSuccess_1.default(requestRes);
    }
    if (typeof my !== "undefined") {
        return requestSuccess_2.default(requestRes);
    }
    if (typeof window !== "undefined") {
        return requestSuccess_3.default(requestRes);
    }
    return requestRes;
}
exports.default = getRequestSuccess;
//# sourceMappingURL=getRequestSuccess.js.map