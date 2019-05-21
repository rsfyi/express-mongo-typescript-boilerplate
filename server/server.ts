import { Request, Response, NextFunction } from 'express';
import { Server } from 'http';
import * as express from 'express';
import * as cors from 'cors';
import * as morgan from 'morgan';
import * as bodyParser from 'body-parser';

import { dbCon } from './models';

import router from './routes';

const port = 4100;

const app = express();
const httpServer = new Server(app);

app.use(morgan('dev'));
app.use(cors());
app.use(bodyParser.json());

app.use('/', router);

app.use('**', (req: Request, res: Response, next: NextFunction) => {
    next({ message: 'No Routes found' });
});

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    res.json({ code: 422, message: err.message });
});

httpServer.listen(port, async () => {
    try {
        await dbCon();
        console.log(`Server is listening at http://localhost:${port}`);
    } catch (e) {
        console.log('Error ...', e.message);
    }
});
