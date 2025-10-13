import User from "../../types/user.interface";

const pswd = "secretPswd_1234";

const defaultUsers: User[] = [
    {
        name: "Hanzeel",
        lastName: "Villa",
        email: "testemail@gmail.com",
        username: "Walle",
        rawPassword: pswd
    },
    {
        name: "Luis",
        lastName: "Corona",
        email: "testemail2@gmail.com",
        username: "Invisible",
        rawPassword: pswd
    }
];

export default defaultUsers;