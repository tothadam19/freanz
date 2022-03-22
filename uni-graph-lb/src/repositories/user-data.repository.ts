import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongoDbDataSource} from '../datasources';
import {UserData, UserDataRelations, UserInfoModel} from '../models/user-data.model';

export class UserDataRepository extends DefaultCrudRepository<
  UserData,
  typeof UserData.prototype.username,
  UserDataRelations
> {
  constructor(
    @inject('datasources.mongoDB') dataSource: MongoDbDataSource,
  ) {
    super(UserData, dataSource);
  }

  async contructOnNewRegister(
    username: string | undefined,
    userID: string,
    email: string
  ): Promise<UserData> {
    return this.create(
      new UserData({
        userID: userID,
        username: username,
        email: email,
        isProfilePublic: false,
        userTemplates: [],
        savedPublicTemplates: [],
        lang: 'hu'
      })
    )
  }

  async getUserProfile(
    userID: string
  ): Promise<UserData | undefined> {
    try {
      return await this.findById(userID);
    } catch (error) {
      if (error.code === 'ENTITY_NOT_FOUND') {
        return undefined;
      }
      throw error;
    }
  }

  async getPublicUserProfile(
    userID: string
  ): Promise<UserData | string> {
    try {
      const user = await this.findById(userID);
      if (user.isProfilePublic === true) return user;
      return 'Profile is not public';
    } catch (error) {
      if (error.code === 'ENTITY_NOT_FOUND') {
        return 'User by the given ID not found';
      }
      throw error;
    }
  }

  async getUserTemplates(
    userID: string
  ): Promise<object | string> {
    try {
      const user = await this.findById(userID);
      if (user.userTemplates === undefined || user.savedPublicTemplates === undefined) return 'Unexcepted error: arrays are undefined';
      return {
        ownedTemplates: user.userTemplates,
        savedPublicTemplates: user.savedPublicTemplates
      }
    } catch (error) {
      if (error.code === 'ENTITY_NOT_FOUND') {
        return 'User by the given ID not found';
      }
      throw error;
    }
  }

  async patchNewTemplate(
    userID: string,
    templateID: string
  ): Promise<void> {
    try {
      const user = await this.findById(userID);
      user.userTemplates?.push(templateID);
      return  await this.replaceById(userID, user);
    } catch (error) {
      if (error.code === 'ENTITY_NOT_FOUND') {
        return;
      }
      throw error;
    }
  }

  async patchAddTemplate(
    userID: string,
    templateID: string
  ): Promise<void> {
    try {
      const user = await this.findById(userID);
      user.savedPublicTemplates?.push(templateID);
      return  await this.replaceById(userID, user);
    } catch (error) {
      if (error.code === 'ENTITY_NOT_FOUND') {
        return;
      }
      throw error;
    }
  }

  async deleteTemplate(
    userID: string,
    templateID: string
  ): Promise<string | void> {
    try {
      const user = await this.findById(userID);
      if (user.userTemplates === undefined) return 'Unexcepted error: array is undefined'
      const index = user.userTemplates.findIndex(currentTemplate => currentTemplate = templateID);
      if (index === -1) return 'Unexcepted error: template by ID not found';
      user.userTemplates.splice(index, 1);
      return await this.replaceById(userID, user);
    } catch (error) {
      if (error.code === 'ENTITY_NOT_FOUND') {
        return 'User by the given ID not found';
      }
      throw error;
    }
  }

  async removePublicTemplate(
    userID: string,
    templateID: string
  ): Promise<string | void> {
    try {
      const user = await this.findById(userID);
      if (user.savedPublicTemplates === undefined) return 'Unexcepted error: array is undefined'
      const index = user.savedPublicTemplates.findIndex(currentTemplate => currentTemplate = templateID);
      if (index === -1) return 'Unexcepted error: template by ID not found';
      user.savedPublicTemplates.splice(index, 1);
      return await this.replaceById(userID, user);
    } catch (error) {
      if (error.code === 'ENTITY_NOT_FOUND') {
        return 'User by the given ID not found';
      }
      throw error;
    }
  }

  async getLang(
    userID: string
  ): Promise<string> {
    try {
      const user = await this.findById(userID);
      if (user.lang === undefined) return 'Unexcepted error - lang does not exists';
      return user.lang;
    } catch (error) {
      if (error.code === 'ENTITY_NOT_FOUND') {
        return 'User by the given ID not found';
      }
      throw error;
    }
  }

  async triggerPublicitySwap(
    userID: string
  ): Promise<void> {
    try {
      const user = await this.findById(userID);
      if (user.isProfilePublic === true) user.isProfilePublic = false;
      else user.isProfilePublic = true;
      return await this.replaceById(userID, user);
    } catch (error) {
      if (error.code === 'ENTITY_NOT_FOUND') {
        return;
      }
      throw error;
    }
  }

  async putUserUnderLearningData(
    userID: string,
    universityID: string,
    facultyID: string,
    majorID: string
  ): Promise<void | string> {
    try {
      const user = await this.findById(userID);
      user.underLearning = new UserInfoModel({
        universityID: universityID,
        facultyID: facultyID,
        majorID: majorID
      });
      return await this.replaceById(userID, user);
    } catch (error) {
      if (error.code === 'ENTITY_NOT_FOUND') {
        return 'User by the given ID not found';
      }
      throw error;
    }
  }

  async getMail(
    username: string
  ): Promise<UserData | null> {
    return this.findOne({where: {username: username}});
  }

  async usernameUniqueTest(
    username: string
  ): Promise<UserData | null> {
    return this.findOne({where: {username: username}});
  }
}
