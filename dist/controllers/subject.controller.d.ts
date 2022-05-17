import { Subject } from '../models';
import { SubjectDetailsRepository, SubjectRepository, TemplateRepository } from '../repositories';
export declare class SubjectController {
    subjectRepository: SubjectRepository;
    templateRepository: TemplateRepository;
    subjectDetailsRepository: SubjectDetailsRepository;
    constructor(subjectRepository: SubjectRepository, templateRepository: TemplateRepository, subjectDetailsRepository: SubjectDetailsRepository);
    create(newSubject: {
        'universityID': string;
        'neptunCode': string;
        'subjectName': string;
        'esubjectName': string;
        'kreditNum': number;
        'prerequisiteSubjectIDs': Array<string>;
        'builtOnSubjectIDs': Array<string>;
    }): Promise<string>;
    searchByQuerry(query: {
        'param': string;
        'universityID': string;
    }): Promise<Subject[] | string>;
    getAllSubjectsByIDs(query: {
        'array': Array<string>;
    }): Promise<Subject[] | string>;
    getTemplate(id: typeof Subject.prototype.subjectID): Promise<object | undefined>;
}
