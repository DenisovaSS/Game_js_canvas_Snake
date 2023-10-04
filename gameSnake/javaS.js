const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");
const ground = new Image();
ground.src = "img/pol.png";
const foodS = new Image();
foodS.src = "img/f.png";
let step = 29;
console.log(52 + step * Math.floor(Math.random() * 21));
let score = 0;
// console.log(Math.floor(Math.random() * 21) * step);
let foodCoord = {
  x: 52 + step * Math.floor(Math.random() * 22),
  y: 65 + step * Math.floor(Math.random() * 11),
};
let snake = [];
snake[0] = {
  x: 52 + step * 11,
  y: 65 + step * 5,
};
document.addEventListener("keydown", move);
let movedir;
function move(e) {
  if (e.keyCode == 37 && movedir != "right") {
    movedir = "left";
  } else if (e.keyCode == 38 && movedir != "down") {
    movedir = "up";
  } else if (e.keyCode == 39 && movedir != "left") {
    movedir = "right";
  } else if (e.keyCode == 40 && movedir != "up") {
    movedir = "down";
  }
}
function eatTail(head, tail) {
  for (let i = 0; i < tail.length; i++) {
    if (head.x == tail[i].x && head.y == tail[i].y) {
      clearInterval(game);
    }
  }
}
function draw() {
  ctx.drawImage(ground, 0, 0);
  ctx.drawImage(foodS, foodCoord["x"], foodCoord["y"]);
  for (let i = 0; i < snake.length; i++) {
    ctx.fillStyle = i == 0 ? "rgb(65, 65, 65)" : "rgb(111, 117, 89)";
    ctx.fillRect(snake[i].x, snake[i].y, step, step);
  }
  ctx.fillStyle = "rgb(253, 254, 220)";
  ctx.font = "30px serif";
  ctx.fillText("score: ", step * 1.4, step * 1.4);
  ctx.fillStyle = "rgb(253, 254, 220)";
  ctx.font = "30px serif";
  ctx.fillText(score, step * 4, step * 1.5);
  let SnakeX = snake[0].x;
  let SnakeY = snake[0].y;
  if (SnakeX == foodCoord["x"] && SnakeY == foodCoord["y"]) {
    score++;
    foodCoord = {
      x: 52 + step * Math.floor(Math.random() * 22),
      y: 65 + step * Math.floor(Math.random() * 11),
    };
  } else {
    snake.pop();
  }
  if (
    SnakeX < 52 ||
    SnakeX > 52 + step * 21 ||
    SnakeY < 65 ||
    SnakeY > 65 + step * 11
  )
    clearInterval(game);

  if (movedir == "left") SnakeX -= step;
  if (movedir == "right") SnakeX += step;
  if (movedir == "up") SnakeY -= step;
  if (movedir == "down") SnakeY += step;
  let newHead = {
    x: SnakeX,
    y: SnakeY,
  };
  eatTail(newHead, snake);
  snake.unshift(newHead);
}
let game = setInterval(draw, 120);
