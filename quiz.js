   const quiz = [
    {
        question : 'what is the capital of kenya?',
        answer : [
            {text: 'america', correct : false},
            {text: 'kampala', correct : true}
        ]
    },
    {
        question : 'who is the president of usa?',
        answer : [
            {text: 'donal trump', correct : false},
            {text: 'joe biden', correct : true}
        ]
    },
    {
        question : 'which animal is the king of the jungle?',
        answer : [
            {text: 'elephant', correct : false},
            {text: 'lion', correct : true}
        ]
    },
]
const newBtn = document.getElementById('new-btn');
const quizzes = document.querySelector('.quiz-container');
const quizElement = document.querySelector('.quiz')
const optionElement = document.querySelector('.options')
const nextBtn = document.getElementById('nextBtn')

let randomQuestion;
let currentQuestion;

newBtn.addEventListener('click', () => {
    newBtn.classList.add('invisible')
    quizzes.classList.remove('invisible')
    randomQuestion = quiz.sort(() => {Math.random() - 0.5})
    currentQuestion = 0
    nextQuestion()
})

function nextQuestion(){
    resetState()
    showQuestion(randomQuestion[currentQuestion])
}

function resetState(){
    clearStatus(document.body)
    nextBtn.classList.add('invisble')
    while (optionElement.firstChild){
        optionElement.removeChild(optionElement.firstChild)
    }
}

function showQuestion(quest){
    quizElement.innerText = quest.question
    quest.answer.forEach(ans => {
        const button = document.createElement('button')
        button.innerText = ans.text
        button.classList.add('option-btn')
        if (ans.correct){
            button.dataset.correct = ans.correct
        }
        button.addEventListener('click', selectAnswer, {once:true})
        optionElement.appendChild(button)
    });
}

function selectAnswer(e){
    const choice = e.target
    const correct = choice.dataset.correct
    setStatusClass(document.body, correct)
    Array.from(optionElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct)
    })
    if (randomQuestion.length > currentQuestion + 1){
        nextBtn.classList.remove('invisible')
    }else{
        newBtn.innerText = 'Restart'
        newBtn.classList.remove('invisible')
        nextBtn.classList.add('invisible')
    }
   
}

const display = document.querySelector('.display')
function setStatusClass(element, correct){
    clearStatus(element)
    if (correct){
        
        element.classList.add('correct')
    }else{
        // display.innerText = 'WRONG'
        element.classList.add('wrong')
    }
}

function clearStatus(element){
    element.classList.remove('correct')
    element.classList.remove('wrong')
}

nextBtn.addEventListener('click', () => {
    currentQuestion++
    nextQuestion()
})