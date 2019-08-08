import * as dotenv from 'custom-env';
import { createConnection, Connection } from 'typeorm';

const NODE_ENV: string = process.env.NODE_ENV || 'development';
const cfg: any = require(`../../config/${NODE_ENV}`);
dotenv.env(NODE_ENV);

const TYPEORM_CONNECTION: any = process.env.TYPEORM_CONNECTION;
const TYPEORM_DATABASE: any = process.env.TYPEORM_DATABASE;
const TYPEORM_ENTITIES: any = process.env.TYPEORM_ENTITIES;
const TYPEORM_ENTITIES_DIR: any = process.env.TYPEORM_ENTITIES_DIR;
const TYPEORM_SYNCHRONIZE: any = process.env.TYPEORM_SYNCHRONIZE;

export default async (): Promise<Connection | undefined> => {
	try {
		return await createConnection();
	} catch (error) {
		return undefined;
	}
};