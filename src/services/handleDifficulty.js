export default function handleDifficulty(difficulty) {
  const three = 3;
  switch (difficulty) {
  case 'easy':
    return 1;
  case 'medium':
    return 2;
  case 'hard':
    return three;
  default:
    return 0;
  }
}
