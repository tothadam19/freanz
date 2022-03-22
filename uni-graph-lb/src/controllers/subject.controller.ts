import {repository} from '@loopback/repository';
import {get, param, patch, post, requestBody, response} from '@loopback/rest';
import {Subject} from '../models';
import {SubjectDetailsRepository, SubjectRepository, TemplateRepository} from '../repositories';
import {newSubjectRequestBody, searchQueryRequestBody} from '../requestSchemas/subject';

export class SubjectController {
  constructor(
    @repository(SubjectRepository)
    public subjectRepository: SubjectRepository,
    @repository(TemplateRepository)
    public templateRepository: TemplateRepository,
    @repository(SubjectDetailsRepository)
    public subjectDetailsRepository: SubjectDetailsRepository
  ) {}

  @post('/subjects')
  @response(200, {
    description: 'Create new template',
  })
  async create(
    @requestBody(newSubjectRequestBody) newSubject:{'templateID': string, 'semesterID': string, 'universityID': string,'neptunCode': string, 'subjectName': string, 'esubjectName': string, 'kreditNum': number, 'prerequisiteSubjectIDs': Array<string>, 'builtOnSubjectIDs': Array<string>}
  ): Promise<string>{
    try {
      const template = await this.templateRepository.findById(newSubject.templateID);
      const semester = template.semester.find(currentSemester => currentSemester.semesterID === newSubject.semesterID);
      if (semester === undefined) return 'The semester with the given IDs not found';
      const subjectDetailsID = await this.subjectDetailsRepository.constructModellOnSubjectCreated();
      const id = await this.subjectRepository.createNewSubject(newSubject.universityID, newSubject.neptunCode, newSubject.subjectName, newSubject.esubjectName, newSubject.kreditNum, newSubject.prerequisiteSubjectIDs, newSubject.builtOnSubjectIDs, subjectDetailsID);
      semester.subjects.push(id);
      await this.templateRepository.replaceById(newSubject.templateID, template);
      return 'success';
    } catch (error) {
      if (error.code === 'ENTITY_NOT_FOUND') return 'Unexpected error: Template not found by the given ID';
      return error;
    }
  }

  @patch('/subjects')
  @response(200, {
    description: 'Create new template',
  })
  async searchByQuerry(
    @requestBody(searchQueryRequestBody) query:{'param': string, 'universityID': string}
  ): Promise<Subject[] | string>{
    return this.subjectRepository.searchSubject(query.param, query.universityID);
  }

  @get('/subjects/{id}')
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
    @param.path.string('id') id: typeof Subject.prototype.subjectID
  ): Promise<object | undefined> {
    return this.subjectRepository.getSubject(id);
  }
}
