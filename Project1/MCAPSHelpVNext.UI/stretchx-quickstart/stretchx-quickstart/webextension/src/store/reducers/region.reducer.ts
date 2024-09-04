import { AnyAction } from 'redux';
import {
  FETCH_REGION_BEGIN,
  FETCH_REGION_SUCCESS,
  FETCH_REGION_FAILURE,
  ReduxRegionState
} from '..';

const regionInitialState: ReduxRegionState = {
    isLoading: false,
    error: null,
    regions: null
  };

export default function regionReducer(
    state: ReduxRegionState = regionInitialState,
    action: AnyAction
  ) {
    switch (action.type) {
      case FETCH_REGION_BEGIN:
        return {
          ...state,
          isLoading: true,
          error: null,
        };
      case FETCH_REGION_SUCCESS:
        return {
          ...state,
          isLoading: false,
          regions: action.payload
        };
      case FETCH_REGION_FAILURE:
        return {
          ...state,
          isLoading: false,
          error: action.payload
        };
      default:
        return state;
    }
  }