import {Entity, model, property} from '@loopback/repository';

@model()
export class UserInfoModel extends Entity {
  @property({
    type: 'string',
    required: false,
    default: 'Not given',
  })
  universityID?: string;

  @property({
    type: 'string',
    required: false,
    default: 'Not given',
  })
  facultyID?: string;

  @property({
    type: 'string',
    required: false,
    default: 'Not given',
  })
  majorID?: string;

  constructor(data?: Partial<UserInfoModel>) {
    super(data);
  }
}

@model()
export class UserData extends Entity {
  @property({
    type: 'string',
    id: true,
    required: true,
  })
  userID: string;

  @property({
    type: 'string',
  })
  username: string;

  @property({
    type: 'string',
  })
  email: string;

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
  })
  lang?: string;


  constructor(data?: Partial<UserData>) {
    super(data);
  }
}

export interface UserDataRelations {
  // describe navigational properties here
}

export type UserDataWithRelations = UserData & UserDataRelations;
