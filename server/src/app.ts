import express from "express";
import taskRoute from "./modules/tasks/task.routes.ts";
import userRoute from "./modules/users/user.routes.ts";
import projectRoute from "./modules/projects/project.routes.ts";
import { errorHandler } from "./shared/middlewares/errorHandler.ts";
import { AppError } from "./shared/utils/AppError.ts";

const app = express();
app.use(express.json());

app.use("/api", taskRoute);
app.use("/api", userRoute);
app.use("/api", projectRoute);

// Catch-all route for undefined endpoints
app.use((req, res, next) => {
    next(new AppError(404, `Route ${req.method} ${req.originalUrl} not found`));
});

app.use(errorHandler);

export default app;
