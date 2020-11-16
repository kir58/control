import { combineReducers } from '@reduxjs/toolkit';
import { reducer as reducerForm } from 'redux-form';

const rootReducer = combineReducers({
  form: reducerForm,
});

export type AppState = {
  form: {
    controlForm: {
      values: {
        amount: string,
        withoutPersonalIncomeTax: boolean,
        inputMoney: string,
      }
    }
  }
}
export default rootReducer;
