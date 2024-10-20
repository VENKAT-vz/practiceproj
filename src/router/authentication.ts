import express, { Request, Response, NextFunction } from 'express';
import { login, register } from '../controllers/authentication';
import { deleteUser, getAllUsers, updateUser } from '../controllers/users';
import { isAuthenticated,isOwner} from '../middlewares';
const router = express.Router();

router.post('/register', (req: Request, res: Response, next: NextFunction) => {
  register(req, res).catch(next);
});

router.post('/login', (req: Request, res: Response, next: NextFunction) => {
    login(req, res).catch(next);
  });


//   router.get('/users',(req: Request, res: Response, next: NextFunction) => {
//     getAllUsers(req, res).catch(next);
//   });

router.get('/users', isAuthenticated, (req: Request, res: Response, next: NextFunction) => {
    getAllUsers(req, res).catch(next);
  });

  router.patch('/users/:id', isAuthenticated, isOwner,(req: Request, res: Response, next: NextFunction) => {
    updateUser(req, res).catch(next);
  });

  router.delete('/users/:id',isAuthenticated, isOwner, (req: Request, res: Response, next: NextFunction) => {
    deleteUser(req, res).catch(next);
  });


//   router.delete('/users/:id', (req: Request, res: Response, next: NextFunction) => {
//     deleteUser(req, res).catch(next);
//   });
export default router;