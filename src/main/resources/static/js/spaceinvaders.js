const canvas = document.getElementById("spaceInvaders");
const ctx = canvas.getContext("2d");

let playerWidth = 40, playerHeight = 20;
let playerX = (canvas.width - playerWidth) / 2;
let bullets = [];
let enemies = [];
let enemyWidth = 30, enemyHeight = 20;
let score = 0;
let isGameOver = false;


document.addEventListener("DOMContentLoaded", (event) => {
    resizeGame()
})

document.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft") playerX -= 20;
    if (event.key === "ArrowRight") playerX += 20;
    if (event.key === " ") bullets.push({ x: playerX + playerWidth / 2 - 2, y: canvas.height - playerHeight });
});

window.addEventListener("resize", (event) => {
    resizeGame()
})

function resizeGame() {
    let width = window.innerWidth
    if( width <= 630 && width > 480){
        canvas.width = 450
        canvas.height = 300
        enemyWidth = 22
        enemyHeight = 15
        playerWidth = 30
        playerHeight = 15
    } else if ( width <= 480 ){
        canvas.width = 306
        canvas.height = 204
        enemyWidth = 15
        enemyHeight = 10
        playerWidth = 20
        playerHeight = 10
    } else if ( width > 630 ){
        canvas.width = 600
        canvas.height = 400
        enemyWidth = 30
        enemyHeight = 20
        playerWidth = 40
        playerHeight = 20
    }
}

function random(min,max){
    return Math.floor(Math.random() * (max - min + 1)) + min
}

function spawnEnemies() {
    let maxOffset = canvas.width - (6*enemyWidth+70)
    let xOffset = random(0, maxOffset)
    for (let i = 0; i < 6; i++) {
        enemies.push({ x: xOffset + i * (enemyWidth + 10) + 20, y: 30 });
    }
}

function update() {
    if (isGameOver) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Rysowanie gracza
    ctx.fillStyle = "lime";
    ctx.fillRect(playerX, canvas.height - playerHeight, playerWidth, playerHeight);

    // Rysowanie pocisków
    bullets.forEach((bullet, index) => {
        bullet.y -= 5;
        ctx.fillStyle = "white";
        ctx.fillRect(bullet.x, bullet.y, 4, 10);
        if (bullet.y < 0) bullets.splice(index, 1);
    });

    // Rysowanie wrogów
    enemies.forEach((enemy, eIndex) => {
        ctx.fillStyle = "red";
        ctx.fillRect(enemy.x, enemy.y, enemyWidth, enemyHeight);
        enemy.y += 0.5;

        // Sprawdzanie kolizji z pociskami
        bullets.forEach((bullet, bIndex) => {
            if (
                bullet.x > enemy.x &&
                bullet.x < enemy.x + enemyWidth &&
                bullet.y > enemy.y &&
                bullet.y < enemy.y + enemyHeight
            ) {
                enemies.splice(eIndex, 1);
                bullets.splice(bIndex, 1);
                score++;
            }
        });

        // Sprawdzanie kolizji z graczem
        if (
            enemy.x < playerX + playerWidth &&
            enemy.x + enemyWidth > playerX &&
            enemy.y + enemyHeight > canvas.height - playerHeight
        ) {
            isGameOver = true;
            alert("Game Over! Twój wynik: " + score);
            gameOver()
            //location.reload();
        }
    });
    
    if( enemies.length == 0){
        spawnEnemies()
    } else if (enemies[0].y > canvas.height ){
        enemies = []
    }
    console.log(enemies[0].y)
    // Wyświetlanie wyniku
    ctx.fillStyle = "white";
    ctx.font = "18px Arial";
    ctx.fillText("Wynik: " + score, 10, 20);
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
                "game": "space invader",
                "score_date": new Date().toISOString().split("T")[0],
                "score": score
            })
        }
    )
    
    location.reload()
}

spawnEnemies();
setInterval(update, 30);