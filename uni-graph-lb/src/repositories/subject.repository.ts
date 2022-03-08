import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongoDbDataSource} from '../datasources';
import {Subject, SubjectRelations} from '../models';

export class SubjectRepository extends DefaultCrudRepository<
  Subject,
  typeof Subject.prototype.subjectId,
  SubjectRelations
> {
  constructor(
    @inject('datasources.mongoDB') dataSource: MongoDbDataSource,
  ) {
    super(Subject, dataSource);
  }
}
