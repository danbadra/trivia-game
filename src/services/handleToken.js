const handleToken = async () => {
  const API_TOKEN = 'https://opentdb.com/api_token.php?command=request';
  try {
    const response = await fetch(API_TOKEN);
    const data = await response.json();
    localStorage.setItem('token', data.token);
    return;
  } catch (error) {
    return console.log(error.message);
  }
};

// const handlePergunta = async () => {
//   const data = handleToken();
//   const errorNum = 3;
//   if (data.response_code === errorNum) {
//     const handleFetch();
//     return
//   }
// };

// token
// {
//   "response_code":0,
//   "response_message":"Token Generated Successfully!",
//   "token":"f00cb469ce38726ee00a7c6836761b0a4fb808181a125dcde6d50a9f3c9127b6"
// }

// resposta do token
// https://opentdb.com/api.php?amount=${quantidade-de-perguntas-retornadas}&token=${seu-token-aqui}

// // Recomendação
// https://opentdb.com/api.php?amount=5&token=${seu-token-aqui}
export default handleToken;
