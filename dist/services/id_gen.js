"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uid = void 0;
const perf_hooks_1 = require("perf_hooks");
function uid() {
    return (perf_hooks_1.performance.now().toString(36) + Math.random().toString(36)).replace(/\./g, "");
}
exports.uid = uid;
;
//# sourceMappingURL=id_gen.js.map