import express, { Router } from "express";
import { handleCreateUser, handleDeleteUser, handleUpdateUser } from "./user.controller.ts";

const userRoute: Router = express.Router();

userRoute.post('/user/signup', handleCreateUser);
userRoute.patch('/user/edit', handleUpdateUser);
userRoute.delete('/user/delete', handleDeleteUser);

export default userRoute;