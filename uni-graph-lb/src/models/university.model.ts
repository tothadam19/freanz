import {Entity, model, property} from '@loopback/repository';

@model()
export class Major extends Entity {
  @property({
    type: 'string',
    required: true,
  })
  majorName: string;

  @property({
    type: 'array',
    itemType: 'string',
    required: true,
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
    required: true,
  })
  facultyName: string;

  @property({
    type: 'array',
    itemType: 'object',
    required: true,
  })
  major: Major[];

  constructor(data?: Partial<Faculty>) {
    super(data);
  }
}

@model()
export class University extends Entity {
  @property({
    type: 'number',
    id: true,
    required: true,
  })
  universityId?: number;

  @property({
    type: 'string',
    required: true,
  })
  universityName: string;

  @property({
    type: 'array',
    itemType: 'object',
    required: true,
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
