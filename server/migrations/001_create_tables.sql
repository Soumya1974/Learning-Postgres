CREATE TABLE users (
    id UUID PRIMARY KEY NOT NULL DEFAULT gen_random_uuid(),
    name VARCHAR(50) NOT NULL,
    email  VARCHAR(250) NOT NULL UNIQUE 
);

CREATE TABLE projects (
    id UUID PRIMARY KEY NOT NULL DEFAULT gen_random_uuid(),
    title VARCHAR(50) NOT NULL,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE tasks (
    id UUID PRIMARY KEY NOT NULL DEFAULT gen_random_uuid(),
    title VARCHAR(50) NOT NULL,
    description TEXT NOT NULL,
    task_id UUID REFERENCES projects(id) ON DELETE CASCADE
);