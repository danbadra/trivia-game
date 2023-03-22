import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';

class Game extends Component {
  state = {
    // assertions: 0,
    // score: 0,
    index: 0,
    questions: [],
    answers: [],
    category: [],
    timer: 30,
    disable: false,
    answerIsClicked: false,
  };

  async componentDidMount() {
    const { history } = this.props;
    const token = localStorage.getItem('token');
    const API_QUESTIONS = `https://opentdb.com/api.php?amount=5&token=${token}`;

    try {
      const response = await fetch(API_QUESTIONS);
      const data = await response.json();
      const { results } = data;
      const failedToken = 3;

      if (data.response_code === failedToken) {
        localStorage.setItem('token', '');
        history.push('/');
      } else {
        this.setState({
          questions: [
            results[0].question,
            results[1].question,
            results[2].question,
            results[3].question,
            results[4].question,
          ],
          answers: results.map(
            (result) => this.random(result.correct_answer, result.incorrect_answers),
          ),
          category: [
            results[0].category,
            results[1].category,
            results[2].category,
            results[3].category,
            results[4].category,
          ],
        });
      }
    } catch (error) {
      console.log(error.message);
    }

    this.handleTimer();
  }

  handleTimer = () => {
    // const totalTime = 30000;
    const sec = 1000;
    const countDown = setInterval(() => {
      const { timer, answerIsClicked } = this.state;
      if (timer > 0 && answerIsClicked === false) {
        this.setState((prevState) => ({
          timer: prevState.timer - 1,
        }));
      } else {
        clearInterval(countDown);
        this.setState({
          disable: true,
        });
      }
    }, sec);
    // setTimeout(() => {
    //   clearInterval(countDown);
    //   this.setState({
    //     disable: true,
    //   });
    // }, totalTime);
  };

  random = (corrects, incorrects) => {
    const id = () => Math.floor(Math.random() * 100);
    const correct = [{ id: id(), correct: corrects, testeID: 'correct-answer' }];
    const incorrect = incorrects.map((wrong, index) => ({
      id: id(),
      wrong,
      testeID: `wrong-answer-${index}`,
    }));
    const answers = [...correct, ...incorrect];
    return answers.sort((a, b) => a.id - b.id);
  };

  handleAnswerClick = () => {
    const allAnswers = document.querySelectorAll('.answers');

    this.setState({
      answerIsClicked: true,
    });

    allAnswers.forEach((answer) => {
      if (answer.id === 'correct-answer') {
        answer.style.border = '3px solid rgb(6, 240, 15)';
      } else {
        answer.style.border = '3px solid red';
      }
    });
  };

  handleNextBtn = () => {
    const { index } = this.state;
    this.setState({
      index: index + 1,
    });
  };

  render() {
    const { questions,
      answers, index, category, timer, disable, answerIsClicked } = this.state;
    const arrayAnswers = answers[index];
    return (
      <section>
        <Header />
        <p data-testid="question-category">{category[index]}</p>
        <div data-testid="question-category" id="questions">
          <p data-testid="question-text">{questions[index]}</p>
        </div>
        <p>{ timer }</p>
        <div data-testid="answer-options" id="answer">
          { answers.length === 0 ? <p>Carregando...</p>
            : arrayAnswers.map((answer, i) => (
              <button
                key={ i }
                id={ answer.testeID }
                data-testid={ answer.testeID }
                onClick={ this.handleAnswerClick }
                className="answers"
                disabled={ disable }
                // style={ { 'border-width': '3px' } }
              >
                {answer.wrong || answer.correct}
              </button>))}
        </div>
        <div>
          {(answerIsClicked === true)
          && (
            <button
              data-testid="btn-next"
              onClick={ this.handleNextBtn }
            >
              Next
            </button>
          )}
        </div>
      </section>
    );
  }
}

Game.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func }),
}.isRequired;

export default Game;

// LOCAL STORAGE:
// ranking: [
//   { name: nome_da_pessoa, score: 10, picture: url_da_foto_no_gravatar }
// ],

// TOKEN:
// {
//   "response_code":0,
//   "response_message":"Token Generated Successfully!",
//   "token":"f00cb469ce38726ee00a7c6836761b0a4fb808181a125dcde6d50a9f3c9127b6"
// }

// Pergunta de múltipla escolha
// {
//   "response_code":0,
//   "results":[
//       {
//         "category":"Entertainment: Video Games",
//         "type":"multiple",
//         "difficulty":"easy",
//         "question":"What is the first weapon you acquire in Half-Life?",
//         "correct_answer":"A crowbar",
//         "incorrect_answers":[
//             "A pistol",
//             "The H.E.V suit",
//             "Your fists"
//         ]
//       }
//       {... x5}
//   ]
// }
// state = {
//   timer: 5,
// }
