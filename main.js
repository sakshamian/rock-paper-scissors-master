// selectors
const rulesBtn = document.querySelector('.rules-btn');
const cancelBtn = document.querySelector('.cross-logo');
const modal = document.querySelector('.modal');
const mainContent = document.querySelector('.container');
const gameDisplay = document.querySelector('.game-icons');
const resultDisplay = document.querySelector('.resultDiv');
const winMessage = document.querySelector('.winOrLose');
const scoreArea = document.querySelector('.score-count');
const playAgain = document.querySelector('.playAgainButton');
const userArea = document.querySelector('.user-area');
const compArea = document.querySelector('.comp-area');

let scoreCount = 0;

// local storage
if(localStorage.getItem('current-score') == null){
    scoreCount=0;
}else{
    scoreCount = localStorage.getItem('current-score');
}
updateScore(scoreCount);


// functions
function showModal(){
    modal.style.display = 'block';
    mainContent.style.opacity = '0.4';
}
function hideModal(){
    modal.style.display = 'none';
    mainContent.style.opacity = '1';
}

function updateScore(scoreCount){
    scoreArea.innerText = scoreCount;
    localStorage.setItem('current-score',scoreCount);
}

// Game logic
const choiceArr = ['paper', 'scissors', 'rock'];
function randomChoice(){
    const num = Math.floor(Math.random()*3);
    const ele = getButton(choiceArr[num]);
    return ele;
}

function getButton(choice){
    const html = `
        <button class="${choice}" id="large-btn">
            <span class="wrapper">
                <img src="./images/icon-${choice}.svg" alt="${choice}">
            </span>
        </button>
        `;
    return html;
}

function checkWin(user,comp){
    console.log(user,comp);
    if((user=='paper' && comp=='rock') || 
    (user=='scissors' && comp=='paper') || 
    (user=='rock' && comp=='scissors')) return true;
    
    return false;
}

function playGame(userBtn){
    const userChoice = getButton(userBtn.className);
    const compChoice = randomChoice();
    gameDisplay.style.display = 'none';
    resultDisplay.style.display = 'flex';
    console.log(userChoice);
    console.log(compChoice);
    userArea.innerHTML = userChoice;
    compArea.innerHTML = compChoice;
    let userClass = userArea.firstElementChild.className;
    let compClass = compArea.firstElementChild.className;
    if(userClass != compClass){
        if(checkWin(userClass,compClass)){
            winMessage.firstElementChild.innerText = 'YOU WIN 🎉';
            winMessage.firstElementChild.style.color = 'greenyellow';
            userArea.firstElementChild.style.animation = 'win 2s infinite';
            scoreCount++;
        }else{
            winMessage.firstElementChild.innerText = 'YOU LOSE 😭';
            winMessage.firstElementChild.style.color = 'red';
            compArea.firstElementChild.style.animation = 'win 2s infinite';
            scoreCount--;
        }
        updateScore(scoreCount); 
    }else{
        winMessage.firstElementChild.innerText = 'DRAW 😝';
        winMessage.firstElementChild.style.color = 'white';
    }
}

// event listeners
playAgain.addEventListener('click',()=>{
    gameDisplay.style.display = 'flex';
    resultDisplay.style.display = 'none';
});
rulesBtn.addEventListener('click',()=>{
    showModal();
});
cancelBtn.addEventListener('click',()=>{
    hideModal();
});