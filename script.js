
/* =========================
   GAME VARIABLES
========================= */

const min = 1;
const max = 100;
const maxAttempts = 10;

let res;
let count = 0;
let previousGuesses = [];
let gameOver = false;

const titleScreen = document.getElementById("title");
const gameScreen = document.getElementById("game");
const guessInput = document.getElementById("guess");
const submitButton = document.getElementById("submitu");
const resultDisplay = document.getElementById("results");
const guessesDisplay = document.getElementById("guessings");
const attemptDisplay = document.getElementById("attemptCount");

const guessSpan = document.querySelectorAll(".bubble span");

/* =========================
   RANDOM NUMBER GENERATOR
========================= */

function generateRandomNumber() {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/* Display random numbers inside the floating shapes */
function updateShapeNumbers() {
    guessSpan.forEach(function (span) {
        span.textContent = generateRandomNumber();
    });
}

/* Reset the colors of all shapes */
function resetShapeColors() {
    guessSpan.forEach(function (span) {
        span.classList.remove("wrong", "correct", "first");
        span.classList.add("first");
    });
}

/* Change the color of all shapes */
function changeShapeColor(colorClass) {
    guessSpan.forEach(function (span) {
        span.classList.remove("first", "wrong", "correct");
        span.classList.add(colorClass);
    });
}

/* =========================
   START GAME
========================= */

function myfunc() {
    titleScreen.style.display = "none";
    gameScreen.style.display = "block";

    functionres();

    guessInput.focus();
}

/* =========================
   RESTART GAME
========================= */

function functionres() {
    res = generateRandomNumber();
    count = 0;
    previousGuesses = [];
    gameOver = false;

    console.log("Secret number:", res);

    // Reset the input
    guessInput.value = "";
    guessInput.disabled = false;

    // Enable submit button
    submitButton.disabled = false;

    // Reset displays
    attemptDisplay.textContent = "0";
    guessesDisplay.textContent = "None";
    resultDisplay.textContent = "Good luck!";

    // Reset shape colors and numbers
    resetShapeColors();
    updateShapeNumbers();

    guessInput.focus();
}

/* =========================
   CHECK USER GUESS
========================= */

function myFunction() {
    if (gameOver) {
        return;
    }

    const guess = Number(guessInput.value);

    // Validate empty input
    if (guessInput.value.trim() === "") {
        resultDisplay.textContent = "Please enter a number!";
        return;
    }

    // Validate number range
    if (!Number.isInteger(guess) || guess < min || guess > max) {
        resultDisplay.textContent =
            "Enter a whole number between 1 and 100!";
        return;
    }

    // Prevent duplicate guesses
    if (previousGuesses.includes(guess)) {
        resultDisplay.textContent =
            "You already guessed that number. Try another!";
        guessInput.select();
        return;
    }

    // Record the guess
    previousGuesses.push(guess);
    count++;

    attemptDisplay.textContent = count;
    guessesDisplay.textContent = previousGuesses.join(", ");

    // Check whether the player wins
    if (guess === res) {
        resultDisplay.textContent =
            "🎉 Correct Answer! You won in " + count +
            (count === 1 ? " attempt!" : " attempts!");

        changeShapeColor("correct");
        endGame();
        return;
    }

    // Check whether the guess is too high or low
    if (guess > res) {
        resultDisplay.textContent =
            "📉 Too high! Try a smaller number.";

        changeShapeColor("wrong");
    } else {
        resultDisplay.textContent =
            "📈 Too low! Try a bigger number.";

        changeShapeColor("wrong");
    }

    // Check whether attempts have run out
    if (count >= maxAttempts) {
        resultDisplay.textContent =
            "😢 Game Over! The correct number was " + res + ".";

        endGame();
        return;
    }

    // Prepare for the next guess
    guessInput.value = "";
    guessInput.focus();
}

/* =========================
   END GAME
========================= */

function endGame() {
    gameOver = true;

    guessInput.disabled = true;
    submitButton.disabled = true;
}

/* =========================
   PRESS ENTER TO SUBMIT
========================= */

guessInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        myFunction();
    }
});

/* =========================
   INITIALIZE GAME
========================= */

updateShapeNumbers();
