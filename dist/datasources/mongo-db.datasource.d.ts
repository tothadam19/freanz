import { LifeCycleObserver } from '@loopback/core';
import { juggler } from '@loopback/repository';
export declare class MongoDbDataSource extends juggler.DataSource implements LifeCycleObserver {
    static dataSourceName: string;
    static readonly defaultConfig: {
        name: string;
        connector: string;
        host: string;
        port: string;
        user: string;
        password: string;
        database: string;
        allowExtendedOperators: boolean;
    };
    constructor(dsConfig?: object);
}
