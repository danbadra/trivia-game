import { applyMiddleware, legacy_createStore as createStore } from 'redux';
import { composeWithDevTools } from '@redux-devtools/extension';
import thunk from 'redux-thunk';
import player from './reducers';

const store = createStore(player, composeWithDevTools(applyMiddleware(thunk)));

if (window.Cypress) {
  window.store = store;
}
export default store;
