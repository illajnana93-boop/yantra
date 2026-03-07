import { useEffect, useRef } from "react";

const ParticleBackground = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationFrameId: number;
        let particles: Particle[] = [];

        let width = window.innerWidth;
        let height = window.innerHeight;

        const resizeCanvas = () => {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;
        };

        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();

        const colors = ["#D4AF37", "#FFFFFF", "#00A8CC", "#F5D76E"]; // Gold, White, Blue, Light Gold

        class Particle {
            x: number;
            y: number;
            size: number;
            speedX: number;
            speedY: number;
            color: string;
            life: number;
            angle: number;
            angleSpeed: number;

            constructor(x: number, y: number) {
                this.x = x;
                this.y = y;
                this.size = Math.random() * 4 + 1; // 1px to 5px size

                // Explode softly outwards then drift upwards
                this.speedX = (Math.random() * 2 - 1) * 1.5;
                this.speedY = (Math.random() * -2 - 0.5);

                this.color = colors[Math.floor(Math.random() * colors.length)];
                this.life = 1.0;

                // Variables for wavy motion
                this.angle = Math.random() * Math.PI * 2;
                this.angleSpeed = Math.random() * 0.2 - 0.1;
            }

            update() {
                // Apply wavy sine movement
                this.x += this.speedX + Math.sin(this.angle) * 1.5;
                this.y += this.speedY;

                this.angle += this.angleSpeed;
                this.life -= 0.015; // fade duration

                if (this.size > 0.1) {
                    this.size *= 0.96; // gracefully shrink
                }
            }

            draw() {
                if (!ctx) return;
                ctx.globalAlpha = Math.max(0, this.life);
                ctx.fillStyle = this.color;

                // Draw glowing circle
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        const handleMouseMove = (e: MouseEvent) => {
            // Spawn multiple bubbles exactly at cursor each frame it moves
            for (let i = 0; i < 4; i++) {
                particles.push(new Particle(e.clientX, e.clientY));
            }
        };

        const handleTouchMove = (e: TouchEvent) => {
            if (e.touches.length > 0) {
                const touch = e.touches[0];
                for (let i = 0; i < 3; i++) {
                    particles.push(new Particle(touch.clientX, touch.clientY));
                }
            }
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('touchmove', handleTouchMove);

        const animate = () => {
            // Fade out canvas slowly to create a tiny bit of trailing blur behind bubbles
            ctx.clearRect(0, 0, width, height);

            for (let i = 0; i < particles.length; i++) {
                particles[i].update();
                particles[i].draw();

                // Remove dead particles
                if (particles[i].life <= 0 || particles[i].size <= 0.1) {
                    particles.splice(i, 1);
                    i--;
                }
            }
            animationFrameId = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            window.removeEventListener('resize', resizeCanvas);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('touchmove', handleTouchMove);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed top-0 left-0 w-full h-full pointer-events-none z-[100]"
        />
    );
};

export default ParticleBackground;
