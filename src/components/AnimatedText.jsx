import React, { useEffect, useRef } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';

const AnimatedText = ({ text, className, el: Wrapper = 'p', shouldAnimate = true, baseDelay = 0, viewport = { amount: 0.2 }, animationType = 'default', wordSpace = "0.25em" }) => {
    const words = text.split(" ");
    const MotionWrapper = motion[Wrapper];
    const ref = useRef(null);
    const isInView = useInView(ref, { amount: viewport.amount || 0.2, once: false });
    const controls = useAnimation();

    useEffect(() => {
        if (!shouldAnimate) {
            controls.start("hidden");
            return;
        }

        if (isInView) {
            controls.start("visible");
        } else {
            if (ref.current) {
                const rect = ref.current.getBoundingClientRect();
                if (rect.top > 0) {
                    controls.start("hidden");
                } else if (rect.top <= 0) {
                    controls.set("visible");
                }
            }
        }
    }, [isInView, shouldAnimate, controls]);

    const container = {
        hidden: { opacity: animationType === 'mask' ? 1 : 0 },
        visible: (i = 1) => ({
            opacity: 1,
            transition: { staggerChildren: 0.05, delayChildren: baseDelay + (0.04 * i) },
        }),
    };

    const childDefault = {
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: "spring",
                damping: 12,
                stiffness: 100,
            },
        },
        hidden: {
            opacity: 0,
            y: 20,
            transition: {
                type: "spring",
                damping: 12,
                stiffness: 100,
            },
        },
    };

    const childMask = {
        visible: {
            y: "0%",
            transition: {
                duration: 0.75,
                ease: [0.33, 1, 0.68, 1] // Premium ease ("cubic-bezier")
            },
        },
        hidden: {
            y: "110%", // Slightly more than 100 to ensure full hide
            transition: {
                duration: 0.75,
                ease: [0.33, 1, 0.68, 1]
            },
        },
    };

    const variants = animationType === 'mask' ? childMask : childDefault;

    return (
        <MotionWrapper
            ref={ref}
            style={{ overflow: "hidden", display: "inline-block", verticalAlign: "top" }}
            variants={container}
            initial="hidden"
            animate={controls}
            className={className}
        >
            {words.map((word, index) => (
                <span key={index} style={animationType === 'mask' ? { display: "inline-block", overflow: "hidden", verticalAlign: "top", marginRight: wordSpace } : { display: "inline-block", marginRight: wordSpace }}>
                    <motion.span
                        variants={variants}
                        style={{ display: "inline-block" }}
                    >
                        {word}
                    </motion.span>
                </span>
            ))}
        </MotionWrapper>
    );
};

export default AnimatedText;
