import { DeleteUser, EditUser, User } from "./user.types.ts"
import { AppError } from "../../shared/utils/AppError.ts"
import { handleCreateUserRow, handleDeleteUserRow, handleUserUpdateRow } from "./user.repository.ts";

export const handleCreateUserService = async(input: User) => {
    if(!input || typeof input !== "object"){
        throw new AppError(400, "Request body must include user name and email");
    }

    if(!input.name || input.name.trim() === ""){
        throw new AppError(400, "User name or email cannot be empty");
    }

    if(!input.email || input.email.trim() === ""){
        throw new AppError(400, "User name or email cannot be empty");
    }

    return await handleCreateUserRow(input);
}

export const handleUserUpdateService = async(input: EditUser) => {
    if(!input || typeof input !== "object"){
        throw new AppError(400, "Request body must include user name and uuid");
    }

    if(!input.name || input.name.trim() === ""){
        throw new AppError(400, "User name or uuid cannot be empty");
    }

    if(!input.uuid){
        throw new AppError(400, "User name or uuid cannot be empty");
    }

    return await handleUserUpdateRow(input);
}

export const handleDeleteUserService = async (input: DeleteUser) => {
    if(!input.uuid || typeof input.uuid !== "string" || input.uuid.trim() === ""){
        throw new AppError(400, "User id not found");
    }

    return await handleDeleteUserRow(input);
}