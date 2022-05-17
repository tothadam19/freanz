"use strict";
// Uncomment these imports to begin using these cool features!
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubjectDetailController = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const repositories_1 = require("../repositories");
const subjectDetail_1 = require("../requestSchemas/subjectDetail");
// import {inject} from '@loopback/core';
let SubjectDetailController = class SubjectDetailController {
    constructor(subjectDetailsRepository) {
        this.subjectDetailsRepository = subjectDetailsRepository;
    }
    async getComments(id) {
        return this.subjectDetailsRepository.getCommentsbyID(id.detailID);
    }
    async patchComments(commentToPatch) {
        return this.subjectDetailsRepository.patchComment(commentToPatch.detailID, commentToPatch.content, commentToPatch.date, commentToPatch.byUserID);
    }
    async getRatings(id) {
        return this.subjectDetailsRepository.getRatingsID(id.detailID);
    }
    async patchRatings(ratingToPatch) {
        return this.subjectDetailsRepository.patchRating(ratingToPatch.detailID, ratingToPatch.difficultyLevel, ratingToPatch.interestLevel, ratingToPatch.practicalLevel);
    }
};
(0, tslib_1.__decorate)([
    (0, rest_1.post)('/comments'),
    (0, rest_1.response)(200, {
        description: 'Create new template',
    }),
    (0, tslib_1.__param)(0, (0, rest_1.requestBody)(subjectDetail_1.getCommentsAndRatingsRequestBody)),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Object]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], SubjectDetailController.prototype, "getComments", null);
(0, tslib_1.__decorate)([
    (0, rest_1.patch)('/comments'),
    (0, rest_1.response)(200, {
        description: 'Create new template',
    }),
    (0, tslib_1.__param)(0, (0, rest_1.requestBody)(subjectDetail_1.patchCommentsRequestBody)),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Object]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], SubjectDetailController.prototype, "patchComments", null);
(0, tslib_1.__decorate)([
    (0, rest_1.post)('/ratings'),
    (0, rest_1.response)(200, {
        description: 'Create new template',
    }),
    (0, tslib_1.__param)(0, (0, rest_1.requestBody)(subjectDetail_1.getCommentsAndRatingsRequestBody)),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Object]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], SubjectDetailController.prototype, "getRatings", null);
(0, tslib_1.__decorate)([
    (0, rest_1.patch)('/ratings'),
    (0, rest_1.response)(200, {
        description: 'Create new template',
    }),
    (0, tslib_1.__param)(0, (0, rest_1.requestBody)(subjectDetail_1.patchRatingsRequestBody)),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Object]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], SubjectDetailController.prototype, "patchRatings", null);
SubjectDetailController = (0, tslib_1.__decorate)([
    (0, tslib_1.__param)(0, (0, repository_1.repository)(repositories_1.SubjectDetailsRepository)),
    (0, tslib_1.__metadata)("design:paramtypes", [repositories_1.SubjectDetailsRepository])
], SubjectDetailController);
exports.SubjectDetailController = SubjectDetailController;
//# sourceMappingURL=subject-detail.controller.js.map