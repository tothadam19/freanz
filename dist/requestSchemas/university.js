"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTemplatesRequestBody = exports.getMajorsRequestBody = exports.getFacultiesRequestBody = exports.searchUniversityRequestBody = exports.newUniversityRequestBody = exports.NewTemplateRequestBody = exports.NewMajorRequestBody = exports.NewFacultyRequestBody = exports.newFacultySchema = void 0;
//universityId: number, newFacultyName: string
exports.newFacultySchema = {
    type: 'object',
    required: ['universityID', 'newFacultyName'],
    properties: {
        universityID: {
            type: 'string',
        },
        newFacultyName: {
            type: 'string',
        },
    },
};
exports.NewFacultyRequestBody = {
    description: 'The input of new faculty',
    required: true,
    content: {
        'application/json': { schema: exports.newFacultySchema },
    },
};
//universityId: number, facultyNameOfMajor: string, newMajorName: string,
const newMajorSchema = {
    type: 'object',
    required: ['universityID', 'facultyID', 'newMajorName'],
    properties: {
        universityID: {
            type: 'string',
        },
        facultyID: {
            type: 'string',
        },
        newMajorName: {
            type: 'string',
        },
    },
};
exports.NewMajorRequestBody = {
    description: 'The input of new major',
    required: true,
    content: {
        'application/json': { schema: newMajorSchema },
    },
};
//universityId: number, majorNameOfTemplate: string, newTemplateID: string
const newTemplateSchema = {
    type: 'object',
    required: ['universityID', 'facultyID', 'majorID', 'newTemplateID'],
    properties: {
        universityID: {
            type: 'string',
        },
        facultyID: {
            type: 'string',
        },
        majorID: {
            type: 'string',
        },
        newTemplateID: {
            type: 'string',
        },
    },
};
exports.NewTemplateRequestBody = {
    description: 'The input of new template',
    required: true,
    content: {
        'application/json': { schema: newTemplateSchema },
    },
};
const newUniversitySchema = {
    type: 'object',
    required: ['universityName'],
    properties: {
        universityName: {
            type: 'string',
        },
    },
};
exports.newUniversityRequestBody = {
    description: 'The input of new university',
    required: true,
    content: {
        'application/json': { schema: newUniversitySchema },
    },
};
const searchUniversitySchema = {
    type: 'object',
    required: ['searchParam'],
    properties: {
        searchParam: {
            type: 'string',
        },
    },
};
exports.searchUniversityRequestBody = {
    description: 'The input of new university',
    required: true,
    content: {
        'application/json': { schema: searchUniversitySchema },
    },
};
const getFacultiesSchema = {
    type: 'object',
    required: ['universityID'],
    properties: {
        universityID: {
            type: 'string',
        },
    },
};
exports.getFacultiesRequestBody = {
    description: 'The input of faculties getter',
    required: true,
    content: {
        'application/json': { schema: getFacultiesSchema },
    },
};
const getMajorsSchema = {
    type: 'object',
    required: ['universityID', 'facultyID'],
    properties: {
        universityID: {
            type: 'string',
        },
        facultyID: {
            type: 'string',
        },
    },
};
exports.getMajorsRequestBody = {
    description: 'The input of faculties getter',
    required: true,
    content: {
        'application/json': { schema: getMajorsSchema },
    },
};
const getTemplatesSchema = {
    type: 'object',
    required: ['universityID', 'facultyID', 'majorID'],
    properties: {
        universityID: {
            type: 'string',
        },
        facultyID: {
            type: 'string',
        },
        majorID: {
            type: 'string',
        },
    },
};
exports.getTemplatesRequestBody = {
    description: 'The input of faculties getter',
    required: true,
    content: {
        'application/json': { schema: getTemplatesSchema },
    },
};
//# sourceMappingURL=university.js.map