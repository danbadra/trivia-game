export const USER_INFO = 'USER_INFO';
export const USER_SCORE = 'USER_SCORE';

const userData = (data) => ({
  type: USER_INFO,
  data,
});

const userScore = (data) => ({
  type: USER_SCORE,
  data,
});

export {
  userData,
  userScore,
};
