import { sign } from 'jsonwebtoken';

const createToken = (user: any) => {
    return sign(user, 'i am secret...which needs to  be changed gradually ...', {
        expiresIn: '24h'
    });
};

export const Jwt = {
    createToken
};