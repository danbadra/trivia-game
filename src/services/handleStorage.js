import store from '../redux/store';
import handlePicture from './handlePicture';

const handleStorage = async () => {
  const { player: { name, score, gravatarEmail } } = store.getState();
  const picture = handlePicture(gravatarEmail);
  const savedRankingJson = localStorage.getItem('ranking');
  const savedRanking = JSON.parse(savedRankingJson);
  if (!savedRanking) {
    const rankingToSave = [
      { name, score, picture },
    ];
    localStorage.setItem('ranking', JSON.stringify(rankingToSave));
  } else {
    const rankingToSave = [
      ...savedRanking, { name, score, picture },
    ];
    localStorage.setItem('ranking', JSON.stringify(rankingToSave));
  }
};

export default handleStorage;
