import dal_mysql from "../Utils/dal_mysql";
import {MOCK_DATA, mockUserVacationFollows} from "../mockData";

const createFollowersTable = async () => {
    const SQLcommand = `CREATE TABLE IF NOT EXISTS project3.followers (
        userId INT,
        vacationId INT,
        FOREIGN KEY (userId) REFERENCES project3.users (userId),
        FOREIGN KEY (vacationId) REFERENCES project3.vacations (vacationId),
        PRIMARY KEY (userId, vacationId));`;
    await dal_mysql.execute(SQLcommand);

    // await addFollower(2, 3);
    // await addFollower(2, 5);
    // await addFollower(2, 6);
    // await addFollower(2, 11);
    // await addFollower(3, 1);
    // await addFollower(3, 5);
};

const dropFollowersTable = async () => {
    const SQLcommand = `DROP TABLE IF EXISTS project3.followers;`;
    await dal_mysql.execute(SQLcommand);
};

const addFollower = async (userId: number, vacationId: number) => {
    if (MOCK_DATA) {
        mockUserVacationFollows.push({userId, vacationId});
        return;
    } else {
        const SQLcommand = `
  INSERT INTO project3.followers 
  (userId, vacationId) 
  VALUES 
  ('${userId}','${vacationId}');`;
        return await dal_mysql.execute(SQLcommand);
    }

};

const removeFollower = async (userId: number, vacationId: number) => {
    if (MOCK_DATA) {
        const indexToDelete = mockUserVacationFollows.findIndex(f => f.userId === userId && f.vacationId === vacationId);
        mockUserVacationFollows.splice(indexToDelete, 1);
        return;
    } else {
        const SQLcommand = `DELETE FROM vacation.follow WHERE userId=${userId} AND vacationKey=${vacationId};`;
        return await dal_mysql.execute(SQLcommand);
    }

};


const getVacationFollowsOfUser = async (userId: number): Promise<(number | string)[]> => {
    if (MOCK_DATA) {
        const follows = mockUserVacationFollows.filter(f => f.userId === userId);
        const vacationIds = follows.map(f => f.vacationId);
        return vacationIds;
    } else {
        const SQLcommand = `SELECT * FROM project3.followers WHERE userId=${userId};`;
        return await dal_mysql.execute(SQLcommand);
    }

}


export default {
    dropFollowersTable,
    createFollowersTable,
    addFollower,
    removeFollower,
    getVacationFollowsOfUser: getVacationFollowsOfUser
};