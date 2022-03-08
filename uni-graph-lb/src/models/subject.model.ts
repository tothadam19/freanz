import {Entity, model, property} from '@loopback/repository';

@model()
export class Subject extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: false,
    required: true,
  })
  subjectId: string;

  @property({
    type: 'string',
    required: true,
  })
  neptunCode: string;

  @property({
    type: 'string',
    required: true,
  })
  subjectName: string;

  @property({
    type: 'string',
  })
  eSubjectName?: string;

  @property({
    type: 'number',
  })
  kreditNum?: number;

  @property({
    type: 'array',
    itemType: 'string',
  })
  prerequisiteIds?: string[];

  @property({
    type: 'array',
    itemType: 'string',
  })
  builtOnIds?: string[];

  @property({
    type: 'array',
    itemType: 'string',
  })
  detailsIds?: string[];


  constructor(data?: Partial<Subject>) {
    super(data);
  }
}

export interface SubjectRelations {
  // describe navigational properties here
}

export type SubjectWithRelations = Subject & SubjectRelations;
