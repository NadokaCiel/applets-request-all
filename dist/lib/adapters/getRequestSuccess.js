"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var requestSuccess_1 = require("./wechat/requestSuccess");
var requestSuccess_2 = require("./alipay/requestSuccess");
function getRequestSuccess(requestRes) {
    if (typeof wx !== "undefined") {
        return requestSuccess_1.default(requestRes);
    }
    if (typeof my !== "undefined") {
        return requestSuccess_2.default(requestRes);
    }
    return requestRes;
}
exports.default = getRequestSuccess;
//# sourceMappingURL=getRequestSuccess.js.map