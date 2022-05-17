"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateTemplateRequestBody = exports.isPublicPatchRequestBody = exports.patchOnSubjectPositionSwappedRequestBody = exports.deleteTemplateBody = exports.putAndDeleteTemplateRequestBody = exports.NewTemplateRequestBody = void 0;
const newTemplateSchema = {
    type: 'object',
    required: ['templateName', 'universityID', 'facultyID', 'majorID', 'userId'],
    properties: {
        templateName: {
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
        userId: {
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
const putAndDeleteTemplateSchema = {
    type: 'object',
    required: ['templateID', 'semesterID', 'subjectID'],
    properties: {
        templateID: {
            type: 'string',
        },
        semesterID: {
            type: 'string',
        },
        subjectID: {
            type: 'string',
        },
    },
};
exports.putAndDeleteTemplateRequestBody = {
    description: 'The input of new template',
    required: true,
    content: {
        'application/json': { schema: putAndDeleteTemplateSchema },
    },
};
const deleteTemplateBodySchema = {
    type: 'object',
    required: ['templateId', 'userId'],
    properties: {
        templateId: {
            type: 'string',
        },
        userId: {
            type: 'string',
        },
    },
};
exports.deleteTemplateBody = {
    description: 'Delete template',
    required: true,
    content: {
        'application/json': { schema: deleteTemplateBodySchema },
    },
};
const patchOnSubjectPositionSwappedSchema = {
    type: 'object',
    required: ['templateID', 'toSwappedSemesterID', 'toSwappedSubjectID', 'whatSwappedSemesterID', 'whatSwappedSubjectID'],
    properties: {
        templateID: {
            type: 'string',
        },
        toSwappedSemesterID: {
            type: 'string',
        },
        toSwappedSubjectID: {
            type: 'string',
        },
        whatSwappedSemesterID: {
            type: 'string',
        },
        whatSwappedSubjectID: {
            type: 'string',
        },
    },
};
exports.patchOnSubjectPositionSwappedRequestBody = {
    description: 'The input of new template',
    required: true,
    content: {
        'application/json': { schema: patchOnSubjectPositionSwappedSchema },
    },
};
const isPublicPatchSchema = {
    type: 'object',
    required: ['templateID', 'userID'],
    properties: {
        templateID: {
            type: 'string',
        },
        userID: {
            type: 'string',
        },
    },
};
exports.isPublicPatchRequestBody = {
    description: 'The input of new template',
    required: true,
    content: {
        'application/json': { schema: isPublicPatchSchema },
    },
};
const updateTemplateSchema = {
    type: 'object',
    required: ['templateID', 'templateName', 'universityID', 'facultyID', 'majorID', 'userID', 'isPublic', 'semester'],
    properties: {
        templateID: {
            type: 'string',
        },
        templateName: {
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
        userID: {
            type: 'string',
        },
        isPublic: {
            type: 'boolean',
        },
        semester: {
            type: 'array',
            items: {
                type: 'object'
            }
        },
    },
};
exports.updateTemplateRequestBody = {
    description: 'The input of new template',
    required: true,
    content: {
        'application/json': { schema: updateTemplateSchema },
    },
};
//# sourceMappingURL=template.js.map