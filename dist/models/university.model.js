"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.University = exports.Faculty = exports.Major = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
let Major = class Major extends repository_1.Entity {
    constructor(data) {
        super(data);
    }
};
(0, tslib_1.__decorate)([
    (0, repository_1.property)({
        type: 'string',
    }),
    (0, tslib_1.__metadata)("design:type", String)
], Major.prototype, "majorID", void 0);
(0, tslib_1.__decorate)([
    (0, repository_1.property)({
        type: 'string',
    }),
    (0, tslib_1.__metadata)("design:type", String)
], Major.prototype, "majorName", void 0);
(0, tslib_1.__decorate)([
    (0, repository_1.property)({
        type: 'array',
        itemType: 'string',
    }),
    (0, tslib_1.__metadata)("design:type", Array)
], Major.prototype, "templateID", void 0);
Major = (0, tslib_1.__decorate)([
    (0, repository_1.model)(),
    (0, tslib_1.__metadata)("design:paramtypes", [Object])
], Major);
exports.Major = Major;
let Faculty = class Faculty extends repository_1.Entity {
    constructor(data) {
        super(data);
    }
};
(0, tslib_1.__decorate)([
    (0, repository_1.property)({
        type: 'string',
    }),
    (0, tslib_1.__metadata)("design:type", String)
], Faculty.prototype, "facultyID", void 0);
(0, tslib_1.__decorate)([
    (0, repository_1.property)({
        type: 'string',
    }),
    (0, tslib_1.__metadata)("design:type", String)
], Faculty.prototype, "facultyName", void 0);
(0, tslib_1.__decorate)([
    (0, repository_1.property)({
        type: 'array',
        itemType: 'object',
    }),
    (0, tslib_1.__metadata)("design:type", Array)
], Faculty.prototype, "major", void 0);
Faculty = (0, tslib_1.__decorate)([
    (0, repository_1.model)(),
    (0, tslib_1.__metadata)("design:paramtypes", [Object])
], Faculty);
exports.Faculty = Faculty;
let University = class University extends repository_1.Entity {
    constructor(data) {
        super(data);
    }
};
(0, tslib_1.__decorate)([
    (0, repository_1.property)({
        type: 'string',
        id: true,
        required: true,
    }),
    (0, tslib_1.__metadata)("design:type", String)
], University.prototype, "universityID", void 0);
(0, tslib_1.__decorate)([
    (0, repository_1.property)({
        type: 'string',
    }),
    (0, tslib_1.__metadata)("design:type", String)
], University.prototype, "universityName", void 0);
(0, tslib_1.__decorate)([
    (0, repository_1.property)({
        type: 'array',
        itemType: 'object',
    }),
    (0, tslib_1.__metadata)("design:type", Array)
], University.prototype, "faculty", void 0);
University = (0, tslib_1.__decorate)([
    (0, repository_1.model)(),
    (0, tslib_1.__metadata)("design:paramtypes", [Object])
], University);
exports.University = University;
//# sourceMappingURL=university.model.js.map