const canvas = document.getElementById('canvas1')
const ctx = canvas.getContext('2d')
canvas.width = window.innerWidth
canvas.height = window.innerHeight
const particlesArr = []
let hue = 0

window.addEventListener('resize', function() {
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
  
})

const mouse = {
  x: null,
  y: null,
}

canvas.addEventListener('click', function(e) {
  mouse.x = e.x
  mouse.y = e.y
  for(let i = 0; i < 20; i++) {
    particlesArr.push(new Particle())
  }
})

canvas.addEventListener('mousemove', function(e) {
  mouse.x = e.x
  mouse.y = e.y
  for(let i = 0; i < 2; i++) {
    particlesArr.push(new Particle())
  }
})


class Particle {
  constructor() {
    this.x = mouse.x
    this.y = mouse.y
    // this.x = canvas.width / 2
    // this.y = canvas.height / 2
    this.size = Math.random() * 20 + 1
    this.speedX = Math.random() * 3
    this.speedY = Math.random() * 3
    this.signX = Math.round(Math.random()) === 0 ? '+' : '-'
    this.signY = Math.round(Math.random()) === 0 ? '+' : '-'
    this.color = `hsl(${hue}, 100%, 50%)`
  }
  update() {

    if(this.x > canvas.width - this.size) {
      this.signX = '-'
    }
    if(this.x < this.size) {
      this.signX = '+'
    }

    if(this.y > canvas.height - this.size) {
      this.signY = '-'
    }
    if(this.y < this.size) {
      this.signY = '+'
    }


    if(this.signX === '+') {
      this.x += this.speedX
    } else if (this.signX === '-') {
      this.x -= this.speedX
    }

    if(this.signY === '+') {
      this.y += this.speedY
    } else if (this.signY === '-') {
      this.y -= this.speedY
    }
    
    if(this.size > 0.2) {
      this.size -= 0.1
    }

  }
  draw() {
    ctx.fillStyle = this.color
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
    ctx.fill()
  }
}

// function init() {
//   for(let i = 0; i < 10; i++) {
//     particlesArr.push(new Particle())
//   }
// }

// init()

function particlesHandler() {
  for(let i = 0; i < particlesArr.length; i++) {
    particlesArr[i].update()
    particlesArr[i].draw()

    for(let j = 1; j < particlesArr.length; j++) {
      const dx = particlesArr[i].x - particlesArr[j].x
      const dy = particlesArr[i].y - particlesArr[j].y
      const distance = Math.sqrt(dx * dx + dy * dy)
      if(distance < 100) {
        ctx.beginPath()
        ctx.strokeStyle = particlesArr[i].color
        ctx.lineWidth = 0.5
        ctx.moveTo(particlesArr[i].x, particlesArr[i].y)
        ctx.lineTo(particlesArr[j].x, particlesArr[j].y)
        ctx.stroke()
        ctx.closePath()
      }
    }
    if(particlesArr[i].size < 0.3) {
      particlesArr.splice(i, 1)
      i--
    }
  }
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  // ctx.fillStyle = 'rgba(0,0,0,0.02)'
  // ctx.fillRect(0, 0, canvas.width, canvas.height)
  hue += 2
  particlesHandler()
  requestAnimationFrame(animate)
}

animate()

