import { AxiosError } from 'axios';
import {getFormData} from "../WebFormUtils/formApiUtils"
import { IRevenueRequestAdmin } from './IRevenueRequestAdmin';

export const FETCH_CONFIG_DATA_REQUEST = "FETCH_CONFIG_DATA_REQUEST";
export const FETCH_CONFIG_DATA_SUCCESS = "FETCH_CONFIG_DATA_SUCCESS";
export const FETCH_CONFIG_DATA_FAILURE = "FETCH_CONFIG_DATA_FAILURE";


  export const fetchFromConfigRequest = () => ({
    type: FETCH_CONFIG_DATA_REQUEST
  });
  
  export const fetchFromConfigSuccess = (payload:IRevenueRequestAdmin) => ({
    type: FETCH_CONFIG_DATA_SUCCESS,
    payload
  });
  
  export const fetchFromConfigFailure = (error) => ({
    type: FETCH_CONFIG_DATA_FAILURE,
    payload: error
  });
  


  export const fetchFromConfigData = (key, context) => {
    return async (dispatch) => {
      dispatch(fetchFromConfigRequest());
      try {
        const response = await getFormData(key, context); 
        console.log(response);
        dispatch(fetchFromConfigSuccess(response));
      } catch (error) {
        dispatch(fetchFromConfigFailure(error.message));
      }
    };
 };