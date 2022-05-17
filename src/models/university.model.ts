import {Entity, model, property} from '@loopback/repository';

@model()
export class Major extends Entity {
  @property({
    type: 'string',
  })
  majorID: string;

  @property({
    type: 'string',
  })
  majorName: string;

  @property({
    type: 'array',
    itemType: 'string',
  })
  templateID: string[];

  constructor(data?: Partial<Major>) {
    super(data);
  }
}

@model()
export class Faculty extends Entity {
  @property({
    type: 'string',
  })
  facultyID: string;

  @property({
    type: 'string',
  })
  facultyName: string;

  @property({
    type: 'array',
    itemType: 'object',
  })
  major: Major[];

  constructor(data?: Partial<Faculty>) {
    super(data);
  }
}

@model()
export class University extends Entity {
  @property({
    type: 'string',
    id: true,
    required: true,
  })
  universityID: string;

  @property({
    type: 'string',
  })
  universityName: string;

  @property({
    type: 'array',
    itemType: 'object',
  })
  faculty: Faculty[];



  constructor(data?: Partial<University>) {
    super(data);
  }
}

export interface UniversityRelations {
  // describe navigational properties here
}

export type UniversityWithRelations = University & UniversityRelations;
