import { Entity } from '@loopback/repository';
export declare class Subject extends Entity {
    subjectID: string;
    universityID: string;
    neptunCode: string;
    subjectName: string;
    eSubjectName: string;
    kreditNum?: number;
    prerequisiteSubjectIDs: string[];
    builtOnSubjectIDs: string[];
    subjectDetailsID: string;
    constructor(data?: Partial<Subject>);
}
export interface SubjectRelations {
}
export declare type SubjectWithRelations = Subject & SubjectRelations;
