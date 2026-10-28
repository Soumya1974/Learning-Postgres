import type { Request, Response, NextFunction } from "express";
import { AppError } from "../../shared/utils/AppError.ts";
import { handleCreateProjectServices, handleGetProjectServices } from "./project.services.ts";
import { CreateProject, ViewProjects } from "./project.types.ts";

export const handleCreateProject = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const projectData: CreateProject = req.body;

        if (!projectData) {
            throw new AppError(400, "User id or project title must not be empty");
        }

        const response: CreateProject = await handleCreateProjectServices(projectData);

        return res.status(201).json({
            message: "Project created",
            success: true,
            response: response
        })

    } catch (error) {
        next(error);
    }
}

export const handleGetProjects = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { userId } = req.body as ViewProjects;

        if(!userId){
            throw new AppError(400, "User id must not be empty");
        }

        const response  = await handleGetProjectServices({ userId });

        res.status(200).json({
            response: response,
            success: true
        })

    } catch (error) {
        next(error);
    }
}