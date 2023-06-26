import dal_mysql from "../Utils/dal_mysql"; 

const createFollowersTable = async () => {
    const SQLcommand = `CREATE TABLE IF NOT EXISTS project3.followers (
        userId INT,
        vacationId INT,
        FOREIGN KEY (userId) REFERENCES project3.users (userId),
        FOREIGN KEY (vacationId) REFERENCES project3.vacations (vacationId),
        PRIMARY KEY (userId, vacationId));`;
    await dal_mysql.execute(SQLcommand);

    await addFollower(2, 3);
    await addFollower(2, 5);
    await addFollower(2, 6);
    await addFollower(2, 11);
    await addFollower(3, 1);
    await addFollower(3, 5);
  };

  const dropFollowersTable = async () => {
    const SQLcommand = `DROP TABLE IF EXISTS project3.followers;`;
    await dal_mysql.execute(SQLcommand);
  };

  const addFollower = async (userId: number, vacationId: number) => {
    const SQLcommand = `
  INSERT INTO project3.followers 
  (userId, vacationId) 
  VALUES 
  ('${userId}','${vacationId}');`;
  return await dal_mysql.execute(SQLcommand);
  };

  const removeFollower = async (userId: number, vacationId: number) => {
    const SQLcommand = `DELETE FROM vacation.follow WHERE userId=${userId} AND vacationKey=${vacationId};`;
    return await dal_mysql.execute(SQLcommand);
  };

  export default {
    dropFollowersTable,
    createFollowersTable,
    addFollower,
    removeFollower,
  };