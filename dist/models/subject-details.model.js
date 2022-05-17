"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubjectDetails = exports.Ratings = exports.Comments = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
let Comments = class Comments extends repository_1.Entity {
    constructor(data) {
        super(data);
    }
};
(0, tslib_1.__decorate)([
    (0, repository_1.property)({
        type: 'string',
    }),
    (0, tslib_1.__metadata)("design:type", String)
], Comments.prototype, "commentID", void 0);
(0, tslib_1.__decorate)([
    (0, repository_1.property)({
        type: 'string',
    }),
    (0, tslib_1.__metadata)("design:type", String)
], Comments.prototype, "content", void 0);
(0, tslib_1.__decorate)([
    (0, repository_1.property)({
        type: 'date',
    }),
    (0, tslib_1.__metadata)("design:type", String)
], Comments.prototype, "date", void 0);
(0, tslib_1.__decorate)([
    (0, repository_1.property)({
        type: 'string',
    }),
    (0, tslib_1.__metadata)("design:type", String)
], Comments.prototype, "byUserID", void 0);
Comments = (0, tslib_1.__decorate)([
    (0, repository_1.model)(),
    (0, tslib_1.__metadata)("design:paramtypes", [Object])
], Comments);
exports.Comments = Comments;
let Ratings = class Ratings extends repository_1.Entity {
    constructor(data) {
        super(data);
    }
};
(0, tslib_1.__decorate)([
    (0, repository_1.property)({
        type: 'string',
    }),
    (0, tslib_1.__metadata)("design:type", String)
], Ratings.prototype, "ratingID", void 0);
(0, tslib_1.__decorate)([
    (0, repository_1.property)({
        type: 'number',
    }),
    (0, tslib_1.__metadata)("design:type", Number)
], Ratings.prototype, "difficultyLevel", void 0);
(0, tslib_1.__decorate)([
    (0, repository_1.property)({
        type: 'number',
    }),
    (0, tslib_1.__metadata)("design:type", Number)
], Ratings.prototype, "interestLevel", void 0);
(0, tslib_1.__decorate)([
    (0, repository_1.property)({
        type: 'number',
    }),
    (0, tslib_1.__metadata)("design:type", Number)
], Ratings.prototype, "practicalLevel", void 0);
Ratings = (0, tslib_1.__decorate)([
    (0, repository_1.model)(),
    (0, tslib_1.__metadata)("design:paramtypes", [Object])
], Ratings);
exports.Ratings = Ratings;
let SubjectDetails = class SubjectDetails extends repository_1.Entity {
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
], SubjectDetails.prototype, "detailsID", void 0);
(0, tslib_1.__decorate)([
    (0, repository_1.property)({
        type: 'array',
        itemType: 'object',
    }),
    (0, tslib_1.__metadata)("design:type", Array)
], SubjectDetails.prototype, "comments", void 0);
(0, tslib_1.__decorate)([
    (0, repository_1.property)({
        type: 'array',
        itemType: 'object',
    }),
    (0, tslib_1.__metadata)("design:type", Array)
], SubjectDetails.prototype, "ratings", void 0);
SubjectDetails = (0, tslib_1.__decorate)([
    (0, repository_1.model)(),
    (0, tslib_1.__metadata)("design:paramtypes", [Object])
], SubjectDetails);
exports.SubjectDetails = SubjectDetails;
//# sourceMappingURL=subject-details.model.js.map