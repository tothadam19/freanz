import {Entity, model, property} from '@loopback/repository';

@model()
export class Comments extends Entity {
  @property({
    type: 'string',
  })
  commentID: string;

  @property({
    type: 'string',
  })
  content: string;

  @property({
    type: 'date',
  })
  date: string;

  @property({
    type: 'string',
  })
  byUserID: string;


  constructor(data?: Partial<Comments>) {
    super(data);
  }
}


@model()
export class Ratings extends Entity {
  @property({
    type: 'string',
  })
  ratingID: string;

  @property({
    type: 'number',
  })
  difficultyLevel: number;

  @property({
    type: 'number',
  })
  interestLevel: number;

  @property({
    type: 'number',
  })
  practicalLevel: number;


  constructor(data?: Partial<Ratings>) {
    super(data);
  }
}


@model()
export class SubjectDetails extends Entity {
  @property({
    type: 'string',
    id: true,
    required: true,
  })
  detailsID: string;

  @property({
    type: 'array',
    itemType: 'object',
  })
  comments: Comments[];

  @property({
    type: 'array',
    itemType: 'object',
  })
  ratings: Ratings[];


  constructor(data?: Partial<SubjectDetails>) {
    super(data);
  }
}

export interface SubjectDetailsRelations {
  // describe navigational properties here
}

export type SubjectDetailsWithRelations = SubjectDetails & SubjectDetailsRelations;
