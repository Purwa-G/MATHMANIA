let correctAnswer;
let score = 0;
let difficulty;

// Generate floating equations
function createFloatingEquations() {
  const equations = [
    "d = vt",
    "ax² + bx + c = 0",
    "E = mc²",
    "x = (-b ± √(b²-4ac)) / 2a",
    "A = πr²",
    "v = u + at",
    "s = ut + 0.5at²",
    "F = ma",
    "P = IV",
    "sin²θ + cos²θ = 1",
    "log x",
    "x²",
    "x³",
    "13x + 91y = 1900",
    "V = IR",
    "F = GMm / R²",
    "sec²x = 1 + tan²x",
    "log10 = 1",
    "loge = 1",
    "loga x logb = (loga+b)",
    "W = F x s",
    "W = P x dV",
    "v = d/t",
  ];
  const container = document.getElementById("floating-equations");

  for (let i = 0; i < 15; i++) {
    const equation = equations[Math.floor(Math.random() * equations.length)];
    const div = document.createElement("div");
    div.className = "floating-equation";
    div.innerText = equation;

    div.style.left = `${Math.random() * 120 - 10}vw`;
    div.style.top = `${Math.random() * 120 - 10}vh`;
    div.style.animationDuration = `${10 + Math.random() * 20}s`;
    div.style.setProperty("--x-dir", `${Math.random() * 20 - 10}vw`);

    container.appendChild(div);
  }
}

createFloatingEquations();

function goToDifficultyScreen() {
  document.getElementById("main-start-screen").classList.add("hidden");
  document.getElementById("start-screen").classList.remove("hidden");
}

function startGame(selectedDifficulty) {
  difficulty = selectedDifficulty; // Set difficulty level
  score = 0;
  document.getElementById("score").innerText = `Score: ${score}`;
  document.getElementById("start-screen").classList.add("hidden");
  document.getElementById("game-screen").classList.remove("hidden");
  generateQuestion();
}

function quitGame() {
  document.getElementById("game-screen").classList.add("hidden");
  document.getElementById("start-screen").classList.remove("hidden");
}

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getDifficultyRange() {
  switch (difficulty) {
    case 'easy': return { min: 1, max: 20 };
    case 'medium': return { min: 10, max: 100 };
    case 'hard': return { min: 50, max: 1000 };
  }
}

function generateQuestion() {
  const { min, max } = getDifficultyRange();
  const num1 = getRandomNumber(min, max);
  const num2 = getRandomNumber(min, max);
  const operations = ["+", "-", "*", "/", "log", "square", "cube"];
  const operator = operations[Math.floor(Math.random() * operations.length)];

  switch (operator) {
    case "+": correctAnswer = num1 + num2; break;
    case "-": correctAnswer = num1 - num2; break;
    case "*": correctAnswer = num1 * num2; break;
    case "/": correctAnswer = (num1 / num2).toFixed(2); break;
    case "log": correctAnswer = Math.log10(num1).toFixed(2); break;
    case "square": correctAnswer = num1 ** 2; break;
    case "cube": correctAnswer = num1 ** 3; break;
  }

  const questionText =
    operator === "log" ? `What is log(${num1})? `:
    operator === "square" ? `What is ${num1}²? `:
    operator === "cube" ? `What is ${num1}³? `:
    `What is ${num1} ${operator} ${num2}?`;

  document.getElementById("question").innerText = questionText;
  document.getElementById("result").innerText = "";
  document.getElementById("answer").value = "";
}

function updateScore(points) {
  score += points;
  document.getElementById("score").innerText = `Score: ${score}`;
}

function checkAnswer() {
  const userAnswer = document.getElementById("answer").value;
  const resultElement = document.getElementById("result");

  if (userAnswer === correctAnswer.toString()) {
    resultElement.style.color = "green";
    resultElement.innerText = "Correct! Well done!";
    updateScore(10);
  } else {
    resultElement.style.color = "red";
    resultElement.innerText = `Wrong! The correct answer was ${correctAnswer}.`;
    updateScore(-5);
  }

  generateQuestion();
}

document.addEventListener("keydown", (event) => {
  if (event.key === "Enter") checkAnswer();
  if (event.key === "Escape") quitGame();
});
