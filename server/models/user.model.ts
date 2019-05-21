import { compare, genSaltSync, hash } from 'bcryptjs';

import { NextFunction } from 'express';
import { model, Schema } from 'mongoose';

const UserSchema = new Schema({
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String
    },
    roles: [{
        type: Schema.Types.ObjectId,
        ref: 'user-role'
    }]
}, { timestamps: true });

// hash password before saving data
UserSchema.pre('save', async function hashUserPassword(next: NextFunction) {
    try {
        const user = this;
        user['password'] = await hash(user['password'], genSaltSync(12));
        next();
    } catch (err) {
        return next(err);
    }
});

// adding method for comparing user password
UserSchema.methods.comparePassword = function (password: string) {
    return new Promise(async (resolve) => {
        if (await compare(password, this.hashed_password)) {
            resolve(true);
        } else {
            resolve(false);
        }
    });
};

export const User = model('user', UserSchema);
