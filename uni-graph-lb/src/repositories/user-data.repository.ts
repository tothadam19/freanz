// import {inject} from '@loopback/core';
// import {DefaultCrudRepository} from '@loopback/repository';
// import {MongoDbDataSource} from '../datasources';
// import {User, UserRelations} from '../models';

// export class UserRepository extends DefaultCrudRepository<
//   User,
//   typeof User.prototype.username,
//   UserRelations
// > {
//   constructor(
//     @inject('datasources.mongoDB') dataSource: MongoDbDataSource,
//   ) {
//     super(User, dataSource);
//   }
// }
