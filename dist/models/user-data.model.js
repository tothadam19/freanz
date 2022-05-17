"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserData = exports.UserInfoModel = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
let UserInfoModel = class UserInfoModel extends repository_1.Entity {
    constructor(data) {
        super(data);
    }
};
(0, tslib_1.__decorate)([
    (0, repository_1.property)({
        type: 'string',
        required: false,
        default: 'Not given',
    }),
    (0, tslib_1.__metadata)("design:type", String)
], UserInfoModel.prototype, "universityID", void 0);
(0, tslib_1.__decorate)([
    (0, repository_1.property)({
        type: 'string',
        required: false,
        default: 'Not given',
    }),
    (0, tslib_1.__metadata)("design:type", String)
], UserInfoModel.prototype, "facultyID", void 0);
(0, tslib_1.__decorate)([
    (0, repository_1.property)({
        type: 'string',
        required: false,
        default: 'Not given',
    }),
    (0, tslib_1.__metadata)("design:type", String)
], UserInfoModel.prototype, "majorID", void 0);
UserInfoModel = (0, tslib_1.__decorate)([
    (0, repository_1.model)(),
    (0, tslib_1.__metadata)("design:paramtypes", [Object])
], UserInfoModel);
exports.UserInfoModel = UserInfoModel;
let UserData = class UserData extends repository_1.Entity {
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
], UserData.prototype, "userID", void 0);
(0, tslib_1.__decorate)([
    (0, repository_1.property)({
        type: 'string',
    }),
    (0, tslib_1.__metadata)("design:type", String)
], UserData.prototype, "username", void 0);
(0, tslib_1.__decorate)([
    (0, repository_1.property)({
        type: 'string',
    }),
    (0, tslib_1.__metadata)("design:type", String)
], UserData.prototype, "salt", void 0);
(0, tslib_1.__decorate)([
    (0, repository_1.property)({
        type: 'string',
    }),
    (0, tslib_1.__metadata)("design:type", String)
], UserData.prototype, "email", void 0);
(0, tslib_1.__decorate)([
    (0, repository_1.property)({
        type: 'object',
    }),
    (0, tslib_1.__metadata)("design:type", UserInfoModel)
], UserData.prototype, "underLearning", void 0);
(0, tslib_1.__decorate)([
    (0, repository_1.property)({
        type: 'boolean',
        default: true,
    }),
    (0, tslib_1.__metadata)("design:type", Boolean)
], UserData.prototype, "isProfilePublic", void 0);
(0, tslib_1.__decorate)([
    (0, repository_1.property)({
        type: 'array',
        itemType: 'string',
    }),
    (0, tslib_1.__metadata)("design:type", Array)
], UserData.prototype, "userTemplates", void 0);
(0, tslib_1.__decorate)([
    (0, repository_1.property)({
        type: 'array',
        itemType: 'string',
    }),
    (0, tslib_1.__metadata)("design:type", Array)
], UserData.prototype, "savedPublicTemplates", void 0);
(0, tslib_1.__decorate)([
    (0, repository_1.property)({
        type: 'string',
    }),
    (0, tslib_1.__metadata)("design:type", String)
], UserData.prototype, "lang", void 0);
UserData = (0, tslib_1.__decorate)([
    (0, repository_1.model)(),
    (0, tslib_1.__metadata)("design:paramtypes", [Object])
], UserData);
exports.UserData = UserData;
//# sourceMappingURL=user-data.model.js.map