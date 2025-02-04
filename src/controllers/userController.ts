import User from '../models/User.js';
import { Request, Response } from 'express';

export const getAllUsers = async (_req: Request, res: Response): Promise<void> => {
    try {
        const users = await User.find().populate([
            { path: 'friends', select: 'username email' },
            { path: 'thoughts', select: 'thoughtText createdAt' }
        ]);


        res.json(users);
    } catch (error: any) {
        res.status(500).json({
            message: error.message
        });
    }
}

export const getUserById = async (req: Request, res: Response): Promise<void> => {
    try {
        const { userId } = req.params;
        const user = await User.findById(userId);
        if (!user) {
            res.status(404).json({
                message: 'User not found',
            })
            return;
        }

        res.json(user);
    } catch (err) {
        res.status(500).json(err);
    }
};

export const createUser = async (req: Request, res: Response) => {
    try {
        const user = await User.create(req.body);
        res.json(user);
    } catch (err) {
        res.status(500).json(err);
    }
}

export const updateUserById = async (req: Request, res: Response): Promise<void> => {
    try {
        const { userId } = req.params;

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            req.body,
            { new: true }
        );
        if (!updatedUser) {
            res.status(404).json({
                message: 'User not found',
            });
            return;
        }
        res.json({ message: 'User successfully updated' });
    } catch (error: any) {
        res.status(500).json({
            message: error.message
        });
    }
}

export const deleteUserById = async (req: Request, res: Response): Promise<void> => {
    try {
        const { userId } = req.params;

        const deletedUser = await User.findByIdAndDelete(
            userId,
        );
        if (!deletedUser) {
            res.status(404).json({
                message: 'User not deleted',
            });
            return;
        }
        res.json({ message: 'User successfully deleted' });
    } catch (error: any) {
        res.status(500).json({
            message: error.message
        });
    }

};

/*export default {
    getAllUsers,
    getUserById,
    createUser,
    updateUserById,
    deleteUserById,
}*/

