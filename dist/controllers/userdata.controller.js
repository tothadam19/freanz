"use strict";
// Uncomment these imports to begin using these cool features!
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserdataController = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const repositories_1 = require("../repositories");
const userdata_1 = require("../requestSchemas/userdata");
// import {inject} from '@loopback/core';
let UserdataController = class UserdataController {
    constructor(userDataRepository) {
        this.userDataRepository = userDataRepository;
    }
    async getProfile(id) {
        return this.userDataRepository.getUserProfile(id.userID);
    }
    async getPublicProfile(id) {
        return this.userDataRepository.getPublicUserProfile(id);
    }
    async getProfileTemplates(id) {
        return this.userDataRepository.getUserTemplates(id);
    }
    async getLang(id) {
        return this.userDataRepository.getLang(id.userID);
    }
    async publicitySwap(id) {
        return this.userDataRepository.triggerPublicitySwap(id.userID);
    }
    async deleteTemplate(ids) {
        return this.userDataRepository.deleteTemplate(ids.userID, ids.templateID);
    }
    async removeTemplate(ids) {
        return this.userDataRepository.removePublicTemplate(ids.userID, ids.templateID);
    }
    async patchAddTemplate(ids) {
        return this.userDataRepository.patchNewTemplate(ids.userID, ids.templateID);
    }
    async patchSaveTemplate(ids) {
        return this.userDataRepository.patchAddTemplate(ids.userID, ids.templateID);
    }
    async putUserInfo(ids) {
        return this.userDataRepository.putUserUnderLearningData(ids.userID, ids.universityID, ids.facultyID, ids.majorID);
    }
};
(0, tslib_1.__decorate)([
    (0, rest_1.post)('/profile'),
    (0, rest_1.response)(200, {
        description: 'Create new template',
    }),
    (0, tslib_1.__param)(0, (0, rest_1.requestBody)(userdata_1.userIDRequestBody)),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Object]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], UserdataController.prototype, "getProfile", null);
(0, tslib_1.__decorate)([
    (0, rest_1.get)('/profile/{id}'),
    (0, rest_1.response)(200, {
        description: 'Template model instance',
    }),
    (0, tslib_1.__param)(0, rest_1.param.path.string('id')),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Object]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], UserdataController.prototype, "getPublicProfile", null);
(0, tslib_1.__decorate)([
    (0, rest_1.get)('/profile/{id}/templates'),
    (0, rest_1.response)(200, {
        description: 'Template model instance',
    }),
    (0, tslib_1.__param)(0, rest_1.param.path.string('id')),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Object]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], UserdataController.prototype, "getProfileTemplates", null);
(0, tslib_1.__decorate)([
    (0, rest_1.post)('/profile/lang'),
    (0, rest_1.response)(200, {
        description: 'Create new template',
    }),
    (0, tslib_1.__param)(0, (0, rest_1.requestBody)(userdata_1.userIDRequestBody)),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Object]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], UserdataController.prototype, "getLang", null);
(0, tslib_1.__decorate)([
    (0, rest_1.post)('/profile/public'),
    (0, rest_1.response)(200, {
        description: 'Create new template',
    }),
    (0, tslib_1.__param)(0, (0, rest_1.requestBody)(userdata_1.userIDRequestBody)),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Object]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], UserdataController.prototype, "publicitySwap", null);
(0, tslib_1.__decorate)([
    (0, rest_1.del)('/profile/usertemplate'),
    (0, rest_1.response)(200, {
        description: 'Create new template',
    }),
    (0, tslib_1.__param)(0, (0, rest_1.requestBody)(userdata_1.templateRequestBody)),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Object]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], UserdataController.prototype, "deleteTemplate", null);
(0, tslib_1.__decorate)([
    (0, rest_1.del)('/profile/publictemplate'),
    (0, rest_1.response)(200, {
        description: 'Create new template',
    }),
    (0, tslib_1.__param)(0, (0, rest_1.requestBody)(userdata_1.templateRequestBody)),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Object]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], UserdataController.prototype, "removeTemplate", null);
(0, tslib_1.__decorate)([
    (0, rest_1.patch)('/profile/usertemplate'),
    (0, rest_1.response)(200, {
        description: 'Create new template',
    }),
    (0, tslib_1.__param)(0, (0, rest_1.requestBody)(userdata_1.templateRequestBody)),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Object]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], UserdataController.prototype, "patchAddTemplate", null);
(0, tslib_1.__decorate)([
    (0, rest_1.patch)('/profile/publictemplate'),
    (0, rest_1.response)(200, {
        description: 'Create new template',
    }),
    (0, tslib_1.__param)(0, (0, rest_1.requestBody)(userdata_1.templateRequestBody)),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Object]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], UserdataController.prototype, "patchSaveTemplate", null);
(0, tslib_1.__decorate)([
    (0, rest_1.put)('/profile'),
    (0, rest_1.response)(200, {
        description: 'Create new template',
    }),
    (0, tslib_1.__param)(0, (0, rest_1.requestBody)(userdata_1.underLearningRequestBody)),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Object]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], UserdataController.prototype, "putUserInfo", null);
UserdataController = (0, tslib_1.__decorate)([
    (0, tslib_1.__param)(0, (0, repository_1.repository)(repositories_1.UserDataRepository)),
    (0, tslib_1.__metadata)("design:paramtypes", [repositories_1.UserDataRepository])
], UserdataController);
exports.UserdataController = UserdataController;
//# sourceMappingURL=userdata.controller.js.map