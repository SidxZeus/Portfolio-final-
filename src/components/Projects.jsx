import React, { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';
import AnimatedText from './AnimatedText';
import MagneticLine from './MagneticLine';

import project1 from '../assets/taskflow.png';
import project2 from '../assets/college.png';
import project3 from '../assets/Screenshot (12).png';
import project4 from '../assets/Screenshot (13).png';

const projects = [
    {
        title: ' TaskFlow Pro',
        desc: 'Modern Task Management System',
        src: project1,
        link: 'https://github.com/SidxZeus/Employee'
    },
    {
        title: 'Project Two',
        desc: 'Interactive digital experience.',
        src: project2,
        link: '#'
    },
    {
        title: 'Project Three',
        desc: 'E-commerce platform with 3D elements.',
        src: project3,
        link: '#'
    },
    {
        title: 'Project Four',
        desc: 'Creative portfolio showcase.',
        src: project4,
        link: '#'
    }
];

const RollText = ({ text, className }) => {
    return (
        <span className={`inline-block overflow-hidden ${className}`}>
            {text.split("").map((char, i) => (
                <span
                    key={i}
                    className="relative inline-block overflow-hidden"
                    style={{ transitionDelay: `${i * 0.03}s` }} // Stagger effect
                >
                    <span className="block transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-y-full">
                        {char === " " ? "\u00A0" : char}
                    </span>
                    <span className="absolute top-0 left-0 block translate-y-full transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:translate-y-0">
                        {char === " " ? "\u00A0" : char}
                    </span>
                </span>
            ))}
        </span>
    );
};

const Projects = () => {
    const [activeProject, setActiveProject] = useState(null);
    const cursorX = useMotionValue(0);
    const cursorY = useMotionValue(0);

    const springConfig = { damping: 20, stiffness: 300, mass: 0.5 };
    const x = useSpring(cursorX, springConfig);
    const y = useSpring(cursorY, springConfig);

    const handleMouseMove = (e) => {
        cursorX.set(e.clientX);
        cursorY.set(e.clientY);
    };

    return (
        <section
            className="py-[100px] bg-white relative z-10"
            id="projects"
            onMouseMove={handleMouseMove}
            onMouseEnter={() => document.body.classList.add('dark-cursor')}
            onMouseLeave={() => document.body.classList.remove('dark-cursor')}
        >
            <div className="container mx-auto px-5">
                <div className="flex items-baseline mb-[60px] pb-5 relative">
                    <h2 className="text-[3rem] font-bold uppercase mr-5 text-black">
                        <AnimatedText text="My Projects" el="span" className="inline-block" />
                    </h2>
                    <span className="text-[1.2rem] text-zinc-500 font-main">
                        <AnimatedText text="(02)" el="span" className="inline-block" baseDelay={0.2} />
                    </span>
                    <div className="absolute bottom-0 w-full left-0">
                        <MagneticLine />
                    </div>
                </div>

                <div className="flex flex-col relative z-20">
                    {projects.map((project, index) => (
                        <motion.a
                            href={project.link}
                            key={index}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block py-[40px] transition-[padding] duration-300 cursor-pointer hover:pl-5 hover:bg-black/[0.02] group relative"
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            onMouseEnter={() => {
                                setActiveProject(index);
                                document.body.classList.add('hide-custom-cursor');
                            }}
                            onMouseLeave={() => {
                                setActiveProject(null);
                                document.body.classList.remove('hide-custom-cursor');
                            }}
                        >
                            <h3 className="text-[1.8rem] md:text-[2.5rem] font-semibold flex justify-between uppercase mb-2 text-zinc-600 transition-colors duration-300 group-hover:text-black">
                                <RollText text={project.title} className="inline-block" />
                                <span className="opacity-0 -translate-x-5 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0">↗</span>
                            </h3>
                            <p className="max-w-[500px] text-black opacity-70">
                                <AnimatedText text={project.desc} el="span" className="inline-block" baseDelay={0.1 * index + 0.2} />
                            </p>
                            <div className="absolute bottom-0 left-0 w-full">
                                <MagneticLine />
                            </div>
                        </motion.a>
                    ))}
                </div>
            </div>

            {/* Floating Image Cursor */}
            <motion.div
                className="fixed top-0 left-0 w-[300px] h-[220px] pointer-events-none z-10 overflow-hidden rounded-lg hidden md:block"
                style={{
                    x,
                    y,
                    translateX: "-50%",
                    translateY: "-50%",
                    perspective: "1000px" // Add perspective for 3D effect
                }}
                initial={{ scale: 0, opacity: 0 }}
                animate={{
                    scale: activeProject !== null ? 1 : 0,
                    opacity: activeProject !== null ? 1 : 0
                }}
                transition={{ duration: 0.3, ease: [0.76, 0, 0.24, 1] }}
            >
                <AnimatePresence mode="popLayout">
                    {activeProject !== null && (
                        <motion.img
                            key={activeProject} // Trigger animation on key change
                            src={projects[activeProject].src}
                            alt="Project Preview"
                            className="w-full h-full object-cover absolute inset-0"
                            initial={{ y: "100%" }}
                            animate={{ y: 0 }}
                            exit={{ y: "-100%" }}
                            transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
                        />
                    )}
                </AnimatePresence>
            </motion.div>
        </section>
    );
};

export default Projects;
