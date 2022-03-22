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
    universityID: typeof University.prototype.universityID,
    facultyID: string,
    majorID: string,
    userID: string,
  ): Promise<string> {
    const newTemplate = new Template({
      templateID: await this.genTID(),
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

  async patchOnSubjectPositionSwapped(
    templateID: typeof Template.prototype.templateID,
    toSwappedSemesterID: string,
    toSwappedSubjectID: string,
    whatSwappedSemesterID: string,
    whatSwappedSubjectID: string
  ): Promise<string | undefined> {
    try {
      const template = await this.findById(templateID);
      const toSwapped = template.semester.find(currentSemester => currentSemester.semesterID === toSwappedSemesterID);
      const whatSwapped = template.semester.find(currentSemester => currentSemester.semesterID === whatSwappedSemesterID);
      if (toSwapped === undefined || whatSwapped === undefined) return undefined;
      toSwapped.subjects[toSwapped.subjects.findIndex(currentSubjectID => currentSubjectID === toSwappedSubjectID)] = whatSwappedSubjectID;
      whatSwapped.subjects[whatSwapped.subjects.findIndex(currentSubjectID => currentSubjectID === whatSwappedSubjectID)] = toSwappedSubjectID;
      await this.replaceById(templateID, template);
      return 'success';
    } catch (error) {
      if (error.code === 'ENTITY_NOT_FOUND') return 'Unexpected error: Template not found by the given ID';
      return error;
    }
  }

  async semesterCheck(
    semesterID: typeof Semester.prototype.semesterID,
    template: Template,
    subjectID: string
  ): Promise<Template | undefined> {
    if (semesterID === undefined || semesterID === '') {
      const newSemester = new Semester({semesterID: await this.genSID(template), subjects: []});
      newSemester.subjects.push(subjectID);
      template.semester.push(newSemester);
      return template;
    } else {
      const semesterFound = template.semester.find(currentSemester => currentSemester.semesterID === semesterID);
      if (semesterFound === undefined) return undefined;
      semesterFound.subjects.push(subjectID);
      return template;
    }
  }

  async putTemplate(
    templateID: typeof Template.prototype.templateID,
    semesterID: typeof Semester.prototype.semesterID,
    subjectID: string
  ): Promise<void | string> {
    try {
      if (subjectID === '' || subjectID === undefined) return 'Unexpected error: subjectID is undefined';
      const updatedTemplate = await this.semesterCheck(semesterID, await this.findById(templateID), subjectID);
      if (updatedTemplate === undefined)  return 'Unexpected error: Semester or SubjectSchema not found by the given ID';
      return await this.replaceById(templateID, updatedTemplate);
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

}
