import React, { useEffect, useRef } from 'react';

const FloatingEmbers = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationFrameId: number;
        let particles: Particle[] = [];
        const particleCount = 250; // Minimum 200 alive

        class Particle {
            x: number;
            y: number;
            size: number;
            speedY: number;
            speedX: number;
            wobbleSpeed: number;
            wobbleAmount: number;
            wobbleOffset: number;
            opacity: number;
            color: string;
            glowSize: number;

            constructor(isInitial = false) {
                this.x = Math.random() * canvas!.width;
                // Distribute initially, otherwise spawn at bottom
                this.y = isInitial ? Math.random() * canvas!.height : canvas!.height + 10;
                this.size = Math.random() * 2.5 + 0.5; // 0.5px to 3px
                this.speedY = Math.random() * 0.8 + 0.4; // Slow rise
                this.speedX = (Math.random() - 0.5) * 0.5; // Slight drift
                this.wobbleSpeed = Math.random() * 0.02 + 0.01;
                this.wobbleAmount = Math.random() * 2 + 1;
                this.wobbleOffset = Math.random() * Math.PI * 2;
                this.opacity = Math.random() * 0.5 + 0.5;
                
                const colors = ['#FFD700', '#D4A853', '#E8621A', '#FF4500'];
                this.color = colors[Math.floor(Math.random() * colors.length)];
                this.glowSize = this.size * 3;
            }

            update() {
                this.y -= this.speedY;
                this.wobbleOffset += this.wobbleSpeed;
                this.x += this.speedX + Math.sin(this.wobbleOffset) * (this.wobbleAmount / 20);
                
                // Fade out as they rise
                this.opacity = (this.y / canvas!.height) * 0.8;
                
                if (this.y < -20 || this.opacity <= 0) {
                    this.reset();
                }
            }

            reset() {
                this.x = Math.random() * canvas!.width;
                this.y = canvas!.height + 10;
                this.opacity = Math.random() * 0.5 + 0.5;
            }

            draw() {
                if (!ctx) return;
                ctx.save();
                ctx.globalAlpha = this.opacity;
                
                // Soft radial glow
                ctx.shadowBlur = this.glowSize;
                ctx.shadowColor = this.color;
                
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size / 2, 0, Math.PI * 2);
                ctx.fillStyle = this.color;
                ctx.fill();
                ctx.restore();
            }
        }

        const init = () => {
            particles = [];
            for (let i = 0; i < particleCount; i++) {
                particles.push(new Particle(true));
            }
        };

        const resize = () => {
            canvas.width = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;
        };

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach(p => {
                p.update();
                p.draw();
            });
            animationFrameId = requestAnimationFrame(animate);
        };

        window.addEventListener('resize', resize);
        resize();
        init();
        animate();

        return () => {
            window.removeEventListener('resize', resize);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full pointer-events-none z-0"
            style={{ opacity: 0.8 }}
        />
    );
};

export default FloatingEmbers;
