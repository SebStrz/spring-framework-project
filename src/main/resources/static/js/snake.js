const canvas = document.getElementById("snakeGame")
const cords = document.getElementById("cords")
const ctx = canvas.getContext("2d")

let box = 20
let isAlive = true
let snake = [{ x: 10 * box, y: 10 * box }]
let food = { x: Math.floor(Math.random() * 19) * box, y: Math.floor(Math.random() * 19) * box }
let direction
let score = 0

document.addEventListener("DOMContentLoaded", (event) => {
    resizeGame()
})

document.addEventListener("keydown", (event) => {
    if (event.key === "ArrowUp" && direction !== "DOWN") direction = "UP"
    else if (event.key === "ArrowDown" && direction !== "UP") direction = "DOWN"
    else if (event.key === "ArrowLeft" && direction !== "RIGHT") direction = "LEFT"
    else if (event.key === "ArrowRight" && direction !== "LEFT") direction = "RIGHT"
})

window.addEventListener("resize", (event) => {
    resizeGame()
})

function resizeGame(){
    
    let width = window.innerWidth
    let previousBox = box
    if( width <= 410 && width > 310 ){
        canvas.width = 300
        canvas.height = 300
        box = 15
    } else if( width <= 310 ){
        canvas.width = 200
        canvas.height = 200
        box = 10
    } else if( width > 410 ){
        canvas.width = 400
        canvas.height = 400
        box = 20
    }
    if(box != previousBox){
        snake = [{ x: 10 * box, y: 10 * box }]
        food = { x: Math.floor(Math.random() * 19) * box, y: Math.floor(Math.random() * 19) * box }
    }
    drawGame()
    
}

function drawGame(){
    ctx.fillStyle = "#282c34"
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = i === 0 ? "lime" : "green"
        ctx.fillRect(snake[i].x, snake[i].y, box, box)
        ctx.strokeStyle = "black"
        ctx.strokeRect(snake[i].x, snake[i].y, box, box)

    }
    ctx.fillStyle = "red"
    ctx.fillRect(food.x, food.y, box, box)
}
function gameLogic() {

    let snakeX = snake[0].x
    let snakeY = snake[0].y

    if (direction === "UP") snakeY -= box
    if (direction === "DOWN") snakeY += box
    if (direction === "LEFT") snakeX -= box
    if (direction === "RIGHT") snakeX += box

    if (snakeX === food.x && snakeY === food.y) {
        food = { x: Math.floor(Math.random() * 19) * box, y: Math.floor(Math.random() * 19) * box }
        score++
    } else {
        snake.pop()
    }

    let newHead = { x: snakeX, y: snakeY }
    cords.innerHTML = `x: ${snakeX} y: ${snakeY} <br>wynik: ${score}`
    if (
        ((snakeX <= -box || snakeX >= canvas.width) || 
        (snakeY <= -box || snakeY >= canvas.height)) &&
        isAlive
    ) {
        isAlive = false
        clearInterval(drawInterval)
        clearInterval(logicInterval)
        alert("Game Over! Twój wynik: " + score)
        gameOver().then(location.reload(),location.reload())
        
    }

    snake.unshift(newHead)
}
async function gameOver(){
    let userid = localStorage.getItem("userid")

    const response = await fetch(api_score,
        {
            method: "POST",
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "user": {
                    "id": userid
                },
                "game": "snake",
                "score_date": new Date().toISOString().split("T")[0],
                "score": score
            })
        }
    )
    console.log("koniec")
    
}

var drawInterval = setInterval(drawGame,100)
var logicInterval = setInterval(gameLogic, 200)
