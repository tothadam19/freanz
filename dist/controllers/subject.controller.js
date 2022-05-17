"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubjectController = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const repositories_1 = require("../repositories");
const subject_1 = require("../requestSchemas/subject");
let SubjectController = class SubjectController {
    constructor(subjectRepository, templateRepository, subjectDetailsRepository) {
        this.subjectRepository = subjectRepository;
        this.templateRepository = templateRepository;
        this.subjectDetailsRepository = subjectDetailsRepository;
    }
    async create(newSubject) {
        try {
            const subjectDetailsID = await this.subjectDetailsRepository.constructModellOnSubjectCreated();
            return await this.subjectRepository.createNewSubject(newSubject.universityID, newSubject.neptunCode, newSubject.subjectName, newSubject.esubjectName, newSubject.kreditNum, newSubject.prerequisiteSubjectIDs, newSubject.builtOnSubjectIDs, subjectDetailsID);
        }
        catch (error) {
            if (error.code === 'ENTITY_NOT_FOUND')
                return 'Unexpected error: Template not found by the given ID';
            return error;
        }
    }
    async searchByQuerry(query) {
        return this.subjectRepository.searchSubject(query.param, query.universityID);
    }
    async getAllSubjectsByIDs(query) {
        return this.subjectRepository.getAllSubjectsByIDs(query.array);
    }
    async getTemplate(id) {
        return this.subjectRepository.getSubject(id);
    }
};
(0, tslib_1.__decorate)([
    (0, rest_1.post)('/subjects'),
    (0, rest_1.response)(200, {
        description: 'Create new template',
    }),
    (0, tslib_1.__param)(0, (0, rest_1.requestBody)(subject_1.newSubjectRequestBody)),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Object]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], SubjectController.prototype, "create", null);
(0, tslib_1.__decorate)([
    (0, rest_1.patch)('/subjects'),
    (0, rest_1.response)(200, {
        description: 'Create new template',
    }),
    (0, tslib_1.__param)(0, (0, rest_1.requestBody)(subject_1.searchQueryRequestBody)),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Object]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], SubjectController.prototype, "searchByQuerry", null);
(0, tslib_1.__decorate)([
    (0, rest_1.post)('/subjects/arr'),
    (0, rest_1.response)(200, {
        description: 'Query subjects',
    }),
    (0, tslib_1.__param)(0, (0, rest_1.requestBody)(subject_1.searchByIDQueryRequestBody)),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Object]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], SubjectController.prototype, "getAllSubjectsByIDs", null);
(0, tslib_1.__decorate)([
    (0, rest_1.get)('/subjects/{id}'),
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
], SubjectController.prototype, "getTemplate", null);
SubjectController = (0, tslib_1.__decorate)([
    (0, tslib_1.__param)(0, (0, repository_1.repository)(repositories_1.SubjectRepository)),
    (0, tslib_1.__param)(1, (0, repository_1.repository)(repositories_1.TemplateRepository)),
    (0, tslib_1.__param)(2, (0, repository_1.repository)(repositories_1.SubjectDetailsRepository)),
    (0, tslib_1.__metadata)("design:paramtypes", [repositories_1.SubjectRepository,
        repositories_1.TemplateRepository,
        repositories_1.SubjectDetailsRepository])
], SubjectController);
exports.SubjectController = SubjectController;
//# sourceMappingURL=subject.controller.js.map