import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const RollingLink = ({ to, children }) => {
    return (
        <Link to={to} className="block h-[24px] overflow-hidden relative cursor-pointer group">
            <div className="flex flex-col transition-transform duration-[400ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-1/2">
                <span className="block h-[24px] leading-[24px] font-medium text-text-secondary transition-colors duration-300 group-hover:text-text-primary">
                    {children}
                </span>
                <span className="block h-[24px] leading-[24px] font-medium text-text-secondary transition-colors duration-300 group-hover:text-text-primary">
                    {children}
                </span>
            </div>
        </Link>
    );
};

const Header = () => {
    const [theme, setTheme] = useState('dark');
    const [isVisible, setIsVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    const [showHamburger, setShowHamburger] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
    }, [theme]);

    const [scrollProgress, setScrollProgress] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            const totalScroll = document.documentElement.scrollTop;
            const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scroll = `${totalScroll / windowHeight}`;
            setScrollProgress(Number(scroll));

            // Navbar Hiding Logic - Only show at page top
            const isAtTop = currentScrollY < 50;

            if (isAtTop) {
                setIsVisible(true); // At the very top - show navbar
            } else {
                setIsVisible(false); // Anywhere else - hide navbar
            }

            // Hamburger Menu Logic - Show after scrolling past 1 viewport height (About page approx)
            if (currentScrollY > window.innerHeight * 0.8) {
                setShowHamburger(true);
            } else {
                setShowHamburger(false);
                setIsMenuOpen(false); // Close menu if we scroll back to top
            }

            setLastScrollY(currentScrollY);
        }
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [lastScrollY]);

    const toggleTheme = () => {
        setTheme(prev => prev === 'dark' ? 'light' : 'dark');
    };

    return (
        <>
            {/* Scroll Progress Bar - Independent of Navbar visibility */}
            <div
                className="fixed top-0 left-0 h-[3px] bg-white z-[110]"
                style={{ width: `${scrollProgress * 100}%` }}
            />

            {/* Main Navbar - Hides on scroll */}
            <header
                className={`fixed top-0 left-0 w-full py-5 z-[100] border-b border-[var(--color-border)] font-cabinet transition-transform duration-300 ${isVisible ? 'translate-y-0' : '-translate-y-full'
                    }`}
            >
                <div className="container grid grid-cols-12 items-center mx-auto px-5">
                    {/* Left: Logo */}
                    <div className="col-span-3 logo">
                        <Link to="/" className="text-2xl font-bold tracking-tighter text-text-primary">sid.</Link>
                    </div>

                    {/* Center: Navigation */}
                    <nav className="col-span-6 flex justify-center">
                        <ul className="flex items-center gap-1">
                            <li><RollingLink to="/">Home</RollingLink></li>
                            <span className="text-text-secondary">,</span>
                            <li><RollingLink to="/work">Work</RollingLink></li>
                            <span className="text-text-secondary">,</span>
                            <li><RollingLink to="/projects">Projects</RollingLink></li>
                            <span className="text-text-secondary">,</span>
                            <li><RollingLink to="/contact">Contact</RollingLink></li>
                        </ul>
                    </nav>

                    {/* Right: Buttons */}
                    <div className="col-span-3 flex justify-end items-center gap-4">
                        <a
                            href="https://buymeacoffee.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hidden md:inline-flex px-4 py-2 bg-text-primary text-bg-color text-sm font-semibold rounded-full items-center gap-2 hover:bg-gray-100 transition-colors"
                        >
                            <span>☕</span> Buy coffee
                        </a>

                        <button
                            onClick={toggleTheme}
                            className="w-10 h-10 flex items-center justify-center rounded-full border border-[var(--color-border)] text-text-primary hover:text-white hover:border-white transition-colors"
                            title="Toggle Theme"
                        >
                            {theme === 'dark' ? '☀' : '☾'}
                        </button>
                    </div>
                </div>
            </header>

            {/* Floating Hamburger Menu Button */}
            <div
                className={`fixed top-5 right-5 z-[120] transition-all duration-300 ${showHamburger ? 'opacity-100 scale-100' : 'opacity-0 scale-90 pointer-events-none'}`}
            >
                <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="w-12 h-12 rounded-full bg-text-primary text-bg-color flex items-center justify-center shadow-lg hover:scale-110 transition-transform font-sans"
                >
                    {isMenuOpen ? '✕' : '☰'}
                </button>
            </div>

            {/* Mobile/Hamburger Menu Overlay */}
            <div
                className={`fixed inset-0 bg-bg-color/95 backdrop-blur-md z-[115] flex items-center justify-center transition-all duration-500 ${isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
            >
                <nav className="font-cabinet text-center">
                    <ul className="flex flex-col gap-8 text-3xl">
                        <li>
                            <Link to="/" onClick={() => setIsMenuOpen(false)} className="hover:text-text-secondary transition-colors">Home</Link>
                        </li>
                        <li>
                            <Link to="/work" onClick={() => setIsMenuOpen(false)} className="hover:text-text-secondary transition-colors">Work</Link>
                        </li>
                        <li>
                            <Link to="/projects" onClick={() => setIsMenuOpen(false)} className="hover:text-text-secondary transition-colors">Projects</Link>
                        </li>
                        <li>
                            <Link to="/contact" onClick={() => setIsMenuOpen(false)} className="hover:text-text-secondary transition-colors">Contact</Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </>
    );
};

export default Header;
