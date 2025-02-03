const question = document.querySelector("#question");
const answersBox = document.querySelector("#answers-box");
const quizContainer = document.querySelector("#quiz-container");
const scoreContainer = document.querySelector("#score-container");
const letters = ["a", "b", "c", "d"];
let points = 0;
let actualQuestion = 0;

// Perguntas
const questions = [
    {
    "question": "PHP foi desenvolvido para qual fim?",
    "answers": [
      {
        "answer": "Back-end",
        "correct": true
      },
      {
        "answer": "Front-end",
        "correct": false
      },
      {
        "answer": "Sistema operacional",
        "correct": false
      },
      {
        "answer": "Banco de dados",
        "correct": false
      },
    ]
  },
  {
    "question": "Uma forma de declarar variável em JavaScript:",
    "answers": [
      {
        "answer": "$var",
        "correct": false
      },
      {
        "answer": "var",
        "correct": true
      },
      {
        "answer": "@var",
        "correct": false
      },
      {
        "answer": "#let",
        "correct": false
      },
    ]
  },
  {
    "question": "Qual o seletor de id no CSS?",
    "answers": [
      {
        "answer": "#",
        "correct": true
      },
      {
        "answer": ".",
        "correct": false
      },
      {
        "answer": "@",
        "correct": false
      },
      {
        "answer": "/",
        "correct": false
      },
    ]
  },
]

// Substituição do quiz para primeira pergunta
function init() {
    createQuestion(0);
}

// Criando a pergunta
function createQuestion(i) {

  // Limpa questão anterior
  const oldButtons = answersBox.querySelectorAll("button");

  oldButtons.forEach(function(btn) {
    btn.remove();
  });

  // Altera texto da pergunta
  const questionText = question.querySelector("#question-text");
  const questionNumber = question.querySelector("#question-number");

  questionText.textContent = questions[i].question;
  questionNumber.textContent = i + 1;

  questions[i].answers.forEach(function(answer, i) {
    
    const answerTemplate = document.querySelector(".answer-template").cloneNode(true);

    const letterBtn = answerTemplate.querySelector(".btn-letter");
    const answerText = answerTemplate.querySelector(".question-answer");

    letterBtn.textContent = letters[i];
    answerText.textContent = answer['answer'];

    answerTemplate.setAttribute("correct-answer", answer["correct"]);

    answerTemplate.classList.remove("hide");
    answerTemplate.classList.remove("answer-template");

    answersBox.appendChild(answerTemplate);

  });

  const buttons = answersBox.querySelectorAll("button");

  buttons.forEach(function(button) {
    button.addEventListener("click", function() {
      checkAnswer(this, buttons);
    });
  });

  actualQuestion++;

}

// Verificando se resposta está correta
function checkAnswer(btn, buttons) {
  
  // Respostas erradas e certa
  buttons.forEach(function(button) {

    if(button.getAttribute("correct-answer") === "true") {
      button.classList.add("correct-answer");
      if(btn === button) {
        points++;
      }
    } else {
      button.classList.add("wrong-answer");
    }

  });

  nextQuestion();

}

// Próxima pergunta
function nextQuestion() {

    setTimeout(function() {
  
      if(actualQuestion >= questions.length) {
        showSuccessMessage();
        return;
      }
  
      createQuestion(actualQuestion)
  
    }, 1000);
  
}
  
  // Tela final
function showSuccessMessage() {
  
    toggleQuiz();
  
    const score = ((points / questions.length) * 100).toFixed(2);
    const scoreDisplay = document.querySelector("#display-score span");
    scoreDisplay.textContent = score.toString();
  
    const correctAnswers = document.querySelector("#correct-answers");
    correctAnswers.textContent = points;
  
    const totalQuestions = document.querySelector("#questions-qty");
    totalQuestions.textContent = questions.length;
  
}

function toggleQuiz() {
    quizContainer.classList.toggle("hide");
    scoreContainer.classList.toggle("hide");
}

document.querySelector("#restart").addEventListener('click', () => {

    toggleQuiz();
    actualQuestion = 0;
    points = 0;
    init();
});


init();