"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserDataRepository = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@loopback/core");
const repository_1 = require("@loopback/repository");
const datasources_1 = require("../datasources");
const user_data_model_1 = require("../models/user-data.model");
let UserDataRepository = class UserDataRepository extends repository_1.DefaultCrudRepository {
    constructor(dataSource) {
        super(user_data_model_1.UserData, dataSource);
    }
    async contructOnNewRegister(username, userID, email, userSalt) {
        return this.create(new user_data_model_1.UserData({
            userID: userID,
            username: username,
            salt: userSalt,
            email: email,
            isProfilePublic: false,
            userTemplates: [],
            savedPublicTemplates: [],
            lang: 'hu'
        }));
    }
    async getUserProfile(userID) {
        try {
            return await this.findById(userID);
        }
        catch (error) {
            if (error.code === 'ENTITY_NOT_FOUND') {
                return undefined;
            }
            throw error;
        }
    }
    async getPublicUserProfile(userID) {
        try {
            const user = await this.findById(userID);
            if (user.isProfilePublic === true)
                return user;
            return 'Profile is not public';
        }
        catch (error) {
            if (error.code === 'ENTITY_NOT_FOUND') {
                return 'User by the given ID not found';
            }
            throw error;
        }
    }
    async getUserTemplates(userID) {
        try {
            const user = await this.findById(userID);
            if (user.userTemplates === undefined || user.savedPublicTemplates === undefined)
                return 'Unexcepted error: arrays are undefined';
            return {
                ownedTemplates: user.userTemplates,
                savedPublicTemplates: user.savedPublicTemplates
            };
        }
        catch (error) {
            if (error.code === 'ENTITY_NOT_FOUND') {
                return 'User by the given ID not found';
            }
            throw error;
        }
    }
    async patchNewTemplate(userID, templateID) {
        var _a;
        try {
            const user = await this.findById(userID);
            (_a = user.userTemplates) === null || _a === void 0 ? void 0 : _a.push(templateID);
            return await this.replaceById(userID, user);
        }
        catch (error) {
            if (error.code === 'ENTITY_NOT_FOUND') {
                return;
            }
            throw error;
        }
    }
    async patchAddTemplate(userID, templateID) {
        var _a;
        try {
            const user = await this.findById(userID);
            (_a = user.savedPublicTemplates) === null || _a === void 0 ? void 0 : _a.push(templateID);
            return await this.replaceById(userID, user);
        }
        catch (error) {
            if (error.code === 'ENTITY_NOT_FOUND') {
                return;
            }
            throw error;
        }
    }
    async deleteTemplate(userID, templateID) {
        try {
            const user = await this.findById(userID);
            if (user.userTemplates === undefined)
                return 'Unexcepted error: array is undefined';
            const index = user.userTemplates.findIndex(currentTemplate => currentTemplate = templateID);
            if (index === -1)
                return 'Unexcepted error: template by ID not found';
            user.userTemplates.splice(index, 1);
            return await this.replaceById(userID, user);
        }
        catch (error) {
            if (error.code === 'ENTITY_NOT_FOUND') {
                return 'User by the given ID not found';
            }
            throw error;
        }
    }
    async deleteTemplateFromSaved(userID, templateID) {
        try {
            const user = await this.findById(userID);
            if (user.savedPublicTemplates === undefined)
                return 'Unexcepted error: array is undefined';
            const index = user.savedPublicTemplates.findIndex(currentTemplate => currentTemplate = templateID);
            if (index === -1)
                return 'Unexcepted error: template by ID not found';
            user.savedPublicTemplates.splice(index, 1);
            return await this.replaceById(userID, user);
        }
        catch (error) {
            if (error.code === 'ENTITY_NOT_FOUND') {
                return 'User by the given ID not found';
            }
            throw error;
        }
    }
    async removePublicTemplate(userID, templateID) {
        try {
            const user = await this.findById(userID);
            if (user.savedPublicTemplates === undefined)
                return 'Unexcepted error: array is undefined';
            const index = user.savedPublicTemplates.findIndex(currentTemplate => currentTemplate = templateID);
            if (index === -1)
                return 'Unexcepted error: template by ID not found';
            user.savedPublicTemplates.splice(index, 1);
            return await this.replaceById(userID, user);
        }
        catch (error) {
            if (error.code === 'ENTITY_NOT_FOUND') {
                return 'User by the given ID not found';
            }
            throw error;
        }
    }
    async getLang(userID) {
        try {
            const user = await this.findById(userID);
            if (user.lang === undefined)
                return 'Unexcepted error - lang does not exists';
            return user.lang;
        }
        catch (error) {
            if (error.code === 'ENTITY_NOT_FOUND') {
                return 'User by the given ID not found';
            }
            throw error;
        }
    }
    async triggerPublicitySwap(userID) {
        try {
            const user = await this.findById(userID);
            if (user.isProfilePublic === true)
                user.isProfilePublic = false;
            else
                user.isProfilePublic = true;
            return await this.replaceById(userID, user);
        }
        catch (error) {
            if (error.code === 'ENTITY_NOT_FOUND') {
                return;
            }
            throw error;
        }
    }
    async putUserUnderLearningData(userID, universityID, facultyID, majorID) {
        try {
            const user = await this.findById(userID);
            user.underLearning = new user_data_model_1.UserInfoModel({
                universityID: universityID,
                facultyID: facultyID,
                majorID: majorID
            });
            return await this.replaceById(userID, user);
        }
        catch (error) {
            if (error.code === 'ENTITY_NOT_FOUND') {
                return 'User by the given ID not found';
            }
            throw error;
        }
    }
    async getMail(username) {
        return this.findOne({ where: { username: username } });
    }
    async usernameUniqueTest(username) {
        return this.findOne({ where: { username: username } });
    }
    async getUserSalt(mail) {
        const user = await this.findOne({ where: {
                email: mail
            } });
        return user === null || user === void 0 ? void 0 : user.salt;
    }
};
UserDataRepository = (0, tslib_1.__decorate)([
    (0, tslib_1.__param)(0, (0, core_1.inject)('datasources.mongoDB')),
    (0, tslib_1.__metadata)("design:paramtypes", [datasources_1.MongoDbDataSource])
], UserDataRepository);
exports.UserDataRepository = UserDataRepository;
//# sourceMappingURL=user-data.repository.js.map