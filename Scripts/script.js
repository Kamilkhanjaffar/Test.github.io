var options = {
    strings: ["Unity Developer", "Game Developer", "Simulation Expert", "Freelance Consultant"],
    typeSpeed: 80,
    backSpeed: 60,
    backDelay: 1000,
    startDelay: 500,
    loop: true
};
var typed = new Typed(".typed-text", options);

// Cursor Interaction and Background Animation
const canvas = document.getElementById('interactive-bg');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particles = [];
const maxParticles = 100;
const mouse = {
    x: null,
    y: null,
};

window.addEventListener('mousemove', (event) => {
    mouse.x = event.x;
    mouse.y = event.y;
});

function Particle(x, y) {
    this.x = x;
    this.y = y;
    this.size = Math.random() * 3 + 1;
    this.vx = Math.random() * 2 - 1;
    this.vy = Math.random() * 2 - 1;
}

Particle.prototype.update = function () {
    this.x += this.vx;
    this.y += this.vy;

    if (mouse.x && mouse.y) {
        const dx = this.x - mouse.x;
        const dy = this.y - mouse.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 100) {
            this.vx += dx / 100;
            this.vy += dy / 100;
        }
    }

    if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
    if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
};

Particle.prototype.draw = function () {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(255, 255, 255, 0.7)";
    ctx.fill();
};

function initParticles() {
    for (let i = 0; i < maxParticles; i++) {
        particles.push(new Particle(Math.random() * canvas.width, Math.random() * canvas.height));
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach((particle) => {
        particle.update();
        particle.draw();
    });

    requestAnimationFrame(animate);
}

initParticles();
animate();

// Function to trigger animation on hover
const skillBars = document.querySelectorAll('.skill-bar span');

skillBars.forEach(bar => {
// When mouse enters the skill bar
bar.parentElement.addEventListener('mouseenter', () => {
bar.style.width = bar.getAttribute('data-width') + '%';
});

// When mouse leaves the skill bar
bar.parentElement.addEventListener('mouseleave', () => {
bar.style.width = '0%';
});
});

// Collapsible functionality for company cards
document.querySelectorAll('.company-card').forEach(card => {
    const projects = card.querySelector('.projects');
    const companyName = card.querySelector('.company-name');

    card.addEventListener('click', () => {
        const isVisible = projects.style.display === 'block';
        projects.style.display = isVisible ? 'none' : 'block';
        // companyName.textContent += isVisible ? ' ▼' : ' ▲';
    });

    // Initialize projects as hidden
    projects.style.display = 'none';
});