import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongoDbDataSource} from '../datasources';
import {Subject, SubjectRelations} from '../models';
import {uid} from '../services/id_gen';

export class SubjectRepository extends DefaultCrudRepository<
  Subject,
  typeof Subject.prototype.subjectID,
  SubjectRelations
> {
  constructor(
    @inject('datasources.mongoDB') dataSource: MongoDbDataSource,
  ) {
    super(Subject, dataSource);
  }


  async createNewSubject(
    universityID: string,
    neptunCode: string,
    subjectName: string,
    esubjectName: string,
    kreditNum: number,
    prerequisiteSubjectIDs: Array<string>,
    builtOnSubjectIDs: Array<string>,
    subjectDetailsID: string
  ): Promise<string> {
    const id =  await this.genSID();
    await this.create(
      new Subject({
        subjectID: id,
        universityID: universityID,
        neptunCode: neptunCode,
        subjectName: subjectName,
        eSubjectName: esubjectName,
        kreditNum: kreditNum,
        prerequisiteSubjectIDs: prerequisiteSubjectIDs,
        builtOnSubjectIDs: builtOnSubjectIDs,
        subjectDetailsID: subjectDetailsID
      })
    );
    return id;
  }

  async getSubject(
    subjectID: typeof Subject.prototype.subjectID,
  ): Promise<object> {
    return this.findById(subjectID);
  }

  async searchSubject(
    querry: string,
    universityID: string
  ): Promise<Subject[] | string> {
    //check: subjectName
    let result = await this.find({where : {
      subjectName: {'regexp':querry},
      universityID: universityID
    }});
    if (result.length > 0) return result;
    //check: neptunCode
    result = await this.find({where : {
      neptunCode: {'regexp':querry},
      universityID: universityID
    }});
    if (result.length > 0) return result;
    //check: english subjectName
    result = await this.find({where : {
      eSubjectName: {'regexp':querry},
      universityID: universityID
    }});
    if (result.length > 0) return result;
    return 'not found';
  }

  async genSID(): Promise<string> {
    const id = uid();
    return await this.checkSID(id) === false ? id : this.genSID();
  }

  async checkSID(id: string): Promise<Subject | boolean> {
    try {
      return await this.findById(id);
    } catch (error) {
    if (error.code === 'ENTITY_NOT_FOUND') {
      return false;
    }
    throw error;
    }
  }
}
