"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TemplatesController = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const repositories_1 = require("../repositories");
const template_1 = require("../requestSchemas/template");
let TemplatesController = class TemplatesController {
    constructor(templateRepository, universityRepository, userDataRepo) {
        this.templateRepository = templateRepository;
        this.universityRepository = universityRepository;
        this.userDataRepo = userDataRepo;
    }
    async create(newTemplate) {
        var _a;
        const newTemplateID = await this.templateRepository.createTemplate(newTemplate.templateName, newTemplate.universityID, newTemplate.facultyID, newTemplate.majorID, newTemplate.userId);
        if (newTemplateID !== "") {
            await this.universityRepository.addNewTemplate(newTemplate.universityID, newTemplate.facultyID, newTemplate.majorID, newTemplateID);
            const user = await this.userDataRepo.findById(newTemplate.userId);
            console.log(user.userTemplates);
            (_a = user.userTemplates) === null || _a === void 0 ? void 0 : _a.push(newTemplateID);
            console.log(user.userTemplates);
            await this.userDataRepo.replaceById(user.userID, user);
            return newTemplateID;
        }
        return "Unexpected error: couldn't generate valid templateID";
    }
    async getTemplate(id) {
        return this.templateRepository.getTemplate(id);
    }
    async newSemester(id) {
        return this.templateRepository.newSemester(id);
    }
    async putTemplate(jsonObject) {
        return this.templateRepository.fetchTemplateJson({ templateID: jsonObject.templateID, templateName: jsonObject.templateName, universityID: jsonObject.universityID, facultyID: jsonObject.facultyID, majorID: jsonObject.majorID, userID: jsonObject.userID, isPublic: jsonObject.isPublic, semester: jsonObject.semester });
    }
    async patchIsPublic(publicPatchToTrigger) {
        return this.templateRepository.publicSwapTrigger(publicPatchToTrigger.templateID, publicPatchToTrigger.userID);
    }
    async deleteSubjectFromTemplate(subjectToDelete) {
        return this.templateRepository.deleteSubjectFromTemplate(subjectToDelete.templateID, subjectToDelete.semesterID, subjectToDelete.subjectID);
    }
    async deleteTemplate(templateToDelete) {
        console.log('AAA');
        try {
            await this.templateRepository.deleteById(templateToDelete.templateId);
            await this.userDataRepo.deleteTemplate(templateToDelete.userId, templateToDelete.templateId);
            return '1';
        }
        catch (e) {
            return '0';
        }
    }
    async deleteTemplateFromFave(templateToDelete) {
        console.log('AAA');
        try {
            await this.userDataRepo.deleteTemplateFromSaved(templateToDelete.userId, templateToDelete.templateId);
            return '1';
        }
        catch (e) {
            return '0';
        }
    }
};
(0, tslib_1.__decorate)([
    (0, rest_1.post)('/templates'),
    (0, rest_1.response)(200, {
        description: 'Create new template',
    }),
    (0, tslib_1.__param)(0, (0, rest_1.requestBody)(template_1.NewTemplateRequestBody)),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Object]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], TemplatesController.prototype, "create", null);
(0, tslib_1.__decorate)([
    (0, rest_1.get)('/templates/{id}'),
    (0, rest_1.response)(200, {
        description: 'Template model instance',
        content: {
            'application/json': {
                schema: {
                    type: 'object',
                },
            },
        },
    }),
    (0, tslib_1.__param)(0, rest_1.param.path.string('id')),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Object]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], TemplatesController.prototype, "getTemplate", null);
(0, tslib_1.__decorate)([
    (0, rest_1.patch)('/templates/{id}'),
    (0, rest_1.response)(200, {
        description: 'Template model instance',
        content: {
            'application/json': {
                schema: {
                    type: 'object',
                },
            },
        },
    }),
    (0, tslib_1.__param)(0, rest_1.param.path.string('id')),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Object]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], TemplatesController.prototype, "newSemester", null);
(0, tslib_1.__decorate)([
    (0, rest_1.put)('/templates'),
    (0, rest_1.response)(200, {
        description: 'Patch template',
    }),
    (0, tslib_1.__param)(0, (0, rest_1.requestBody)(template_1.updateTemplateRequestBody)),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Object]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], TemplatesController.prototype, "putTemplate", null);
(0, tslib_1.__decorate)([
    (0, rest_1.patch)('/templates/ispublic'),
    (0, rest_1.response)(200, {
        description: 'Patch template',
    }),
    (0, tslib_1.__param)(0, (0, rest_1.requestBody)(template_1.isPublicPatchRequestBody)),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Object]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], TemplatesController.prototype, "patchIsPublic", null);
(0, tslib_1.__decorate)([
    (0, rest_1.del)('/templates'),
    (0, rest_1.response)(200, {
        description: 'Delete subject from template'
    }),
    (0, tslib_1.__param)(0, (0, rest_1.requestBody)(template_1.putAndDeleteTemplateRequestBody)),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Object]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], TemplatesController.prototype, "deleteSubjectFromTemplate", null);
(0, tslib_1.__decorate)([
    (0, rest_1.post)('/templates/{id}'),
    (0, rest_1.response)(200, {
        description: 'delete Template model instance'
    }),
    (0, tslib_1.__param)(0, (0, rest_1.requestBody)(template_1.deleteTemplateBody)),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Object]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], TemplatesController.prototype, "deleteTemplate", null);
(0, tslib_1.__decorate)([
    (0, rest_1.post)('/templates/fav/'),
    (0, rest_1.response)(200, {
        description: 'delete Template model instance'
    }),
    (0, tslib_1.__param)(0, (0, rest_1.requestBody)(template_1.deleteTemplateBody)),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Object]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], TemplatesController.prototype, "deleteTemplateFromFave", null);
TemplatesController = (0, tslib_1.__decorate)([
    (0, tslib_1.__param)(0, (0, repository_1.repository)(repositories_1.TemplateRepository)),
    (0, tslib_1.__param)(1, (0, repository_1.repository)(repositories_1.UniversityRepository)),
    (0, tslib_1.__param)(2, (0, repository_1.repository)(repositories_1.UserDataRepository)),
    (0, tslib_1.__metadata)("design:paramtypes", [repositories_1.TemplateRepository,
        repositories_1.UniversityRepository,
        repositories_1.UserDataRepository])
], TemplatesController);
exports.TemplatesController = TemplatesController;
//# sourceMappingURL=templates.controller.js.map