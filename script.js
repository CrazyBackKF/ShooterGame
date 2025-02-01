const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d')

const player = new Player();
let interval;

function animate()
{
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < player.bullets.length; i++)
    {
        player.bullets[i].update();
        if(shouldRemoveBullet(player.bullets[i]))
        {
            player.bullets.splice(i, 1);
        }
    }

    player.update();

    requestAnimationFrame(animate);
}   

animate();

addEventListener("keydown", (e) => {
    switch(e.key.toLowerCase())
    {
        case "w":
            player.key.w = true;
            break;
        case "a":
            player.key.a = true;
            break;
        case "s":
            player.key.s = true;
            break;
        case "d":
            player.key.d = true;
            break;
        case "1":
            player.weapon = "none"
            break;
        case "2":
            player.weapon = "pistol"
            break;
        case "3":
            player.weapon = "AR"
            break;
    }
})

addEventListener("keyup", (e) => {
    switch(e.key.toLowerCase())
    {
        case "w":
            player.key.w = false;
            break;
        case "a":
            player.key.a = false;
            break;
        case "s":
            player.key.s = false;
            break;
        case "d":
            player.key.d = false;
            break;
    }
})

canvas.addEventListener("mousedown", () => {
    interval = setInterval(() => {player.shoot(); player.isHolding = true;}, player.shootingCooldown)
})

canvas.addEventListener("click", () => {
    if(player.isHolding) return;
    player.shoot()
})

canvas.addEventListener("mouseup", () => {clearInterval(interval); player.isHolding = false;})

canvas.addEventListener("mousemove", (e) => {
    
    const mouseX = scale(e.offsetX);
    const mouseY = scale(e.offsetY);

    player.crosshair.position.x = mouseX;
    player.crosshair.position.y = mouseY;
})

canvas.addEventListener("mouseover", (e) => {
    canvas.style.cursor = "none";
})

document.getElementById("fullscreen").addEventListener("click", () => {
    canvas.requestFullscreen();
})