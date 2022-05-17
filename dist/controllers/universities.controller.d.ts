import { University } from '../models';
import { UniversityRepository } from '../repositories';
export declare class UniversitiesController {
    universityRepository: UniversityRepository;
    constructor(universityRepository: UniversityRepository);
    create(university: {
        'universityName': string;
    }): Promise<University>;
    searchUnis(search: {
        'searchParam': string;
    }): Promise<Array<object> | string>;
    gethUnis(): Promise<Array<object> | undefined>;
    getFaculties(getFaculty: {
        'universityID': string;
    }): Promise<Array<object> | string>;
    getMajors(getMajor: {
        'universityID': string;
        'facultyID': string;
    }): Promise<Array<object> | undefined>;
    getTemplates(getTemplate: {
        'universityID': string;
        'facultyID': string;
        'majorID': string;
    }): Promise<Array<string> | undefined>;
    addNewFaculty(newFaculty: {
        'universityID': string;
        'newFacultyName': string;
    }): Promise<void>;
    addNewMajor(newMajor: {
        'universityID': string;
        'facultyID': string;
        'newMajorName': string;
    }): Promise<void>;
    addNewTemplate(newTemplate: {
        'universityID': string;
        'facultyID': string;
        'majorID': string;
        'newTemplateID': string;
    }): Promise<void>;
}
