import {Entity, model, property} from '@loopback/repository';

@model()
export class UserInfoModel extends Entity {
  @property({
    type: 'string',
    required: false,
    default: 'Not given',
  })
  university?: string;

  @property({
    type: 'string',
    required: false,
    default: 'Not given',
  })
  faculty?: string;

  @property({
    type: 'string',
    required: false,
    default: 'Not given',
  })
  major?: string;

  constructor(data?: Partial<UserInfoModel>) {
    super(data);
  }
}

@model()
export class User extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: false,
    required: true,
  })
  username: string;

  @property({
    type: 'object',
  })
  underLearning?: UserInfoModel;

  @property({
    type: 'boolean',
    default: true,
  })
  isProfilePublic?: boolean;

  @property({
    type: 'array',
    itemType: 'string',
  })
  userTemplates?: string[];

  @property({
    type: 'array',
    itemType: 'string',
  })
  savedPublicTemplates?: string[];

  @property({
    type: 'string',
    default: 'hu',
  })
  lang?: string;


  constructor(data?: Partial<User>) {
    super(data);
  }
}

export interface UserRelations {
  // describe navigational properties here
}

export type UserWithRelations = User & UserRelations;
