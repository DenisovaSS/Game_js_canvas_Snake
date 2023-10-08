const canvas = document.getElementById("game");
const snakeScore = document.querySelector(".result");
const startContainer = document.querySelector(".start-container");
const gameContainer = document.querySelector(".game-container");
const gameOverContainer = document.querySelector(".gameOver-container");
const theBestScore = document.querySelector(".snake-high-score");
const listForBest = document.querySelector(".bestPlayer");
const ctx = canvas.getContext("2d");
const ground = new Image();
ground.src = "img/pol.png";
const foodS = new Image();
foodS.src = "img/f.png";
let step = 29;
let score = 0;
let foodCoord = {
  x: 52 + step * Math.floor(Math.random() * 22),
  y: 65 + step * Math.floor(Math.random() * 11),
};
let snake = [];
snake[0] = {
  x: 52 + step * 11,
  y: 65 + step * 5,
};
let movedir;
let r = [];
const myKey = "bestOfTheBestPlayer";
visibleStartMenu();

function playGame() {
  if (game) {
    clearInterval(game);
  }
  snakeScore.textContent = 0;
  score = 0;
  snake = [];
  snake[0] = {
    x: 52 + step * 11,
    y: 65 + step * 5,
  };
  visibleGame();
  game = setInterval(draw, 300);
}
function best(item) {
  let hight = JSON.parse(localStorage.getItem(myKey)) || [];
  hight.push(item);
  hight.sort((a, b) => b - a);
  hight = hight.slice(0, 10);
  localStorage.setItem(myKey, JSON.stringify(hight));
}
let finalArray = JSON.parse(localStorage.getItem(myKey)) || [];
function finalResultForBestPlayers(arr) {
  listForBest.innerHTML = "";
  arr.forEach((onePic, index) => {
    const list = `<ul class="listForBest">
        <li> player${index + 1}: ${onePic}</li>   
</ul> `;
    listForBest.insertAdjacentHTML("beforeend", list);
  });
}

theBestScore.textContent = finalArray[0];
function visibleStartMenu() {
  startContainer.classList.remove("start-container_hide");
  gameOverContainer.classList.add("gameOver-container_hide");
}
function visibleGame() {
  startContainer.classList.add("start-container_hide");
  gameOverContainer.classList.add("gameOver-container_hide");
}
function visibleGameOver() {
  startContainer.classList.add("start-container_hide");
  gameOverContainer.classList.remove("gameOver-container_hide");
}

//lisener for start move
document.addEventListener("keydown", move);

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
      best(score);
      finalArray = JSON.parse(localStorage.getItem(myKey)) || [];
      finalResultForBestPlayers(finalArray);
      visibleGameOver();
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
  //draw text
  // ctx.fillStyle = "rgb(253, 254, 220)";
  // ctx.font = "20px 'Press Start 2P', cursive";
  // ctx.fillText("score: ", step * 1.4, step * 1.5);
  // ctx.fillStyle = "rgb(253, 254, 220)";
  // ctx.font = "25px 'Press Start 2P', cursive";
  // ctx.fillText(score, step * 5.5, step * 1.6);

  let SnakeX = snake[0].x;
  let SnakeY = snake[0].y;

  if (SnakeX == foodCoord["x"] && SnakeY == foodCoord["y"]) {
    score++;
    snakeScore.textContent = score;
    console.log(score);
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
  ) {
    clearInterval(game);
    best(score);
    finalArray = JSON.parse(localStorage.getItem(myKey)) || [];
    finalResultForBestPlayers(finalArray);
    visibleGameOver();
  }

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
let game = setInterval(draw, 300);
//
//
//

// let a = 11,
//   b = 8,
//   c = 10,
//   d = 12;
// function best(item) {

//   let hight = JSON.parse(localStorage.getItem(myKey)) || [];
//   hight.push(item);
//   hight.sort((a, b) => b - a);
//   hight = hight.slice(0, 3);
//   localStorage.setItem(myKey, JSON.stringify(hight));
// }

// best(a);
// best(b);
// best(c);
// best(d);
// let finalArray = JSON.parse(localStorage.getItem(myKey)) || [];
// console.log(finalArray);
