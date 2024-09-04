import { FETCH_CONFIG_DATA_REQUEST, FETCH_CONFIG_DATA_SUCCESS, FETCH_CONFIG_DATA_FAILURE } from './revenuerequestadmin.actions';
import { ReduxRevenueRequestAdminState } from '../../../../app/store/store.types';


const revenuRequestAdminInitialState: ReduxRevenueRequestAdminState = {
  configdata: null,
  loading: true,
  error: null,
};


export const revenueRequestAdmin = (state:ReduxRevenueRequestAdminState = revenuRequestAdminInitialState, action) => {
  switch (action.type) {
    case FETCH_CONFIG_DATA_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_CONFIG_DATA_SUCCESS:
      return {
        ...state,
        loading: false,
        configdata : action.payload,
      };
    case FETCH_CONFIG_DATA_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
