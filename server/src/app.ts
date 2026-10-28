import express from "express";
import taskRoute from "./modules/tasks/task.routes.ts";
import userRoute from "./modules/users/user.routes.ts";
import projectRoute from "./modules/projects/project.routes.ts";
import { errorHandler } from "./shared/middlewares/errorHandler.ts";

const app = express();
app.use(express.json());

app.use("/api", taskRoute);
app.use("/api", userRoute);
app.use("/api", projectRoute);

app.use(errorHandler);

export default app;