"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UniversitiesController = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const models_1 = require("../models");
const repositories_1 = require("../repositories");
const university_1 = require("../requestSchemas/university");
//@authenticate('jwt')
let UniversitiesController = class UniversitiesController {
    constructor(universityRepository) {
        this.universityRepository = universityRepository;
    }
    async create(university) {
        return this.universityRepository.createNewUniversity(university.universityName);
    }
    async searchUnis(search) {
        return this.universityRepository.searchUnis(search.searchParam);
    }
    async gethUnis() {
        return this.universityRepository.getUnis();
    }
    async getFaculties(getFaculty) {
        return this.universityRepository.getFaculties(getFaculty.universityID);
    }
    async getMajors(getMajor) {
        return this.universityRepository.getMajors(getMajor.universityID, getMajor.facultyID);
    }
    async getTemplates(getTemplate) {
        return this.universityRepository.getTemplates(getTemplate.universityID, getTemplate.facultyID, getTemplate.majorID);
    }
    async addNewFaculty(newFaculty) {
        await this.universityRepository.addNewFaculty(newFaculty.universityID, newFaculty.newFacultyName);
    }
    async addNewMajor(newMajor) {
        await this.universityRepository.addNewMajor(newMajor.universityID, newMajor.facultyID, newMajor.newMajorName);
    }
    async addNewTemplate(newTemplate) {
        await this.universityRepository.addNewTemplate(newTemplate.universityID, newTemplate.facultyID, newTemplate.majorID, newTemplate.newTemplateID);
    }
};
(0, tslib_1.__decorate)([
    (0, rest_1.post)('/universities'),
    (0, rest_1.response)(200, {
        description: 'University model instance',
        content: { 'application/json': { schema: (0, rest_1.getModelSchemaRef)(models_1.University) } },
    }),
    (0, tslib_1.__param)(0, (0, rest_1.requestBody)(university_1.newUniversityRequestBody)),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Object]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], UniversitiesController.prototype, "create", null);
(0, tslib_1.__decorate)([
    (0, rest_1.patch)('/universities'),
    (0, rest_1.response)(200, {
        description: 'List of by regex',
        content: {
            'application/json': {
                schema: {
                    type: 'array',
                },
            },
        },
    }),
    (0, tslib_1.__param)(0, (0, rest_1.requestBody)(university_1.searchUniversityRequestBody)),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Object]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], UniversitiesController.prototype, "searchUnis", null);
(0, tslib_1.__decorate)([
    (0, rest_1.get)('/universities'),
    (0, rest_1.response)(200, {
        description: 'List of unis',
        content: {
            'application/json': {
                schema: {
                    type: 'array',
                },
            },
        },
    }),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", []),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], UniversitiesController.prototype, "gethUnis", null);
(0, tslib_1.__decorate)([
    (0, rest_1.post)('/universities/faculty'),
    (0, rest_1.response)(200, {
        description: 'List of faculties to one uni',
        content: {
            'application/json': {
                schema: {
                    type: 'array',
                },
            },
        },
    }),
    (0, tslib_1.__param)(0, (0, rest_1.requestBody)(university_1.getFacultiesRequestBody)),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Object]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], UniversitiesController.prototype, "getFaculties", null);
(0, tslib_1.__decorate)([
    (0, rest_1.post)('/universities/faculty/major'),
    (0, rest_1.response)(200, {
        description: 'List of majors to one faculty',
        content: {
            'application/json': {
                schema: {
                    type: 'array',
                },
            },
        },
    }),
    (0, tslib_1.__param)(0, (0, rest_1.requestBody)(university_1.getMajorsRequestBody)),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Object]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], UniversitiesController.prototype, "getMajors", null);
(0, tslib_1.__decorate)([
    (0, rest_1.post)('/universities/faculty/major/template'),
    (0, rest_1.response)(200, {
        description: 'List of templates to one major',
        content: {
            'application/json': {
                schema: {
                    type: 'array',
                },
            },
        },
    }),
    (0, tslib_1.__param)(0, (0, rest_1.requestBody)(university_1.getTemplatesRequestBody)),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Object]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], UniversitiesController.prototype, "getTemplates", null);
(0, tslib_1.__decorate)([
    (0, rest_1.put)('/universities/faculty'),
    (0, rest_1.response)(204, {
        description: 'University PUT success',
    }),
    (0, tslib_1.__param)(0, (0, rest_1.requestBody)(university_1.NewFacultyRequestBody)),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Object]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], UniversitiesController.prototype, "addNewFaculty", null);
(0, tslib_1.__decorate)([
    (0, rest_1.put)('/universities/faculty/major'),
    (0, rest_1.response)(204, {
        description: 'University PUT success',
    }),
    (0, tslib_1.__param)(0, (0, rest_1.requestBody)(university_1.NewMajorRequestBody)),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Object]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], UniversitiesController.prototype, "addNewMajor", null);
(0, tslib_1.__decorate)([
    (0, rest_1.put)('/universities/faculty/major/template'),
    (0, rest_1.response)(204, {
        description: 'University PUT success',
    }),
    (0, tslib_1.__param)(0, (0, rest_1.requestBody)(university_1.NewTemplateRequestBody)),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Object]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], UniversitiesController.prototype, "addNewTemplate", null);
UniversitiesController = (0, tslib_1.__decorate)([
    (0, tslib_1.__param)(0, (0, repository_1.repository)(repositories_1.UniversityRepository)),
    (0, tslib_1.__metadata)("design:paramtypes", [repositories_1.UniversityRepository])
], UniversitiesController);
exports.UniversitiesController = UniversitiesController;
//# sourceMappingURL=universities.controller.js.map