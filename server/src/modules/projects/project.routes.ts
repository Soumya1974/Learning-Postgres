import express, { Router } from "express";
import { handleCreateProject, handleGetProjects } from "./project.controller.ts";

const projectRoute: Router = express.Router();

projectRoute.post('/project/create', handleCreateProject);
projectRoute.get('/projects/view', handleGetProjects);

export default projectRoute;