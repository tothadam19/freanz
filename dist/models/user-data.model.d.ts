import { Entity } from '@loopback/repository';
export declare class UserInfoModel extends Entity {
    universityID?: string;
    facultyID?: string;
    majorID?: string;
    constructor(data?: Partial<UserInfoModel>);
}
export declare class UserData extends Entity {
    userID: string;
    username: string;
    salt: string;
    email: string;
    underLearning?: UserInfoModel;
    isProfilePublic?: boolean;
    userTemplates?: string[];
    savedPublicTemplates?: string[];
    lang?: string;
    constructor(data?: Partial<UserData>);
}
export interface UserDataRelations {
}
export declare type UserDataWithRelations = UserData & UserDataRelations;
