import { pool } from "../../infrastructure/database/pool.ts";
import { CreateProject, ViewProjects } from "./project.types.ts";

export const handleCreateProjectRow = async (input: CreateProject) => {
    const {userId, title} = input;

    const query = `
        INSERT INTO projects (title, user_id)
        VALUES ($1, $2)
        RETURNING *;
    `
    const result = await pool.query(query, [title, userId]);

    return result.rows[0];
}

export const handleGetProjectRow = async (input: ViewProjects) => {
    const query = `
        SELECT 
            users.name,
            users.email,
            projects.title
        FROM projects
        INNER JOIN users
        ON projects.user_id = users.id
        WHERE users.id = $1;
    `
    const result = await pool.query(query, [input.userId]);
    return result.rows;
}