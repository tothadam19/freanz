"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.patchRatingsRequestBody = exports.patchCommentsRequestBody = exports.getCommentsAndRatingsRequestBody = void 0;
const getCommentsAndRatingsSchema = {
    type: 'object',
    required: ['detailID'],
    properties: {
        detailID: {
            type: 'string',
        },
    },
};
exports.getCommentsAndRatingsRequestBody = {
    description: 'The input of new template',
    required: true,
    content: {
        'application/json': { schema: getCommentsAndRatingsSchema },
    },
};
const patchCommentsSchema = {
    type: 'object',
    required: ['detailID', 'content', 'date', 'byUserID'],
    properties: {
        detailID: {
            type: 'string',
        },
        content: {
            type: 'string',
        },
        date: {
            type: 'string',
        },
        byUserID: {
            type: 'string',
        },
    },
};
exports.patchCommentsRequestBody = {
    description: 'The input of new template',
    required: true,
    content: {
        'application/json': { schema: patchCommentsSchema },
    },
};
const patchRatingsSchema = {
    type: 'object',
    required: ['detailID', 'difficultyLevel', 'interestLevel', 'practicalLevel'],
    properties: {
        detailID: {
            type: 'string',
        },
        difficultyLevel: {
            type: 'number',
        },
        interestLevel: {
            type: 'number',
        },
        practicalLevel: {
            type: 'number',
        },
    },
};
exports.patchRatingsRequestBody = {
    description: 'The input of new template',
    required: true,
    content: {
        'application/json': { schema: patchRatingsSchema },
    },
};
//# sourceMappingURL=subjectDetail.js.map