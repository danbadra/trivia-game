import { USER_INFO, USER_SCORE } from '../actions';

const INITIAL_STATE = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
};
const player = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case USER_INFO:
    return {
      ...state,
      name: action.data.name,
      gravatarEmail: action.data.email,
    };
  case USER_SCORE:
    return {
      ...state,
      assertions: action.data.assertions,
      score: action.data.score,
    };
  default:
    return state;
  }
};

export default player;
