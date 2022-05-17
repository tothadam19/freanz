"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Template = exports.Semester = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
let Semester = class Semester extends repository_1.Entity {
    constructor(data) {
        super(data);
    }
};
(0, tslib_1.__decorate)([
    (0, repository_1.property)({
        type: 'string',
    }),
    (0, tslib_1.__metadata)("design:type", String)
], Semester.prototype, "semesterID", void 0);
(0, tslib_1.__decorate)([
    (0, repository_1.property)({
        type: 'array',
        itemType: 'string',
    }),
    (0, tslib_1.__metadata)("design:type", Array)
], Semester.prototype, "subjects", void 0);
Semester = (0, tslib_1.__decorate)([
    (0, repository_1.model)(),
    (0, tslib_1.__metadata)("design:paramtypes", [Object])
], Semester);
exports.Semester = Semester;
let Template = class Template extends repository_1.Entity {
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
], Template.prototype, "templateID", void 0);
(0, tslib_1.__decorate)([
    (0, repository_1.property)({
        type: 'string',
    }),
    (0, tslib_1.__metadata)("design:type", String)
], Template.prototype, "templateName", void 0);
(0, tslib_1.__decorate)([
    (0, repository_1.property)({
        type: 'string',
    }),
    (0, tslib_1.__metadata)("design:type", String)
], Template.prototype, "universityID", void 0);
(0, tslib_1.__decorate)([
    (0, repository_1.property)({
        type: 'string',
    }),
    (0, tslib_1.__metadata)("design:type", String)
], Template.prototype, "facultyID", void 0);
(0, tslib_1.__decorate)([
    (0, repository_1.property)({
        type: 'string',
    }),
    (0, tslib_1.__metadata)("design:type", String)
], Template.prototype, "majorID", void 0);
(0, tslib_1.__decorate)([
    (0, repository_1.property)({
        type: 'string',
    }),
    (0, tslib_1.__metadata)("design:type", String)
], Template.prototype, "userID", void 0);
(0, tslib_1.__decorate)([
    (0, repository_1.property)({
        type: 'boolean',
    }),
    (0, tslib_1.__metadata)("design:type", Boolean)
], Template.prototype, "isPublic", void 0);
(0, tslib_1.__decorate)([
    (0, repository_1.property)({
        type: 'array',
        itemType: 'object',
    }),
    (0, tslib_1.__metadata)("design:type", Array)
], Template.prototype, "semester", void 0);
Template = (0, tslib_1.__decorate)([
    (0, repository_1.model)(),
    (0, tslib_1.__metadata)("design:paramtypes", [Object])
], Template);
exports.Template = Template;
//# sourceMappingURL=template.model.js.map