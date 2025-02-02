class Player {
    constructor()
    {
        this.position = {
            x: 20,
            y: 500
        }
        this.width = 43;
        this.height = 43;
        this.radius = 22.5;
        this.key = {
            w: false,
            a: false,
            s: false,
            d: false
        }
        this.velocity = {
            x: 0,
            y: 0
        }
        this.speed = 2;
        this.crosshair = {
            position: {
                x: 100,
                y: 100
            },
            radius: 10
        }
        this.weapon = "none"
        this.image = new Image();
        this.angle = 0;
        this.bullets = [];
        this.lastShot = 0;
        this.shootingCooldown = 300;
        this.isHolding = false;
        this.damage = 20;
    }

    update()
    {
        this.draw();
        this.drawCrosshair();
        this.turn();
        this.changeWeapon();
        this.moveHorizontally()
        this.moveVertically();
        //this.checkCollisions();
        this.physics();
    }

    draw()
    {
        ctx.fillStyle = "red";
        ctx.beginPath()
        ctx.arc(this.position.x, this.position.y, 22.5, 0, 2 * Math.PI);
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

    moveVertically()
    {
        if ((this.key.w && this.key.s) || (!this.key.w && !this.key.s)) 
        {
            this.velocity.y = 0;
        }
        else if (this.key.w)
        {
            this.velocity.y = -this.speed;
        }
        else if (this.key.s)
        {
            this.velocity.y = this.speed;
        }
    }

    moveHorizontally()
    {
        if ((this.key.a && this.key.d) || (!this.key.a && !this.key.d)) 
        {
            this.velocity.x = 0;
        }
        else if (this.key.a)
        {
            this.velocity.x = -this.speed;
        }
        else if (this.key.d)
        {
            this.velocity.x = this.speed;
        }
    }

    physics()
    {
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
    }

    drawCrosshair()
    {
        ctx.lineWidth = 3;
        ctx.strokeStyle = "black"
        ctx.beginPath()
        ctx.arc(this.crosshair.position.x, this.crosshair.position.y, this.crosshair.radius, 0, 2 * Math.PI);
        ctx.stroke();
        
        ctx.beginPath();
        ctx.moveTo(this.crosshair.position.x - this.crosshair.radius, this.crosshair.position.y);
        ctx.lineTo(this.crosshair.position.x + this.crosshair.radius, this.crosshair.position.y);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(this.crosshair.position.x, this.crosshair.position.y - this.crosshair.radius);
        ctx.lineTo(this.crosshair.position.x, this.crosshair.position.y + this.crosshair.radius);
        ctx.stroke();
    }
    
    turn()
    {
        if ((this.crosshair.position.x == this.position.x + this.width / 2) && (this.crosshair.position.y == this.position.y + this.height / 2)) return;
        const dx = this.crosshair.position.x - (this.position.x + this.width / 2);
        const dy = this.crosshair.position.y - (this.position.y + this.height / 2);
    
        const angle = Math.atan2(dy, dx);
        this.angle = angle;
    }

    changeWeapon()
    {
        switch(this.weapon)
        {
            case "none":
                this.image.src = "img/player_stand.png";
                break;
            case "pistol":
                this.image.src = "img/player_gun.png"
                this.shootingCooldown = 300;
                break;
            case "AR":
                this.image.src = "img/player_machine.png"
                this.shootingCooldown = 100;
                break;
        }
    }

    shoot()
    {
        if ((Date.now() - this.lastShot < this.shootingCooldown) || this.weapon == "none") return;
        this.bullets.push(new Bullet({
            position: {
                x: (this.position.x - this.width / 8) + (10 * Math.cos(this.angle - 5)),
                y: (this.position.y - this.height / 8) + (10 * Math.sin(this.angle - 5))
            },
            angle: this.angle
        }));
        this.lastShot = Date.now();
    }

    checkCollisions()
    {
        for (let i = 0; i < enemiesArray.length; i++)
        {
            const enemy = enemiesArray[i]
            if(checkCircleCollision(this, enemy))
            {
                if(this.velocity.x < 0)
                {
                    this.position.x = enemy.position.x + enemy.radius + player.radius + 0.01;
                    this.velocity.x = 0;
                }
                if(this.velocity.x > 0)
                {
                    this.position.x = enemy.position.x - enemy.radius - player.radius - 0.01;
                    this.velocity.x = 0;
                }
                break;
            }
        }
            
    }
    
}