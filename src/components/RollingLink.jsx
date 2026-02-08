import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const RollingLink = ({ text, to, href, target, baseDelay = 0, className = "" }) => {
    const Component = to ? Link : 'a';
    const props = to ? { to } : { href, target, rel: target === "_blank" ? "noreferrer" : undefined };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{
                delay: baseDelay,
                type: "spring",
                damping: 12,
                stiffness: 100
            }}
            className={`block overflow-hidden relative cursor-pointer group h-[28px] ${className}`}
        >
            <Component {...props} className="block">
                <div className="flex flex-col transition-transform duration-[400ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-1/2">
                    <span className="block h-[28px] leading-[28px] font-medium transition-colors duration-300">
                        {text}
                    </span>
                    <span className="block h-[28px] leading-[28px] font-medium transition-colors duration-300">
                        {text}
                    </span>
                </div>
            </Component>
        </motion.div>
    );
};

export default RollingLink;
