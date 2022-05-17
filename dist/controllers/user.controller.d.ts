import { TokenService } from '@loopback/authentication';
import { MyUserService, User, UserRepository } from '@loopback/authentication-jwt';
import { UserProfile } from '@loopback/security';
import { UserData } from '../models/user-data.model';
import { UserDataRepository } from '../repositories';
export declare class UserController {
    jwtService: TokenService;
    userService: MyUserService;
    user: UserProfile;
    protected userRepository: UserRepository;
    userDataRepository: UserDataRepository;
    constructor(jwtService: TokenService, userService: MyUserService, user: UserProfile, userRepository: UserRepository, userDataRepository: UserDataRepository);
    login(credentials: {
        'email': string;
        'username': string;
        'password': string;
    }): Promise<{
        token: string;
    } | string>;
    whoAmI(currentUserProfile: UserProfile): Promise<string>;
    changePassword(credentials: {
        'newPassword': string;
        'username': string;
        'password': string;
    }): Promise<string>;
    signUp(register: {
        'email': string;
        'username': string;
        'password': string;
    }): Promise<UserData | string>;
    getUserFromRequestBodyParams(email: string, username: string, password: string): Promise<User | string>;
}
