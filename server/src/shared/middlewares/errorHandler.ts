import type { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/AppError.ts";

export const errorHandler = (
    err: unknown,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    // If headers were already sent, delegate to Express's built-in error handler
    if (res.headersSent) {
        return next(err);
    }

    const isDev = process.env.NODE_ENV !== "production";

    // 1. Handled Operational Errors (AppError)
    if (err instanceof AppError) {
        return res.status(err.statusCode).json({
            success: false,
            message: err.message,
            ...(err.details !== undefined ? { details: err.details } : {}),
            ...(isDev ? { stack: err.stack } : {})
        });
    }

    // 2. Malformed JSON Body (thrown by express.json middleware)
    if (
        err instanceof SyntaxError &&
        "status" in err &&
        (err as { status?: number }).status === 400
    ) {
        return res.status(400).json({
            success: false,
            message: "Invalid JSON format in request body"
        });
    }

    // 3. PostgreSQL Database Errors (pg)
    if (typeof err === "object" && err !== null && "code" in err) {
        const pgError = err as { code: string; detail?: string };

        switch (pgError.code) {
            case "23505": // Unique constraint violation
                return res.status(409).json({
                    success: false,
                    message: "A record with this value already exists",
                    ...(isDev && pgError.detail ? { details: pgError.detail } : {})
                });

            case "23503": // Foreign key constraint violation
                return res.status(400).json({
                    success: false,
                    message: "Referenced resource does not exist",
                    ...(isDev && pgError.detail ? { details: pgError.detail } : {})
                });

            case "22P02": // Invalid input syntax (e.g. invalid UUID / integer)
                return res.status(400).json({
                    success: false,
                    message: "Invalid input syntax for database field",
                    ...(isDev && pgError.detail ? { details: pgError.detail } : {})
                });
        }
    }

    // 4. Unexpected / Unhandled Programmer Errors (500)
    console.error("Unhandled request error:", err);

    return res.status(500).json({
        success: false,
        message: "Internal server error",
        ...(isDev
            ? {
                  error: err instanceof Error ? err.message : String(err),
                  stack: err instanceof Error ? err.stack : undefined
              }
            : {})
    });
};
