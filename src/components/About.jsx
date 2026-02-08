import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { FiArrowUpRight } from 'react-icons/fi';
import AnimatedText from './AnimatedText';
import MagneticButton from './MagneticButton';

const About = () => {
    return (
        <section
            className="text-white relative min-h-[120vh] mt-10 w-full flex flex-col justify-center overflow-hidden z-10"
            id="about"
            onMouseEnter={() => document.body.classList.remove('dark-cursor')}
        >
            <div className="w-full px-5">
                <div className="w-full text-center">
                    <div className="z-[60] text-white text-xl leading-tight lg:text-4xl xl:text-5xl text-center xl:mb-4 xl:max-w-6xl lg:max-w-5xl w-full mx-auto px-4 font-cabinet">
                        <AnimatedText
                            text="I'm Sid—a Full Stack Developer crafting fast,"
                            className="inline-block"
                            el="span"
                            shouldAnimate={true}
                            baseDelay={0.4}
                            viewport={{ once: false, amount: 0.3 }}
                        />
                        <br className="hidden md:block" />
                        <AnimatedText
                            text="scalable, and immersive digital experiences that"
                            className="inline-block"
                            el="span"
                            shouldAnimate={true}
                            baseDelay={0.6}
                            viewport={{ once: false, amount: 0.3 }}
                        />
                        <br className="hidden md:block" />
                        <AnimatedText
                            text="merge creativity with engineering precision."
                            className="inline-block"
                            el="span"
                            shouldAnimate={true}
                            baseDelay={0.8}
                            viewport={{ once: false, amount: 0.3 }}
                        />
                    </div>
                </div>
                <div className="w-full flex justify-center mt-12 md:mt-16">
                    <AnimatedText
                        text="I specialize in developing SaaS platforms, AI-driven products, and interactive 3D web experiences using technologies like Next.js, Node.js, and Three.js."
                        className="text-white text-lg md:text-2xl lg:text-2xl xl:text-3xl text-center mb-1 max-w-5xl mx-auto px-4"
                        shouldAnimate={true}
                        baseDelay={0.4}
                        viewport={{ once: false, amount: 0.3 }}
                    />
                </div>

                {/* Buttons Container */}
                <div className="w-full flex justify-center items-center mt-18 relative z-[70]">
                    <MagneticButton>
                        <div className="flex items-center">
                            <button className="px-8 py-4 rounded-full border border-white/20 hover:border-white bg-black/50 hover:bg-white backdrop-blur-sm transition-all duration-300 group">
                                <span className="text-white font-cabinet text-lg tracking-wider group-hover:text-black">
                                    <AnimatedText text="About Me" className="inline-block" el="span" shouldAnimate={true} baseDelay={0.5} viewport={{ once: false, amount: 0.3 }} />
                                </span>
                            </button>

                            <button className="w-14 h-14 rounded-full border border-white/20 hover:border-white bg-black/50 hover:bg-white backdrop-blur-sm transition-all duration-300 group flex items-center justify-center">
                                <FiArrowUpRight className="text-white text-2xl group-hover:text-black transition-colors" />
                            </button>
                        </div>
                    </MagneticButton>
                </div>

                <div className="absolute bottom-15 w-full flex justify-between items-end max-w-4xl mx-auto px-4 z-[60] left-1/2 -translate-x-1/2">
                    <div className="text-white/70 font-cabinet text-lg tracking-wider">
                        <AnimatedText text="Scroll to Explore" className="inline-block" shouldAnimate={true} baseDelay={0.5} viewport={{ once: false, amount: 0.3 }} />
                    </div>
                    <div className="text-white/70 font-cabinet text-lg tracking-wider">
                        <AnimatedText text="My Short Story" className="inline-block" shouldAnimate={true} baseDelay={0.5} viewport={{ once: false, amount: 0.3 }} />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
