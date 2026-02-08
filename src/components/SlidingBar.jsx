import React from 'react';
import { motion } from 'framer-motion';
import { Icon } from '@iconify/react';

const Marquee = ({ items, direction = 'left', speed = 20, rotation = 0, className = '' }) => {
    return (
        <div
            className={`absolute top-1/2 left-[110%] -translate-x-1/2 -translate-y-1/2 w-[120vw] bg-[#1e1e1e] text-white py-3 shadow-2xl flex items-center justify-center ${className}`}
            style={{ transform: `translate(-50%, -50%) rotate(${rotation}deg)` }}
        >
            <motion.div
                key={direction} // Force re-render on direction change
                className="flex items-center whitespace-nowrap"
                initial={{ x: direction === 'left' ? "0%" : "-50%" }}
                animate={{ x: direction === 'left' ? "-50%" : "0%" }}
                transition={{
                    repeat: Infinity,
                    ease: "linear",
                    duration: speed, // Ensure passed speed is reasonable (e.g. 15-20s)
                }}
            >
                {/* Content Block 1 */}
                <div className="flex items-center shrink-0">
                    {items.map((item, i) => (
                        <React.Fragment key={`a-${i}`}>
                            <span className="text-4xl md:text-6xl font-cabinet font-bold uppercase tracking-wide px-6">
                                {item}
                            </span>
                            <span className="text-3xl md:text-5xl px-6 text-white">
                                <Icon icon="svg-spinners:wind-toy" />
                            </span>
                        </React.Fragment>
                    ))}
                </div>
                {/* Content Block 2 (Duplicate for seamless loop) */}
                <div className="flex items-center shrink-0">
                    {items.map((item, i) => (
                        <React.Fragment key={`b-${i}`}>
                            <span className="text-4xl md:text-6xl font-cabinet font-bold uppercase tracking-wide px-6">
                                {item}
                            </span>
                            <span className="text-3xl md:text-5xl px-6 text-white">
                                <Icon icon="svg-spinners:wind-toy" />
                            </span>
                        </React.Fragment>
                    ))}
                </div>
            </motion.div>
        </div>
    );
};

const SlidingBar = React.forwardRef((props, ref) => {
    const textItems1 = [
        "Driven by Passion, Built with Code",
        "Innovative Self-Made Creations",
        "Tailored Web Development",
        "Custom Web Experiences",
        "Digital Solutions",
        "Creative Engineering",
        "Interactive Design",
        "Seamless User Experiences"
    ];

    const textItems2 = [
        "Digital Solutions",
        "Creative Engineering",
        "Interactive Design",
        "Seamless User Experiences",
        "Driven by Passion, Built with Code",
        "Innovative Self-Made Creations",
        "Tailored Web Development",
        "Custom Web Experiences"
    ];

    return (
        <section ref={ref} className="text-black relative min-h-[143vh] w-full flex items-center justify-center z-10 font-cabinet overflow-hidden">

            {/* Overlay Gradient for depth (optional) */}
            <div className="absolute inset-0 bg-transparent z-0 pointer-events-none"></div>

            {/* Marquee 1 - Rotating Left (The one going Up-Right) */}
            <Marquee
                items={textItems1}
                direction="right"
                speed={100}
                rotation={-6}
                className="z-10 border-y-2 border-white/10"
            />

            {/* Marquee 2 - Rotating Right (The one going Down-Right) */}
            <Marquee
                items={textItems2}
                direction="left"
                speed={100}
                rotation={6}
                className="z-20 border-y-2 border-white/10"
            />

        </section>
    );
});

export default SlidingBar;
