// Uncomment these imports to begin using these cool features!

import {repository} from '@loopback/repository';
import {patch, post, requestBody, response} from '@loopback/rest';
import {Comments} from '../models';
import {SubjectDetailsRepository} from '../repositories';
import {getCommentsAndRatingsRequestBody, patchCommentsRequestBody, patchRatingsRequestBody} from '../requestSchemas/subjectDetail';

// import {inject} from '@loopback/core';


export class SubjectDetailController {
  constructor(
    @repository(SubjectDetailsRepository)
    public subjectDetailsRepository: SubjectDetailsRepository
  ) {}

  @post('/comments')
  @response(200, {
    description: 'Create new template',
  })
  async getComments(
    @requestBody(getCommentsAndRatingsRequestBody) id: {'detailID': string}
  ): Promise<Comments[] | undefined> {
    return this.subjectDetailsRepository.getCommentsbyID(id.detailID);
  }

  @patch('/comments')
  @response(200, {
    description: 'Create new template',
  })
  async patchComments(
    @requestBody(patchCommentsRequestBody) commentToPatch: {'detailID': string, 'content': string, 'date':string, 'byUserID':string}
  ): Promise<string> {
    return this.subjectDetailsRepository.patchComment(commentToPatch.detailID, commentToPatch.content, commentToPatch.date, commentToPatch.byUserID);
  }

  @post('/ratings')
  @response(200, {
    description: 'Create new template',
  })
  async getRatings(
    @requestBody(getCommentsAndRatingsRequestBody) id: {'detailID': string}
  ): Promise<object | undefined> {
    return this.subjectDetailsRepository.getRatingsID(id.detailID);
  }

  @patch('/ratings')
  @response(200, {
    description: 'Create new template',
  })
  async patchRatings(
    @requestBody(patchRatingsRequestBody) ratingToPatch: {'detailID': string, 'difficultyLevel': number, 'interestLevel':number, 'practicalLevel':number}
  ): Promise<string> {
    return this.subjectDetailsRepository.patchRating(ratingToPatch.detailID, ratingToPatch.difficultyLevel, ratingToPatch.interestLevel, ratingToPatch.practicalLevel);
  }
}
