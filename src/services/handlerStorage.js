import md5 from 'crypto-js/md5';
import handleToken from './handlerToken';
import store from '../redux/store';

const handleStorage = async () => {
  const { name, score, gravatarEmail } = store.getState();
  const token = await handleToken();
  const hash = md5(gravatarEmail).toString();
  const picture = `https://www.gravatar.com/avatar/${hash}`;
  const playerData = {
    ranking: [
      { name, score, picture },
    ],
    token: { token },
  };
  localStorage.setItem('playerData', JSON.stringify(playerData));
};

export default handleStorage;
