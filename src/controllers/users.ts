import { Request, Response } from 'express';
import { deleteUserById, getUserById, getUsers } from '../db/users';

export const getAllUsers = async (req: Request, res: Response): Promise<Response> => {
    try{

        const users =await getUsers();
        return res.status(200).json(users);
    }catch(error){
        console.log(error);
        return res.sendStatus(400);
    }
};

export const deleteUser = async (req: Request, res: Response): Promise<Response> => {
    try{

        const {id}=req.params;
        const deleteUser =await deleteUserById(id);
        return res.json(deleteUser);

    }catch(error){
        console.log(error);
        return res.sendStatus(400);
    }
}

export const updateUser = async (req: Request, res: Response): Promise<Response> => {
    try{

        const {id}=req.params;
        const {username}=req.body;
        if(!username){
            res.sendStatus(400);
            return;
        }
        
        const user=await getUserById(id);
        await user.save();

        res.status(200).json(user).end();
        return;
        
    }catch(error){
        console.log(error);
        return res.sendStatus(400);
    }
}

