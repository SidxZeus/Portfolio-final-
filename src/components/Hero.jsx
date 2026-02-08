import React from 'react';
import { Link } from 'react-router-dom';
import sidLogo from '../assets/sid.svg';
import RollingLink from './RollingLink';
import { FaLinkedinIn, FaWhatsapp, FaGithub } from 'react-icons/fa';
import { MdGraphicEq } from 'react-icons/md';
import AnimatedText from './AnimatedText';
import MagneticButton from './MagneticButton';

import Spline from '@splinetool/react-spline';

const WaveAnimation = () => {
    // We will render multiple paths for a "waves" effect
    const pathRef1 = React.useRef(null);
    const pathRef2 = React.useRef(null);
    const pathRef3 = React.useRef(null);

    React.useEffect(() => {
        let animationFrameId;
        let time = 0;

        const animate = () => {
            time += 0.05;

            const generateWavePath = (offset, amplitude, frequency, phaseSpeed) => {
                let d = `M 0,12`;
                for (let x = 0; x <= 100; x += 5) {
                    // Simple smooth sine wave
                    const y = 12 + amplitude * Math.sin(frequency * x + time * phaseSpeed + offset);
                    // Using Quadratic Bezier for smoothness
                    // Actually, simple line segments are fine if resolution is decent (step 5 is okay)
                    // But let's use Q for extra smoothness if we want
                    // Ideally, a sine wave is already smooth. Linear segments at 5px interval is very smooth visually.
                    // Let's just use L for performance and simplicity but with good math.
                    d += ` L ${x},${y}`;
                }
                return d;
            };

            if (pathRef1.current) {
                pathRef1.current.setAttribute('d', generateWavePath(0, 4, 0.1, 1));
            }
            if (pathRef2.current) {
                pathRef2.current.setAttribute('d', generateWavePath(2, 3, 0.08, 1.2));
            }
            if (pathRef3.current) {
                pathRef3.current.setAttribute('d', generateWavePath(4, 2, 0.12, 0.8));
            }

            animationFrameId = requestAnimationFrame(animate);
        };

        animate();

        return () => cancelAnimationFrame(animationFrameId);
    }, []);

    return (
        <svg width="100%" height="100%" viewBox="0 0 100 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full scale-[1.5]">
            <path ref={pathRef3} stroke="black" strokeWidth="1" strokeOpacity="0.3" strokeLinecap="round" vectorEffect="non-scaling-stroke" fill="none" />
            <path ref={pathRef2} stroke="black" strokeWidth="1" strokeOpacity="0.5" strokeLinecap="round" vectorEffect="non-scaling-stroke" fill="none" />
            <path ref={pathRef1} stroke="black" strokeWidth="1.5" strokeLinecap="round" vectorEffect="non-scaling-stroke" fill="none" />
        </svg>
    );
};

