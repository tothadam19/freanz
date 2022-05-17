"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubjectDetailsRepository = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@loopback/core");
const repository_1 = require("@loopback/repository");
const datasources_1 = require("../datasources");
const models_1 = require("../models");
const id_gen_1 = require("../services/id_gen");
let SubjectDetailsRepository = class SubjectDetailsRepository extends repository_1.DefaultCrudRepository {
    constructor(dataSource) {
        super(models_1.SubjectDetails, dataSource);
    }
    async constructModellOnSubjectCreated() {
        const id = await this.genDSID();
        await this.create({
            detailsID: id,
            comments: [],
            ratings: []
        });
        return id;
    }
    async getCommentsbyID(detailID) {
        try {
            const subjectDetail = await this.findById(detailID);
            return subjectDetail.comments;
        }
        catch (error) {
            if (error.code === 'ENTITY_NOT_FOUND')
                return undefined;
            return error;
        }
    }
    async getRatingsID(detailID) {
        try {
            const subjectDetail = await this.findById(detailID);
            const ratings = {
                difficultyLevel: 0,
                interestLevel: 0,
                practicalLevel: 0
            };
            subjectDetail.ratings.forEach(rating => {
                ratings.difficultyLevel += rating.difficultyLevel;
                ratings.interestLevel += rating.interestLevel;
                ratings.practicalLevel += rating.practicalLevel;
            });
            ratings.difficultyLevel /= subjectDetail.ratings.length;
            ratings.interestLevel /= subjectDetail.ratings.length;
            ratings.practicalLevel /= subjectDetail.ratings.length;
            return ratings;
        }
        catch (error) {
            if (error.code === 'ENTITY_NOT_FOUND')
                return undefined;
            return error;
        }
    }
    async patchComment(detailID, content, date, byUserID) {
        try {
            const subjectDetail = await this.findById(detailID);
            const id = await this.genCID(subjectDetail);
            subjectDetail.comments.push(new models_1.Comments({
                commentID: id,
                content: content,
                date: date,
                byUserID: byUserID
            }));
            await this.replaceById(detailID, subjectDetail);
            return id;
        }
        catch (error) {
            if (error.code === 'ENTITY_NOT_FOUND')
                return 'subjectDetail not found by the given id';
            return error;
        }
    }
    async patchRating(detailID, difficultyLevel, interestLevel, practicalLevel) {
        try {
            const subjectDetail = await this.findById(detailID);
            const id = await this.genRID(subjectDetail);
            subjectDetail.ratings.push(new models_1.Ratings({
                ratingID: id,
                difficultyLevel: difficultyLevel,
                interestLevel: interestLevel,
                practicalLevel: practicalLevel
            }));
            await this.replaceById(detailID, subjectDetail);
            return id;
        }
        catch (error) {
            if (error.code === 'ENTITY_NOT_FOUND')
                return 'subjectDetail not found by the given id';
            return error;
        }
    }
    async genDSID() {
        const id = (0, id_gen_1.uid)();
        return await this.checkDSID(id) === false ? id : this.genDSID();
    }
    async checkDSID(id) {
        try {
            return await this.findById(id);
        }
        catch (error) {
            if (error.code === 'ENTITY_NOT_FOUND') {
                return false;
            }
            throw error;
        }
    }
    async genCID(subjectDetail) {
        const id = (0, id_gen_1.uid)();
        return await this.checkCID(id, subjectDetail) === undefined ? id : this.genCID(subjectDetail);
    }
    async checkCID(id, subjectDetail) {
        try {
            return subjectDetail.comments.find(comment => comment.commentID === id);
        }
        catch (error) {
            if (error.code === 'ENTITY_NOT_FOUND') {
                return undefined;
            }
            throw error;
        }
    }
    async genRID(subjectDetail) {
        const id = (0, id_gen_1.uid)();
        return await this.checkRID(id, subjectDetail) === undefined ? id : this.genRID(subjectDetail);
    }
    async checkRID(id, subjectDetail) {
        try {
            return subjectDetail.ratings.find(comment => comment.ratingID === id);
        }
        catch (error) {
            if (error.code === 'ENTITY_NOT_FOUND') {
                return undefined;
            }
            throw error;
        }
    }
};
SubjectDetailsRepository = (0, tslib_1.__decorate)([
    (0, tslib_1.__param)(0, (0, core_1.inject)('datasources.mongoDB')),
    (0, tslib_1.__metadata)("design:paramtypes", [datasources_1.MongoDbDataSource])
], SubjectDetailsRepository);
exports.SubjectDetailsRepository = SubjectDetailsRepository;
//# sourceMappingURL=subject-details.repository.js.map