"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
 * @Author: youzhao.zhou
 * @Date: 2021-10-19 10:37:01
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2024-10-22 16:23:48
 * @Description 获取不同平台的http请求接口的配置
 */
var config_1 = require("./wechat/config");
var config_2 = require("./alipay/config");
var config_3 = require("./browser/config");
function getReqConfig(config) {
    if (typeof wx !== "undefined") {
        return config_1.default(config);
    }
    if (typeof my !== "undefined") {
        return config_2.default(config);
    }
    if (typeof window !== "undefined") {
        return config_3.default(config);
    }
    return config;
}
exports.default = getReqConfig;
//# sourceMappingURL=getReqConfig.js.map