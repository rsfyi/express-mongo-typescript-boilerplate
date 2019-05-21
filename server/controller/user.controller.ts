import { NextFunction, Request, Response } from 'express';

import { models } from '../models';

export const UserController = {

    createUser(req: Request, res: Response, next: NextFunction) {
        models.User.create(req.body)
            .then(user => {
                res.status(200).json({
                    code: 200,
                    message: 'created user successfully',
                    data: {
                        id: user.id
                    }
                });
            })
            .catch(next);
    },

    updateUser(req: Request, res: Response, next: NextFunction) {
        models.User.findOneAndUpdate({ _id: req.params.user_id }, { $push: { roles: req.body.role } })
            .then(user => {
                res.status(200).json({
                    code: 200,
                    message: 'updated user successfully',
                    data: {
                        id: user.id
                    }
                });
            })
            .catch(next);
    },

    createUserRole(req: Request, res: Response, next: NextFunction) {
        models.UserRole.create(req.body)
            .then((user_role) => {
                res.status(200).json({
                    code: 200,
                    message: 'created user role successfully',
                    data: {
                        id: user_role.id
                    }
                });
            })
            .catch(next);
    },

    getUserDetail(req: Request, res: Response, next: NextFunction) {
        models.User.findOne({_id: req.params.user_id}).populate('roles')
            .then((user) => {
                res.status(200).json({
                    code: 200,
                    message: 'returned user detail successfully',
                    data: {
                        user
                    }
                });
            })
            .catch(next);
    }


};
