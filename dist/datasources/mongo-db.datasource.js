"use strict";
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongoDbDataSource = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@loopback/core");
const repository_1 = require("@loopback/repository");
const user = (_a = process.env.MONGO_USER) !== null && _a !== void 0 ? _a : '';
const password = (_b = process.env.MONGO_PASS) !== null && _b !== void 0 ? _b : '';
const port = (_c = process.env.MONGO_PORT) !== null && _c !== void 0 ? _c : '27017';
// const url = 'mongodb:'+user+':'+password+'@'+host+'/UniGraph';
const config = {
    name: 'mongoDB',
    connector: 'mongodb',
    host: process.env.MONGO_HOST ? process.env.MONGO_HOST : 'localhost',
    port,
    user,
    password,
    database: 'UniGraph',
    allowExtendedOperators: true
};
// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
let MongoDbDataSource = class MongoDbDataSource extends repository_1.juggler.DataSource {
    constructor(dsConfig = config) {
        super(dsConfig);
    }
};
MongoDbDataSource.dataSourceName = 'mongoDB';
MongoDbDataSource.defaultConfig = config;
MongoDbDataSource = (0, tslib_1.__decorate)([
    (0, core_1.lifeCycleObserver)('datasource'),
    (0, tslib_1.__param)(0, (0, core_1.inject)('datasources.config.mongoDB', { optional: true })),
    (0, tslib_1.__metadata)("design:paramtypes", [Object])
], MongoDbDataSource);
exports.MongoDbDataSource = MongoDbDataSource;
//# sourceMappingURL=mongo-db.datasource.js.map