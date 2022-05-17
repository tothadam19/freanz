import { Template } from '../models';
import { TemplateRepository, UniversityRepository, UserDataRepository } from '../repositories';
export declare class TemplatesController {
    templateRepository: TemplateRepository;
    universityRepository: UniversityRepository;
    userDataRepo: UserDataRepository;
    constructor(templateRepository: TemplateRepository, universityRepository: UniversityRepository, userDataRepo: UserDataRepository);
    create(newTemplate: ({
        'templateName': string;
        'universityID': string;
        'facultyID': string;
        'majorID': string;
        'userId': string;
    })): Promise<string>;
    getTemplate(id: typeof Template.prototype.templateID): Promise<object | undefined>;
    newSemester(id: typeof Template.prototype.templateID): Promise<string>;
    putTemplate(jsonObject: ({
        'templateID': string;
        'templateName': string;
        'universityID': string;
        'facultyID': string;
        'majorID': string;
        'userID': string;
        'isPublic': boolean;
        'semester': Array<object>;
    })): Promise<object>;
    patchIsPublic(publicPatchToTrigger: ({
        'templateID': string;
        'userID': string;
    })): Promise<boolean | string>;
    deleteSubjectFromTemplate(subjectToDelete: ({
        'templateID': string;
        'semesterID': string;
        'subjectID': string;
    })): Promise<void | string>;
    deleteTemplate(templateToDelete: ({
        'templateId': string;
        'userId': string;
    })): Promise<void | string>;
    deleteTemplateFromFave(templateToDelete: ({
        'templateId': string;
        'userId': string;
    })): Promise<void | string>;
}
