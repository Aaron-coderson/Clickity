const canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const c = canvas.getContext('2d');

//player class
class Player{
    constructor(x,y,radius,color)
    {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
    }
    draw()
    {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI*2);
        c.fillStyle = this.color;
        c.fill();
    }
}

class Projectile{

    constructor(x,y,radius,color,velocity){
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.velocity = velocity;
    }

    draw()
    {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI*2);
        c.fillStyle = this.color;
        c.fill();
    }

    update(){
        this.x = this.x + this.velocity.x;
        this.y = this.y + this.velocity.y;
    }
}

class Enemy{

    constructor(x,y,radius,color,velocity){
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.velocity = velocity;
    }

    draw()
    {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI*2);
        c.fillStyle = this.color;
        c.fill();
    }

    update(){
        this.x = this.x + this.velocity.x;
        this.y = this.y + this.velocity.y;
    }
}

function animate(){
    requestAnimationFrame(animate);
    c.clearRect(0, 0, canvas.width, canvas.height);
    player.draw();
    projectiles.forEach(projectile =>{
        projectile.draw();
        projectile.update();
    })
}


//define player instances
const x  = canvas.width/2;
const y= canvas.height/2;
const player = new Player(x,y,30,'red');

//define projectile instances
const projectiles = []

window.addEventListener('click', (event) =>{
    const angle = Math.atan2(event.clientY - y, event.clientX - x);
    const velocity = {
        "x": Math.cos(angle),
        "y": Math.sin(angle)
    }
    const projectile = new Projectile(x, y, 5,'green', velocity);
    projectiles.push(projectile);
})

animate();