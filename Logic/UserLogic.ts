import dal_mysql from "../Utils/dal_mysql";
import {User} from './../Models/User';

const createUsersTable = async () => {
    const SQLcommand = `CREATE TABLE IF NOT EXISTS project3.users (
    userId INT NOT NULL AUTO_INCREMENT,
    firstName VARCHAR(45) NOT NULL,
    lastName VARCHAR(45) NOT NULL,
    email VARCHAR(45) NOT NULL,
    password VARCHAR(45) NOT NULL,
    isAdmin BOOLEAN NOT NULL DEFAULT false,
    PRIMARY KEY (userId));`;
    await dal_mysql.execute(SQLcommand);

    const admin = new User(0, 'admin', 'admin', 'admin@google.com', 'admin', true);
    await register(admin, true);

    const user1 = new User(0, 'user1', 'user1', 'user1@google.com', 'user1', false);
    await register(user1);

    const user2 = new User(0, 'user2', 'user2', 'user2@google.com', 'user2', false);
    await register(user2);
};

const dropUsersTable = async () => {
    const SQLcommand = `DROP TABLE IF EXISTS project3.users;`;
    await dal_mysql.execute(SQLcommand);
};

const register = async (newUser: User, isAdmin?: boolean) => {
    const SQLcommand = `
INSERT INTO project3.users 
(firstName,lastName,email,password,isAdmin) 
VALUES 
('${newUser.firstName}','${newUser.lastName}','${newUser.email}','${newUser.password}',${isAdmin ? true : false});
`;
    const response = dal_mysql.execute(SQLcommand);
};

// CHECK IF EMAIL EXISTS IN DATABASE FOR REGISTER
const checkEmail = async (email: string): Promise<boolean> => {
    const SQLcommand = `SELECT COUNT(*) AS count FROM project3.users WHERE email = '${email}';`;
    const result = await dal_mysql.execute(SQLcommand);
    return result[0].count > 0;
};

// CHECK IF EMAIL AND PASSWORD EXISTS IN DATABASE FOR LOGIN
const checkUser = async (email: string, password: string): Promise<any> => {
    const SQLcommand = `SELECT * FROM project3.users WHERE email = '${email}' AND password = '${password}';`;
    return await dal_mysql.execute(SQLcommand);
};

export default {
    dropUsersTable,
    createUsersTable,
    register,
    checkEmail,
    checkUser,
};
