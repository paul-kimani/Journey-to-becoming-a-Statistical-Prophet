// Starfield Animation for Quarto
document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('starfield');
    if (!canvas) {
        console.error('Canvas element with ID "starfield" not found.');
        return;
    }
    const ctx = canvas.getContext('2d');
    let stars = [];
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    class Star {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.z = Math.random() * 1000;
            this.prevX = this.x;
            this.prevY = this.y;
        }
        update() {
            this.z -= 2;
            if (this.z <= 0) {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.z = 1000;
                this.prevX = this.x;
                this.prevY = this.y;
            }
            this.prevX = this.x;
            this.prevY = this.y;
            this.x = (this.x - canvas.width / 2) * (1000 / this.z) + canvas.width / 2;
            this.y = (this.y - canvas.height / 2) * (1000 / this.z) + canvas.height / 2;
        }
        draw() {
            const opacity = Math.max(0, 1 - this.z / 1000);
            const size = Math.max(0, (1000 - this.z) / 1000 * 3);
            ctx.save();
            ctx.globalAlpha = opacity;
            ctx.beginPath();
            ctx.arc(this.x, this.y, size, 0, Math.PI * 2);
            ctx.fillStyle = '#f8fafc';
            ctx.fill();
            if (size > 1) {
                ctx.beginPath();
                ctx.moveTo(this.prevX, this.prevY);
                ctx.lineTo(this.x, this.y);
                ctx.strokeStyle = '#8b5cf6';
                ctx.lineWidth = size * 0.5;
                ctx.stroke();
            }
            ctx.restore();
        }
    }

    function initStars() {
        stars = [];
        for (let i = 0; i < 800; i++) {
            stars.push(new Star());
        }
    }

    function animate() {
        ctx.fillStyle = 'rgba(15, 15, 35, 0.1)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        stars.forEach(star => {
            star.update();
            star.draw();
        });
        requestAnimationFrame(animate);
    }

    function createCosmicParticles() {
        for (let i = 0; i < 15; i++) {
            const particle = document.createElement('div');
            particle.className = 'cosmic-particle';
            particle.style.width = Math.random() * 6 + 2 + 'px';
            particle.style.height = particle.style.width;
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 8 + 's';
            particle.style.animationDuration = Math.random() * 4 + 6 + 's';
            document.body.appendChild(particle);
        }
    }

    initStars();
    animate();
    createCosmicParticles();

    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        initStars();
    });
});
