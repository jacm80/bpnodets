import * as moment from 'moment';
import * as jwt from 'jwt-simple';
import * as dotenv from 'dotenv';

dotenv.config();

const ensureAuthenticated = (req: any, res: any, next: any) => {
	try {
		if (req.path === '/api/v1/authenticate') return next();
		const { headers: { authorization } } = req;
		if (!authorization) {
			return res
				.status(403)
				.send({ message: "Tu petición no tiene cabecera de autorización" });
		}
		const token = authorization.replace('authorization ', '');
		const payload = jwt.decode(token, process.env.TOKEN_SECRET);
		if (payload.exp <= moment().unix()) {
			return res
				.status(401)
				.send({ message: "El token ha expirado" });
		}
		req.headers.Authorization = payload.Cookie;
		req.headers.Accept = 'application/json';
		next();
	} catch (err) {
		res
			.status(401)
			.send({ message: 'token de autenticación invalido' });
	}
};

export default ensureAuthenticated;