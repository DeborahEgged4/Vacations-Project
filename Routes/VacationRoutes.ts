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
  "/getAllVacations/:userId",
  async (request: Request, response: Response, next: NextFunction) => {
    const vacations: Vacation[] = await VacationLogic.getAllVacations(+request.params.userId);
    response.status(200).json(vacations);
  }
);

const mockVacations: IVacation[] = [
    {
        vacationId: 1,
        destination: "London",
        description: "London is the capital and largest city of England and the United Kingdom.",
        image: "https://assets.editorial.aetnd.com/uploads/2019/03/topic-london-gettyimages-760251843-feature.jpg",
        startDate: new Date("2021-10-01"),
        endDate: new Date("2021-10-10"),
        price: 1000,
    },
    {
        vacationId: 2,
        destination: "Paris",
        description: "Paris is the capital and most populous city of France.",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/La_Tour_Eiffel_vue_de_la_Tour_Saint-Jacques%2C_Paris_ao%C3%BBt_2014_%282%29.jpg/1200px-La_Tour_Eiffel_vue_de_la_Tour_Saint-Jacques%2C_Paris_ao%C3%BBt_2014_%282%29.jpg",
        startDate: new Date("2021-10-01"),
        endDate: new Date("2021-10-10"),
        price: 1000,

    },
    {
        vacationId: 3,
        destination: "New York",
        description: "New York City comprises 5 boroughs sitting where the Hudson River meets the Atlantic Ocean.",
        image: "https://i.guim.co.uk/img/media/b3585cf7b5525c4f27b924754ed98b3b7fbdaf53/0_383_8048_4831/master/8048.jpg?width=1200&quality=85&auto=format&fit=max&s=7c79a7b8220f2d5aca237616cac7abda",
        startDate: new Date("2021-10-01"),
        endDate: new Date("2021-10-10"),
        price: 1000,
    }
]

vacationRouter.get('/vacations', (req, res, next) => {
    res.status(200).json(mockVacations);
})



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

export default vacationRouter;
