const quizCards = document.querySelectorAll(".quiz");
let currentCardIndex = 0;
let countdownElement = document.getElementById("countdown");
let borderCircle = document.querySelector(".border-svg circle");
let timerDuration = 10; // Duration for each card
let countdownValue = timerDuration;
let timeInterval;
let nextButton = document.getElementById("nextQuiz");
let resultsButton = document.getElementById("seeResults");
let paginationNumber = document.querySelector(".pagination_number");

function showCard(index) {
  clearInterval(timeInterval); // Clear any existing timer

  quizCards.forEach((card, idx) => {
    if (idx === index) {
      card.classList.remove("hidden");
    } else {
      card.classList.add("hidden");
    }
  });

  countdownElement = document.getElementById("countdown"); // Update the countdown element for the new card
  borderCircle = document.querySelector(".border-svg circle"); // Update the border circle for the new card
  countdownValue = timerDuration; // Reset countdown value for the new card

  startTimer(timerDuration);
  paginationNumber.textContent = `${currentCardIndex + 1}/${quizCards.length}`;
}

function startTimer(duration) {
  countdownElement.textContent = duration;
  borderCircle.style.strokeDashoffset = 0; // Reset circle animation at the start of each timer
  clearInterval(timeInterval);

  timeInterval = setInterval(() => {
    countdownValue--;
    if (countdownValue < 0) {
      clearInterval(timeInterval);
      if (currentCardIndex < quizCards.length - 1) {
        currentCardIndex++;
        showCard(currentCardIndex);
        updateButtons();
      } else {
        resultsButton.classList.remove("hidden");
        nextButton.classList.add("hidden");
        window.location.href = "results.html"; // Redirect to results page after last question's timer ends
      }
    } else {
      countdownElement.textContent = countdownValue;
      const strokeOffset =
        ((timerDuration - countdownValue) / timerDuration) * 283;
      borderCircle.style.strokeDashoffset = strokeOffset;
    }
  }, 1000);
}
function buttonPreventDefault(btns) {
  console.log(btns);
  btns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
    });
  });
}

buttonPreventDefault([nextButton, resultsButton]);

function updateButtons() {
  if (currentCardIndex === quizCards.length - 1) {
    resultsButton.classList.remove("hidden");
    nextButton.classList.add("hidden");
  } else {
    resultsButton.classList.add("hidden");
    nextButton.classList.remove("hidden");
  }
}

function initializeQuiz() {
  showCard(currentCardIndex);
  updateButtons();
}

initializeQuiz();

nextButton.addEventListener("click", () => {
  if (currentCardIndex < quizCards.length - 1) {
    currentCardIndex++;
    showCard(currentCardIndex);
    updateButtons(); // Ensure button state is correctly updated when manually clicking Next
  }
});

resultsButton.addEventListener("click", () => {
  window.location.href = "results.html"; // Change 'results.html' to your actual results page
});

// Rest of your code for button click handling remains unchanged

//////////
const buttons = document.querySelectorAll(".quiz-buttons__item button");
const radios = document.querySelectorAll(
  '.quiz-buttons__item input[type="radio"]'
);

buttons.forEach((button, index) => {
  // Event listener for button click
  button.addEventListener("click", (event) => {
    event.preventDefault(); // Prevent the default action (page refresh)

    radios[index].checked = true; // Toggle the corresponding radio button

    // Reset button styles for all buttons
    buttons.forEach((btn) => {
      btn.style.backgroundColor = "#c4b5fd"; // Reset button color
    });

    // Change the style of the clicked button
    button.style.backgroundColor = "#84cc16";
  });
});
