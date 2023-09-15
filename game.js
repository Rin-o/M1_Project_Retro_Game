//canvas

let canvas;
let boardWidth = 500;
let boardHeight = 500;
let context;


//players
let playerWidth = 80;
let playerHeight = 10;
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




window.onload = function(){
    board = document.getElementById("board");
    board.height = boardHeight;
    board.width = boardWidth;
    context = board.getContext("2d");

    //draw initial player 
    context.fillStyle = "lightgreen";
    context.fillRect(player.x, player.y,player.width, player.height);

    requestAnimationFrame(update);
    document.addEventListener("keydown", movePlayer);

    //create blocks
   // createlocks();
}

function update() {
    requestAnimationFrame(update);
    context.clearRect(0, 0, board.width, board.height);

    //player
    context.fillStyle = "lightgreen";
    context.fillRect(player.x, player.y,player.width, player.height);

    context.fillStyle = "white";
    ball.x += ball.velocityX;
    ball.y += ball.velocityY;
    context.fillRect(ball.x, ball.y, ball.width, ball.height);

    //bounce the ball off player paddle
    //if (topCollision(ball, player)|| bottomCollision(ball, player)){
    //    ball.velocityX *= -1;
    //}

    //else if (leftCollision(ball, player)|| rightCollision(ball, player)){
      //  ball.velocityX *= -1;
    //}
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
        //context.fillText("Game Over: Press 'Space' to restart", 80, 400);
        //gameOver = true;
    }
}

function outOfBounds(xPosition){
    return (xPosition < 0 || xPosition + playerWidth > boardWidth);
}

function movePlayer(e) {
    //if (gameOver){
       // if(e.code == "Space") {
         //   resetGame();
         //   console.log("RESET");
        //}
       // return;
   // }

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



