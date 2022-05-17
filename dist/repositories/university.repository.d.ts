import { DefaultCrudRepository } from '@loopback/repository';
import { MongoDbDataSource } from '../datasources';
import { Faculty, Major, University, UniversityRelations } from '../models';
export declare class UniversityRepository extends DefaultCrudRepository<University, typeof University.prototype.universityID, UniversityRelations> {
    constructor(dataSource: MongoDbDataSource);
    getTemplates(universityID: typeof University.prototype.universityID, facultyID: string, majorID: string): Promise<Array<string> | undefined>;
    getMajors(universityID: typeof University.prototype.universityID, facultyID: string): Promise<Array<object> | undefined>;
    getFaculties(universityID: typeof University.prototype.universityID): Promise<Array<object> | string>;
    getUnis(): Promise<Array<object> | undefined>;
    addNewFaculty(universityID: typeof University.prototype.universityID, newFacultyName: string): Promise<void | undefined>;
    addNewMajor(universityID: typeof University.prototype.universityID, facultyID: string, newMajorName: string): Promise<void | undefined>;
    addNewTemplate(universityID: typeof University.prototype.universityID, facultyID: string, majorID: string, newTemplateID: string): Promise<void | undefined>;
    createNewUniversity(newUniversityName: string): Promise<University>;
    genUID(): Promise<string>;
    checkUID(id: string): Promise<University | boolean>;
    genFID(university: University): Promise<string>;
    checkFID(id: string, university: University): Promise<Faculty | undefined>;
    genMID(faculty: Faculty): Promise<string>;
    checkMID(id: string, faculty: Faculty): Promise<Major | undefined>;
    searchUnis(regexp: string): Promise<Array<object> | string>;
}
