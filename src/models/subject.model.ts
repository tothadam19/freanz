import {Entity, model, property} from '@loopback/repository';

@model()
export class Subject extends Entity {
  @property({
    type: 'string',
    id: true,
    required: true,
  })
  subjectID: string;

  @property({
    type: 'string',
  })
  universityID: string;

  @property({
    type: 'string',
  })
  neptunCode: string;

  @property({
    type: 'string',
  })
  subjectName: string;

  @property({
    type: 'string',
  })
  eSubjectName: string;

  @property({
    type: 'number',
  })
  kreditNum?: number;

  @property({
    type: 'array',
    itemType: 'string',
  })
  prerequisiteSubjectIDs: string[];

  @property({
    type: 'array',
    itemType: 'string',
  })
  builtOnSubjectIDs: string[];

  @property({
    type: 'string',
  })
  subjectDetailsID: string;


  constructor(data?: Partial<Subject>) {
    super(data);
  }
}

export interface SubjectRelations {
  // describe navigational properties here
}

export type SubjectWithRelations = Subject & SubjectRelations;
