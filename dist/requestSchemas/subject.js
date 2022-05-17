"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchByIDQueryRequestBody = exports.searchQueryRequestBody = exports.newSubjectRequestBody = void 0;
const newSubjectSchema = {
    type: 'object',
    required: ['universityID', 'neptunCode', 'subjectName', 'esubjectName', 'kreditNum', 'prerequisiteSubjectIDs', 'builtOnSubjectIDs'],
    properties: {
        universityID: {
            type: 'string',
        },
        neptunCode: {
            type: 'string',
        },
        subjectName: {
            type: 'string',
        },
        esubjectName: {
            type: 'string',
        },
        kreditNum: {
            type: 'number',
        },
        prerequisiteSubjectIDs: {
            type: 'array',
            items: {
                type: 'string'
            }
        },
        builtOnSubjectIDs: {
            type: 'array',
            items: {
                type: 'string'
            }
        },
    },
};
exports.newSubjectRequestBody = {
    description: 'The input of new template',
    required: true,
    content: {
        'application/json': { schema: newSubjectSchema },
    },
};
const searchQuerySchema = {
    type: 'object',
    required: ['param', 'universityID'],
    properties: {
        param: {
            type: 'string',
        },
        universityID: {
            type: 'string',
        },
    },
};
exports.searchQueryRequestBody = {
    description: 'The input of new template',
    required: true,
    content: {
        'application/json': { schema: searchQuerySchema },
    },
};
const searchByIDQuerySchema = {
    type: 'object',
    required: ['array'],
    properties: {
        array: {
            type: 'array',
            items: {
                type: 'string'
            }
        },
    },
};
exports.searchByIDQueryRequestBody = {
    description: 'The input of new template',
    required: true,
    content: {
        'application/json': { schema: searchByIDQuerySchema },
    },
};
//# sourceMappingURL=subject.js.map