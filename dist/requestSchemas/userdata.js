"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.underLearningRequestBody = exports.templateRequestBody = exports.userIDRequestBody = void 0;
const userIDSchema = {
    type: 'object',
    required: ['userID'],
    properties: {
        userID: {
            type: 'string',
        },
    },
};
exports.userIDRequestBody = {
    description: 'The input of new template',
    required: true,
    content: {
        'application/json': { schema: userIDSchema },
    },
};
const templateSchema = {
    type: 'object',
    required: ['userID', 'templateID'],
    properties: {
        userID: {
            type: 'string',
        },
        templateID: {
            type: 'string',
        },
    },
};
exports.templateRequestBody = {
    description: 'The input of new template',
    required: true,
    content: {
        'application/json': { schema: templateSchema },
    },
};
const underLearningSchema = {
    type: 'object',
    required: ['userID', 'universityID', 'facultyID', 'majorID'],
    properties: {
        userID: {
            type: 'string',
        },
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
exports.underLearningRequestBody = {
    description: 'The input of new template',
    required: true,
    content: {
        'application/json': { schema: underLearningSchema },
    },
};
//# sourceMappingURL=userdata.js.map