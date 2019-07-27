import * as dotenv from 'dotenv';
import * as express from 'express';
import { createConnection } from 'typeorm';
import * as http from 'http';
import * as helmet from 'helmet';
import * as compression from 'compression';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import ensureAuthenticated from '../helpers/jwtToken';
import router from '../routes/v1';
// import {User} from "../../src/entity/User";
dotenv.config();

const NODE_ENV = process.env.NODE_ENV || 'development';
const cfg = require(`../../config/${NODE_ENV}`);

const app: express.Application = express();

const port = cfg.port;

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
}).catch(error => console.log(error));

server.listen(port, () => {
	console.log('NODE_ENV:', NODE_ENV);
	console.log('API Server is listening on port:', port);
});

