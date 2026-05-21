const questions = [
    {
        word:'Perro',
        answer:'Dog',
        options:['Dog','House','Book','Water']
    },
    {
        word:'Casa',
        answer:'House',
        options:['Window','Chair','House','Apple']
    },
    {
        word:'Libro',
        answer:'Book',
        options:['Book','Dog','Computer','Friend']
    },
    {
        word:'Agua',
        answer:'Water',
        options:['School','Water','Chair','Apple']
    },
    {
        word:'Escuela',
        answer:'School',
        options:['School','Window','Friend','Book']
    }
];

let currentQuestion = 0;
let score = 0;
let lives = 3;

const questionText = document.getElementById('question');
const optionsContainer = document.getElementById('options');
const scoreText = document.getElementById('score');
const livesText = document.getElementById('lives');
const message = document.getElementById('message');

function loadQuestion(){

    if(currentQuestion >= questions.length || lives <= 0){
        endGame();
        return;
    }

    const q = questions[currentQuestion];

    questionText.textContent = q.word;

    optionsContainer.innerHTML = '';

    q.options.forEach(option => {

        const button = document.createElement('button');

        button.textContent = option;
        button.classList.add('option-btn');

        button.onclick = () => checkAnswer(option);

        optionsContainer.appendChild(button);
    });
}

function checkAnswer(option){

    const correctAnswer = questions[currentQuestion].answer;

    if(option === correctAnswer){

        score += 10;
        scoreText.textContent = score;

        message.textContent = '⚔️ ¡Enemigo derrotado!';
        message.className = 'message correct';

    }else{

        lives--;
        livesText.textContent = lives;

        message.textContent = '💀 Respuesta incorrecta';
        message.className = 'message wrong';
    }

    currentQuestion++;

    setTimeout(()=>{
        message.textContent = '';
        loadQuestion();
    },1200);
}

function endGame(){

    optionsContainer.innerHTML = '';

    if(lives > 0){

        questionText.innerHTML = '🏆 ¡Victoria!';
        message.innerHTML = `Tu score final es <b>${score}</b>`;

    }else{

        questionText.innerHTML = '☠️ Game Over';
        message.innerHTML = `Tu score final es <b>${score}</b>`;
    }
}

function restartGame(){

    currentQuestion = 0;
    score = 0;
    lives = 3;

    scoreText.textContent = score;
    livesText.textContent = lives;
    message.textContent = '';

    loadQuestion();
}