
/*linking start, game and end pages
function startGame(){
    let startDiv = document.getElementById("game-intro");
    let gameCanvas = document.getElementById("board");
    let gameOver = document.getElementById("gameOver");
    startDiv.style.display = "none";
    gameCanvas.style.display = "block";
    gameOver.style.display = "none";
    start();
}   

function gameOver(){
    let startDiv = document.getElementById("game-intro");
    let gameCanvas = document.getElementById("board");
    let gameOver = document.getElementById("gameOver");
    startDiv.style.display = "none";
    gameCanvas.style.display = "none";
    gameOver.style.display = "block";

    ball.reset();
    player.reset();
    block.reset();

    clearInterval(loop)
}

*/

//canvas

let canvas;
let boardWidth = 500;
let boardHeight = 500;
let context;


//players (slider)
let playerWidth = 100;
let playerHeight = 20;
//let img = new Image(); trird to insert image instead of the square ball
//img.src = 'Images/chicken_8bit.png';
//img.width = 100;
//img.height = 50;
//context.drawImage(img, 250, 250, 100, 50);
//context.fill();
let playerVelocityX = 10;

let player = {
    x: boardWidth/2 - playerWidth/2,
    y: boardHeight - playerHeight - 5,
    width:  playerWidth,
    height: playerHeight,
    velocityX: playerVelocityX 
}

//ball

let ballWidth = 10;
let ballHeight = 10;
let ballVelocityX = 3; 
let ballVelocityY = 2; 

let ball = {
    x : boardWidth/2,
    y : boardHeight/2,
    width: ballWidth,
    height: ballHeight,
    velocityX: ballVelocityX,
    velocityY: ballVelocityY
}

//blocks
let blockArray = [];
let blockWidth = 50;
let blockHeight = 10;
let blockColumns = 8;
let blockRows = 3;
let blockMaxRows = 10;
let blockCount = 0;

//starting block corners top left
let blockX = 15;
let blockY = 45;

let score = 0;
let gameOver = false;

window.onload = function(){
    board = document.getElementById("board");
    board.height = boardHeight;
    board.width = boardWidth;
    context = board.getContext("2d");

    //draw initial player 
    //context.fillStyle = "lightgreen";
    context.fillRect(player.x, player.y,player.width, player.height);

    requestAnimationFrame(update);
    document.addEventListener("keydown", movePlayer);

    //create blocks
   createBlocks();
}

function update() {
    requestAnimationFrame(update);
    if (gameOver){
        return;
    }
    context.clearRect(0, 0, board.width, board.height);

    //player
    context.fillStyle = "lightgreen";
    context.fillRect(player.x, player.y,player.width, player.height);

    context.fillStyle = "white";
    ball.x += ball.velocityX;
    ball.y += ball.velocityY;
    context.fillRect(ball.x, ball.y, ball.width, ball.height);

    if (ball.y <= 0){
        //if ball touches top of canvas
        ball.velocityY *= -1; //reverse direction
    }
    else if (ball.x <= 0 || (ball.x + ball.width >= boardWidth)){
        //if ball touches left or right of canvas
        ball.velocityX *= -1; //reverse direction
    }

    else if (ball.y + ball.height >= boardHeight) {
        //if ball touches bottom of canvas
        context.font = "20px sans-serif";
        context.fillText("Game Over: Press 'Space' to restart", 80, 400);
        gameOver = true;
    }

        //bounce the ball off player paddle
        if (topCollision(ball, player)|| bottomCollision(ball, player)){
        ball.velocityY *= -1;
        }

        else if (leftCollision(ball, player)|| rightCollision(ball, player)){
        ball.velocityX *= -1;
        }

        //blocks
        //context.fillStyle = "skyBlue";
        for (let i=0; i<blockArray.length; i++){
            let block = blockArray [i];
            if (!block.break){
                if (topCollision(ball, block)||bottomCollision(ball, block)){
                    block.break = true;
                    ball.velocityY *= -1;
                    score += 100;
                    blockCount -= 1;
                }
                else if (leftCollision(ball, block) || rightCollision(ball, block)){
                    block.break = true;
                    ball.velocityX *= -1;
                    score += 100;
                    blockCount -= 1;
                }
                context.fillRect(block.x, block.y, block.width, block.height);
            }
        }
           if (blockCount ==0){
            score += 100*blockRows*blockColumns;
            blockRows = Math.min(blockRows + 1, blockMaxRows);
            createBlocks();
            
        }

        //score
        context.font = "20px sans-serif";
        context.fillText(score, 10, 25);
}

function outOfBounds(xPosition){
    return (xPosition < 0 || xPosition + playerWidth > boardWidth);
}

function movePlayer(e) {
    if (gameOver){
       if(e.code == "Space") {
            resetGame();
            console.log("RESET");
        }
        return;
   }

    if (e.code == "ArrowLeft") {
//player.x -= player.velocityX;
    let nextplayerX = player.x - player.velocityX;
    if (!outOfBounds(nextplayerX)){
        player.x = nextplayerX;
        }

    }
    else if (e.code == "ArrowRight") {
    //player.x += player.velocityX;
    let nextplayerX = player.x + player.velocityX;
    if (!outOfBounds(nextplayerX)){
        player.x = nextplayerX;
        }
    }
}

function detectCollision (a,b) {
    return a.x < b.x + b.width &&
           a.x + a.width > b.x &&
           a.y < b.y + b.height &&
           a.y + a.height > b.y;
}

function topCollision(ball, block){
    return detectCollision(ball, block) && (ball.y + ball.height) >= block.y;
}

function bottomCollision(ball, block){
    return detectCollision(ball, block) && (block.y + block.height) >= ball.y;
}

function leftCollision(ball, block){
    return detectCollision(ball, block) && (ball.x + ball.width) >= block.x;
}

function rightCollision(ball, block){
    return detectCollision(ball, block) && (block.x + block.width) >= ball.x;
}

function createBlocks(){
    blockArray = [];
    for (let c=0; c<blockColumns; c++){
        for (let r = 0; r < blockRows; r++){
            let block = {
                x : blockX + c*blockWidth + c*10,
                y : blockY + r*blockHeight + r*10,
                width : blockWidth,
                height : blockHeight,
                break : false
            }
            blockArray.push(block);
        }

    }
blockCount = blockArray.length;
}

function resetGame(){
    gameOver = false;
    player = {
        x : boardWidth/2 - playerWidth/2,
        x : boardHeight - playerHeight - 5,
        width: playerWidth,
        height: playerHeight,
        velocityX : playerVelocityX
    }
    ball = {
        x : boardWidth/2,
        y : boardHeight/2,
        width: ballWidth,
        height: ballHeight,
        velocityX : ballVelocityX,
        velocityY: ballVelocityY,
    }
    blockArray = [];
    blockRows = 3;
    score = 0;
    createBlocks();
}

