// Seleciona elementos do DOM
const minutesEl = document.querySelector("#minutes");
const secondsEl = document.querySelector("#seconds");
const millisecondsEl = document.querySelector("#milliseconds");
const startBtn = document.querySelector("#startBtn");
const audio = new Audio("audio/tiro.WAV");
const pauseBtn = document.querySelector("#pauseBtn");
const resumeBtn = document.querySelector("#resumeBtn");
const resetBtn = document.querySelector("#resetBtn");

// Inicializa variáveis
let interval;
let minutes = 0;
let seconds = 0;
let milliseconds = 0;
let isPaused = false;

// Adiciona event listeners aos botões
startBtn.addEventListener("click", startTimer);
pauseBtn.addEventListener("click", pauseTime);
resumeBtn.addEventListener("click", resumeTimer);
resetBtn.addEventListener("click", resetTimer);
startBtn.addEventListener("click", () => {
  audio.play();
  startTimer();
});

// Função para iniciar o temporizador
function startTimer() {
  // Define o intervalo de tempo para atualizar o temporizador
  interval = setInterval(() => {
    // Verifica se o temporizador não está pausado
    if (!isPaused) {
      // Incrementa os milissegundos
      milliseconds += 10;

      // Verifica se um segundo passou
      if (milliseconds === 1000) {
        seconds++;
        milliseconds = 0;
      }

      // Verifica se um minuto passou
      if (seconds === 60) {
        minutes++;
        seconds = 0;
      }

      // Atualiza o conteúdo dos elementos no DOM
      minutesEl.textContent = formatTime(minutes);
      secondsEl.textContent = formatTime(seconds);
      millisecondsEl.textContent = formatMilliseconds(milliseconds);
    }
  }, 10);

  // Altera o estilo dos botões
  startBtn.style.display = "none";
  pauseBtn.style.display = "block";
}

// Função para pausar o temporizador
function pauseTime() {
  isPaused = true;
  pauseBtn.style.display = "none";
  resumeBtn.style.display = "block";
}

// Função para continuar o temporizador após pausa
function resumeTimer() {
  isPaused = false;
  pauseBtn.style.display = "block";
  resumeBtn.style.display = "none";
}

// Função para resetar o temporizador
function resetTimer() {
  // Limpa o intervalo de tempo
  clearInterval(interval);
  // Reseta as variáveis
  minutes = 0;
  seconds = 0;
  milliseconds = 0;

  // Atualiza o conteúdo dos elementos no DOM
  minutesEl.textContent = "00";
  secondsEl.textContent = "00";
  millisecondsEl.textContent = "000";

  // Altera o estilo dos botões
  startBtn.style.display = "none";
  pauseBtn.style.display = "block";
  resumeBtn.style.display = "none";
  resetBtn.style.display = "block"; // oculta o botão reset

  // exibe o botão de pausa
  pauseBtn.style.display = "block";
}

// Função para formatar o tempo em minutos e segundos
function formatTime(time) {
  return time < 10 ? `0${time}` : time;
}

// Função para formatar os milissegundos
function formatMilliseconds(time) {
  return time < 100 ? `${time}`.padStart(3, "0") : time;
}
