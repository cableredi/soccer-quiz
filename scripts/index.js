"use strict";

function generateNewQuestion() {
  console.log('Entered generateNewQuestion');

  STORE.currentQuestion++;
}

function generateStatistics() {
  console.log("Entered generateStatistics ");

  return `
    <section class="statistics">
      <div class="statistics-totals">
        <span class="statistics-title">Question:&nbsp;</span>
        ${STORE.currentQuestion + 1}/${STORE.questions.length}
      </div>
      <div class="statistics-score">
        <span class="statistics-title">Score:&nbsp;</span>
        <span class="stastics-score">${STORE.currentScore}</span>/${STORE.questions.length}
      </div>
      <div class="statistics-balls"></div>
    </section>
  `;
}

/* Progress function */
function renderQuestionProgress() {
  console.log('Entered renderQuestionProgress');

  for (let i = 0; i < STORE.questions.length; i++) {
    let img = document.createElement('img');

    if (STORE.scores.length === 0) {
      img.src = '../images/black-ball.png';
    } else if (STORE.scores[i] === 'correct') {
      img.src = '../images/world-ball.png';
    } else if (STORE.scores[i] === 'incorrect') {
      img.src = '../images/red-ball.png';
    } else {
      img.src = '../images/black-ball.png';
    }
    
    $('.statistics-balls').append(img);
  }
}

function renderQuizBox() {
  const statistics = generateStatistics();
  const question = generateQuestion();

  $('.statistics').html(statistics); 
  $('.quiz-box').html(question);
  $('.statistics').css('display', 'block');
  renderQuestionProgress(); // progress
}

function startQuiz() {
  console.log("Entered startQuiz ");

  $('#js-start-button').on('click', function(e){
    $('.quiz-box-home').hide();

    renderQuizBox();
  });
}

function generateOptions() {
  console.log("Entered generateOptions ");
  
  const questions = STORE.questions[STORE.currentQuestion];

  let optionsVar = '';
  for (let i = 0; i < questions.options.length; i++) {
    optionsVar = optionsVar + `
      <input type="radio" id="question-option${i}" name="question-option" value="${questions.options[i]}">
      <label for="question-option${i}">${questions.options[i]}</label>
    `;
  }

  return optionsVar;
}

function generateQuestion() {
  console.log("Entered generateQuestion ");

  const questionForm = `
    <form id="quiz-box-questions">
      <legend>
          ${STORE.questions[STORE.currentQuestion].question}
      </legend>
      <div class="quiz-box-options">${generateOptions()}</div>
    </form>
  `;

  return questionForm;
}

function submitAnswer() {
  console.log("Entered submitAnswer ");

  $('.main').on('change', function (event) {
    $(this).closest("form").submit();
    event.preventDefault();

    let answer = '';

    let selected = $('input:checked').val();
    if (selected === STORE.questions[STORE.currentQuestion].answer) {
      answer = correctAnswer();
    } else {
      answer = incorrectAnswer(selected);
    }

    $('.quiz-box').html(answer);
  });
}

function updateScore(answer) {
  console.log('Entered updateScore');

  if (answer === 'correct') STORE.currentScore++;

  STORE.scores.push(answer);

  $('.stastics-score').text(STORE.currentScore);
  $('.statistics-balls').html('');
  renderQuestionProgress();
}

function correctAnswer() {
  console.log('Entered correctAnswer');

  const correctForm = `
    <div class="quiz-box-answers">
      <h2 class='quiz-box-correct'>You are correct!!!</h2>
      <h3>${[STORE.questions[STORE.currentQuestion].answer]}</h3>
      <div class='quiz-box-explanation'>
        ${STORE.questions[STORE.currentQuestion].explanation}
      </div>
      <button type="submit" class="next-button" id="js-next-button">Next >></button>
    </div>
  `;

  updateScore('correct');

  return correctForm;
}

function incorrectAnswer(selected) {
  console.log('Entered correctAnswer');

  const incorrectForm = `
    <div class="quiz-box-answers">
      <h2 class='quiz-box-incorrect'>Sorry, its not ${selected} but </h2>
      <h3>${[STORE.questions[STORE.currentQuestion].answer]}</h3>
      <div class='quiz-box-explanation'>
        ${STORE.questions[STORE.currentQuestion].explanation}
      </div>
      <button type="submit" class="next-button" id="js-next-button">Next >></button>
    </div>
  `;

  updateScore('incorrect');

  return incorrectForm;
}

function nextQuestion() {
  console.log("Entered nextQuestion ");

  $('.quiz-box').on('click', '#js-next-button', function(e){
    console.log('clicked on next');

    if (STORE.currentQuestion >= STORE.questions.length - 1) {
      finalTally();
    } else {
      generateNewQuestion();
      renderQuizBox();
    }
  });
}

function finalTally() {
  console.log("Entered finalTally");

  let message = '';

  if (STORE.currentScore >= 8) {
    message = 'AWESOME! You are a Soccer Master!';
  } else if (STORE.currentScore >=5) {
    message = 'Great! You sure know your moves!';
  } else {
    message = 'You need to practice up on your soccer moves!'
  }

  const finalScore = `
    <div class="final-score">
      <h1>Final Score:&nbsp;<span class="stastics-score">${STORE.currentScore}</span>/${STORE.questions.length}</h1>
      <h2>${message}</h2>
      <button type="submit" class="restart-button" id="js-restart-button"><< Restart >></button>
    </div>
  `;

  $('.statistics').hide();
  $('.quiz-box').html(finalScore);
}

function restartQuiz() {
  console.log("Entered retartQuiz");

  $('.quiz-box').on('click', '#js-restart-button', function(e){
    console.log('clicked restart');

    STORE.currentQuestion = 0;
    STORE.currentScore = 0;
    STORE.scores = [];

    renderQuizBox();
  });

}

function handleQuizApp() {
  startQuiz();
  generateQuestion();
  submitAnswer();
  nextQuestion();
  restartQuiz();
}

$(handleQuizApp);