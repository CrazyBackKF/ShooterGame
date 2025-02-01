class Enemy {
    constructor()
    {
        this.position = {
            x: 600,
            y: 200
        }
        this.width = 43;
        this.height = 43;
        this.radius = 22.5;
        this.image = new Image();
        this.image.src = "img/zombie.png"
        this.angle = 0;
        this.velocity = {
            x: 0,
            y: 0
        }
        this.speed = 0.5;
        this.health = 200;
    }

    update()
    {
        this.draw();
        this.turn();
        this.move();
        this.physics();
    }

    draw()
    {
        ctx.fillStyle = "blue";
        ctx.beginPath()
        ctx.arc(this.position.x, this.position.y, this.width / 2, 0, 2 * Math.PI);
        ctx.fill();

        const offsetX = this.position.x - (this.width / 2);
        const offsetY = this.position.y - (this.height / 2);
        const afterTranslationX = -(this.width / 2);
        const afterTranslationY = -(this.height / 2);
        
        ctx.save();
        ctx.translate(offsetX + this.width / 2, offsetY + this.height / 2)
        ctx.rotate(this.angle);
        ctx.drawImage(this.image, afterTranslationX, afterTranslationY);
        ctx.restore();
    }

    move()
    {
        if(checkCircleCollision(this, player)) 
        {
            if(this.velocity.x != 0) this.velocity.x = 0;
            if(this.velocity.y != 0) this.velocity.y = 0;
            return;
        }
            
        if (this.position.x > player.position.x)
        {
            this.velocity.x = -this.speed;
        }
        else if (this.position.x < player.position.x)
        {
            this.velocity.x = this.speed;
        }
        if (this.position.y > player.position.y)
        {
            this.velocity.y = -this.speed;
        }
        else if (this.position.y < player.position.y)
        {
            this.velocity.y = this.speed;
        }
    }

    physics()
    {
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
    }

    turn()
    {
        if ((player.position.x == this.position.x + this.radius) && (player.position.y == this.position.y + this.radius)) return;
        const dx = player.position.x - (this.position.x + this.radius);
        const dy = player.position.y - (this.position.y + this.radius);
    
        const angle = Math.atan2(dy, dx);
        this.angle = angle;
    }
}