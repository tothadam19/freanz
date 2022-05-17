import { DefaultCrudRepository } from '@loopback/repository';
import { MongoDbDataSource } from '../datasources';
import { Comments, Ratings, SubjectDetails, SubjectDetailsRelations } from '../models';
export declare class SubjectDetailsRepository extends DefaultCrudRepository<SubjectDetails, typeof SubjectDetails.prototype.detailsID, SubjectDetailsRelations> {
    constructor(dataSource: MongoDbDataSource);
    constructModellOnSubjectCreated(): Promise<string>;
    getCommentsbyID(detailID: typeof SubjectDetails.prototype.detailsID): Promise<Comments[] | undefined>;
    getRatingsID(detailID: typeof SubjectDetails.prototype.detailsID): Promise<object | undefined>;
    patchComment(detailID: typeof SubjectDetails.prototype.detailsID, content: string, date: string, byUserID: string): Promise<string>;
    patchRating(detailID: typeof SubjectDetails.prototype.detailsID, difficultyLevel: number, interestLevel: number, practicalLevel: number): Promise<string>;
    genDSID(): Promise<string>;
    checkDSID(id: string): Promise<SubjectDetails | boolean>;
    genCID(subjectDetail: SubjectDetails): Promise<string>;
    checkCID(id: string, subjectDetail: SubjectDetails): Promise<Comments | undefined>;
    genRID(subjectDetail: SubjectDetails): Promise<string>;
    checkRID(id: string, subjectDetail: SubjectDetails): Promise<Ratings | undefined>;
}
