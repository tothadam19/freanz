import {SchemaObject} from '@loopback/rest';

//universityId: number, newFacultyName: string
export const newFacultySchema: SchemaObject = {
  type: 'object',
  required: ['universityID', 'newFacultyName'],
  properties: {
    universityID: {
      type: 'string',
    },
    newFacultyName: {
      type: 'string',
    },
  },
};

export const NewFacultyRequestBody = {
  description: 'The input of new faculty',
  required: true,
  content: {
    'application/json': {schema: newFacultySchema},
  },
};


//universityId: number, facultyNameOfMajor: string, newMajorName: string,
const newMajorSchema: SchemaObject = {
  type: 'object',
  required: ['universityID', 'facultyID', 'newMajorName'],
  properties: {
    universityID: {
      type: 'string',
    },
    facultyID: {
      type: 'string',
    },
    newMajorName: {
      type: 'string',
    },
  },
};

export const NewMajorRequestBody = {
  description: 'The input of new major',
  required: true,
  content: {
    'application/json': {schema: newMajorSchema},
  },
};



//universityId: number, majorNameOfTemplate: string, newTemplateID: string
const newTemplateSchema: SchemaObject = {
  type: 'object',
  required: ['universityID', 'facultyID','majorID', 'newTemplateID'],
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
    newTemplateID: {
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




const newUniversitySchema: SchemaObject = {
  type: 'object',
  required: ['universityName'],
  properties: {
    universityName: {
      type: 'string',
    },
  },
};

export const newUniversityRequestBody = {
  description: 'The input of new university',
  required: true,
  content: {
    'application/json': {schema: newUniversitySchema},
  },
};



const searchUniversitySchema: SchemaObject = {
  type: 'object',
  required: ['searchParam'],
  properties: {
    searchParam: {
      type: 'string',
    },
  },
};

export const searchUniversityRequestBody = {
  description: 'The input of new university',
  required: true,
  content: {
    'application/json': {schema: searchUniversitySchema},
  },
};




const getFacultiesSchema: SchemaObject = {
  type: 'object',
  required: ['universityID'],
  properties: {
    universityID: {
      type: 'string',
    },
  },
};

export const getFacultiesRequestBody = {
  description: 'The input of faculties getter',
  required: true,
  content: {
    'application/json': {schema: getFacultiesSchema},
  },
};


const getMajorsSchema: SchemaObject = {
  type: 'object',
  required: ['universityID','facultyID'],
  properties: {
    universityID: {
      type: 'string',
    },
    facultyID: {
      type: 'string',
    },
  },
};

export const getMajorsRequestBody = {
  description: 'The input of faculties getter',
  required: true,
  content: {
    'application/json': {schema: getMajorsSchema},
  },
};



const getTemplatesSchema: SchemaObject = {
  type: 'object',
  required: ['universityID','facultyID', 'majorID'],
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
  },
};

export const getTemplatesRequestBody = {
  description: 'The input of faculties getter',
  required: true,
  content: {
    'application/json': {schema: getTemplatesSchema},
  },
};

