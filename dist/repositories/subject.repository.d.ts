import { DefaultCrudRepository } from '@loopback/repository';
import { MongoDbDataSource } from '../datasources';
import { Subject, SubjectRelations } from '../models';
export declare class SubjectRepository extends DefaultCrudRepository<Subject, typeof Subject.prototype.subjectID, SubjectRelations> {
    constructor(dataSource: MongoDbDataSource);
    createNewSubject(universityID: string, neptunCode: string, subjectName: string, esubjectName: string, kreditNum: number, prerequisiteSubjectIDs: Array<string>, builtOnSubjectIDs: Array<string>, subjectDetailsID: string): Promise<string>;
    getSubject(subjectID: typeof Subject.prototype.subjectID): Promise<object>;
    searchSubject(querry: string, universityID: string): Promise<Subject[] | string>;
    getAllSubjectsByIDs(query: Array<string>): Promise<Array<Subject>>;
    genSID(): Promise<string>;
    checkSID(id: string): Promise<Subject | boolean>;
}
