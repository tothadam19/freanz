import { Entity } from '@loopback/repository';
export declare class Major extends Entity {
    majorID: string;
    majorName: string;
    templateID: string[];
    constructor(data?: Partial<Major>);
}
export declare class Faculty extends Entity {
    facultyID: string;
    facultyName: string;
    major: Major[];
    constructor(data?: Partial<Faculty>);
}
export declare class University extends Entity {
    universityID: string;
    universityName: string;
    faculty: Faculty[];
    constructor(data?: Partial<University>);
}
export interface UniversityRelations {
}
export declare type UniversityWithRelations = University & UniversityRelations;
