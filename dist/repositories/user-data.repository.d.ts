import { DefaultCrudRepository } from '@loopback/repository';
import { MongoDbDataSource } from '../datasources';
import { UserData, UserDataRelations } from '../models/user-data.model';
export declare class UserDataRepository extends DefaultCrudRepository<UserData, typeof UserData.prototype.username, UserDataRelations> {
    constructor(dataSource: MongoDbDataSource);
    contructOnNewRegister(username: string | undefined, userID: string, email: string, userSalt: string): Promise<UserData>;
    getUserProfile(userID: string): Promise<UserData | undefined>;
    getPublicUserProfile(userID: string): Promise<UserData | string>;
    getUserTemplates(userID: string): Promise<object | string>;
    patchNewTemplate(userID: string, templateID: string): Promise<void>;
    patchAddTemplate(userID: string, templateID: string): Promise<void>;
    deleteTemplate(userID: string, templateID: string): Promise<string | void>;
    deleteTemplateFromSaved(userID: string, templateID: string): Promise<string | void>;
    removePublicTemplate(userID: string, templateID: string): Promise<string | void>;
    getLang(userID: string): Promise<string>;
    triggerPublicitySwap(userID: string): Promise<void>;
    putUserUnderLearningData(userID: string, universityID: string, facultyID: string, majorID: string): Promise<void | string>;
    getMail(username: string): Promise<UserData | null>;
    usernameUniqueTest(username: string): Promise<UserData | null>;
    getUserSalt(mail: string): Promise<string | undefined>;
}
