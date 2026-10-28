import type { Request, Response, NextFunction } from "express"
import { response } from "express"
import { EditUser, User } from "./user.types.ts"
import { handleCreateUserService, handleDeleteUserService, handleUserUpdateService } from "./user.services.ts";
import { AppError } from "../../shared/utils/AppError.ts";

export const handleCreateUser = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const userData: User = req.body;
        if (!userData) {
            throw new AppError(400, "User name and uuid must not be empty");
        }
        const response: User = await handleCreateUserService(userData);

        res.status(200).json({
            message: "User created",
            success: true,
            response: response
        })

    } catch (error) {
        next(error);
    }
}

export const handleUpdateUser = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const userData: EditUser = req.body;

        if (!userData) {
            throw new AppError(400, "User name and uuid must not be empty");
        }

        const reponse: EditUser = await handleUserUpdateService(userData);

        res.status(200).json({
            message: "Updated user information",
            success: true,
            response: response
        })

    } catch (error) {
        next(error);
    }
}

export const handleDeleteUser = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const userData = req.body;

        if (!userData) {
            throw new AppError(400, "User id must not be empty");
        }

        await handleDeleteUserService(userData);

        res.status(200).json({
            message: "User Deleted",
            success: true,
        })
        
    } catch (error) {
        next(error);
    }
}