import dal_mysql from "../Utils/dal_mysql";
import {User} from './../Models/User';
import {MOCK_DATA, mockUsers} from "../mockData";

const createUsersTable = async () => {
    const SQLcommand = `CREATE TABLE IF NOT EXISTS project3.users (
    userId INT NOT NULL AUTO_INCREMENT,
    firstName VARCHAR(45) NOT NULL,
    lastName VARCHAR(45) NOT NULL,
    email VARCHAR(45) NOT NULL,
    password VARCHAR(45) NOT NULL,
    isAdmin BOOLEAN NOT NULL DEFAULT false,
    PRIMARY KEY (userId),
    UNIQUE (ID)
    );`;
    await dal_mysql.execute(SQLcommand);

};

const dropUsersTable = async () => {
    const SQLcommand = `DROP TABLE IF EXISTS project3.users;`;
    await dal_mysql.execute(SQLcommand);
};

const register = async (newUser: User, isAdmin?: boolean) => {
    if (MOCK_DATA) {
        // validate that the email is unique
        if (mockUsers.find(user => user.email === newUser.email)) {
            throw new Error(`Email ${newUser.email} already exists`);
        }
        mockUsers.push(newUser);
    } else {
        const SQLcommand = `
INSERT INTO project3.users 
(firstName,lastName,email,password,isAdmin) 
VALUES 
('${newUser.firstName}','${newUser.lastName}','${newUser.email}','${newUser.password}',${isAdmin ? true : false});
`;
        const response = dal_mysql.execute(SQLcommand);
    }
};


// CHECK IF EMAIL AND PASSWORD EXISTS IN DATABASE FOR LOGIN
const login = async (email: string, password: string): Promise<any> => {
    if (MOCK_DATA){
        const foundUser = mockUsers.find(user => user.email === email && user.password === password);
        if(foundUser){
            return foundUser;
        } else {
            return null;
        }
    } else {
        const SQLcommand = `SELECT * FROM project3.users WHERE email = '${email}' AND password = '${password}';`;
        return await dal_mysql.execute(SQLcommand);
    }
};

export default {
    dropUsersTable,
    createUsersTable,
    register,
    login,
};
