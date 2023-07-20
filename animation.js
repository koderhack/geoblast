const canvas = document.getElementById('animation-canvas');
const ctx = canvas.getContext('2d');
const shapes = [];
const colors = ['#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF', '#00FFFF'];

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

class Circle {
  constructor(x, y, size, color, speedX, speedY) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.color = color;
    this.speedX = speedX;
    this.speedY = speedY;
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;

    if (this.x + this.size < 0) {
      this.x = canvas.width;
    }
    if (this.x > canvas.width) {
      this.x = -this.size;
    }
    if (this.y + this.size < 0) {
      this.y = canvas.height;
    }
    if (this.y > canvas.height) {
      this.y = -this.size;
    }
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
  }
}

class Triangle {
  constructor(x, y, size, color, speedX, speedY) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.color = color;
    this.speedX = speedX;
    this.speedY = speedY;
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;

    if (this.x + this.size < 0) {
      this.x = canvas.width;
    }
    if (this.x > canvas.width) {
      this.x = -this.size;
    }
    if (this.y + this.size < 0) {
      this.y = canvas.height;
    }
    if (this.y > canvas.height) {
      this.y = -this.size;
    }
  }

  draw() {
    ctx.beginPath();
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(this.x + this.size, this.y);
    ctx.lineTo(this.x + this.size / 2, this.y - this.size);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
  }
}
class Hexagon {
    constructor(x, y, size, color, speedX, speedY) {
      this.x = x;
      this.y = y;
      this.size = size;
      this.color = color;
      this.speedX = speedX;
      this.speedY = speedY;
      this.cooldown = 0;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;
    
        if (this.x + this.size < 0) {
          this.x = canvas.width;
        }
        if (this.x > canvas.width) {
          this.x = -this.size;
        }
        if (this.y + this.size < 0) {
          this.y = canvas.height;
        }
        if (this.y > canvas.height) {
          this.y = -this.size;
        }
  
    }
    draw() {
        ctx.beginPath();
        for (let i = 0; i < 6; i++) {
          const angleRad = (Math.PI / 3) * i;
          const xVertex = x + size * Math.cos(angleRad);
          const yVertex = y + size * Math.sin(angleRad);
          if (i === 0) {
            ctx.moveTo(xVertex, yVertex);
          } else {
            ctx.lineTo(xVertex, yVertex);
          }
        }
        ctx.closePath();
        ctx.fillStyle = 'blue'; // Set the fill color
        ctx.fill();
      }
}

class Square {
  constructor(x, y, size, color, speedX, speedY) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.color = color;
    this.speedX = speedX;
    this.speedY = speedY;
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;

    if (this.x + this.size < 0) {
      this.x = canvas.width;
    }
    if (this.x > canvas.width) {
      this.x = -this.size;
    }
    if (this.y + this.size < 0) {
      this.y = canvas.height;
    }
    if (this.y > canvas.height) {
      this.y = -this.size;
    }
  }

  draw() {
    ctx.beginPath();
    ctx.rect(this.x, this.y, this.size, this.size);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
  }
}

function createShapes(numShapes) {
  for (let i = 0; i < numShapes; i++) {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    const size = Math.random() * 30 + 10;
    const color = colors[Math.floor(Math.random() * colors.length)];
    const speedX = (Math.random() - 0.5) * 2;
    const speedY = (Math.random() - 0.5) * 2;
    const shapeType = Math.random();

    if (shapeType < 0.33) {
      shapes.push(new Circle(x, y, size, color, speedX, speedY));
    } else if (shapeType < 0.66) {
      shapes.push(new Triangle(x, y, size, color, speedX, speedY));
    } else {
      shapes.push(new Square(x, y, size, color, speedX, speedY));
    }
  }
}

function animate() {
  // Apply post-processing effects here
  ctx.filter = "blur(2px)"; // Bloom effect - Adds a blur to the canvas
  ctx.globalAlpha = 0.9; // Intensity effect - Sets the global alpha value
  ctx.fillStyle = "rgba(255, 255, 255, 0.7)"; // Scatter effect - Sets the fill color with reduced opacity

  // Draw a white rectangle to apply the effects
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Reset filter and alpha for subsequent drawing
  ctx.filter = "none";
  ctx.globalAlpha = 1;

  // Continue with the drawing of shapes
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (const shape of shapes) {
    shape.update();
    shape.draw();
  }

  requestAnimationFrame(animate);
}


createShapes(50);
animate();
