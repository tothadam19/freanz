import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';

const host = process.env.MONGO_HOST ?? 'localhost';
const user = process.env.MONGO_USER ?? '';
const password = process.env.MONGO_PASS ?? '';
const port = process.env.MONGO_PORT ?? '27017';

// const url = 'mongodb:'+user+':'+password+'@'+host+'/UniGraph';

const config = {
  name: 'mongoDB',
  connector: 'mongodb',
  host,
  port,
  user,
  password,
  database: 'UniGraph',
};

// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
@lifeCycleObserver('datasource')
export class MongoDbDataSource extends juggler.DataSource
  implements LifeCycleObserver {
  static dataSourceName = 'mongoDB';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.mongoDB', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
