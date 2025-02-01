class Player {
    constructor()
    {
        this.position = {
            x: 20,
            y: 500
        }
        this.width = 43;
        this.height = 43;
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
    }

    update()
    {
        this.draw();
        this.drawCrosshair();
        this.turn();
        this.changeWeapon();
        this.moveHorizontally()
        this.moveVertically();
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
                this.shootingCooldown = 60;
                break;
        }
    }

    shoot()
    {
        if ((Date.now() - this.lastShot < this.shootingCooldown) || this.weapon == "none") return;
        this.bullets.push(new Bullet({
            position: {
                x: this.position.x + (5 * Math.cos(this.angle)),
                y: this.position.y + (5 * Math.sin(this.angle))
            },
            angle: this.angle
        }));
        this.lastShot = Date.now();
    }
    
}