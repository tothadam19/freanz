import {SchemaObject} from '@loopback/rest';

const newSubjectSchema: SchemaObject = {
  type: 'object',
  required: ['templateID', 'semesterID', 'universityID', 'neptunCode', 'subjectName', 'esubjectName', 'kreditNum', 'prerequisiteSubjectIDs', 'builtOnSubjectIDs'],
  properties: {
    templateID: {
      type: 'string',
    },
    semesterID: {
      type: 'string',
    },
    universityID: {
      type: 'string',
    },
    neptunCode: {
      type: 'string',
    },
    subjectName: {
      type: 'string',
    },
    esubjectName: {
      type: 'string',
    },
    kreditNum: {
      type: 'number',
    },
    prerequisiteSubjectIDs: {
      type: 'array',
      items: {
        type: 'string'
      }
    },
    builtOnSubjectIDs: {
      type: 'array',
      items: {
        type: 'string'
      }
    },
  },
};

export const newSubjectRequestBody = {
  description: 'The input of new template',
  required: true,
  content: {
    'application/json': {schema: newSubjectSchema},
  },
};



const searchQuerySchema: SchemaObject = {
  type: 'object',
  required: ['param', 'universityID'],
  properties: {
    param: {
      type: 'string',
    },
    universityID: {
      type: 'string',
    },
  },
};

export const searchQueryRequestBody = {
  description: 'The input of new template',
  required: true,
  content: {
    'application/json': {schema: searchQuerySchema},
  },
};
