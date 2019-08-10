import dotenv from 'custom-env';
import express from "express";
import { createConnection } from 'typeorm';
import http from 'http';
import helmet from 'helmet';
import compression from 'compression';
import bodyParser from 'body-parser';
import cors from 'cors';
import ensureAuthenticated from '../middlewares/jwtToken';
import router from '../routes/v1';
// import {User} from "../../src/entity/User";

const NODE_ENV: string = process.env.NODE_ENV || 'development';
const cfg: any = require(`../../config/${NODE_ENV}`);
dotenv.env(NODE_ENV);

// console.log('process.env.TYPEORM_ENTITIES', process.env.TYPEORM_ENTITIES);
// process.exit(0);

const app: express.Application = express();
const port: Number = cfg.port;

app.use(express.static('public'));
app.use(helmet());
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({ exposedHeaders: ['Link'] }));

app.use(ensureAuthenticated);
app.use(router);

const server = http.createServer(app);
// typorm connection
createConnection().then(async connection => {
	// console.log("Inserting a new user into the database...");
    // const user = new User();
    // user.firstName = "Juan";
    // user.lastName = "Canepa";
    // user.birth = '1980-10-17';
    // user.password = '123456';
    // user.email = 'jacanepa@gmail.com';
    // await connection.manager.save(user);
    // console.log("Saved a new user with id: " + user.id);
    // console.log("Loading users from the database...");
    // const users = await connection.manager.find(User);
    // console.log("Loaded users: ", users);
    // console.log("Here you can setup and run express/koa/any other framework.");
    server.listen(port, () => {
        console.log('NODE_ENV:', NODE_ENV);
        console.log('API Server is listening on port:', port);
    });    
}).catch(error => console.log(error));

module.exports = server;

