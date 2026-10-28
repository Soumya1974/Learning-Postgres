import express, { Router } from "express";
import { handleCreateProject } from "./project.controller.ts";

const projectRoute: Router = express.Router();

projectRoute.post('/project/create', handleCreateProject);
projectRoute.get('/projects/view');

export default projectRoute;