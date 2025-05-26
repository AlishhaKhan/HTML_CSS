const questionEl = document.getElementById('question');
const answersEl = document.getElementById('answers');
const nextBtn = document.getElementById('next-btn');
const scoreEl = document.getElementById('score');

let score = 0;
let currentQuestion = {};
let acceptingAnswers = false;

async function loadQuestion() {
  nextBtn.style.display = 'none';
  answersEl.innerHTML = 'Loading...';

  const res = await fetch('https://opentdb.com/api.php?amount=1&type=multiple');
  const data = await res.json();
  const questionData = data.results[0];

  const questionText = decodeHTML(questionData.question);
  const correct = decodeHTML(questionData.correct_answer);
  const incorrect = questionData.incorrect_answers.map(ans => decodeHTML(ans));
  const answers = [...incorrect, correct].sort(() => Math.random() - 0.5);

  currentQuestion = { correct };

  questionEl.textContent = questionText;
  answersEl.innerHTML = '';
  answers.forEach(answer => {
    const btn = document.createElement('button');
    btn.textContent = answer;
    btn.classList.add('answer-btn');
    btn.addEventListener('click', () => selectAnswer(answer, btn));
    answersEl.appendChild(btn);
  });

  acceptingAnswers = true;
}

function selectAnswer(selected, btn) {
  if (!acceptingAnswers) return;
  acceptingAnswers = false;

  if (selected === currentQuestion.correct) {
    btn.style.background = 'green';
    score++;
  } else {
    btn.style.background = 'red';
    const buttons = document.querySelectorAll('.answer-btn');
    buttons.forEach(b => {
      if (b.textContent === currentQuestion.correct) {
        b.style.background = 'green';
      }
    });
  }

  scoreEl.textContent = `Score: ${score}`;
  nextBtn.style.display = 'inline-block';
}

nextBtn.addEventListener('click', loadQuestion);

function decodeHTML(html) {
  const txt = document.createElement("textarea");
  txt.innerHTML = html;
  return txt.value;
}

loadQuestion();
