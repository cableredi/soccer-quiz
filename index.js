function startQuiz() {
  console.log("Entered startQuiz");
}

function handleQuestions() {
  console.log("Entered handleQuestions");
}

function handleOptions() {
  console.log("Entered handleOptions ");
}

function retartQuiz() {
  console.log("Entered retartQuiz");
}

function handleQuizApp() {
  startQuiz();
  handleQuestions();
  handleOptions();
  retartQuiz();
}

$(handleQuizApp);