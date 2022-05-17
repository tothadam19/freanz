import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongoDbDataSource} from '../datasources';
import {Semester, Template, TemplateRelations, University} from '../models';
import {uid} from '../services/id_gen';

export class TemplateRepository extends DefaultCrudRepository<
  Template,
  typeof Template.prototype.templateID,
  TemplateRelations
> {
  constructor(
    @inject('datasources.mongoDB') dataSource: MongoDbDataSource,

  ) {
    super(Template, dataSource);
  }

  async createTemplate(
    templateName: string,
    universityID: typeof University.prototype.universityID,
    facultyID: string,
    majorID: string,
    userID: string,
  ): Promise<string> {
    const newTemplate = new Template({
      templateID: await this.genTID(),
      templateName: templateName,
      universityID: universityID,
      facultyID: facultyID,
      majorID: majorID,
      userID: userID,
      isPublic: false,
      semester: []
    });
    await this.create(newTemplate);

    return newTemplate.templateID;
  }

  async getTemplate(
    templateID: typeof Template.prototype.templateID,
  ): Promise<object> {
    return this.findById(templateID);
  }

  async publicSwapTrigger(
    templateID: typeof Template.prototype.templateID,
    userID: string
  ): Promise<boolean | string> {
    const template = await this.findOne({where: {
      templateID: templateID,
      userID: userID
    }});
    if (template === null) return 'templateID is invalid or permission denied';
    if (template?.isPublic) template.isPublic = false;
    else if (template?.isPublic === false) template.isPublic = true;
    await this.replaceById(templateID, template);
    return template.isPublic;
  }

  async deleteSubjectFromTemplate(
    templateID: typeof Template.prototype.templateID,
    semesterID: string,
    subjectID: string
  ): Promise<string | void> {
    try {
      const template = await this.findById(templateID);
      const semester = template.semester.find(currentSemester => currentSemester.semesterID === semesterID);
      if (semester === undefined) return 'Unexpected error: semester not found by the given ID';
      const indexOfElementToDelete = semester.subjects.findIndex(currentSubject => currentSubject === subjectID);
      if (indexOfElementToDelete === -1) return 'Unexpected error: subject not found by the given ID';
      semester.subjects.splice(indexOfElementToDelete, 1);
      return await this.replaceById(templateID, template);
    } catch (error) {
      if (error.code === 'ENTITY_NOT_FOUND') return 'Unexpected error: Template not found by the given ID';
      return error;
    }
  }

  async genTID(): Promise<string> {
    const id = uid();
    return await this.checkTID(id) === false ? id : this.genTID();
  }

  async checkTID(id: string): Promise<Template | boolean> {
    try {
      return await this.findById(id);
    } catch (error) {
    if (error.code === 'ENTITY_NOT_FOUND') {
      return false;
    }
    throw error;
    }
  }

  async genSID(template: Template): Promise<string> {
    const id = uid();
    return await this.checkSID(id, template) === undefined ? id : this.genSID(template);
  }

  async checkSID(id: string, template: Template): Promise<Semester | undefined> {
    try {
      return template.semester.find(currentSemester => currentSemester.semesterID === id);
    } catch (error) {
    if (error.code === 'ENTITY_NOT_FOUND') {
      return undefined;
    }
    throw error;
    }
  }


  async fetchTemplateJson(
    jsonObject: {
      templateID: string,
      templateName: string,
      universityID: string,
      facultyID: string,
      majorID: string,
      userID: string,
      isPublic: boolean,
      semester: Array<object>
    }
  ): Promise<object> {
    await this.replaceById(jsonObject.templateID, jsonObject);
    return jsonObject;
  }

  async newSemester(templateID: string): Promise<string> {
    const template = await this.findById(templateID);
    const newSemesterID = await this.genSID(template);
    template.semester.push(new Semester({semesterID: newSemesterID, subjects: []}));
    await this.replaceById(templateID, template);
    return newSemesterID;
  }

}
