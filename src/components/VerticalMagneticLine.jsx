import React, { useRef, useEffect } from 'react';

const VerticalMagneticLine = () => {
    const path = useRef(null);
    let progress = 0;
    let y = 0.5;
    let time = Math.PI / 2;
    let reqId = null;

    useEffect(() => {
        setPath(progress);
    }, [])

    const setPath = (progress) => {
        // Use container height
        const height = path.current ? path.current.parentElement.clientHeight : 350;

        // Quadratic bezier curve: Start(50, 0) Control(50+progress, height*y) End(50, height)
        // 50 is the horizontal center of the 100px wide SVG
        path.current.setAttributeNS(null, "d", `M 50 0 Q ${50 + progress} ${height * y} 50 ${height}`)
    }

    const lerp = (x, y, a) => x * (1 - a) + y * a

    const manageMouseEnter = () => {
        if (reqId) {
            cancelAnimationFrame(reqId);
            resetAnimation();
        }
    }

    const manageMouseMove = (e) => {
        const { movementX, clientY } = e;
        const pathBound = path.current.parentElement.getBoundingClientRect();

        // Calculate relative Y position (0 to 1)
        y = (clientY - pathBound.top) / pathBound.height;

        // Add movement to progress
        progress += movementX * 1.5;

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
        <div className="relative w-[100px] h-[350px] -ml-[50px] -mr-[50px] z-30">
            {/* Hit area */}
            <div
                onMouseEnter={manageMouseEnter}
                onMouseMove={manageMouseMove}
                onMouseLeave={manageMouseLeave}
                className="absolute left-[10px] w-[80px] h-full z-10" // invisible hit box
            ></div>

            {/* SVG Line */}
            <svg className="w-full h-full block">
                <path
                    ref={path}
                    className="stroke-black/50 fill-none stroke-[1px]"
                ></path>
            </svg>
        </div>
    );
};

export default VerticalMagneticLine;
