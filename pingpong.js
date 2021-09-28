/* Selecting the required elements */
const canvas = document.getElementById("pingpong");
const context = canvas.getContext("2d");
const winner = document.getElementById("winner");

/* Creating the necessary objects */
const user = {
    x: 0,
    y: canvas.height / 2 - 50,
    height: 100,
    width: 10,
    color: "#fff",
    score: 0
}

const computer = {
    x: canvas.width - 10,
    y: canvas.height / 2 - 50,
    width: 10,
    height: 100,
    color: "#fff",
    score: 0
}

const ball = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    radius: 10,
    speed: 5,
    velX: 5,
    velY: 5,
    color: "#fff"
}

const net = {
    x: canvas.width / 2 - 1,
    y: 0,
    width: 2,
    height: 10,
    color: "#fff"
}

/* Creating the required functions */
const drawRectangle = (xPos, yPos, width, height, color) => {
    context.fillStyle = color;
    context.fillRect(xPos, yPos, width, height);
}

const drawCircle = (xPos, yPos, radius, color) => {
    context.fillStyle = color;
    context.beginPath();
    context.arc(xPos, yPos, radius, 0, Math.PI * 2, false);
    context.closePath();
    context.fill();
}

const drawText = (text, xPos, yPos, color) => {
    context.fillStyle = color;
    context.font = "45px fantasy";
    context.fillText(text, xPos, yPos);
}

const drawNet = () => {
    for (let i = 0; i <= canvas.height; i += 15)
        drawRectangle(net.x, net.y + i, net.width, net.height, net.color);
}

canvas.addEventListener("mousemove", (event) => {
    let rect = canvas.getBoundingClientRect();
    user.y = event.clientY - rect.top - user.height / 2;
})

function resetBall() {
    ball.x = canvas.width / 2;
    ball.y = canvas.height / 2;
    ball.speed = 5;
    ball.velX = 0;
    ball.velY = 0;
}

function startBall() {
    if (ball.velX == 0 && ball.velY == 0) {
        ball.velX = 5;
        ball.velY = 5;
    }
}
canvas.addEventListener('click', () => startBall());

function collisionDetection(ball, player) {
    ball.top = ball.y - ball.radius;
    ball.bottom = ball.y + ball.radius;
    ball.left = ball.x - ball.radius;
    ball.right = ball.x + ball.radius;

    player.top = player.y;
    player.bottom = player.y + player.height;
    player.left = player.x;
    player.right = player.x + player.width;

    return ball.right > player.left && ball.bottom > player.top && ball.left < player.right && ball.top < player.bottom;
}

function update() {
    ball.x += ball.velX;
    ball.y += ball.velY;

    /* Simple AI to control the computer paddle */
    let difficultyFactor = 0.05;
    computer.y += (ball.y - (computer.y + computer.height / 2)) * difficultyFactor;

    if (ball.y + ball.radius > canvas.height || ball.y - ball.radius < 0) {
        ball.velY = -ball.velY;
    }

    let whichPlayer = (ball.x < canvas.width / 2) ? user : computer;
    if (collisionDetection(ball, whichPlayer)) {
        let collisionPoint = ball.y - (whichPlayer.y + whichPlayer.height / 2);
        collisionPoint = collisionPoint / (whichPlayer.height / 2);
        let deflectionAngle = collisionPoint * Math.PI / 4;
        let direction = (ball.x < canvas.width / 2) ? 1 : -1;
        ball.velX = direction * ball.speed * Math.cos(deflectionAngle);
        ball.velY = direction * ball.speed * Math.sin(deflectionAngle);
        ball.speed += 0.5;
    }

    if (ball.x - ball.radius < 0) {
        computer.score++;
        resetBall();
    } else if (ball.x + ball.radius > canvas.width) {
        user.score++;
        resetBall();
    }
    if (computer.score == 5 || user.score == 5) {
        if (computer.score == 5) {
            winner.textContent = "Computer Wins!";
        } else {
            winner.textContent = "User Wins!"
        }
    }

}

function render() {
    drawRectangle(0, 0, canvas.width, canvas.height, "#000");
    drawNet();
    drawText(user.score, canvas.width / 4, canvas.height / 5, "#fff");
    drawText(computer.score, 3 * canvas.width / 4, canvas.height / 5, "#fff");
    drawRectangle(user.x, user.y, user.width, user.height, user.color);
    drawRectangle(computer.x, computer.y, computer.width, computer.height, computer.color);
    drawCircle(ball.x, ball.y, ball.radius, ball.color);
}

function callUpdate() {
    update();
}

function game() {
    update();
    render();
}

const fps = 60;

setInterval(game, 1000 / fps);