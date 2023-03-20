import md5 from 'crypto-js/md5';

const handlePicture = (email) => {
  const hash = md5(email).toString();
  const picture = `https://www.gravatar.com/avatar/${hash}`;
  return picture;
};

export default handlePicture;
