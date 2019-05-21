import * as mongoose from 'mongoose';

import { User } from './user.model';
import { UserRole } from './user-role.model';

const connection_url = `mongodb://localhost:27017/learn-db`;

const dbConnection = async () => {
    try {
        await mongoose.connect(connection_url, { useNewUrlParser: true });
    } catch (err) {
        throw err;
    }
};

mongoose.connection
    .once('open', () => console.log('Good to Go !!!'))
    .on('error', (err) => {
        throw err;
    });

export const dbCon = dbConnection;

export const models = {
    User,
    UserRole
};

