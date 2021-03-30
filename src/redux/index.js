import {createStore} from "redux";
import { reducer } from './reducer';

export const store = createStore(reducer);

export * from './action-types';
export * from './reducer';
