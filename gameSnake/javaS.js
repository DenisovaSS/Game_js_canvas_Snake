const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");
const ground = new Image();
ground.src = "img/gridSmall.png";
const foodS = new Image();
foodS.src = "img/foodSsmall.png";
let step = 18.5;
let score = 0;
function draw() {
  ctx.drawImage(ground, 0, 0);
  ctx.drawImage(foodS, 50, 55.5);
}
