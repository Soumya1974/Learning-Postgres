import express, { Router, type Request, type Response } from "express";
import { AppError } from "../../shared/utils/AppError";

const taskRoute: Router = express.Router();

taskRoute.get("/createtask", (req: Request, res: Response) => {
    throw new AppError(404, "Bad request");
    res.send("Hello world")
})

export default taskRoute;