"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("../helpers/utils");
var config_1 = require("./wechat/config");
var config_2 = require("./alipay/config");
function getReqConfig(config) {
    if (!utils_1.isUndefined(wx)) {
        return config_1.default(config);
    }
    if (!utils_1.isUndefined(my)) {
        return config_2.default(config);
    }
    return config;
}
exports.default = getReqConfig;
//# sourceMappingURL=getReqConfig.js.map