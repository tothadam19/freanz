import { Entity } from '@loopback/repository';
export declare class Semester extends Entity {
    semesterID: string;
    subjects: string[];
    constructor(data?: Partial<Semester>);
}
export declare class Template extends Entity {
    templateID: string;
    templateName: string;
    universityID: string;
    facultyID: string;
    majorID: string;
    userID: string;
    isPublic: boolean;
    semester: Semester[];
    constructor(data?: Partial<Template>);
}
export interface TemplateRelations {
}
export declare type TemplateWithRelations = Template & TemplateRelations;
