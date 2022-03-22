import {SchemaObject} from '@loopback/rest';

const getCommentsAndRatingsSchema: SchemaObject = {
  type: 'object',
  required: ['detailID'],
  properties: {
    detailID: {
      type: 'string',
    },
  },
};

export const getCommentsAndRatingsRequestBody = {
  description: 'The input of new template',
  required: true,
  content: {
    'application/json': {schema: getCommentsAndRatingsSchema},
  },
};

const patchCommentsSchema: SchemaObject = {
  type: 'object',
  required: ['detailID', 'content', 'date', 'byUserID'],
  properties: {
    detailID: {
      type: 'string',
    },
    content: {
      type: 'string',
    },
    date: {
      type: 'string',
    },
    byUserID: {
      type: 'string',
    },
  },
};

export const patchCommentsRequestBody = {
  description: 'The input of new template',
  required: true,
  content: {
    'application/json': {schema: patchCommentsSchema},
  },
};


const patchRatingsSchema: SchemaObject = {
  type: 'object',
  required: ['detailID', 'difficultyLevel', 'interestLevel', 'practicalLevel'],
  properties: {
    detailID: {
      type: 'string',
    },
    difficultyLevel: {
      type: 'number',
    },
    interestLevel: {
      type: 'number',
    },
    practicalLevel: {
      type: 'number',
    },
  },
};

export const patchRatingsRequestBody = {
  description: 'The input of new template',
  required: true,
  content: {
    'application/json': {schema: patchRatingsSchema},
  },
};

