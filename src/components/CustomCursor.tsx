import React, { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

const CustomCursor: React.FC = () => {
    const [isHovering, setIsHovering] = useState(false);

    // Use MotionValues for raw performance
    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);

    // Spring physics for smooth trailing
    const springConfig = { damping: 30, stiffness: 250 };
    const x = useSpring(cursorX, springConfig);
    const y = useSpring(cursorY, springConfig);

    useEffect(() => {
        const moveMouse = (e: MouseEvent) => {
            cursorX.set(e.clientX - 16);
            cursorY.set(e.clientY - 16);
        };

        const handleHoverStart = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            // Check for interactive class or common interactive tags
            if (target.closest('button, a, .interactive, input, textarea')) {
                setIsHovering(true);
            } else {
                setIsHovering(false);
            }
        };

        window.addEventListener('mousemove', moveMouse, { passive: true });
        window.addEventListener('mouseover', handleHoverStart, { passive: true });

        return () => {
            window.removeEventListener('mousemove', moveMouse);
            window.removeEventListener('mouseover', handleHoverStart);
        };
    }, [cursorX, cursorY]);

    return (
        <div className="fixed inset-0 pointer-events-none z-[100] hidden md:block">
            {/* Main Cursor Ring */}
            <motion.div
                style={{
                    x: x,
                    y: y,
                }}
                className="w-8 h-8 rounded-full border border-gold-500/50 mix-blend-difference will-change-transform"
                animate={{
                    scale: isHovering ? 2 : 1,
                    backgroundColor: isHovering ? "rgba(212, 175, 55, 0.1)" : "rgba(212, 175, 55, 0)",
                    borderColor: isHovering ? "rgba(212, 175, 55, 0.8)" : "rgba(212, 175, 55, 0.5)",
                }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
            />
        </div>
    );
};

export default CustomCursor;
