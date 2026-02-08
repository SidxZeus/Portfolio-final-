import React, { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

const CustomCursor = () => {
    const cursorSize = 32;

    // Mouse position state
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Spring physics for smooth movement
    const springConfig = { damping: 25, stiffness: 150 };
    const springX = useSpring(mouseX, springConfig);
    const springY = useSpring(mouseY, springConfig);

    useEffect(() => {
        const moveCursor = (e) => {
            mouseX.set(e.clientX - cursorSize / 2);
            mouseY.set(e.clientY - cursorSize / 2);
        };

        window.addEventListener('mousemove', moveCursor);

        return () => {
            window.removeEventListener('mousemove', moveCursor);
        };
    }, [mouseX, mouseY]);

    return (
        <motion.div
            className="custom-cursor-element fixed top-0 left-0 rounded-full border-[1.5px] border-white bg-transparent pointer-events-none z-[9999]"
            style={{
                width: cursorSize,
                height: cursorSize,
                x: springX,
                y: springY,
            }}
        />
    );
};

export default CustomCursor;
