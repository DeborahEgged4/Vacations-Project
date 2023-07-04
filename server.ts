import cors from "cors";
import express from "express";
import bodyParser from "body-parser";
import ErrorHandler from "./MiddleWare/route-not-found";
import userRouter from "./Routes/UserRoutes";
import vacationRouter from "./Routes/VacationRoutes";
import followerRouter from "./Routes/FollowerRoutes";
import config from "./Utils/config";
import FollowerLogic from "./Logic/FollowerLogic";
import UserLogic from "./Logic/UserLogic";
import VacationLogic from "./Logic/VacationLogic";


const MOCK_DATA = true; // change to false to use real data from actual SQL database


//create server
const server = express();

//handle cors
server.use(cors());

//how we send the data back (JSON,XML,RAW,String)
server.use(express.json());

//parse the body as json , for easy work
server.use(bodyParser.json());

const initTables = async () => {
  await FollowerLogic.dropFollowersTable();
  await UserLogic.dropUsersTable();
  await VacationLogic.dropVacationsTable();

  await UserLogic.createUsersTable();
  await VacationLogic.createVacationsTable();
  await FollowerLogic.createFollowersTable();
};

// initTables();

//how to use the routes
server.use("/user", userRouter);

//how to use the routes
server.use("/vacation", vacationRouter);

//how to use the routes
server.use("/follower", followerRouter);

//handle errors (route not found)
server.use("*", ErrorHandler);

//start the server
server.listen(config.WebPort, () => {
  console.log(`listinging on http://${config.myWebhost}:${config.WebPort}`);
});
