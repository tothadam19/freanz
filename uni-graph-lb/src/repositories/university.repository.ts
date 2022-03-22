import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongoDbDataSource} from '../datasources';
import {Faculty, Major, University, UniversityRelations} from '../models';
import {uid} from '../services/id_gen';

export class UniversityRepository extends DefaultCrudRepository<
  University,
  typeof University.prototype.universityID,
  UniversityRelations
> {
  constructor(
    @inject('datasources.mongoDB') dataSource: MongoDbDataSource,
  ) {
    super(University, dataSource);
  }

  async getTemplates(
    universityID: typeof University.prototype.universityID,
    facultyID: string,
    majorID: string
  ): Promise<Array<string> | undefined>{
    try {
      const uni = await this.findById(universityID);
      const faculty = uni.faculty.find(currentFaculty => currentFaculty.facultyID === facultyID);
      if (faculty === undefined) return undefined;
      const major = faculty.major.find(currentMajor => currentMajor.majorID === majorID);
      if (major === undefined) return undefined;
      return major.templateID;
    } catch (error) {
      if (error.code === 'ENTITY_NOT_FOUND') {
        return undefined;
      }
      throw error;
    }
  }

  async getMajors(
    universityID: typeof University.prototype.universityID,
    facultyID: string
  ): Promise<Array<object> | undefined>{
    try {
      const uni = await this.findById(universityID);
      const faculty = uni.faculty.find(currentFaculty => currentFaculty.facultyID === facultyID);
      if (faculty === undefined) return undefined;
      const responseArray: object[] = [];
      faculty.major.forEach(function(current){
        responseArray.push({
          majorID: current.majorID,
          majorName: current.majorName
        })
      })
      return responseArray;
    } catch (error) {
      if (error.code === 'ENTITY_NOT_FOUND') {
        return undefined;
      }
      throw error;
    }
  }

  async getFaculties(
    universityID: typeof University.prototype.universityID
  ): Promise<Array<object> | string>{
    try {
      const uni = await this.findById(universityID);
      if (uni.faculty === []) throw new Error('ENTITY_NOT_FOUND');
      const responseArray: object[] = [];
      uni.faculty.forEach(function(current){
        responseArray.push({
          facultyID: current.facultyID,
          facultyName: current.facultyName
        })
      })
      return responseArray;
    } catch (error) {
      if (error.code === 'ENTITY_NOT_FOUND') {
        return 'Nincs ilyen egyetem, vagy nem létezik hozzárendelt kar';
      }
      throw error;
    }
  }
  async getUnis(): Promise<Array<object> | undefined>{
    try {
      const responseArray: object[] = [];
      const unis = await this.find();
      unis.forEach(function(current) {
        responseArray.push({
          universityID: current.universityID,
          universityName: current.universityName
        });
      })
      return responseArray;
    } catch (error) {
      if (error.code === 'ENTITY_NOT_FOUND') {
        return undefined;
      }
      throw error;
    }
  }
  async addNewFaculty(
    universityID: typeof University.prototype.universityID,
    newFacultyName: string
    ): Promise<void | undefined>{
      try {
        const uni = await this.findById(universityID);
        const toPushElement = new Faculty({facultyID: await this.genFID(uni), facultyName: newFacultyName, major: []})
        uni.faculty.push(toPushElement);
        return await this.replaceById(universityID, uni);
      } catch (error) {
        if (error.code === 'ENTITY_NOT_FOUND') {
          return undefined;
        }
        throw error;
      }
    }
  async addNewMajor(
    universityID: typeof University.prototype.universityID,
    facultyID: string,
    newMajorName: string
    ): Promise<void | undefined>{
      try {
        const uni = await this.findById(universityID);
        const faculty = uni.faculty.find(currentFaculty => currentFaculty.facultyID === facultyID);
        if (faculty === undefined) return undefined
        faculty.major.push(new Major({
          majorID: await this.genMID(faculty),
          majorName: newMajorName,
          templateID: []
        }))
        return await this.replaceById(universityID, uni);
      } catch (error) {
        if (error.code === 'ENTITY_NOT_FOUND') {
          return undefined;
        }
        throw error;
      }
    }
  async addNewTemplate(
    universityID: typeof University.prototype.universityID,
    facultyID: string,
    majorID: string,
    newTemplateID: string
    ): Promise<void | undefined>{
      try {
        const uni = await this.findById(universityID);
        const faculty = uni.faculty.find(currentFaculty => currentFaculty.facultyID = facultyID);
        if (faculty === undefined) return undefined;
        else {
          faculty.major.find(currentMajor => currentMajor.majorID === majorID)?.templateID.push(newTemplateID);
          return await this.replaceById(universityID,uni);
        }
      } catch (error) {
        if (error.code === 'ENTITY_NOT_FOUND') {
          return undefined;
        }
        throw error;
      }
  }

  async createNewUniversity(newUniversityName: string): Promise<University> {
    return this.create({
      universityID: await this.genUID(),
      universityName: newUniversityName,
      faculty: []
    });
  }

  async genUID(): Promise<string> {
    const id = uid();
    return await this.checkUID(id) === false ? id : this.genUID();
  }

  async checkUID(id: string): Promise<University | boolean> {
    try {
      return await this.findById(id);
    } catch (error) {
    if (error.code === 'ENTITY_NOT_FOUND') {
      return false;
    }
    throw error;
    }
  }

  async genFID(university: University): Promise<string> {
    const id = uid();
    return await this.checkFID(id, university) === undefined ? id : this.genFID(university);
  }

  async checkFID(id: string, university: University): Promise<Faculty | undefined> {
    try {
      return university.faculty.find(faculty => faculty.facultyID === id);
    } catch (error) {
    if (error.code === 'ENTITY_NOT_FOUND') {
      return undefined;
    }
    throw error;
    }
  }

  async genMID(faculty: Faculty): Promise<string> {
    const id = uid();
    return await this.checkMID(id, faculty) === undefined ? id : this.genMID(faculty);
  }

  async checkMID(id: string, faculty: Faculty): Promise<Major | undefined> {
    try {
      return faculty.major.find(major => major.majorID === id);
    } catch (error) {
    if (error.code === 'ENTITY_NOT_FOUND') {
      return undefined;
    }
    throw error;
    }
  }
}


