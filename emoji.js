const emojiDetails = [
    {description: 'Smiling face with sunglasses', emoji: '😎'},
    {description: 'Thumbs up', emoji: '👍'},
    {description: 'Red heart', emoji: '❤️'},
    {description: 'Crying face', emoji: '🥲'},
    {description: 'Party popper', emoji: '🎉'},
]

let currentEmojiIndex = 0;
let score = 0;
let seconds = 30;
let timer; // Variable to hold the timer interval

const timerElement = document.getElementById('timer');

const guessInput = document.getElementById('guess-input');
const resultElement = document.getElementById('result');
const scoreElement = document.getElementById('score');
function displayEmoji(){
    const descriptionElement = document.getElementById('description');
    descriptionElement.textContent = emojiDetails[currentEmojiIndex].emoji;
    //display the initial timer value
    timerElement.textContent = `Time: ${seconds}s`;
    
}

function checkGuess(){
    const guess = guessInput.value.trim().toLowerCase();
    const correctEmoji = emojiDetails[currentEmojiIndex].description.trim().toLowerCase();
    if(guess === correctEmoji){
        resultElement.textContent = 'Correct!';
        score++;
    }else{
        resultElement.textContent = 'Wrong!';
    }
    console.log(score);
    scoreElement.textContent = `Score: ${score}`;
    guessInput.value = '';
    guessInput.focus(); //This means the text cursor will appear in the input box, allowing the user to start typing immediately without clicking on it. 
    // In your code, this ensures that after each guess, the input box is ready for the next guess.
    nextEmoji();
}

function nextEmoji(){
    currentEmojiIndex++;
    //I want to remove the result message as soon as the next emoji is displayed and delay by 1sec to see the result
    //resultElement.textContent = '';
    setTimeout(() => {
        resultElement.textContent = '';
    }, 1000);
    if(currentEmojiIndex === emojiDetails.length){
        currentEmojiIndex = 0;
        score = 0;
    }
    displayEmoji();
}

//event listener for the input box to check the guess when the Enter key is pressed
document.getElementById('guess-input').addEventListener('keydown', (event) => {
    if(event.key === 'Enter'){
        checkGuess();
    }
});
 // The below code is used to make sure that the displayEmoji() function runs only after the HTML elements are available in the DOM.
 //  This prevents errors that would occur if you tried to access or modify elements before they exist on the page.
 document.addEventListener("DOMContentLoaded",() => {
    displayEmoji();
    //whenever the DOM content is loaded, we start the timer
    startTimer();
 });


 //let's write the function to start the timer
 function startTimer(){
    timer = setInterval(() => {
        seconds--;
        timerElement.textContent = `Time: ${seconds}s`;
        //stop the timer when it reaches 0
        if(seconds <= 0){
            //clearInterval(timer); //this stops the timer
            //alert(`Time's up! Your final score is ${score}.`);
            endGame();
        }
    },1000); //this function runs every 1000 milliseconds (1 second) and decreases the seconds variable by 1 each time.

 }
 function endGame(){
    clearInterval(timer); //stop the timer
    //we don't want the user to keep guessing after time's up, so we disable the input box
    guessInput.disabled = true;
    timerElement.textContent = "Time's up!";
    //alert(`Time's up! Your final score is ${score}.`);
 }