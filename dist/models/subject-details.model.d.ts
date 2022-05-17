import { Entity } from '@loopback/repository';
export declare class Comments extends Entity {
    commentID: string;
    content: string;
    date: string;
    byUserID: string;
    constructor(data?: Partial<Comments>);
}
export declare class Ratings extends Entity {
    ratingID: string;
    difficultyLevel: number;
    interestLevel: number;
    practicalLevel: number;
    constructor(data?: Partial<Ratings>);
}
export declare class SubjectDetails extends Entity {
    detailsID: string;
    comments: Comments[];
    ratings: Ratings[];
    constructor(data?: Partial<SubjectDetails>);
}
export interface SubjectDetailsRelations {
}
export declare type SubjectDetailsWithRelations = SubjectDetails & SubjectDetailsRelations;
