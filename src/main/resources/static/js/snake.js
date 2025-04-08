const canvas = document.getElementById("snakeGame")
const cords = document.getElementById("cords")
const ctx = canvas.getContext("2d")

const box = 20
let isAlive = true
let snake = [{ x: 10 * box, y: 10 * box }]
let food = { x: Math.floor(Math.random() * 19) * box, y: Math.floor(Math.random() * 19) * box }
let direction
let score = 0


document.addEventListener("keydown", (event) => {
    if (event.key === "ArrowUp" && direction !== "DOWN") direction = "UP"
    else if (event.key === "ArrowDown" && direction !== "UP") direction = "DOWN"
    else if (event.key === "ArrowLeft" && direction !== "RIGHT") direction = "LEFT"
    else if (event.key === "ArrowRight" && direction !== "LEFT") direction = "RIGHT"
})

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
        ((snakeX <= -20 || snakeX >= 400) || 
        (snakeY <= -20 || snakeY >= 400)) &&
        isAlive
    ) {
        isAlive = false
        gameOver()
        
        
        location.reload()
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
    alert("Game Over! Twój wynik: " + score)
    
    location.reload()
}

setInterval(drawGame,100)
setInterval(gameLogic, 200)
