"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("../helpers/utils");
function getRequestAdapter() {
    if (!utils_1.isUndefined(wx) || !utils_1.isUndefined(my)) {
        return utils_1.getGlobal().request;
    }
    throw new TypeError("Unrecognized Platform");
}
exports.default = getRequestAdapter;
//# sourceMappingURL=getRequestAdapter.js.map