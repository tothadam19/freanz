import { DefaultCrudRepository } from '@loopback/repository';
import { MongoDbDataSource } from '../datasources';
import { Semester, Template, TemplateRelations, University } from '../models';
export declare class TemplateRepository extends DefaultCrudRepository<Template, typeof Template.prototype.templateID, TemplateRelations> {
    constructor(dataSource: MongoDbDataSource);
    createTemplate(templateName: string, universityID: typeof University.prototype.universityID, facultyID: string, majorID: string, userID: string): Promise<string>;
    getTemplate(templateID: typeof Template.prototype.templateID): Promise<object>;
    publicSwapTrigger(templateID: typeof Template.prototype.templateID, userID: string): Promise<boolean | string>;
    deleteSubjectFromTemplate(templateID: typeof Template.prototype.templateID, semesterID: string, subjectID: string): Promise<string | void>;
    genTID(): Promise<string>;
    checkTID(id: string): Promise<Template | boolean>;
    genSID(template: Template): Promise<string>;
    checkSID(id: string, template: Template): Promise<Semester | undefined>;
    fetchTemplateJson(jsonObject: {
        templateID: string;
        templateName: string;
        universityID: string;
        facultyID: string;
        majorID: string;
        userID: string;
        isPublic: boolean;
        semester: Array<object>;
    }): Promise<object>;
    newSemester(templateID: string): Promise<string>;
}
