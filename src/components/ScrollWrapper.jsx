import React, { useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

const ScrollWrapper = ({ children }) => {
    const containerRef = useRef(null);

    // Scroll progress for the drawing line covering the entire wrapper
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start center", "end center"]
    });

    const smoothDrawing = useSpring(scrollYProgress, {
        stiffness: 150,
        damping: 30,
        restDelta: 0.001
    });

    return (
        <div className="relative w-full" ref={containerRef}>
            {/* Scroll Drawing SVG - Background Layer */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-20 opacity-20">
                <svg
                    width="100%"
                    height="100%"
                    viewBox="0 0 1467 3892"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    preserveAspectRatio="none" // Stretch to fill the long vertical space
                >
                    <motion.path
                        d="M1354.76 0.357357C1354.76 0.357357 1056.19 287.952 810.265 132.857C523.265 -48.1427 233.265 132.857 35.2648 248.357C-215.497 394.635 986.765 209.357 569.265 443.357C46.1265 736.565 1166.41 434.101 1148.26 660.357C1139.01 775.778 1053.76 1250.36 769.765 932.857C566.003 705.061 -50.4454 1250.36 268.765 1250.36C703.265 1250.36 118.594 1393.15 129.765 1506.36C163.265 1845.86 1245.1 1568.32 986.765 1812.36C697.765 2085.36 1269.62 1992.46 1281.76 2162.86C1300.41 2424.42 344.673 2101.58 658.765 2385.86C953.765 2652.86 295.107 2432.45 207.765 2608.36C63.752 2898.39 1330.54 2721.7 1070.26 2914.36C596.764 3264.86 1165.26 3050.36 1296.76 3223.36C1416.75 3381.21 959.765 3522.36 760.765 3554.36C526.349 3592.05 477.335 3524.2 306.765 3689.36C26.3495 3960.88 1466.76 3879.86 1466.76 3879.86"
                        stroke="#15ABEB"
                        strokeWidth="10"
                        style={{
                            pathLength: smoothDrawing
                        }}
                    />
                </svg>
            </div>

            {/* Content Content - Foreground Layer */}
            <div className="relative z-10">
                {children}
            </div>
        </div>
    );
};

export default ScrollWrapper;
