let timer;
let minutes = 25;
let seconds = 0;
let isRunning = false;
let isWorkSession = true;

const timerDisplay = document.getElementById("timer");
const startBtn = document.getElementById("start-btn");
const resetBtn = document.getElementById("reset-btn");
const statusText = document.getElementById("status");

function updateDisplay() {
  timerDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

function startTimer() {
  if (!isRunning) {
    isRunning = true;
    startBtn.textContent = "Pause";
    timer = setInterval(() => {
      if (seconds === 0) {
        if (minutes === 0) {
          // Session ended
          clearInterval(timer);
          isRunning = false;
          if (isWorkSession) {
            // Switch to break
            minutes = 5;
            statusText.textContent = "Break Time!";
          } else {
            // Switch back to work
            minutes = 25;
            statusText.textContent = "Work Session";
          }
          isWorkSession = !isWorkSession;
          startBtn.textContent = "Start";
          alert(isWorkSession ? "Time to work!" : "Take a break!");
        } else {
          minutes--;
          seconds = 59;
        }
      } else {
        seconds--;
      }
      updateDisplay();
    }, 1000);
  } else {
    clearInterval(timer);
    isRunning = false;
    startBtn.textContent = "Resume";
  }
}

function resetTimer() {
  clearInterval(timer);
  isRunning = false;
  isWorkSession = true;
  minutes = 25;
  seconds = 0;
  statusText.textContent = "Work Session";
  startBtn.textContent = "Start";
  updateDisplay();
}

startBtn.addEventListener("click", startTimer);
resetBtn.addEventListener("click", resetTimer);

updateDisplay();
