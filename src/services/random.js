export default function random(corrects, incorrects) {
  const id = () => Math.floor(Math.random() * 100);
  const correct = [{ id: id(), correct: corrects, testeID: 'correct-answer' }];
  const incorrect = incorrects.map((wrong, index) => ({
    id: id(),
    wrong,
    testeID: `wrong-answer-${index}`,
  }));
  const answers = [...correct, ...incorrect];
  return answers.sort((a, b) => a.id - b.id);
}
