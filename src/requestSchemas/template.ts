import {SchemaObject} from '@loopback/rest';

const newTemplateSchema: SchemaObject = {
  type: 'object',
  required: ['templateName', 'universityID', 'facultyID', 'majorID', 'userId'],
  properties: {
    templateName: {
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


const deleteTemplateBodySchema: SchemaObject = {
  type: 'object',
  required: ['templateId', 'userId'],
  properties: {
    templateId: {
      type: 'string',
    },
    userId: {
      type: 'string',
    },

  },
};
export const deleteTemplateBody = {
  description: 'Delete template',
  required: true,
  content: {
    'application/json': {schema: deleteTemplateBodySchema},
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

const updateTemplateSchema: SchemaObject = {
  type: 'object',
  required: ['templateID', 'templateName', 'universityID', 'facultyID', 'majorID', 'userID', 'isPublic', 'semester'],
  properties: {
    templateID: {
      type: 'string',
    },
    templateName: {
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
    userID: {
      type: 'string',
    },
    isPublic: {
      type: 'boolean',
    },
    semester: {
      type: 'array',
      items: {
        type: 'object'
      }
    },
  },
};

export const updateTemplateRequestBody = {
  description: 'The input of new template',
  required: true,
  content: {
    'application/json': {schema: updateTemplateSchema},
  },
};
