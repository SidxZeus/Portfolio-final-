import React, { useRef, useEffect } from 'react';

const MagneticLine = () => {
    const path = useRef(null);
    let progress = 0;
    let x = 0.5;
    let time = Math.PI / 2;
    let reqId = null;

    useEffect(() => {
        setPath(progress);
    }, [])

    const setPath = (progress) => {
        // Use container width instead of window width for better responsiveness
        const width = path.current ? path.current.parentElement.clientWidth : window.innerWidth;

        // Quadratic bezier curve: Start(0, 50) Control(width*x, 50+progress) End(width, 50)
        // 50 is the vertical center of the 100px high SVG
        path.current.setAttributeNS(null, "d", `M0 50 Q${width * x} ${50 + progress} ${width} 50`)
    }

    const lerp = (x, y, a) => x * (1 - a) + y * a

    const manageMouseEnter = () => {
        if (reqId) {
            cancelAnimationFrame(reqId);
            resetAnimation();
        }
    }

    const manageMouseMove = (e) => {
        const { movementY, clientX } = e;
        const pathBound = path.current.parentElement.getBoundingClientRect();

        // Calculate relative X position (0 to 1)
        x = (clientX - pathBound.left) / pathBound.width;

        // Add movement to progress, limit it to avoid breaking
        progress += movementY;

        setPath(progress);
    }

    const manageMouseLeave = () => {
        animateOut();
    }

    const animateOut = () => {
        const newProgress = progress * Math.sin(time);
        progress = lerp(progress, 0, 0.025);
        time += 0.2;
        setPath(newProgress);

        if (Math.abs(progress) > 0.75) {
            reqId = requestAnimationFrame(animateOut);
        }
        else {
            resetAnimation();
        }
    }

    const resetAnimation = () => {
        time = Math.PI / 2;
        progress = 0;
    }

    return (
        <div className="relative w-full h-[100px] -mt-[50px] -mb-[50px] z-30">
            {/* Hit area */}
            <div
                onMouseEnter={manageMouseEnter}
                onMouseMove={manageMouseMove}
                onMouseLeave={manageMouseLeave}
                className="absolute top-[30px] w-full h-[40px] z-10" // invisible hit box
            ></div>

            {/* SVG Line */}
            <svg className="w-full h-full block">
                <path
                    ref={path}
                    className="stroke-black/30 fill-none stroke-[1px]"
                ></path>
            </svg>
        </div>
    );
};

export default MagneticLine;
