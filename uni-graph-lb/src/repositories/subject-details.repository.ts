import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongoDbDataSource} from '../datasources';
import {SubjectDetails, SubjectDetailsRelations} from '../models';

export class SubjectDetailsRepository extends DefaultCrudRepository<
  SubjectDetails,
  typeof SubjectDetails.prototype.detailsId,
  SubjectDetailsRelations
> {
  constructor(
    @inject('datasources.mongoDB') dataSource: MongoDbDataSource,
  ) {
    super(SubjectDetails, dataSource);
  }
}
