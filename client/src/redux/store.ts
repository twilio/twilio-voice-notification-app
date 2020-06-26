import { createStore, StoreEnhancer, combineReducers } from 'redux';
import { createBroadcast } from './reducers';
import { CreateBroadcastState } from './types';

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION__?: () => StoreEnhancer;
  }
}

const rootReducer = combineReducers({
  createBroadcast,
});

export const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

/**
 * Redux is used to manage the state of each Step in the Create Notifications wizard.
 */
export type RootState = {
  createBroadcast: CreateBroadcastState;
};
