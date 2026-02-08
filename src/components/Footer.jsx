import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import AnimatedText from './AnimatedText';
import RollingLink from './RollingLink';

const Footer = () => {
    const [time, setTime] = useState('');
    const splineRef = useRef(null);
    const footerRef = useRef(null);
    const [footerHeight, setFooterHeight] = useState(0);

    useEffect(() => {
        // Load Spline Viewer Script dynamically
        const script = document.createElement('script');
        script.type = 'module';
        script.src = 'https://unpkg.com/@splinetool/viewer@1.12.46/build/spline-viewer.js';
        document.body.appendChild(script);

        // Hide Spline Logo Logic
        const hideLogo = () => {
            if (splineRef.current && splineRef.current.shadowRoot) {
                const style = document.createElement('style');
                style.textContent = '#logo { display: none !important; }';
                splineRef.current.shadowRoot.appendChild(style);
            }
        };

        const viewer = splineRef.current;
        if (viewer) {
            viewer.addEventListener('load', hideLogo);
            // Fallback in case it loads fast or event is missed
            setTimeout(hideLogo, 1000);
            setTimeout(hideLogo, 3000);
        }

        // Clock Logic
        const updateTime = () => {
            const now = new Date();
            const timeString = now.toLocaleTimeString('en-US', {
                hour: 'numeric',
                minute: '2-digit',
                hour12: true
            });
            const offset = -now.getTimezoneOffset() / 60;
            const offsetString = offset >= 0 ? `+ ${offset} ` : offset;
            setTime(`${timeString} GMT${offsetString} `);
        };

        updateTime();
        const intervalId = setInterval(updateTime, 60000);

        return () => {
            document.body.removeChild(script);
            if (viewer) {
                viewer.removeEventListener('load', hideLogo);
            }
            clearInterval(intervalId);
        };
    }, []);

    // Measure footer height for the reveal effect
    useEffect(() => {
        if (!footerRef.current) return;

        const resizeObserver = new ResizeObserver((entries) => {
            for (let entry of entries) {
                setFooterHeight(entry.contentRect.height);
            }
        });

        resizeObserver.observe(footerRef.current);
        return () => resizeObserver.disconnect();
    }, []);

    return (
        <div style={{ height: footerHeight }} className="relative w-full z-0 pointer-events-none">
            {/* The fixed footer content */}
            <footer
                ref={footerRef}
                className="bg-[#121212] text-text-primary fixed bottom-0 left-0 z-0 min-h-[110vh] w-full flex flex-col justify-between overflow-hidden font-cabinet pointer-events-auto"
                id="contact"
            >
                <div className="container mx-auto px-6 pt-32 flex-grow">

                    {/* Top Section: Contacts & Layout */}
                    <div className="flex flex-col md:flex-row justify-between items-start gap-10">

                        {/* Columns Grid */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-12 gap-y-10 w-full md:w-auto">

                            {/* Links Column */}
                            <div className="flex flex-col gap-4">
                                <h3 className="text-text-secondary uppercase text-sm tracking-widest mb-2 font-cabinet">
                                    <AnimatedText text="LINKS" el="span" />
                                </h3>
                                <RollingLink to="/" text="Home" baseDelay={0.1} className="text-lg" />
                                <RollingLink to="/work" text="Work" baseDelay={0.2} className="text-lg" />
                                <RollingLink to="/about" text="About" baseDelay={0.3} className="text-lg" />
                                <RollingLink to="/contact" text="Contact" baseDelay={0.4} className="text-lg" />
                            </div>

                            {/* Socials Column */}
                            <div className="flex flex-col gap-4">
                                <h3 className="text-text-secondary uppercase text-sm tracking-widest mb-2 font-cabinet">
                                    <AnimatedText text="SOCIALS" el="span" baseDelay={0.2} />
                                </h3>
                                <RollingLink href="mailto:contact@sid.com" text="Email" baseDelay={0.3} className="text-lg" />
                                <RollingLink href="https://linkedin.com" target="_blank" text="LinkedIn" baseDelay={0.4} className="text-lg" />
                                <RollingLink href="https://whatsapp.com" target="_blank" text="Whatsapp" baseDelay={0.5} className="text-lg" />
                                <RollingLink href="https://github.com" target="_blank" text="Github" baseDelay={0.6} className="text-lg" />
                            </div>

                            {/* Local Time Column */}
                            <div className="flex flex-col gap-4">
                                <h3 className="text-text-secondary uppercase text-sm tracking-widest mb-2 font-cabinet">
                                    <AnimatedText text="LOCAL TIME" el="span" baseDelay={0.4} />
                                </h3>
                                <div className="text-lg">
                                    <AnimatedText text={time} el="span" key={time} shouldAnimate={true} baseDelay={0.5} />
                                </div>
                            </div>

                            {/* Version Column */}
                            <div className="flex flex-col gap-4">
                                <h3 className="text-text-secondary uppercase text-sm tracking-widest mb-2 font-cabinet">
                                    <AnimatedText text="VERSION" el="span" baseDelay={0.6} />
                                </h3>
                                <div className="text-lg">
                                    <AnimatedText text="2026 © Edition" el="span" baseDelay={0.7} />
                                </div>
                            </div>
                        </div>

                        {/* Contact Buttons (Top Right) */}
                        <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto mt-4 md:mt-0">
                            <a href="tel:+919876543210" className="px-8 py-3 rounded-full border border-white/20 hover:bg-white hover:text-bg-color transition-all duration-300 text-center block">
                                <AnimatedText text="+91 98765 43210" el="span" baseDelay={0.1} />
                            </a>
                            <a href="mailto:contact@sid.com" className="px-8 py-3 rounded-full border border-white/20 hover:bg-white hover:text-bg-color transition-all duration-300 text-center block">
                                <AnimatedText text="contact@sid.com" el="span" baseDelay={0.2} />
                            </a>
                        </div>
                    </div>

                </div>

                {/* Bottom Section: Massive SID Text */}
                <div className="relative w-full flex justify-center items-end select-none">
                    <h1 className="text-[27vw] leading-[0.77] font-small text-white flex items-end font-cabinet gap-0 -mb-5.5">
                        <span>
                            <AnimatedText text="S" el="span" baseDelay={0.2} className="inline-block" wordSpace="0" />
                        </span>
                        <div className="relative inline-block">
                            {/* The 'I' */}
                            <AnimatedText text="I" el="span" baseDelay={0.3} className="inline-block" wordSpace="0" />

                            {/* Spline Viewer positioned over the I */}
                            <div className="absolute top-[-15.5vw] left-9 -translate-x-1/2 w-[23vw] h-[23vw] z-[100] pointer-events-auto">
                                <spline-viewer ref={splineRef} url="https://prod.spline.design/1TfKndgpt68aFOc9/scene.splinecode"></spline-viewer>
                            </div>
                        </div>
                        <span>
                            <AnimatedText text="D" el="span" baseDelay={0.4} className="inline-block" wordSpace="0" />
                        </span>
                    </h1>


                </div>
            </footer>
        </div>
    );
};

export default Footer;
