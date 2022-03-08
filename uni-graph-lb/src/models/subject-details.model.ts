import {Entity, model, property} from '@loopback/repository';

@model()
export class Comments extends Entity {
  @property({
    type: 'string',
    required: true,
  })
  commentId: string;

  @property({
    type: 'date',
    required: true,
  })
  date: string;

  @property({
    type: 'string',
    required: true,
  })
  byUserId: string;


  constructor(data?: Partial<Comments>) {
    super(data);
  }
}


@model()
export class Ratings extends Entity {
  @property({
    type: 'string',
    required: true,
  })
  ratingId: string;

  @property({
    type: 'number',
    required: true,
  })
  difficultyLevel: number;

  @property({
    type: 'number',
    required: true,
  })
  interestLevel: number;

  @property({
    type: 'number',
    required: true,
  })
  practicalLevel: number;


  constructor(data?: Partial<Comments>) {
    super(data);
  }
}


@model()
export class SubjectDetails extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: false,
    required: true,
  })
  detailsId: string;

  @property({
    type: 'array',
    itemType: 'object',
  })
  comments?: Comments[];

  @property({
    type: 'array',
    itemType: 'object',
  })
  ratings?: Ratings[];


  constructor(data?: Partial<SubjectDetails>) {
    super(data);
  }
}

export interface SubjectDetailsRelations {
  // describe navigational properties here
}

export type SubjectDetailsWithRelations = SubjectDetails & SubjectDetailsRelations;
