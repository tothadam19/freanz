import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongoDbDataSource} from '../datasources';
import {Template, TemplateRelations} from '../models';

export class TemplateRepository extends DefaultCrudRepository<
  Template,
  typeof Template.prototype.templateID,
  TemplateRelations
> {
  constructor(
    @inject('datasources.mongoDB') dataSource: MongoDbDataSource,
  ) {
    super(Template, dataSource);
  }
}
