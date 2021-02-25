"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var request_1 = require("./request");
function getAdapter(config) {
    return request_1.default(config);
}
exports.default = getAdapter;
//# sourceMappingURL=index.js.map