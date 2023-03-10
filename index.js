const gameBoard = document.querySelector("#gameBoard");
const ctx = gameBoard.getContext("2d");
const gameWith = gameBoard.width;
const gameHeight = gameBoard.height;
let intervalID;
let ballSpeed = 1;
const boardBackground = "white";
const balls = [];
let mouseOverX = 0;
let mouseOverY = 0;
const numBalls = 40;
const expandRadius = 50;

gameBoard.addEventListener("mousemove", (event) => {
    mouseOverX = event.offsetX;
    mouseOverY = event.offsetY;
});

gameBoard.addEventListener("mouseleave", (event) => {
    mouseOverX = null;
    mouseOverY = null;
});

startProgram();

function startProgram(){
    generateBalls();
    nextTick();
}

function nextTick(){
    intervalID = setTimeout(() => {
        clearBoard();
        animatedBall();
        moveBall();
        drawBall();
        checkCollision();
        nextTick();
    }, 10);
}

function clearBoard(){
    ctx.fillStyle = boardBackground;
    ctx.fillRect(0, 0, gameWith, gameHeight);
}

function generateBalls(){

    function randomNum(min, max, radious){
        const randNum = Math.round((Math.random() * (max - min) + min) / radious) * radious;
        return randNum;
    }

    for (let i = 0; i < numBalls; i++){
        const randRadius = Math.floor(Math.random() * 20 + 10);
        const randBallX = randomNum(randRadius + 10, gameWith - randRadius, randRadius);
        const randBallY = randomNum(randRadius + 10, gameHeight - randRadius, randRadius);
        const randomColor = Math.floor(Math.random()*16777215).toString(16);

        speed = 1;

        if (Math.round(Math.random()) == 1) {
            directionX = 1;
        } else {
            directionX = -1;
        }

        if (Math.round(Math.random()) == 1) {
            directionY = 1;
        } else {
            directionY = -1;
        }

        const newBall = {ballX: randBallX,
                            ballY: randBallY,
                            ballXDirection: directionX,
                            ballYDirection: directionY,
                            ballColor: "#" + randomColor,
                            ballRadius: randRadius,
                            ballSpeed: speed,
                            ballStartRadius: randRadius
                        }
        balls.push(newBall);
        drawBall();
    }
}

function drawBall(){
    for(let ball of balls){
        ctx.fillStyle = ball.ballColor;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(ball.ballX, ball.ballY, ball.ballRadius, 0, 2 * Math.PI);
        ctx.fill();
    }
}

function moveBall(){
    for(const ball of balls){
        ball.ballX += ball.ballXDirection * ball.ballSpeed;
        ball.ballY += ball.ballYDirection * ball.ballSpeed;
    }
}

function checkCollision(){
    for(const ball of balls){
        if (ball.ballY <= 0 + ball.ballRadius) {
            ball.ballYDirection *= -1;
        }
    
        if (ball.ballY >= gameHeight - ball.ballRadius) {
            ball.ballYDirection *= -1;
        }

        if (ball.ballX <= 0 + ball.ballRadius) {
            ball.ballXDirection *= -1;
        }
    
        if (ball.ballX >= gameWith - ball.ballRadius) {
            ball.ballXDirection *= -1;
        }
    }
}

function animatedBall(){
    for(const ball of balls){
        // when hover the mouse to ball, expand the ball
        // when move the mouse out, the ball should get back to original
        if (mouseOverX > ball.ballX - ball.ballRadius &&
            mouseOverX < ball.ballX + ball.ballRadius &&
            mouseOverY > ball.ballY - ball.ballRadius &&
            mouseOverY < ball.ballY + ball.ballRadius &&
            ball.ballRadius < expandRadius) {
                ball.ballRadius += 5;
        } else {
            if (ball.ballRadius > ball.ballStartRadius){
                ball.ballRadius -= 5;
            }
        }
    }
}