import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import AnimatedText from './AnimatedText';

const TimelineItem = ({ data, index }) => {
    return (
        <div className={`flex justify-center items-center w-full mb-112 relative z-10 ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
            {/* Content Side */}
            <div className={`w-[40%] flex flex-col ${index % 2 === 0 ? 'items-end text-right' : 'items-start text-left'}`}>
                <div className="mb-2">
                    <AnimatedText
                        text={data.company}
                        className="text-5xl md:text-7xl font-bold font-cabinet tracking-tight text-white inline-block"
                        el="h2"
                        shouldAnimate={true}
                        viewport={{ once: true, amount: 0.3 }}
                    />
                </div>
                <div className="mb-4">
                    <AnimatedText
                        text={data.role}
                        className="text-gray-400 text-xl md:text-2xl font-light font-cabinet inline-block"
                        el="p"
                        shouldAnimate={true}
                        baseDelay={0.1}
                        viewport={{ once: true, amount: 0.3 }}
                    />
                </div>
                <div className="max-w-md">
                    <AnimatedText
                        text={data.description}
                        className="text-gray-500 text-base md:text-lg font-cabinet leading-relaxed inline-block"
                        el="p"
                        shouldAnimate={true}
                        baseDelay={0.2}
                        viewport={{ once: true, amount: 0.3 }}
                    />
                </div>
                <div className="mt-4">
                    <AnimatedText
                        text={data.date}
                        className="text-gray-600 text-sm font-cabinet tracking-widest uppercase inline-block"
                        el="span"
                        shouldAnimate={true}
                        baseDelay={0.3}
                        viewport={{ once: true, amount: 0.3 }}
                    />
                </div>
            </div>

            {/* Center Axis */}
            <div className="w-[10%] flex justify-center relative">
                {/* Dot */}
                <motion.div
                    initial={{ scale: 0, backgroundColor: "#333" }}
                    whileInView={{ scale: 1, backgroundColor: "#fdf2f2ff" }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="w-4 h-4 rounded-full border-4 border-[#1e1e1e] z-20"
                    style={{ boxShadow: "0 0 0 2px #333" }}
                />
            </div>

            {/* Empty/Visual Side */}
            <div className="w-[40%]"></div>
        </div>
    );
};

const Timeline = () => {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const height = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

    const experience = [
        {
            company: "Techivation",
            role: "Full Stack Developer (Part-time)",
            description: "Building and maintaining Techivation's full web and SaaS ecosystem powering audio plugin licensing and management.",
            date: "May 2025 - Present"
        },
        {
            company: "Freelance",
            role: "Creative Developer",
            description: "Crafting bespoke digital experiences for varied clients, focusing on interactive motion and performance.",
            date: "Jan 2024 - Present"
        },
        {
            company: "Freelance",
            role: "Creative Developer",
            description: "Crafting bespoke digital experiences for varied clients, focusing on interactive motion and performance.",
            date: "Jan 2024 - Present"
        },
        {
            company: "Freelance",
            role: "Creative Developer",
            description: "Crafting bespoke digital experiences for varied clients, focusing on interactive motion and performance.",
            date: "Jan 2024 - Present"
        },
        {
            company: "Freelance",
            role: "Creative Developer",
            description: "Crafting bespoke digital experiences for varied clients, focusing on interactive motion and performance.",
            date: "Jan 2024 - Present"
        },
        // Add more items as needed
    ];

    return (
        <section className="text-white min-h-screen py-32 relative overflow-hidden font-cabinet">

            {/* Heading */}
            <div className="text-center mb-20 px-4 relative z-10 w-full">
                <div className="text-2xl md:text-4xl font-normal leading-snug max-w-4xl mx-auto">
                    <AnimatedText
                        text="Explore my journey and the technologies that define my craft."
                        className="inline-block"
                        el="h3"
                        shouldAnimate={true}
                        viewport={{ once: true, amount: 0.3 }}
                    />
                </div>
            </div>

            {/* Timeline Content Container */}
            <div ref={containerRef} className="relative w-full max-w-7xl mx-auto px-4">
                {/* Central Line Container */}
                <div className="absolute left-1/2 top-10 bottom-0 w-[2px] bg-white/10 -translate-x-1/2 z-0">
                    {/* Filling Line */}
                    <motion.div
                        style={{ height }}
                        className="w-full bg-[#ffffffff] origin-top"
                    />
                </div>

                {/* Items */}
                <div className="relative z-10 pt-10">
                    {experience.map((item, index) => (
                        <TimelineItem key={index} data={item} index={index} />
                    ))}
                </div>
            </div>

        </section>
    );
};

export default Timeline;
