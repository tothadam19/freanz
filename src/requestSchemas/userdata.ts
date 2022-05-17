import {SchemaObject} from '@loopback/rest';

const userIDSchema: SchemaObject = {
  type: 'object',
  required: ['userID'],
  properties: {
    userID: {
      type: 'string',
    },
  },
};

export const userIDRequestBody = {
  description: 'The input of new template',
  required: true,
  content: {
    'application/json': {schema: userIDSchema},
  },
};


const templateSchema: SchemaObject = {
  type: 'object',
  required: ['userID', 'templateID'],
  properties: {
    userID: {
      type: 'string',
    },
    templateID: {
      type: 'string',
    },
  },
};

export const templateRequestBody = {
  description: 'The input of new template',
  required: true,
  content: {
    'application/json': {schema: templateSchema},
  },
};

const underLearningSchema: SchemaObject = {
  type: 'object',
  required: ['userID', 'universityID', 'facultyID', 'majorID'],
  properties: {
    userID: {
      type: 'string',
    },
    universityID: {
      type: 'string',
    },
    facultyID: {
      type: 'string',
    },
    majorID: {
      type: 'string',
    },
  },
};

export const underLearningRequestBody = {
  description: 'The input of new template',
  required: true,
  content: {
    'application/json': {schema: underLearningSchema},
  },
};
