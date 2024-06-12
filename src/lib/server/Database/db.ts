import {DataSource} from "typeorm";
import "reflect-metadata";
const entitiesLoader = import.meta.glob(['./Entities/*.db.ts']);
const entitiesPromises = Object.values(entitiesLoader).map((loader) => loader());
const entities = (await Promise.all(entitiesPromises)).map((entity) => (entity as any).default);



class TypeORM {
    private static instance: Promise<DataSource> | null = null;

    private constructor() {
        //force singleton
    }

    public static getInstance(): Promise<DataSource> {
        if (this.instance === null) {
            TypeORM.createInstance();
        }
        return TypeORM.instance as Promise<DataSource>;
    }


    private static createInstance() : void {
        if(TypeORM.instance === null) {
            TypeORM.instance = new DataSource({
                type: 'postgres',
                host: process.env.POSTGRES_HOST ?? 'localhost',
                port: parseInt(process.env.POSTGRES_PORT ?? '5432', 10),
                username: process.env.POSTGRES_USER,
                password: process.env.POSTGRES_PASSWORD,
                database: process.env.POSTGRES_DB,
                entities,
                synchronize: true,
                installExtensions: true,
                logging: true,
                connectTimeoutMS: 10000,
                poolErrorHandler: (err) => {
                    console.error('Pool Error:', err);
                }
            }).initialize();
        }
    }
}


export {TypeORM};