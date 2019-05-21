import { Router } from 'express';
import { UserController } from '../controller/user.controller';

const router = Router();

router.post('/create', UserController.createUser);

router.post('/create/role', UserController.createUserRole);

router.patch('/update/:user_id', UserController.updateUser);

router.get('/detail/:user_id', UserController.getUserDetail);

export const userRoutes = router;