import {
  repository
} from '@loopback/repository';
import {
  del,
  get, param, patch, post, put, requestBody,
  response
} from '@loopback/rest';
import {Template} from '../models';
import {TemplateRepository, UniversityRepository} from '../repositories';
import {isPublicPatchRequestBody, NewTemplateRequestBody, patchOnSubjectPositionSwappedRequestBody, putAndDeleteTemplateRequestBody} from '../requestSchemas/template';

export class TemplatesController {
  constructor(
    @repository(TemplateRepository)
    public templateRepository : TemplateRepository,
    @repository(UniversityRepository)
    public universityRepository : UniversityRepository,
  ) {}

  @post('/templates')
  @response(200, {
    description: 'Create new template',
  })
  async create(
    @requestBody(NewTemplateRequestBody) newTemplate: ({'universityID': string, 'facultyID': string, 'majorID': string, 'userId': string })
  ): Promise<string> {
    const newTemplateID = await this.templateRepository.createTemplate(newTemplate.universityID, newTemplate.facultyID, newTemplate.majorID, newTemplate.userId);
    if(newTemplateID !== "") {
      await this.universityRepository.addNewTemplate(newTemplate.universityID, newTemplate.facultyID ,newTemplate.majorID, newTemplateID);
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

  @put('/templates')
  @response(200, {
    description: 'Patch template',
  })
  async putTemplate(
    @requestBody(putAndDeleteTemplateRequestBody) subjectToUpdate: ({'templateID': string, 'semesterID': string, 'subjectID': string})
  ): Promise<void | string> {
    return this.templateRepository.putTemplate(subjectToUpdate.templateID, subjectToUpdate.semesterID, subjectToUpdate.subjectID);
  }

  @patch('/templates')
  @response(200, {
    description: 'Patch template',
  })
  async swapSubjects(
    @requestBody(patchOnSubjectPositionSwappedRequestBody) subjectsToSwap: ({'templateID': string, 'toSwappedSemesterID': string, 'toSwappedSubjectID': string, 'whatSwappedSemesterID': string, 'whatSwappedSubjectID': string})
  ): Promise<void | string> {
    return this.templateRepository.patchOnSubjectPositionSwapped(subjectsToSwap.templateID, subjectsToSwap.toSwappedSemesterID, subjectsToSwap.toSwappedSubjectID, subjectsToSwap.whatSwappedSemesterID, subjectsToSwap.whatSwappedSubjectID);
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
}

