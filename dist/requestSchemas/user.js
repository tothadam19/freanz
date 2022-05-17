"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logoutRequestBody = exports.loginRequestBody = exports.changePasswordRequestBody = exports.registerRequestBody = void 0;
const registerSchema = {
    type: 'object',
    required: ['email', 'username', 'password'],
    properties: {
        email: {
            type: 'string',
        },
        username: {
            type: 'string',
        },
        password: {
            type: 'string',
        },
    },
};
exports.registerRequestBody = {
    description: 'The input of new template',
    required: true,
    content: {
        'application/json': { schema: registerSchema },
    },
};
const changePasswordRequestBodyschema = {
    type: 'object',
    required: ['newPassword', 'username', 'password'],
    properties: {
        newPassword: {
            type: 'string',
        },
        username: {
            type: 'string',
        },
        password: {
            type: 'string',
        },
    },
};
exports.changePasswordRequestBody = {
    description: 'The input of new template',
    required: true,
    content: {
        'application/json': { schema: changePasswordRequestBodyschema },
    },
};
const loginSchema = {
    type: 'object',
    required: ['password'],
    properties: {
        email: {
            type: 'string',
        },
        username: {
            type: 'string',
        },
        password: {
            type: 'string',
        },
    },
};
exports.loginRequestBody = {
    description: 'The input of new template',
    required: true,
    content: {
        'application/json': { schema: loginSchema },
    },
};
const logoutSchema = {
    type: 'object',
    required: ['jwt'],
    properties: {
        jwt: {
            type: 'string',
        }
    },
};
exports.logoutRequestBody = {
    description: 'The input of new template',
    required: true,
    content: {
        'application/json': { schema: logoutSchema },
    },
};
//# sourceMappingURL=user.js.map