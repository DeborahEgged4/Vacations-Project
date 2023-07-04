import dal_mysql from "../Utils/dal_mysql";
import {OkPacket} from "mysql";
import Vacation from './../Models/Vacation';
import randomUtils from '../Utils/randonUtils';
import {MOCK_DATA, mockVacations} from "../mockData";
import followerLogic from './FollowerLogic'

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
  if (MOCK_DATA) {
    mockVacations.push(newVacation);
    return newVacation.vacationId
  } else {
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
  }
};

const deleteVacation = async (vacationId: number) => {
  if (MOCK_DATA) {
    const index: number = mockVacations.findIndex(vacation => vacation.vacationId === vacationId);
    mockVacations.splice(index, 1);
    return true;
  } else {
    const SQLcommand = `DELETE FROM project3.vacations WHERE vacationId=${vacationId}`;
    return dal_mysql.execute(SQLcommand).then(() => true).catch(() => false);
  }

};

const getAllVacations = async () => {
  if (MOCK_DATA) {
    return mockVacations;
  } else {
    const SQLcommand = "SELECT * FROM project3.vacations";
    return await dal_mysql.execute(SQLcommand);
  }
};

const getSingleVacation = async (vacationId: number): Promise<Vacation> => {
  if (MOCK_DATA) {
    return mockVacations.find(vacation => vacation.vacationId === vacationId);
  } else {
    const SQLcommand = `SELECT * FROM project3.vacations WHERE vacationId=${vacationId}`;
    const singleVacation = await dal_mysql.execute(SQLcommand);
    return singleVacation[0];
  }

};

const updateVacation = async (vacation: Vacation) => {
  if (MOCK_DATA) {
    const index: number = mockVacations.findIndex(vacation => vacation.vacationId === vacation.vacationId);
    mockVacations[index] = vacation;
    return true;

  } else {
    const SQLcommand = `UPDATE project3.vacations
  SET destination = ${vacation.destination}, 
  description = ${vacation.description}, 
  startDate = ${vacation.startDate}, 
  endDate = ${vacation.endDate}, 
  price = ${vacation.price}, 
  image = ${vacation.image} 
  WHERE vacationId=${vacation.vacationId};`;
    return dal_mysql.execute(SQLcommand).then(() => true).catch(() => false);
  }

};


const getFollowedVacationsOfUser = async (userId: number) => {
  const vacationIds = await followerLogic.getVacationFollowsOfUser(userId)
    if (MOCK_DATA) {
        return mockVacations.filter(vacation => vacationIds.includes(vacation.vacationId));
    } else {
        const SQLcommand = `SELECT * FROM project3.vacations WHERE vacationId IN (${vacationIds.join(',')})`;
        return await dal_mysql.execute(SQLcommand);
    }
}

  export default {
    dropVacationsTable,
    createVacationsTable,
    addVacation,
    deleteVacation,
    getAllVacations,
    updateVacation,
    getSingleVacation,
    getFollowedVacationsOfUser,
  };