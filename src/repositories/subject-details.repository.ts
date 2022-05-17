import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongoDbDataSource} from '../datasources';
import {Comments, Ratings, SubjectDetails, SubjectDetailsRelations} from '../models';
import {uid} from '../services/id_gen';

export class SubjectDetailsRepository extends DefaultCrudRepository<
  SubjectDetails,
  typeof SubjectDetails.prototype.detailsID,
  SubjectDetailsRelations
> {
  constructor(
    @inject('datasources.mongoDB') dataSource: MongoDbDataSource,
  ) {
    super(SubjectDetails, dataSource);
  }

  async constructModellOnSubjectCreated(): Promise<string> {
    const id = await this.genDSID()
    await this.create({
      detailsID: id,
      comments: [],
      ratings: []
    });
    return id;
  }

  async getCommentsbyID(
    detailID: typeof SubjectDetails.prototype.detailsID
  ): Promise<Comments[] | undefined>{
    try {
      const subjectDetail = await this.findById(detailID);
      return subjectDetail.comments;
    } catch (error) {
      if (error.code === 'ENTITY_NOT_FOUND') return undefined;
      return error;
    }
  }

  async getRatingsID(
    detailID: typeof SubjectDetails.prototype.detailsID
  ): Promise<object | undefined>{
    try {
      const subjectDetail = await this.findById(detailID);
      const ratings = {
        difficultyLevel: 0,
        interestLevel: 0,
        practicalLevel: 0
      };
      subjectDetail.ratings.forEach(rating => {
        ratings.difficultyLevel += rating.difficultyLevel;
        ratings.interestLevel += rating.interestLevel;
        ratings.practicalLevel += rating.practicalLevel;
      })
      ratings.difficultyLevel /= subjectDetail.ratings.length;
      ratings.interestLevel /= subjectDetail.ratings.length;
      ratings.practicalLevel /= subjectDetail.ratings.length;
      return ratings;
    } catch (error) {
      if (error.code === 'ENTITY_NOT_FOUND') return undefined;
      return error;
    }
  }

  async patchComment(
    detailID: typeof SubjectDetails.prototype.detailsID,
    content: string,
    date: string,
    byUserID: string
  ): Promise<string> {
    try {
      const subjectDetail = await this.findById(detailID);
      const id = await this.genCID(subjectDetail);
      subjectDetail.comments.push(
        new Comments({
        commentID: id,
        content: content,
        date: date,
        byUserID: byUserID
      }));
      await this.replaceById(detailID, subjectDetail);
      return id;
    } catch (error) {
      if (error.code === 'ENTITY_NOT_FOUND') return 'subjectDetail not found by the given id';
      return error;
    }
  }

  async patchRating(
    detailID: typeof SubjectDetails.prototype.detailsID,
    difficultyLevel: number,
    interestLevel: number,
    practicalLevel: number
  ): Promise<string> {
    try {
      const subjectDetail = await this.findById(detailID);
      const id = await this.genRID(subjectDetail);
      subjectDetail.ratings.push(
        new Ratings({
        ratingID: id,
        difficultyLevel: difficultyLevel,
        interestLevel: interestLevel,
        practicalLevel: practicalLevel
      }));
      await this.replaceById(detailID, subjectDetail);
      return id;
    } catch (error) {
      if (error.code === 'ENTITY_NOT_FOUND') return 'subjectDetail not found by the given id';
      return error;
    }
  }

  async genDSID(): Promise<string> {
    const id = uid();
    return await this.checkDSID(id) === false ? id : this.genDSID();
  }

  async checkDSID(id: string): Promise<SubjectDetails | boolean> {
    try {
      return await this.findById(id);
    } catch (error) {
    if (error.code === 'ENTITY_NOT_FOUND') {
      return false;
    }
    throw error;
    }
  }

  async genCID(subjectDetail: SubjectDetails): Promise<string> {
    const id = uid();
    return await this.checkCID(id, subjectDetail) === undefined ? id : this.genCID(subjectDetail);
  }

  async checkCID(id: string, subjectDetail: SubjectDetails): Promise<Comments | undefined> {
    try {
      return subjectDetail.comments.find(comment => comment.commentID === id);
    } catch (error) {
    if (error.code === 'ENTITY_NOT_FOUND') {
      return undefined;
    }
    throw error;
    }
  }

  async genRID(subjectDetail: SubjectDetails): Promise<string> {
    const id = uid();
    return await this.checkRID(id, subjectDetail) === undefined ? id : this.genRID(subjectDetail);
  }

  async checkRID(id: string, subjectDetail: SubjectDetails): Promise<Ratings | undefined> {
    try {
      return subjectDetail.ratings.find(comment => comment.ratingID === id);
    } catch (error) {
    if (error.code === 'ENTITY_NOT_FOUND') {
      return undefined;
    }
    throw error;
    }
  }
}
