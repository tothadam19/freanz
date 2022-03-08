import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongoDbDataSource} from '../datasources';
import {University, UniversityRelations} from '../models';

export class UniversityRepository extends DefaultCrudRepository<
  University,
  typeof University.prototype.universityId,
  UniversityRelations
> {
  constructor(
    @inject('datasources.mongoDB') dataSource: MongoDbDataSource,
  ) {
    super(University, dataSource);
  }
}
