interface User {
    name: string;
    email: string;
}

interface EditUser {
    uuid: string;
    name: string;
}

interface DeleteUser {
    uuid: string;
}

export {
    User,
    EditUser,
    DeleteUser
}