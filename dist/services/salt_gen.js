"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.genSalt = void 0;
const perf_hooks_1 = require("perf_hooks");
function salt() {
    return (perf_hooks_1.performance.now().toString(32) + Math.random().toString(32)).replace(/\./g, "");
}
;
function genSalt() {
    let saltToReturn = "";
    for (let i = 0; i < 4; i++)
        saltToReturn += salt();
    return saltToReturn;
}
exports.genSalt = genSalt;
;
//# sourceMappingURL=salt_gen.js.map