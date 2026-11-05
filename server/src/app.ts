import express from "express";
import { errorHandler } from "./shared/middlewares/errorHandler.ts";
import { AppError } from "./shared/utils/AppError.ts";

const app = express();
app.use(express.json());


// Catch-all route for undefined endpoints
app.use((req, res, next) => {
    next(new AppError(404, `Route ${req.method} ${req.originalUrl} not found`));
});

app.use(errorHandler);

export default app;