import { legacy_createStore as createStore } from 'redux';
import { composeWithDevTools } from '@redux-devtools/extension';
import player from './reducers';

const store = createStore(player, composeWithDevTools());

if (window.Cypress) {
  window.store = store;
}
export default store;
