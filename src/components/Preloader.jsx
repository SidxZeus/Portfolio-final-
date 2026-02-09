import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const greetings = ["Hello", "¡Hola!", "नमस्ते"];

const Preloader = () => {
    const [index, setIndex] = React.useState(0);

    React.useEffect(() => {
        if (index < greetings.length - 1) {
            const timeout = setTimeout(() => {
                setIndex(prev => prev + 1);
            }, 700); // Change text every 500ms
            return () => clearTimeout(timeout);
        }
    }, [index]);

    return (
        <motion.div
            key="preloader"
            className="fixed inset-0 z-[10000] flex items-center justify-center bg-bg-color"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
        >
            <AnimatePresence>
                <motion.h1
                    key={index}
                    className="text-6xl md:text-8xl font-bold text-text-primary tracking-tighter absolute"
                    initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    exit={{ opacity: 0, y: -20, filter: "blur(10px)" }}
                    transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
                >
                    {greetings[index]}
                </motion.h1>
            </AnimatePresence>
        </motion.div>
    );
};

export default Preloader;
