"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TemplateRepository = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@loopback/core");
const repository_1 = require("@loopback/repository");
const datasources_1 = require("../datasources");
const models_1 = require("../models");
const id_gen_1 = require("../services/id_gen");
let TemplateRepository = class TemplateRepository extends repository_1.DefaultCrudRepository {
    constructor(dataSource) {
        super(models_1.Template, dataSource);
    }
    async createTemplate(templateName, universityID, facultyID, majorID, userID) {
        const newTemplate = new models_1.Template({
            templateID: await this.genTID(),
            templateName: templateName,
            universityID: universityID,
            facultyID: facultyID,
            majorID: majorID,
            userID: userID,
            isPublic: false,
            semester: []
        });
        await this.create(newTemplate);
        return newTemplate.templateID;
    }
    async getTemplate(templateID) {
        return this.findById(templateID);
    }
    async publicSwapTrigger(templateID, userID) {
        const template = await this.findOne({ where: {
                templateID: templateID,
                userID: userID
            } });
        if (template === null)
            return 'templateID is invalid or permission denied';
        if (template === null || template === void 0 ? void 0 : template.isPublic)
            template.isPublic = false;
        else if ((template === null || template === void 0 ? void 0 : template.isPublic) === false)
            template.isPublic = true;
        await this.replaceById(templateID, template);
        return template.isPublic;
    }
    async deleteSubjectFromTemplate(templateID, semesterID, subjectID) {
        try {
            const template = await this.findById(templateID);
            const semester = template.semester.find(currentSemester => currentSemester.semesterID === semesterID);
            if (semester === undefined)
                return 'Unexpected error: semester not found by the given ID';
            const indexOfElementToDelete = semester.subjects.findIndex(currentSubject => currentSubject === subjectID);
            if (indexOfElementToDelete === -1)
                return 'Unexpected error: subject not found by the given ID';
            semester.subjects.splice(indexOfElementToDelete, 1);
            return await this.replaceById(templateID, template);
        }
        catch (error) {
            if (error.code === 'ENTITY_NOT_FOUND')
                return 'Unexpected error: Template not found by the given ID';
            return error;
        }
    }
    async genTID() {
        const id = (0, id_gen_1.uid)();
        return await this.checkTID(id) === false ? id : this.genTID();
    }
    async checkTID(id) {
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
    async genSID(template) {
        const id = (0, id_gen_1.uid)();
        return await this.checkSID(id, template) === undefined ? id : this.genSID(template);
    }
    async checkSID(id, template) {
        try {
            return template.semester.find(currentSemester => currentSemester.semesterID === id);
        }
        catch (error) {
            if (error.code === 'ENTITY_NOT_FOUND') {
                return undefined;
            }
            throw error;
        }
    }
    async fetchTemplateJson(jsonObject) {
        await this.replaceById(jsonObject.templateID, jsonObject);
        return jsonObject;
    }
    async newSemester(templateID) {
        const template = await this.findById(templateID);
        const newSemesterID = await this.genSID(template);
        template.semester.push(new models_1.Semester({ semesterID: newSemesterID, subjects: [] }));
        await this.replaceById(templateID, template);
        return newSemesterID;
    }
};
TemplateRepository = (0, tslib_1.__decorate)([
    (0, tslib_1.__param)(0, (0, core_1.inject)('datasources.mongoDB')),
    (0, tslib_1.__metadata)("design:paramtypes", [datasources_1.MongoDbDataSource])
], TemplateRepository);
exports.TemplateRepository = TemplateRepository;
//# sourceMappingURL=template.repository.js.map