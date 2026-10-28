import { pool } from "../../infrastructure/database/pool.ts";
import { DeleteUser, EditUser, User } from "./user.types.ts";

export const handleCreateUserRow = async(input: User) => {
    const {name, email} = input;

    const query = `
        INSERT INTO users (name, email)
        VALUES ($1, $2)
        RETURNING *;
    `
    const result = await pool.query(query, [name, email]);

    return result.rows[0];
}

export const handleUserUpdateRow = async(input: EditUser) => {
    const {name, uuid} = input;
    const query = `
        UPDATE users
        SET name = $1
        WHERE id = $2
        RETURNING name;
    `

    const result = await pool.query(query, [name, uuid]);
    return result.rows[0];
}

export const handleDeleteUserRow = async(input: DeleteUser) => {
    const query = `
        DELETE FROM users WHERE id = $1;
    `
    const result = await pool.query(query, [input.uuid]);
}