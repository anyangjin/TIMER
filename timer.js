// DOM 요소 가져오기
const hoursInput = document.getElementById("hours-input");
const minutesInput = document.getElementById("minutes-input");
const secondsInput = document.getElementById("seconds-input");
const hoursDisplay = document.getElementById("hours-display");
const minutesDisplay = document.getElementById("minutes-display");
const secondsDisplay = document.getElementById("seconds-display");
const startButton = document.getElementById("start-button");
const pauseButton = document.getElementById("pause-button");
const resetButton = document.getElementById("reset-button");

// 변수 초기화
let totalSeconds = 0;
let timerIntervalId = null;

// 시간을 계산하는 함수
function calculateTime() {
  const hours = parseInt(hoursInput.value) || 0;
  const minutes = parseInt(minutesInput.value) || 0;
  const seconds = parseInt(secondsInput.value) || 0;
  totalSeconds = hours * 3600 + minutes * 60 + seconds;
}

// 시간을 표시하는 함수
function displayTime() {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  hoursDisplay.textContent = hours < 10 ? `0${hours}` : hours;
  minutesDisplay.textContent = minutes < 10 ? `0${minutes}` : minutes;
  secondsDisplay.textContent = seconds < 10 ? `0${seconds}` : seconds;
}

// 타이머를 시작하는 함수
function startTimer() {
  calculateTime();
  displayTime();
  startButton.disabled = true;
  pauseButton.disabled = false;
  resetButton.disabled = false;
  timerIntervalId = setInterval(() => {
    totalSeconds--;
    displayTime();
    if (totalSeconds === 0) {
      clearInterval(timerIntervalId);
      startButton.disabled = false;
      pauseButton.disabled = true;
      resetButton.disabled = true;
    }
  }, 1000);
}

// 타이머를 일시정지하는 함수
function pauseTimer() {
  clearInterval(timerIntervalId);
  startButton.disabled = false;
  pauseButton.disabled = true;
  resetButton.disabled = false;
}

// 타이머를 초기화하는 함수
function resetTimer() {
  clearInterval(timerIntervalId);
  hoursInput.value = "0";
  minutesInput.value = "0";
  secondsInput.value = "0";
  hoursDisplay.textContent = "00";
  minutesDisplay.textContent = "00";
  secondsDisplay.textContent = "00";
}

// 이벤트 리스너 등록
startButton.addEventListener("click", startTimer);
pauseButton.addEventListener("click", pauseTimer);
resetButton.addEventListener("click", resetTimer);
