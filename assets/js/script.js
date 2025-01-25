const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const startButton = document.getElementById("startButton");
const playAgainButton = document.getElementById("playAgainButton");

// Game Variables
let snake, direction, food, score, gameInterval;

// Initialize the Game
function initGame() {
  snake = [{ x: 10, y: 10 }]; // Start in the middle of a 20x20 grid
  direction = { x: 0, y: 0 }; // Start stationary
  food = {
    x: Math.floor(Math.random() * 20),
    y: Math.floor(Math.random() * 20),
  };
  score = 0;
  drawBoard();
}

// Start the Game
function startGame() {
  initGame();
  startButton.style.display = "none";
  playAgainButton.style.display = "none";
  gameInterval = setInterval(updateGame, 100); // Start game loop
}

// Update the Game State
function updateGame() {
  // Move the snake only if it has started moving
  if (direction.x === 0 && direction.y === 0) {
    drawBoard();
    return; // Prevent the game from ending before the snake moves
  }

  const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };

  // Check for collisions (walls, self)
  if (
    head.x < 0 ||
    head.x >= 20 ||
    head.y < 0 ||
    head.y >= 20 ||
    snake.some((segment) => segment.x === head.x && segment.y === head.y)
  ) {
    endGame();
    return;
  }

  // Check for food
  if (head.x === food.x && head.y === food.y) {
    snake.unshift(head); // Grow snake
    food = {
      x: Math.floor(Math.random() * 20),
      y: Math.floor(Math.random() * 20),
    }; // Reposition food
    score++;
  } else {
    snake.pop(); // Remove tail
    snake.unshift(head); // Add new head
  }

  drawBoard();
}

// Draw the Board
function drawBoard() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw the snake
  snake.forEach((segment) => {
    ctx.fillStyle = "green";
    ctx.fillRect(segment.x * 20, segment.y * 20, 20, 20);
  });

  // Draw the food
  ctx.fillStyle = "red";
  ctx.fillRect(food.x * 20, food.y * 20, 20, 20);

  // Draw the score
  ctx.fillStyle = "white";
  ctx.font = "20px Arial";
  ctx.fillText(`Score: ${score}`, 10, canvas.height - 10);
}

// Handle Game Over
function endGame() {
  clearInterval(gameInterval);
  ctx.fillStyle = "white";
  ctx.font = "30px Arial";
  ctx.fillText("Game Over", canvas.width / 4, canvas.height / 2);
  startButton.style.display = "none";
  playAgainButton.style.display = "block";
}

// Handle Direction Change
document.addEventListener("keydown", (event) => {
  const key = event.key;
  if (key === "ArrowUp" && direction.y === 0) direction = { x: 0, y: -1 };
  else if (key === "ArrowDown" && direction.y === 0) direction = { x: 0, y: 1 };
  else if (key === "ArrowLeft" && direction.x === 0)
    direction = { x: -1, y: 0 };
  else if (key === "ArrowRight" && direction.x === 0)
    direction = { x: 1, y: 0 };
});

// Event Listeners for Buttons
startButton.addEventListener("click", startGame);
playAgainButton.addEventListener("click", () => {
  initGame();
  startGame();
});
