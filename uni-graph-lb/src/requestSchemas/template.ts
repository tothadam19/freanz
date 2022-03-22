import {SchemaObject} from '@loopback/rest';

const newTemplateSchema: SchemaObject = {
  type: 'object',
  required: ['universityID', 'facultyID', 'majorID', 'userId'],
  properties: {
    universityID: {
      type: 'string',
    },
    facultyID: {
      type: 'string',
    },
    majorID: {
      type: 'string',
    },
    userId: {
      type: 'string',
    },
  },
};

export const NewTemplateRequestBody = {
  description: 'The input of new template',
  required: true,
  content: {
    'application/json': {schema: newTemplateSchema},
  },
};


const putAndDeleteTemplateSchema: SchemaObject = {
  type: 'object',
  required: ['templateID', 'semesterID', 'subjectID'],
  properties: {
    templateID: {
      type: 'string',
    },
    semesterID: {
      type: 'string',
    },
    subjectID: {
      type: 'string',
    },
  },
};

export const putAndDeleteTemplateRequestBody = {
  description: 'The input of new template',
  required: true,
  content: {
    'application/json': {schema: putAndDeleteTemplateSchema},
  },
};



const patchOnSubjectPositionSwappedSchema: SchemaObject = {
  type: 'object',
  required: ['templateID', 'toSwappedSemesterID', 'toSwappedSubjectID', 'whatSwappedSemesterID', 'whatSwappedSubjectID'],
  properties: {
    templateID: {
      type: 'string',
    },
    toSwappedSemesterID: {
      type: 'string',
    },
    toSwappedSubjectID: {
      type: 'string',
    },
    whatSwappedSemesterID: {
      type: 'string',
    },
    whatSwappedSubjectID: {
      type: 'string',
    },
  },
};

export const patchOnSubjectPositionSwappedRequestBody = {
  description: 'The input of new template',
  required: true,
  content: {
    'application/json': {schema: patchOnSubjectPositionSwappedSchema},
  },
};



const isPublicPatchSchema: SchemaObject = {
  type: 'object',
  required: ['templateID', 'userID'],
  properties: {
    templateID: {
      type: 'string',
    },
    userID: {
      type: 'string',
    },
  },
};

export const isPublicPatchRequestBody = {
  description: 'The input of new template',
  required: true,
  content: {
    'application/json': {schema: isPublicPatchSchema},
  },
};
