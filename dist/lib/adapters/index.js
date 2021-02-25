"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("../helpers/utils");
var request_1 = require("./wechat/request");
function getAdapter(config) {
    if (!utils_1.isUndefined(wx)) {
        return request_1.default(config);
    }
    throw new TypeError("Unrecognized Platform");
}
exports.default = getAdapter;
//# sourceMappingURL=index.js.map