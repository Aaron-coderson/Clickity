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


        console.log('entered')
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


        console.log('entered')
    }
    update(){
        this.x = this.x+this.velocity.x;
        this.y = this.y+this.velocity.y;
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


        console.log('entered')
    }
    update(){
        this.x = this.x+this.velocity.x;
        this.y = this.y+this.velocity.y;
    }   
}
function animate(){
    requestAnimationFrame(animate);
}


const x  = canvas.width/2;
const y= canvas.height/2;
const player = new Player(x,y,30,'red');

player.draw();


window.addEventListener('click', ()=>{
    const projectile = new Projectile(event.clientX,event.clientY,5,'green',{'x':10, 'y':10})
    projectile.draw();
    projectile.update();
    projectile.draw();
})





