import dal_mysql from "../Utils/dal_mysql";
import { OkPacket } from "mysql";
import Vacation from './../Models/Vacation';
import randomUtils from '../Utils/randonUtils';

const createVacationsTable = async () => {
  const SQLcommand = `
    CREATE TABLE IF NOT EXISTS project3.vacations (
        vacationId INT NOT NULL AUTO_INCREMENT,
        destination VARCHAR(100) NOT NULL,
        description VARCHAR(500) NOT NULL,
        startDate DATE NOT NULL,
        endDate DATE NOT NULL,
        price INT NOT NULL,
        image VARCHAR(500) NOT NULL,
        PRIMARY KEY (vacationId));`;
  await dal_mysql.execute(SQLcommand);

  for (let i=0; i<12; i++) {
    const vacation: Vacation = getRandomVacation();
    await addVacation(vacation);
  }
};

const getRandomVacation = () => {
  const startMonth = randomUtils.getRandomNumber(7);
  const duration = randomUtils.getRandomNumber(3);
  const vacation: Vacation = new Vacation(0, 
    randomUtils.getRandomString(), 
    randomUtils.getRandomString(),
     new Date(2023, startMonth, randomUtils.getRandomNumber(27)), 
     new Date(2023, startMonth + duration, randomUtils.getRandomNumber(27)), 
     randomUtils.getRandomNumber(1000), 
     '');
  return vacation;
};

const dropVacationsTable = async () => {
  const SQLcommand = `DROP TABLE IF EXISTS project3.vacations;`;
  await dal_mysql.execute(SQLcommand);
};

const addVacation = async (newVacation: Vacation) => {
    const SQLcommand = `
  INSERT INTO project3.vacations 
  (destination,description,startDate,endDate,price,image) 
  VALUES 
  ('${newVacation.destination}',
  '${newVacation.description}',
  '${newVacation.startDate.getFullYear()}-${newVacation.startDate.getMonth()}-${newVacation.startDate.getDate()}',
  '${newVacation.endDate.getFullYear()}-${newVacation.endDate.getMonth()}-${newVacation.endDate.getDate()}',
  '${newVacation.price}',
  '${newVacation.image}');
  `;

    const result: OkPacket = await dal_mysql.execute(SQLcommand);
    return result.insertId;
};

const deleteVacation = async (vacationId: number) => {
  const SQLcommand = `DELETE FROM project3.vacations WHERE vacationId=${vacationId}`;
  return dal_mysql.execute(SQLcommand).then(() => true).catch(() => false);
};

const getAllVacations = async (userId: number) => {
  /*const SQLcommand = `SELECT
  v.vacationId,v.destination,v.description,v.startDate,v.endDate,v.price,v.image,
  COUNT(f.userId) AS followersCount,
    CASE f.userId
      WHEN ${userId} THEN true
      ELSE false
    END AS isFollow
FROM
  vacations v
  LEFT JOIN followers f 
  ON v.vacationId = f.vacationId
GROUP BY
  v.vacationId, isFollow`;*/
  const SQLcommand = "SELECT * FROM project3.vacations";
  /*const SQLcommandCombined = `SELECT
  innerTable.vacationId,innerTable.destination,innerTable.description,innerTable.startDate,innerTable.endDate,innerTable.price,innerTable.image,
  SUM(innerTable.followersCount) as followersCount,
    SUM(innerTable.isFollow) as isFollow
    FROM (${SQLcommand}) innerTable group by innerTable.vacationId;`;*/
  return await dal_mysql.execute(SQLcommand);
};

const getSingleVacation = async (vacationId: number): Promise<Vacation> => {
  const SQLcommand = `SELECT * FROM project3.vacations WHERE vacationId=${vacationId}`;
  const singleVacation = await dal_mysql.execute(SQLcommand);
  return singleVacation[0];
};

const updateVacation = async (vacation: Vacation) => {
  const SQLcommand = `UPDATE project3.vacations
  SET destination = ${vacation.destination}, 
  description = ${vacation.description}, 
  startDate = ${vacation.startDate}, 
  endDate = ${vacation.endDate}, 
  price = ${vacation.price}, 
  image = ${vacation.image} 
  WHERE vacationId=${vacation.vacationId};`;
  return dal_mysql.execute(SQLcommand).then(() => true).catch(() => false);
};

  export default {
    dropVacationsTable,
    createVacationsTable,
    addVacation,
    deleteVacation,
    getAllVacations,
    updateVacation,
    getSingleVacation,
  };