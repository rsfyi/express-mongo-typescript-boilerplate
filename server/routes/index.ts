import { NextFunction, Request, Response, Router } from 'express'

import { userRoutes } from './user.route'

const router = Router();

router.get('/', (req: Request, res: Response, next: NextFunction) => {
    res.json({ message: "Hello world express" });
});

router.use('/user', userRoutes);

export default router;