const Hero = ({ loading }) => {


    return (
        <section
            className="h-screen flex items-center justify-center relative overflow-hidden"
            onMouseEnter={() => document.body.classList.add('dark-cursor')}
            onMouseLeave={() => document.body.classList.remove('dark-cursor')}
        >
            {/* Spline 3D Background */}
            {/* Spline 3D Background */}
            {/* Spline 3D Background */}
            {/* <div className="absolute w-full h-full left-0 top-0 z-0 scale-[1.5] origin-center pointer-events-none">
                <Spline scene="https://prod.spline.design/vmWGmCNABAYhSCNl/scene.splinecode" />
            </div> */}


            {/* Navbar */}
            <nav className="absolute -top-2 left-0 w-full pl-1.5 pr-8 py-6 z-30 flex justify-between items-center">
                {/* Left: Logo */}
                <Link to="/" className="block">
                    <img src={sidLogo} alt="sid" className="h-20 w-auto object-contain invert" />
                </Link>

                {/* Right: Navigation Links */}
                <div className="flex items-center gap-8 text-black">
                    <RollingLink to="/" text="Home" className="text-sm font-medium uppercase tracking-wide" />
                    <RollingLink to="/work" text="Work" className="text-sm font-medium uppercase tracking-wide" />
                    <RollingLink to="/services" text="Services" className="text-sm font-medium uppercase tracking-wide" />
                    <RollingLink to="/contact" text="Contact" className="text-sm font-medium uppercase tracking-wide" />
                </div>
            </nav>
            <div className="absolute left-4 md:left-8 bottom-0 flex flex-col items-center gap-6 z-20 pb-10">
                {/* Line and Dot */}
                <div className="flex flex-col items-center gap-0">
                    <div className="w-[1px] h-[350px] bg-black opacity-50"></div>
                    <div className="w-[6px] h-[6px] rounded-full bg-black opacity-50"></div>
                </div>

                {/* Icons */}
                <div className="flex flex-col gap-6">
                    <MagneticButton>
                        <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="text-black hover:text-white transition-colors text-xl border border-black/20 p-3 rounded-full hover:bg-black hover:border-black block">
                            <FaLinkedinIn />
                        </a>
                    </MagneticButton>
                    <MagneticButton>
                        <a href="https://whatsapp.com" target="_blank" rel="noreferrer" className="text-black hover:text-white transition-colors text-xl border border-black/20 p-3 rounded-full hover:bg-black hover:border-black block">
                            <FaWhatsapp />
                        </a>
                    </MagneticButton>
                    <MagneticButton>
                        <a href="https://github.com" target="_blank" rel="noreferrer" className="text-black hover:text-white transition-colors text-xl border border-black/20 p-3 rounded-full hover:bg-black hover:border-black block">
                            <FaGithub />
                        </a>
                    </MagneticButton>
                </div>
            </div>

            <div className="flex flex-col items-center text-center z-10 px-5 text-black">
                <div className="font-cabinet-grotesk text-[1.2rem] xs:text-[1.5rem] sm:text-[1.6rem] md:text-[1.65rem] lg:text-[1.6rem]  text-center mb-5 lg:mb-4 word">
                    <AnimatedText text="Hi! i’m Sid" className="inline-block" el="span" shouldAnimate={!loading} baseDelay={0.5} />
                </div>
                <h1 className="font-cabinet-grotesk text-[2.3rem] xs:text-[2.2rem] sm:text-[2.8rem] md:text-[3.5rem] lg:text-[4rem] xl:text-[5.4rem] 2xl:text-[6rem]  text-center word leading-none -mb-3">
                    <AnimatedText text="Full-stack Developer" className="inline-block" el="span" shouldAnimate={!loading} baseDelay={0.5} />
                </h1>

                <p className="font-cabinet-grotesk text-[2.3rem] xs:text-[2.2rem] sm:text-[2.8rem] md:text-[3.5rem] lg:text-[4rem] xl:text-[5.4rem] 2xl:text-[6rem]  pb-1 text-center word leading-none">
                    <AnimatedText text="UI & UX Designer." className="inline-block" el="span" shouldAnimate={!loading} baseDelay={0.5} />
                </p>

                <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
                    <div className="text-base tracking-[2px] text-black font-cabinet-grotesk font-medium">
                        scroll down
                    </div>
                </div>
            </div>

            {/* Horizontal Wave in Circle - Bottom Right */}
            {/* Horizontal Wave in Circle - Bottom Right */}
            {/* Horizontal Wave in Circle - Bottom Right */}
            {/* Vertical Name - Right Center */}
            <div className="absolute right-0 top-1/2 -translate-y-1/2 z-20 flex flex-col items-center gap-6">
                <div className="writing-vertical-rl text-black/90 tracking-[0.2em] font-light text-sm uppercase rotate-180" style={{ writingMode: 'vertical-rl' }}>
                    Siddhu Nitin Kamble
                </div>
            </div>

            {/* Horizontal Wave in Circle - Bottom Right */}
            <div className="absolute right-4 md:right-8 bottom-0 pb-10 z-20 flex flex-col items-center gap-6">
                <div className="w-12 h-12 rounded-full border border-black/20 flex items-center justify-center overflow-hidden relative group hover:border-black transition-colors duration-300 bg-white/50 backdrop-blur-sm">
                    <WaveAnimation />
                </div>
            </div>
        </section>
    );
};

export default Hero;
