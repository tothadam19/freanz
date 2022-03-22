import {authenticate, TokenService} from '@loopback/authentication';
import {
  MyUserService,
  TokenServiceBindings,
  User,
  UserRepository,
  UserServiceBindings
} from '@loopback/authentication-jwt';
import {inject} from '@loopback/core';
import {repository} from '@loopback/repository';
import {
  get, post,
  requestBody
} from '@loopback/rest';
import {SecurityBindings, securityId, UserProfile} from '@loopback/security';
import {genSalt, hash} from 'bcryptjs';
import _ from 'lodash';
import {UserDataRepository} from '../repositories';
import {loginRequestBody, registerRequestBody} from '../requestSchemas/user';

export class UserController {
  constructor(
    @inject(TokenServiceBindings.TOKEN_SERVICE)
    public jwtService: TokenService,
    @inject(UserServiceBindings.USER_SERVICE)
    public userService: MyUserService,
    @inject(SecurityBindings.USER, {optional: true})
    public user: UserProfile,
    @repository(UserRepository) protected userRepository: UserRepository,
    @repository(UserDataRepository) public userDataRepository: UserDataRepository,
  ) {}

  @post('/users/login', {
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
  })
  async login(
    @requestBody(loginRequestBody) credentials: {'email': string, 'username': string, 'password': string},
  ): Promise<{token: string} | string> {
    // ensure the user exists, and the password is correct
    const user = await this.getUserFromRequestBodyParams(credentials.email, credentials.username, credentials.password);
    if (typeof user === 'string') return user;
    // convert a User object into a UserProfile object (reduced set of properties)
    const userProfile = this.userService.convertToUserProfile(user);

    // create a JSON Web Token based on the user profile
    const token = await this.jwtService.generateToken(userProfile);
    return {token};
  }

  @authenticate('jwt')
  @get('/whoAmI', {
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
  })
  async whoAmI(
    @inject(SecurityBindings.USER)
    currentUserProfile: UserProfile,
  ): Promise<string> {
    return currentUserProfile[securityId];
  }

  @post('/signup', {
    responses: {
      '200': {
        description: 'User',
        content: {
          'application/json': {
            schema: {
              'x-ts-type': User,
            },
          },
        },
      },
    },
  })
  async signUp(
    @requestBody(registerRequestBody) register: {'email': string, 'username': string, 'password': string},
  ): Promise<User | string> {
    const uniqueUsernameTest = await this.userDataRepository.usernameUniqueTest(register.username);
    if (uniqueUsernameTest !== null) return 'This username is already in use';
    const password = await hash(register.password, await genSalt());
    const savedUser = await this.userRepository.create(
      _.omit(register, 'password'),
    );
    await this.userRepository.userCredentials(savedUser.id).create({password});
    await this.userDataRepository.contructOnNewRegister(savedUser.username, savedUser.id, savedUser.email);
    return savedUser;
  }


  async getUserFromRequestBodyParams(
    email: string,
    username: string,
    password: string
  ): Promise<User | string>{
    if (email === undefined) {
      const user = await this.userDataRepository.getMail(username);
      if (user === null) return 'username not found';
      if (user?.email === undefined) return 'Unexcepted error'
      return this.userService.verifyCredentials({
        email: user?.email,
        password: password
      })
    }
    return this.userService.verifyCredentials({
      email: email,
      password: password
    })
  }
}
