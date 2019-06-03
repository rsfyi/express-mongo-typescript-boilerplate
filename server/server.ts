import * as bodyParser from 'body-parser'
import * as compression from 'compression'
import * as cors from 'cors'
import * as csurf from 'csurf'
import * as express from 'express'
import * as helmet from 'helmet'
import * as morgan from 'morgan'
import rateLimit from 'express-rate-limit'
import { NextFunction, Request, Response } from 'express'

import router from './routes'
import { dbCon } from './models'

const port = 4100;

const app = express();

/**
 *  security checks
 */
app.use(helmet());
app.use(cors());
// app.use(csurf());
// app.use(
// 	rateLimit({
// 		windowMs: 15 * 60 * 1000, // 15 minutes
// 		max: 100 // limit each IP to 100 requests per windowMs
// 	})
// );

/**
 * parse data to json
 */
app.use(bodyParser.json());
app.use(compression());

/**
 * log data to console
 */
app.use(morgan('dev'));

app.use('/', router);

app.use('**', (req: Request, res: Response, next: NextFunction) => {
	next({ message: 'No Routes found' });
});

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
	res.json({ code: 422, message: err.message });
});

app.listen(port, async () => {
	try {
		// await dbCon();
		console.log(`Server is listening at http://localhost:${port}`);
	} catch (e) {
		console.log('Error ...', e.message);
	}
});
