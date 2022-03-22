import {Entity, model, property} from '@loopback/repository';



@model()
export class Semester extends Entity {
  @property({
    type: 'string',
  })
  semesterID: string;

  @property({
    type: 'array',
    itemType: 'string',
  })
  subjects: string[];

  constructor(data?: Partial<Semester>) {
    super(data);
  }
}

@model()
export class Template extends Entity {
  @property({
    type: 'string',
    id: true,
    required: true,
  })
  templateID: string;

  @property({
    type: 'string',
  })
  universityID: string;

  @property({
    type: 'string',
  })
  facultyID: string;

  @property({
    type: 'string',
  })
  majorID: string;

  @property({
    type: 'string',
  })
  userID: string;

  @property({
    type: 'boolean',
  })
  isPublic: boolean;

  @property({
    type: 'array',
    itemType: 'object',
  })
  semester: Semester[];


  constructor(data?: Partial<Template>) {
    super(data);
  }
}

export interface TemplateRelations {
  // describe navigational properties here
}

export type TemplateWithRelations = Template & TemplateRelations;
