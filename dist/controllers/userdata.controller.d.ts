import { UserData } from '../models/user-data.model';
import { UserDataRepository } from '../repositories';
export declare class UserdataController {
    userDataRepository: UserDataRepository;
    constructor(userDataRepository: UserDataRepository);
    getProfile(id: {
        'userID': string;
    }): Promise<UserData | undefined>;
    getPublicProfile(id: typeof UserData.prototype.userID): Promise<UserData | string>;
    getProfileTemplates(id: typeof UserData.prototype.userID): Promise<object | string>;
    getLang(id: {
        'userID': string;
    }): Promise<string | undefined>;
    publicitySwap(id: {
        'userID': string;
    }): Promise<void | undefined>;
    deleteTemplate(ids: {
        'userID': string;
        'templateID': string;
    }): Promise<void | string>;
    removeTemplate(ids: {
        'userID': string;
        'templateID': string;
    }): Promise<void | string>;
    patchAddTemplate(ids: {
        'userID': string;
        'templateID': string;
    }): Promise<void | string>;
    patchSaveTemplate(ids: {
        'userID': string;
        'templateID': string;
    }): Promise<void | string>;
    putUserInfo(ids: {
        'userID': string;
        'universityID': string;
        'facultyID': string;
        'majorID': string;
    }): Promise<void | string>;
}
