"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const tslib_1 = require("tslib");
const authentication_1 = require("@loopback/authentication");
const authentication_jwt_1 = require("@loopback/authentication-jwt");
const core_1 = require("@loopback/core");
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const security_1 = require("@loopback/security");
const bcryptjs_1 = require("bcryptjs");
const lodash_1 = (0, tslib_1.__importDefault)(require("lodash"));
const repositories_1 = require("../repositories");
const user_1 = require("../requestSchemas/user");
const salt_gen_1 = require("../services/salt_gen");
let UserController = class UserController {
    constructor(jwtService, userService, user, userRepository, userDataRepository) {
        this.jwtService = jwtService;
        this.userService = userService;
        this.user = user;
        this.userRepository = userRepository;
        this.userDataRepository = userDataRepository;
    }
    async login(credentials) {
        // ensure the user exists, and the password is correct
        const user = await this.getUserFromRequestBodyParams(credentials.email, credentials.username, credentials.password);
        if (typeof user === 'string')
            return user;
        // convert a User object into a UserProfile object (reduced set of properties)
        const userProfile = this.userService.convertToUserProfile(user);
        // create a JSON Web Token based on the user profile
        const token = await this.jwtService.generateToken(userProfile);
        return { token };
    }
    async whoAmI(currentUserProfile) {
        return currentUserProfile[security_1.securityId];
    }
    async changePassword(credentials) {
        const user = await this.userDataRepository.getMail(credentials.username);
        if (user === null)
            return 'username not found';
        if ((user === null || user === void 0 ? void 0 : user.email) === undefined)
            return 'Unexcepted error';
        try {
            const userProfile = await this.userService.verifyCredentials({
                email: user === null || user === void 0 ? void 0 : user.email,
                password: credentials.password + user.salt
            });
            //credentials OK if error was not thrown
            const password = await (0, bcryptjs_1.hash)(credentials.newPassword + user.salt, 0);
            await this.userRepository.userCredentials(userProfile.id).patch({ password });
            return "Password changed";
        }
        catch (error) {
            console.log(error);
            return "Credentials missmatch";
        }
    }
    async signUp(register) {
        const uniqueUsernameTest = await this.userDataRepository.usernameUniqueTest(register.username);
        if (uniqueUsernameTest !== null)
            return 'This username is already in use';
        const newSalt = (0, salt_gen_1.genSalt)();
        const password = await (0, bcryptjs_1.hash)(register.password + newSalt, 0);
        const savedUser = await this.userRepository.create(lodash_1.default.omit(register, 'password'));
        await this.userRepository.userCredentials(savedUser.id).create({ password });
        return this.userDataRepository.contructOnNewRegister(savedUser.username, savedUser.id, savedUser.email, newSalt);
    }
    async getUserFromRequestBodyParams(email, username, password) {
        if (email === undefined) {
            const user = await this.userDataRepository.getMail(username);
            if (user === null)
                return 'username not found';
            if ((user === null || user === void 0 ? void 0 : user.email) === undefined)
                return 'Unexcepted error';
            return this.userService.verifyCredentials({
                email: user === null || user === void 0 ? void 0 : user.email,
                password: password + user.salt
            });
        }
        return this.userService.verifyCredentials({
            email: email,
            password: password + await this.userDataRepository.getUserSalt(email)
        });
    }
};
(0, tslib_1.__decorate)([
    (0, rest_1.post)('/users/login', {
        responses: {
            '200': {
                description: 'Token',
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            properties: {
                                token: {
                                    type: 'string',
                                },
                            },
                        },
                    },
                },
            },
        },
    }),
    (0, tslib_1.__param)(0, (0, rest_1.requestBody)(user_1.loginRequestBody)),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Object]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], UserController.prototype, "login", null);
(0, tslib_1.__decorate)([
    (0, authentication_1.authenticate)('jwt'),
    (0, rest_1.get)('/whoAmI', {
        responses: {
            '200': {
                description: 'Return current user',
                content: {
                    'application/json': {
                        schema: {
                            type: 'string',
                        },
                    },
                },
            },
        },
    }),
    (0, tslib_1.__param)(0, (0, core_1.inject)(security_1.SecurityBindings.USER)),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Object]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], UserController.prototype, "whoAmI", null);
(0, tslib_1.__decorate)([
    (0, authentication_1.authenticate)('jwt'),
    (0, rest_1.patch)('/users/changePassword', {
        responses: {
            '200': {
                description: 'change pw',
            },
        },
    }),
    (0, tslib_1.__param)(0, (0, rest_1.requestBody)(user_1.changePasswordRequestBody)),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Object]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], UserController.prototype, "changePassword", null);
(0, tslib_1.__decorate)([
    (0, rest_1.post)('/signup', {
        responses: {
            '200': {
                description: 'User',
                content: {
                    'application/json': {
                        schema: {
                            'x-ts-type': authentication_jwt_1.User,
                        },
                    },
                },
            },
        },
    }),
    (0, tslib_1.__param)(0, (0, rest_1.requestBody)(user_1.registerRequestBody)),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Object]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], UserController.prototype, "signUp", null);
UserController = (0, tslib_1.__decorate)([
    (0, tslib_1.__param)(0, (0, core_1.inject)(authentication_jwt_1.TokenServiceBindings.TOKEN_SERVICE)),
    (0, tslib_1.__param)(1, (0, core_1.inject)(authentication_jwt_1.UserServiceBindings.USER_SERVICE)),
    (0, tslib_1.__param)(2, (0, core_1.inject)(security_1.SecurityBindings.USER, { optional: true })),
    (0, tslib_1.__param)(3, (0, repository_1.repository)(authentication_jwt_1.UserRepository)),
    (0, tslib_1.__param)(4, (0, repository_1.repository)(repositories_1.UserDataRepository)),
    (0, tslib_1.__metadata)("design:paramtypes", [Object, authentication_jwt_1.MyUserService, Object, authentication_jwt_1.UserRepository,
        repositories_1.UserDataRepository])
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map