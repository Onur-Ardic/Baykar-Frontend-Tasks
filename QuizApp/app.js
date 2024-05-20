let currentQuestionIndex = 0
let score = 0
let questions = []
let countdown
let canSelect = false
let selectedAnswers = []
let timeLeft = 30

function fetchQuestions() {
  fetch('https://jsonplaceholder.typicode.com/posts')
    .then((response) => response.json())
    .then((data) => {
      questions = data.slice(0, 10)
      renderQuestion()
    })
    .catch((error) => console.error('Error fetching questions:', error))
}

function renderQuestion() {
  const questionElement = document.getElementById('question')
  const choicesElement = document.getElementById('choices')
  const currentQuestion = questions[currentQuestionIndex]

  questionElement.textContent = currentQuestion.title
  choicesElement.innerHTML = ''

  const choices = ['A', 'B', 'C', 'D']

  choices.forEach((choice, index) => {
    const li = document.createElement('li')
    li.textContent = choice + '. ' + currentQuestion.body
    li.addEventListener('click', () => {
      if (canSelect) {
        const selectedChoice = choicesElement.querySelector('.selected')
        if (selectedChoice) {
          selectedChoice.classList.remove('selected')
        }
        li.classList.add('selected')
      }
    })
    choicesElement.appendChild(li)
  })

  timeLeft = 30
<<<<<<< HEAD
  canSelect = false
=======
  canSelect = false // İlk başta seçim yapılamaz
>>>>>>> 92dc2859daa6f8db285edbcdd730e1664a6e79d7
  updateTimerBar(timeLeft)

  clearInterval(countdown)
  countdown = setInterval(() => {
    timeLeft--
    updateTimerBar(timeLeft)
    if (timeLeft === 20) {
<<<<<<< HEAD
      canSelect = true
=======
      canSelect = true // 10 saniye sonra seçim yapılabilir
>>>>>>> 92dc2859daa6f8db285edbcdd730e1664a6e79d7
    }
    if (timeLeft === 0) {
      clearInterval(countdown)
      saveAnswer()
    }
  }, 1000)
}

function updateTimerBar(timeLeft) {
  const timerBarInner = document.getElementById('timer-bar-inner')
  const widthPercentage = (timeLeft / 30) * 100
  timerBarInner.style.width = widthPercentage + '%'
}

function saveAnswer() {
  const selectedChoice = document.querySelector('.selected')
  if (selectedChoice) {
    const userAnswer = selectedChoice.textContent[0]
    selectedAnswers.push(userAnswer)
    checkAnswer(userAnswer)
  } else {
    selectedAnswers.push('')
    nextQuestion()
  }
}

function checkAnswer(userAnswer) {




  const currentQuestion = questions[currentQuestionIndex]
  const resultElement = document.getElementById('result-body-content')
  const tr = document.createElement('tr')
  const tdQuestion = document.createElement('td')
  const tdUserAnswer = document.createElement('td')

  const correctAnswer = 'A'



  if (userAnswer === correctAnswer) {
    score++
  }

  tdQuestion.textContent = currentQuestion.title
  tdUserAnswer.textContent = userAnswer

  tr.appendChild(tdQuestion)
  tr.appendChild(tdUserAnswer)

  resultElement.appendChild(tr)

  nextQuestion()
}

function nextQuestion() {
  clearInterval(countdown)
  currentQuestionIndex++
  if (currentQuestionIndex < questions.length) {
    renderQuestion()
  } else {
    showResults()
  }
}

function showResults() {
  const resultBody = document.getElementById('result-body-content')
  resultBody.innerHTML = ''

  questions.forEach((question, index) => {
    const tr = document.createElement('tr')
    const tdQuestion = document.createElement('td')
    const tdUserAnswer = document.createElement('td')

    tdQuestion.textContent = 'Soru ' + (index + 1)
    tdUserAnswer.textContent = selectedAnswers[index] || ''

    tr.appendChild(tdQuestion)
    tr.appendChild(tdUserAnswer)

    resultBody.appendChild(tr)
  })

  document.getElementById('quiz-container').style.display = 'none'
  document.getElementById('result-container').style.display = 'block'
  document.getElementById('score').textContent = 'Score: ' + score + ' / ' + questions.length
}

fetchQuestions()
