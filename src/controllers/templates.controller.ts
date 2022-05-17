import {
  repository
} from '@loopback/repository';
import {
  del,
  get, param, patch, post, put, requestBody,
  response
} from '@loopback/rest';
import {Template} from '../models';
import {TemplateRepository, UniversityRepository, UserDataRepository} from '../repositories';
import {
  deleteTemplateBody,
  isPublicPatchRequestBody,
  NewTemplateRequestBody, putAndDeleteTemplateRequestBody, updateTemplateRequestBody
} from '../requestSchemas/template';

export class TemplatesController {
  constructor(
    @repository(TemplateRepository)
    public templateRepository : TemplateRepository,
    @repository(UniversityRepository)
    public universityRepository : UniversityRepository,
     @repository(UserDataRepository)
    public userDataRepo : UserDataRepository,
  ) {}

  @post('/templates')
  @response(200, {
    description: 'Create new template',
  })
  async create(
    @requestBody(NewTemplateRequestBody) newTemplate: ({'templateName': string, 'universityID': string, 'facultyID': string, 'majorID': string, 'userId': string })
  ): Promise<string> {
    const newTemplateID = await this.templateRepository.createTemplate(newTemplate.templateName, newTemplate.universityID, newTemplate.facultyID, newTemplate.majorID, newTemplate.userId);
    if(newTemplateID !== "") {
      await this.universityRepository.addNewTemplate(newTemplate.universityID, newTemplate.facultyID ,newTemplate.majorID, newTemplateID);
      const user = await this.userDataRepo.findById(newTemplate.userId);
      console.log(user.userTemplates);
      user.userTemplates?.push(newTemplateID);
      console.log(user.userTemplates);
      await this.userDataRepo.replaceById(user.userID,user);
      return newTemplateID;
    }
    return "Unexpected error: couldn't generate valid templateID";
  }

  @get('/templates/{id}')
  @response(200, {
    description: 'Template model instance',
    content: {
      'application/json': {
        schema: {
          type: 'object',
        },
      },
    },
  })
  async getTemplate(
    @param.path.string('id') id: typeof Template.prototype.templateID
  ): Promise<object | undefined> {
    return this.templateRepository.getTemplate(id);
  }

  @patch('/templates/{id}')
  @response(200, {
    description: 'Template model instance',
    content: {
      'application/json': {
        schema: {
          type: 'object',
        },
      },
    },
  })
  async newSemester(
    @param.path.string('id') id: typeof Template.prototype.templateID
  ): Promise<string> {
    return this.templateRepository.newSemester(id);
  }

  @put('/templates')
  @response(200, {
    description: 'Patch template',
  })
  async putTemplate(
    @requestBody(updateTemplateRequestBody) jsonObject: ({'templateID': string, 'templateName': string, 'universityID': string, 'facultyID': string, 'majorID': string, 'userID': string, 'isPublic': boolean, 'semester': Array<object>})
  ): Promise<object> {
    return this.templateRepository.fetchTemplateJson({templateID: jsonObject.templateID, templateName: jsonObject.templateName, universityID: jsonObject.universityID, facultyID: jsonObject.facultyID, majorID: jsonObject.majorID, userID: jsonObject.userID, isPublic: jsonObject.isPublic, semester: jsonObject.semester});
  }

  @patch('/templates/ispublic')
  @response(200, {
    description: 'Patch template',
  })
  async patchIsPublic(
    @requestBody(isPublicPatchRequestBody) publicPatchToTrigger: ({'templateID': string, 'userID': string})
  ): Promise<boolean | string> {
    return this.templateRepository.publicSwapTrigger(publicPatchToTrigger.templateID, publicPatchToTrigger.userID);
  }

  @del('/templates')
  @response(200, {
    description: 'Delete subject from template'
  })
  async deleteSubjectFromTemplate(
    @requestBody(putAndDeleteTemplateRequestBody) subjectToDelete: ({'templateID': string, 'semesterID': string, 'subjectID': string})
  ): Promise<void | string> {
    return this.templateRepository.deleteSubjectFromTemplate(subjectToDelete.templateID, subjectToDelete.semesterID, subjectToDelete.subjectID);
  }
  @post('/templates/{id}')
  @response(200, {
    description: 'delete Template model instance'
  })
  async deleteTemplate(
   @requestBody(deleteTemplateBody) templateToDelete: ({'templateId': string, 'userId': string})
  ): Promise<void | string> {
    console.log('AAA')
    try{
    await this.templateRepository.deleteById(templateToDelete.templateId);
    await this.userDataRepo.deleteTemplate(templateToDelete.userId,templateToDelete.templateId)
      return '1'
  }catch (e){
      return '0';
    }


  }
  @post('/templates/fav/')
  @response(200, {
    description: 'delete Template model instance'
  })
  async deleteTemplateFromFave(
   @requestBody(deleteTemplateBody) templateToDelete: ({'templateId': string, 'userId': string})
  ): Promise<void | string> {
    console.log('AAA')
    try{

    await this.userDataRepo.deleteTemplateFromSaved(templateToDelete.userId,templateToDelete.templateId)
      return '1'
  }catch (e){
      return '0';
    }


  }
}

