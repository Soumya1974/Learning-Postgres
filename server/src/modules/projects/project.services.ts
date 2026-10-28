import { AppError } from "../../shared/utils/AppError.ts";
import { handleCreateProjectRow, handleGetProjectRow } from "./project.repository.ts";
import { CreateProject, ViewProjects } from "./project.types.ts";

export const handleCreateProjectServices = async (input: CreateProject) => {
    if(!input || typeof input !== "object"){
        throw new AppError(400, "Request body must include project title and user id");
    }

    if(!input.title || input.title.trim() === ""){
        throw new AppError(400, "Missing project title or user id");
    }

    if(!input.userId || input.userId.trim() === ""){
        throw new AppError(400, "Missing project title or user id");
    }

    return await handleCreateProjectRow(input);
}

export const handleGetProjectServices = async (input: ViewProjects) => {
    if(!input || typeof input !== "object"){
        throw new AppError(400, "Request body must include user id");
    }

    if(!input.userId || input.userId.trim() === ""){
        throw new AppError(400, "Missing user id");
    }

    return await handleGetProjectRow(input);
}