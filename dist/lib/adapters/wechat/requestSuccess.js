"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("../../helpers/utils");
function requestSuccess(res) {
    if (utils_1.isUndefined(res) || res === null) {
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
        data: utils_1.dataParser(res.data),
        response: res,
    };
}
exports.default = requestSuccess;
//# sourceMappingURL=requestSuccess.js.map