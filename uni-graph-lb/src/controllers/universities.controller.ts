import {repository} from '@loopback/repository';
import {
  get,
  getModelSchemaRef, post, put, requestBody,
  response
} from '@loopback/rest';
import {University} from '../models';
import {UniversityRepository} from '../repositories';
import {getFacultiesRequestBody, getMajorsRequestBody, getTemplatesRequestBody, NewFacultyRequestBody, NewMajorRequestBody, NewTemplateRequestBody, newUniversityRequestBody} from '../requestSchemas/university';


//@authenticate('jwt')
export class UniversitiesController {
  constructor(
    @repository(UniversityRepository)
    public universityRepository : UniversityRepository,
  ) {}

  @post('/universities')
  @response(200, {
    description: 'University model instance',
    content: {'application/json': {schema: getModelSchemaRef(University)}},
  })
  async create(
    @requestBody(newUniversityRequestBody) university: {'universityName': string},
  ): Promise<University> {
    return this.universityRepository.createNewUniversity(university.universityName);
  }

  @get('/universities')
  @response(200, {
    description: 'List of unis',
    content: {
      'application/json': {
        schema: {
          type: 'array',
        },
      },
    },
  })
  async getUnis(
  ): Promise<Array<object> | undefined> {
    return this.universityRepository.getUnis();
  }

  @post('/universities/faculty')
  @response(200, {
    description: 'List of faculties to one uni',
    content: {
      'application/json': {
        schema: {
          type: 'array',
        },
      },
    },
  })
  async getFaculties(
    @requestBody(getFacultiesRequestBody) getFaculty: {'universityID': string}
  ): Promise<Array<object> | string> {
    return this.universityRepository.getFaculties(getFaculty.universityID);
  }

  @post('/universities/faculty/major')
  @response(200, {
    description: 'List of majors to one faculty',
    content: {
      'application/json': {
        schema: {
          type: 'array',
        },
      },
    },
  })
  async getMajors(
    @requestBody(getMajorsRequestBody) getMajor: {'universityID': string, 'facultyID':string}
  ): Promise<Array<object> | undefined> {
    return this.universityRepository.getMajors(getMajor.universityID,getMajor.facultyID);
  }

  @post('/universities/faculty/major/template')
  @response(200, {
    description: 'List of templates to one major',
    content: {
      'application/json': {
        schema: {
          type: 'array',
        },
      },
    },
  })
  async getTemplates(
    @requestBody(getTemplatesRequestBody) getTemplate: {'universityID': string, 'facultyID':string, 'majorID': string}
  ): Promise<Array<string> | undefined> {
    return this.universityRepository.getTemplates(getTemplate.universityID,getTemplate.facultyID, getTemplate.majorID);
  }

  @put('/universities/faculty')
  @response(204, {
    description: 'University PUT success',
  })
  async addNewFaculty(
    @requestBody(NewFacultyRequestBody) newFaculty: {'universityID':string, 'newFacultyName':string}
  ): Promise<void> {
    await this.universityRepository.addNewFaculty(newFaculty.universityID, newFaculty.newFacultyName);
  }

  @put('/universities/faculty/major')
  @response(204, {
    description: 'University PUT success',
  })
  async addNewMajor(
    @requestBody(NewMajorRequestBody) newMajor: {'universityID':string, 'facultyID':string, 'newMajorName':string},
  ): Promise<void> {
    await this.universityRepository.addNewMajor(newMajor.universityID, newMajor.facultyID, newMajor.newMajorName);
  }

  @put('/universities/faculty/major/template')
  @response(204, {
    description: 'University PUT success',
  })
  async addNewTemplate(
    @requestBody(NewTemplateRequestBody) newTemplate: {'universityID':string, 'facultyID': string, 'majorID':string, 'newTemplateID':string},
  ): Promise<void> {
    await this.universityRepository.addNewTemplate(newTemplate.universityID, newTemplate.facultyID, newTemplate.majorID, newTemplate.newTemplateID);
  }
}
