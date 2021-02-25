"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var config_1 = require("./wechat/config");
var config_2 = require("./alipay/config");
function getReqConfig(config) {
    if (typeof wx !== "undefined") {
        return config_1.default(config);
    }
    if (typeof my !== "undefined") {
        return config_2.default(config);
    }
    return config;
}
exports.default = getReqConfig;
//# sourceMappingURL=getReqConfig.js.map