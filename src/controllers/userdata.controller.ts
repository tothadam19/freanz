// Uncomment these imports to begin using these cool features!

import {repository} from '@loopback/repository';
import {del, get, param, patch, post, put, requestBody, response} from '@loopback/rest';
import {UserData} from '../models/user-data.model';
import {UserDataRepository} from '../repositories';
import {templateRequestBody, underLearningRequestBody, userIDRequestBody} from '../requestSchemas/userdata';

// import {inject} from '@loopback/core';


export class UserdataController {
  constructor(
    @repository(UserDataRepository)
    public userDataRepository: UserDataRepository
  ) {}

  @post('/profile')
  @response(200, {
    description: 'Create new template',
  })
  async getProfile(
    @requestBody(userIDRequestBody) id: {'userID': string}
  ): Promise<UserData | undefined> {
    return this.userDataRepository.getUserProfile(id.userID);
  }

  @get('/profile/{id}')
  @response(200, {
    description: 'Template model instance',
  })
  async getPublicProfile(
    @param.path.string('id') id: typeof UserData.prototype.userID
  ): Promise<UserData | string> {
    return this.userDataRepository.getPublicUserProfile(id);
  }

  @get('/profile/{id}/templates')
  @response(200, {
    description: 'Template model instance',
  })
  async getProfileTemplates(
    @param.path.string('id') id: typeof UserData.prototype.userID
  ): Promise<object | string> {
    return this.userDataRepository.getUserTemplates(id);
  }

  @post('/profile/lang')
  @response(200, {
    description: 'Create new template',
  })
  async getLang(
    @requestBody(userIDRequestBody) id: {'userID': string}
  ): Promise<string | undefined> {
    return this.userDataRepository.getLang(id.userID);
  }

  @post('/profile/public')
  @response(200, {
    description: 'Create new template',
  })
  async publicitySwap(
    @requestBody(userIDRequestBody) id: {'userID': string}
  ): Promise<void| undefined> {
    return this.userDataRepository.triggerPublicitySwap(id.userID);
  }

  @del('/profile/usertemplate')
  @response(200, {
    description: 'Create new template',
  })
  async deleteTemplate(
    @requestBody(templateRequestBody) ids: {'userID': string, 'templateID':string}
  ): Promise<void| string> {
    return this.userDataRepository.deleteTemplate(ids.userID, ids.templateID);
  }

  @del('/profile/publictemplate')
  @response(200, {
    description: 'Create new template',
  })
  async removeTemplate(
    @requestBody(templateRequestBody) ids: {'userID': string, 'templateID':string}
  ): Promise<void| string> {
    return this.userDataRepository.removePublicTemplate(ids.userID, ids.templateID);
  }

  @patch('/profile/usertemplate')
  @response(200, {
    description: 'Create new template',
  })
  async patchAddTemplate(
    @requestBody(templateRequestBody) ids: {'userID': string, 'templateID':string}
  ): Promise<void| string> {
    return this.userDataRepository.patchNewTemplate(ids.userID, ids.templateID);
  }

  @patch('/profile/publictemplate')
  @response(200, {
    description: 'Create new template',
  })
  async patchSaveTemplate(
    @requestBody(templateRequestBody) ids: {'userID': string, 'templateID':string}
  ): Promise<void| string> {
    return this.userDataRepository.patchAddTemplate(ids.userID, ids.templateID);
  }

  @put('/profile')
  @response(200, {
    description: 'Create new template',
  })
  async putUserInfo(
    @requestBody(underLearningRequestBody) ids: {'userID':string, 'universityID':string, 'facultyID':string, 'majorID':string}
  ): Promise<void| string> {
    return this.userDataRepository.putUserUnderLearningData(ids.userID, ids.universityID, ids.facultyID, ids.majorID);
  }
}
