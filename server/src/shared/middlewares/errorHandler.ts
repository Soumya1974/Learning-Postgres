import {type Request, type Response, type NextFunction } from "express";
import { AppError } from "../utils/AppError.ts";

export const errorHandler = (
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if(err instanceof AppError){
        console.error(err);
        return res.status(err.statusCode).json({
            message: err.message,
            success: false,
        })
    }

    console.error("Unhandled request error:", err);
    res.status(500).json({
        message: "Server error Here",
        success: false
    })
}