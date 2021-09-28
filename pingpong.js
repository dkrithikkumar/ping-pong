/* Selecting the required elements */
const canvas = document.getElementById("pingpong");
const context = canvas.getContext("2d");

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

function render() {
    drawRectangle(0, 0, canvas.width, canvas.height, "#000");
    drawNet();
    drawText(user.score, canvas.width / 4, canvas.height / 5, "#fff");
    drawText(computer.score, 3 * canvas.width / 4, canvas.height / 5, "#fff");
    drawRectangle(user.x, user.y, user.width, user.height, user.color);
    drawRectangle(computer.x, computer.y, computer.width, computer.height, computer.color);
    drawCircle(ball.x, ball.y, ball.radius, ball.color);
}

function game() {
    render();
}

const fps = 50;
setInterval(game, 1000 / fps);