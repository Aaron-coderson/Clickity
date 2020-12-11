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
        c.lineWidth = 6;
        c.strokeStyle = '#ff0000'
        c.stroke();

        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI*2);
        c.lineWidth = 3;
        c.strokeStyle = '#aa00ff'
        c.stroke();
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
    enemies.forEach((enemy,index)=>{
        enemy.draw();
        enemy.update();
        projectiles.forEach((projectile,projectileIndex)=>{
            const dist =Math.hypot(projectile.x-enemy.x, projectile.y-enemy.y);
            if(dist-enemy.radius<10)
            {
                console.log('Remove');
                enemies.splice(index, 1);
                projectiles.splice(projectileIndex, 1);
            }
        })
    })
}
const enemies = []
function spawnEnemy()
{

    setInterval(()=>{
    
        console.log('Enemy')
        const radius = Math.random()*15+15;
        let ex;
        let ey;

        if (Math.random()<0.5)
        {
            ex = Math.random()< 0.5? 0-radius: canvas.width+radius;
            ey = Math.random()*canvas.height;
        }else{
            ex = Math.random()*canvas.width;
            ey = Math.random()< 0.5? 0-radius: canvas.height+radius;   
        }
    
      
        const color = 'blue';
        const angle = Math.atan2(y - ey, x - ex);
        const velocity = {
        "x": Math.cos(angle),
        "y": Math.sin(angle)
    }
        enemies.push(new Enemy(ex,ey,radius,color,velocity))
    },1000)
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
spawnEnemy();