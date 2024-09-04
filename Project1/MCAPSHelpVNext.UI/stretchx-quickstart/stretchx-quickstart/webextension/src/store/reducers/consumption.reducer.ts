import { AnyAction } from 'redux';
import {
  FETCH_CONSUMPTION_BEGIN,
  FETCH_CONSUMPTION_SUCCESS,
  FETCH_CONSUMPTION_FAILURE,
  ReduxConsumptionState,
} from '..';

const consumptionInitialState: ReduxConsumptionState = {
  isLoading: false,
  error: null,
  consumptions: null,
};

export default function consumptionReducer(
  state: ReduxConsumptionState = consumptionInitialState,
  action: AnyAction
) {
  switch (action.type) {
    case FETCH_CONSUMPTION_BEGIN:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case FETCH_CONSUMPTION_SUCCESS:
      return {
        ...state,
        isLoading: false,
        consumptions: action.payload
      };
    case FETCH_CONSUMPTION_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };
    default:
      return state;
  }
}


