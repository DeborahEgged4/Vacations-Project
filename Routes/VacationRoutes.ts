import { NextFunction, Request, Response, Router } from "express";
import VacationLogic from "../Logic/VacationLogic";
import Vacation from './../Models/Vacation';
import IVacation from "../Front/front3/src/interfaces/Vacation";

const vacationRouter = Router();

vacationRouter.post(
  "/addVacation",
  async (request: Request, response: Response, next: NextFunction) => {
    const newVacation = request.body;
    const result = await VacationLogic.addVacation(newVacation);
    response.status(201).json(result);
  }
);

vacationRouter.get(
  "/getAllVacations",
  async (request: Request, response: Response, next: NextFunction) => {
    const vacations: Vacation[] = await VacationLogic.getAllVacations();
    response.status(200).json(vacations);
  }
);



vacationRouter.delete(
  "/deleteVacation/:vacationId",
  async (request: Request, response: Response, next: NextFunction) => {
    response.status(204).json(await VacationLogic.deleteVacation(+request.params.vacationId));
  }
);

vacationRouter.get(
  "/getSingleVacation/:vacationId",
  async (request: Request, response: Response, next: NextFunction) => {
    response.status(200).json(await VacationLogic.getSingleVacation(+request.params.vacationId));
  }
);


vacationRouter.put(
  "/updateVacation",
  async (request: Request, response: Response, next: NextFunction) => {
   response.status(202).json(await VacationLogic.updateVacation(request.body));
  }
);


vacationRouter.get(
    '/getUserFollowedVacations/:userId',
    async (request: Request, response: Response, next: NextFunction) => {
        response.status(200).json(await VacationLogic.getFollowedVacationsOfUser(+request.params.userId));
    }
)


export default vacationRouter;
