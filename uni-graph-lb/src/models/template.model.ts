import {Entity, model, property} from '@loopback/repository';

@model()
export class Semester extends Entity {
  @property({
    type: 'number',
    required: true,
  })
  semesterNum: number;

  @property({
    type: 'array',
    itemType: 'string',
    required: true,
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
    required: true,
  })
  userId: string;

  @property({
    type: 'boolean',
    required: true,
  })
  isPublic: boolean;

  @property({
    type: 'array',
    itemType: 'object',
    required: true,
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
