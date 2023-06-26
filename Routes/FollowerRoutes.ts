//הכרחי imports for our site.
import express, { NextFunction, Request, Response } from "express";
import FollowerLogic from "../Logic/FollowerLogic";

const followerRouter = express.Router();

// ADD FOLLOW TO VACATION
followerRouter.post(
    "/follow/:vacationId/:userId",
    async (request: Request, response: Response, next: NextFunction) => {
      const vacationId = +request.params.vacationId;
      const userId = +request.params.userId;
      const result = await FollowerLogic.addFollower(vacationId, userId);
      response.status(201).json(result);
    }
  );

  followerRouter.delete(
    "/unfollow/:vacationId/:userId",
    async (request: Request, response: Response, next: NextFunction) => {
      const vacationId = +request.params.vacationId;
      const userId = +request.params.userId;
      const result = await FollowerLogic.removeFollower(vacationId, userId);
      response.status(201).json(result);
    }
  );

export default followerRouter;