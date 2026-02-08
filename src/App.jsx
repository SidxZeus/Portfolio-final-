import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Lenis from 'lenis';
import { AnimatePresence, motion, useScroll, useTransform, useSpring } from 'framer-motion';

import Hero from './components/Hero';
import About from './components/About';
import Work from './components/Work';
import Projects from './components/Projects';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';
import Preloader from './components/Preloader';
import SlidingBar from './components/SlidingBar';
import Timeline from './components/Timeline';
import Expertise from './components/Expertise';
import ScrollWrapper from './components/ScrollWrapper';

import { useLocation } from 'react-router-dom';

const ScrollBackground = ({ slidingBarRef }) => {
  const { scrollY } = useScroll();
  const smoothScrollY = useSpring(scrollY, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const [windowHeight, setWindowHeight] = useState(0);

  useEffect(() => {
    // Initialize height
    setWindowHeight(window.innerHeight);
    const handleResize = () => setWindowHeight(window.innerHeight);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Layer 1: Hero -> About -> Work -> Timeline (Black)
  const backgroundColor1 = useTransform(
    smoothScrollY,
    // Breakpoints:
    // 0 to 0.7*h (Hero): White
    // 1.1*h (Entering About): Black
    // 1.6*h (Within About): Black
    // 2.0*h (Exiting About / Entering Work): Black (Work will handle its own bg)
    // 4.0*h (In Expertise): Black
    [0, windowHeight * 0.7, windowHeight * 1.1, windowHeight * 1.6, windowHeight * 2.0, windowHeight * 4.0],
    ["#ffffff", "#ffffff", "#121212", "#121212", "#121212", "#121212"]
  );

  // Layer 2: Timeline -> SlidingBar (White)
  // Tracks the SlidingBar section specifically
  const { scrollYProgress: slidingBarProgress } = useScroll({
    target: slidingBarRef,
    offset: ["start end", "center center"]
  });

  const smoothSlidingBarProgress = useSpring(slidingBarProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const layer2Opacity = useTransform(smoothSlidingBarProgress, [0, 1], [0, 1]);

  return (
    <>
      <motion.div
        style={{ backgroundColor: backgroundColor1 }}
        className="absolute inset-0 -z-20"
      />
      <motion.div
        style={{ backgroundColor: "#ffffff", opacity: layer2Opacity }}
        className="absolute inset-0 -z-10"
      />
    </>
  );
};

const AnimatedRoutes = ({ slidingBarRef, isLoading }) => {
  const location = useLocation();

  const pageTransition = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
    transition: { duration: 0.5, ease: "easeInOut" }
  };

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={
          <motion.div {...pageTransition}>
            <div className="relative z-10 shadow-xl">
              <ScrollBackground slidingBarRef={slidingBarRef} />
              <Hero loading={isLoading} />
              <About />
              <div>
                <Work />
                <ScrollWrapper>
                  <Expertise />
                  <Projects />
                  <Timeline />
                </ScrollWrapper>
                <SlidingBar ref={slidingBarRef} />
              </div>
            </div>
            <Footer />
          </motion.div>
        } />
        <Route path="/work" element={
          <motion.div {...pageTransition}>
            <div className="relative z-10 bg-bg-color shadow-xl" style={{ paddingTop: '100px' }}>
              <Work />
              <Expertise />
            </div>
            <Footer />
          </motion.div>
        } />
        <Route path="/projects" element={
          <motion.div {...pageTransition}>
            <div className="relative z-10 bg-bg-color shadow-xl" style={{ paddingTop: '100px' }}>
              <Projects />
            </div>
            <Footer />
          </motion.div>
        } />
        <Route path="/contact" element={
          <motion.div {...pageTransition}>
            <div className="relative z-10 bg-bg-color shadow-xl" style={{ paddingTop: '100px', minHeight: '50vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <h1>Contact Page</h1>
            </div>
            <Footer />
          </motion.div>
        } />
        <Route path="/about" element={
          <motion.div {...pageTransition}>
            <div className="relative z-10 bg-bg-color shadow-xl" style={{ paddingTop: '100px', minHeight: '50vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <h1>About Page</h1>
            </div>
            <Footer />
          </motion.div>
        } />
      </Routes>
    </AnimatePresence>
  );
};


function App() {
  const [isLoading, setIsLoading] = useState(true);
  const slidingBarRef = React.useRef(null);

  useEffect(() => {
    const lenis = new Lenis({
      autoRaf: true,
    });

    // Simulate loading time (sync with Preloader animation)
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <Router>
      <div className="app-container">
        <AnimatePresence mode="wait">
          {isLoading && <Preloader />}
        </AnimatePresence>

        <CustomCursor />

        <main>
          <AnimatedRoutes slidingBarRef={slidingBarRef} isLoading={isLoading} />
        </main>
      </div>
    </Router>
  );
}

export default App;
// Re-save to force HMR update
