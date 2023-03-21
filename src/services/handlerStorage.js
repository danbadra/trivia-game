import store from '../redux/store';
import handlePicture from './handlePicture';

const handleStorage = async () => {
  const { name, score, gravatarEmail } = store.getState();
  const picture = handlePicture(gravatarEmail);
  const ranking = [
    { name, score, picture },
  ];
    // token: { token },
  localStorage.setItem('ranking', JSON.stringify(ranking));
};

export default handleStorage;
