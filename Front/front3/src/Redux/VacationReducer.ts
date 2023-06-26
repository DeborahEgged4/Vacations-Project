import Vacation from "../interfaces/Vacation";

//initial state
export class VacationsState {
    public vacations: Vacation[] = [];
  }

//action types
export enum VacationActionType {
    addVacation = "addVacation",
    deleteVacation = "deleteVacation",
    getAllVacations= "getAllVacations",
    updateVacation = "updateVacation",
  }

//action data structure
export interface VacationAction {
    type: VacationActionType;
    payload?: any;
  }

//functions
export const addVacationAction = (newVacation: Vacation): VacationAction => {
    return { type: VacationActionType.addVacation, payload: newVacation };
  };

  export const updateVacationAction = (
    updatedVacaton: Vacation
  ): VacationAction => {
    return {
      type: VacationActionType.updateVacation,
      payload: updatedVacaton,
    };
  };

  export const deleteVacationAction = (Vacation: number): VacationAction => {
    return { type: VacationActionType.deleteVacation, payload: Vacation };
  };

  export const allVacationsAction = (
    vacations: Vacation[]
  ): VacationAction => {
    return { type: VacationActionType.getAllVacations, payload: vacations };
  };

    //THE REDUCER
    export function VacationReducer(
        currentState: VacationsState = new VacationsState(),
        action: VacationAction
      ): VacationsState {
        const newState = { ...currentState };
        switch (action.type) {
          case VacationActionType.addVacation:
            newState.vacations = [...currentState.vacations, action.payload];
            break;
          case VacationActionType.getAllVacations:
            newState.vacations = action.payload;
            break;
          case VacationActionType.updateVacation:
            newState.vacations = [...newState.vacations].filter(
              (item) => item.vacationId !== action.payload.vacationKey
            );
            newState.vacations = [...newState.vacations, action.payload];
            break;
          case VacationActionType.deleteVacation:
            newState.vacations = newState.vacations.filter(
              (vacation) => vacation.vacationId !== action.payload
            );
            break;
        }
        return newState;
      }