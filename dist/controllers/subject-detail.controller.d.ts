import { Comments } from '../models';
import { SubjectDetailsRepository } from '../repositories';
export declare class SubjectDetailController {
    subjectDetailsRepository: SubjectDetailsRepository;
    constructor(subjectDetailsRepository: SubjectDetailsRepository);
    getComments(id: {
        'detailID': string;
    }): Promise<Comments[] | undefined>;
    patchComments(commentToPatch: {
        'detailID': string;
        'content': string;
        'date': string;
        'byUserID': string;
    }): Promise<string>;
    getRatings(id: {
        'detailID': string;
    }): Promise<object | undefined>;
    patchRatings(ratingToPatch: {
        'detailID': string;
        'difficultyLevel': number;
        'interestLevel': number;
        'practicalLevel': number;
    }): Promise<string>;
}
