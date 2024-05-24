let startTime = 0;
let elapsedTime = 0;
let lapCounter = 0;
let interval;

const startButton = document.getElementById('startButton');
const stopButton = document.getElementById('stopButton');
const resetButton = document.getElementById('resetButton');
const lapButton = document.getElementById('lapButton');
const lapTimes = document.getElementById('lapTimes').getElementsByTagName('tbody')[0];
const timerDisplay = document.getElementById('timerDisplay'); // Elemento de exibição do tempo

// Start the timer
startButton.addEventListener('click', function() {
    if (!interval) {
        startTime = Date.now() - elapsedTime;
        interval = setInterval(updateTime, 10);
    }
});

// Stop the timer
stopButton.addEventListener('click', function() {
    clearInterval(interval);
    interval = null;
});

// Reset the timer and clear laps
resetButton.addEventListener('click', function() {
    clearInterval(interval);
    interval = null;
    elapsedTime = 0;
    lapCounter = 0;
    lapTimes.innerHTML = '';
    updateTimeDisplay(0); // Resetar a exibição do tempo
});

// Log a new lap
lapButton.addEventListener('click', function() {
    const lapTime = elapsedTime;
    lapCounter++;
    const row = lapTimes.insertRow();
    const cell1 = row.insertCell(0);
    const cell2 = row.insertCell(1);
    cell1.textContent = `Lap ${lapCounter}`;
    cell2.textContent = formatTime(lapTime);
});

// Update the displayed time
function updateTime() {
    elapsedTime = Date.now() - startTime;
    updateTimeDisplay(elapsedTime);
}

function updateTimeDisplay(time) {
    timerDisplay.textContent = formatTime(time); // Atualizar o elemento de exibição do tempo
}

// Format time from milliseconds to a readable format
function formatTime(milliseconds) {
    let seconds = Math.floor(milliseconds / 1000);
    let minutes = Math.floor(seconds / 60);
    seconds = seconds % 60;
    milliseconds = milliseconds % 1000;

    return `${pad(minutes)}:${pad(seconds)}.${pad(Math.floor(milliseconds), 3)}`;
}

// Pad numbers
function pad(number, size = 2) {
    let s = String(number);
    while (s.length < (size || 2)) {s = "0" + s;}
    return s;
}
