import React from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

import img1 from '../assets/taskflow.png';
import img2 from '../assets/college.png';
import img3 from '../assets/Screenshot (12).png';
import img4 from '../assets/Screenshot (13).png';

const projects = [
    { id: 1, title: 'Neon Dreams', category: 'Brand Design', color: '#FF0055', image: img1 },
    { id: 2, title: 'AI Interface', category: 'UI/UX', color: '#00FF94', image: img2 },
    { id: 3, title: 'Future Tech', category: 'Web Dev', color: '#00D1FF', image: img3 },
    { id: 4, title: 'Motion Lab', category: 'Animation', color: '#D4F234', image: img4 },
];

const Work = () => {
    const containerRef = React.useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "start start"]
    });

    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    const pathTemplate = (yOffset, curveControl) =>
        `M0,320 L0,${yOffset} C480,${curveControl} 960,${curveControl} 1440,${yOffset} L1440,320 Z`;

    const pathD = useTransform(
        smoothProgress,
        [0, 1],
        [
            pathTemplate(320, 320), // Start: Flat at bottom
            pathTemplate(100, 0)    // End: Very high curve (Sides 100, Center 0)
        ]
    );

    return (
        <section
            className="py-[100px] relative z-10 bg-white"
            id="work"
            ref={containerRef}
            onMouseEnter={() => document.body.classList.add('dark-cursor')}
            onMouseLeave={() => document.body.classList.remove('dark-cursor')}
        >
            {/* Curve Transition */}
            <div className="absolute top-0 left-0 w-full overflow-hidden leading-[0] transform -translate-y-[99%] z-10 pointer-events-none">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 1440 320"
                    className="w-full h-[200px] md:h-[450px] block"
                    preserveAspectRatio="none"
                >
                    <motion.path
                        fill="#ffffff"
                        fillOpacity="1"
                        d={pathD}
                    ></motion.path>
                </svg>
            </div>

            <div className="container mx-auto px-5 relative z-10">
                <div className="flex items-baseline mb-[60px] border-b border-black/10 pb-5">
                    <h2 className="text-[3rem] font-bold uppercase mr-5 text-black">Selected Work</h2>
                    <span className="text-[1.2rem] text-black/60 font-main"></span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    {projects.map((project, index) => (
                        <motion.div
                            key={project.id}
                            className="group cursor-pointer"
                            whileHover={{ scale: 0.98 }}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                        >
                            <div className="w-full aspect-[4/3] mb-5 relative overflow-hidden rounded bg-[#111]">
                                <img
                                    src={project.image}
                                    alt={project.title}
                                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500"
                                />
                                <div
                                    className="absolute inset-0 flex items-center justify-center bg-black/20 border-0 border-transparent transition-[border-width] duration-300 ease-in-out group-hover:border-2"
                                    style={{ borderColor: project.color }}
                                >
                                    <span
                                        className="opacity-0 translate-y-5 text-xl font-bold transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0"
                                        style={{ color: project.color }}
                                    >
                                        View Case
                                    </span>
                                </div>
                            </div>
                            <div className="flex justify-between items-center">
                                <h3 className="text-[1.5rem] font-semibold text-black">{project.title}</h3>
                                <span className="text-[1rem] text-black/60 border border-black/20 px-[15px] py-[5px] rounded-[20px]">{project.category}</span>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Work;
