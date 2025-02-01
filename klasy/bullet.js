class Bullet {
    constructor({position, angle})
    {
        this.position = position;
        this.width = 10;
        this.height = 10;
        this.angle = angle;
        this.speed = 8;
    }

    update()
    {
        this.draw();
        //this.move();
    }
    
    draw()
    {
        ctx.fillStyle = "blue";
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
    }

    move()
    {
        this.position.x += Math.cos(this.angle) * this.speed;
        this.position.y += Math.sin(this.angle) * this.speed;
    }
}