import { Request, Response, NextFunction } from 'express';
import { getUserBySessionToken } from '../db/users';
import { get,merge } from 'lodash';

export const isOwner = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const {id}=req.params;
        const currentUserId=get(req,'identity._id')as string;

        if(!currentUserId){
            res.sendStatus(403);
        }
        if(currentUserId.toString()!=id){
            res.sendStatus(403);
            return;
        }

        next();
    }catch(error){
        console.log(error);
         res.sendStatus(400);
         return;
    }
};
export const isAuthenticated = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const sessionToken = req.cookies['VENKAT-AUTH'];

    // Check if session token exists
    if (!sessionToken) {
       res.sendStatus(403); // Forbidden
       return;
    }

    // Retrieve user by session token
    const existingUser = await getUserBySessionToken(sessionToken);

    // Check if user exists
    if (!existingUser) {
       res.sendStatus(403); // Forbidden
       return;
    }

    // Attach user information to the request object
    merge(req, { identity: existingUser });

    // Call the next middleware or route handler
    next(); // Ensure to call next() to continue the middleware chain
  } catch (error) {
    console.error(error);
    res.sendStatus(400); // Bad Request
  }
};