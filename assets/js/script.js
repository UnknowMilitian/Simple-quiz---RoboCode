const countdownElement = document.getElementById("countdown");
const borderCircle = document.querySelector(".border-svg circle");
const timerDuration = 10; // Duration for each card
let countdownValue = timerDuration;

function startTimer(duration) {
  countdownElement.textContent = duration;

  const interval = setInterval(() => {
    countdownValue--;

    if (countdownValue < 0) {
      clearInterval(interval);
      if (currentCardIndex < cards.length - 1) {
        currentCardIndex++;
        showCard(currentCardIndex);
        updateButtons();
      } else {
        countdownElement.textContent = "Test completed";
      }
    } else {
      countdownElement.textContent = countdownValue;

      // Calculate strokeDashoffset based on remaining time (inverse)
      const strokeOffset =
        ((timerDuration - countdownValue) / timerDuration) * 283;
      borderCircle.style.strokeDashoffset = strokeOffset;
    }
  }, 1000);
}

// Call startTimer function as needed
startTimer(timerDuration); // To start the countdown

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
