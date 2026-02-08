import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const expertiseData = [
    {
        num: '01',
        title: <>Full Stack <br /> Development</>,
        desc: 'Building scalable and high-performance web applications using Next.js, React, Node.js, and TypeScript, with robust backend architectures, secure RESTful APIs, and clean code practices.'
    },
    {
        num: '02',
        title: 'UI/UX Design & Frontend',
        desc: 'Designing modern, responsive interfaces with Figma, Tailwind CSS, and Framer Motion. Creating intuitive experiences with clean design systems and pixel-perfect implementations.'
    },
    {
        num: '03',
        title: 'SaaS Platform Development',
        desc: 'Developing and designing end-to-end SaaS solutions with subscription systems, Stripe billing, and multi-tenant management. Ensuring scalability and secure user management.'
    },
    {
        num: '04',
        title: 'API & System Architecture',
        desc: 'Designing maintainable APIs with PostgreSQL, Prisma, and MongoDB. Focusing on performance optimization, security best practices, and reliable data flow.'
    }
];

const Expertise = () => {
    const targetRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: targetRef,
    });

    // Sequence:
    // 0 - 0.2: Heading moves up and fades out
    // 0.2 - 1: Horizontal scroll of cards

    const headingY = useTransform(scrollYProgress, [0, 0.2], [0, -100]);
    const headingOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

    const x = useTransform(scrollYProgress, [0.2, 1], ["0%", "-35%"]);

    return (
        <section ref={targetRef} className="relative h-[300vh] bg-bg-color font-cabinet">
            <div className="sticky top-0 flex flex-col h-screen justify-center overflow-hidden">

                {/* Static Heading Section */}
                <motion.div
                    className="px-5 md:px-20 mb-10 container mx-auto"
                    style={{ y: headingY, opacity: headingOpacity }}
                >
                    <h2 className="text-[2rem] md:text-[2rem] leading-[0.9] font-bold text-text-primary break-words opacity-100">
                        Transforming ideas into exceptional digital experiences <br /> through expertise and innovation
                    </h2>
                </motion.div>

                {/* Scrolling Cards Section */}
                <motion.div style={{ x }} className="flex gap-10 pl-5 md:pl-20 items-stretch h-[500px]">
                    {expertiseData.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            whileHover={{
                                scale: 1.02,
                                backgroundColor: "rgba(255, 255, 255, 0.05)",
                                borderColor: "rgba(255, 255, 255, 0.3)"
                            }}
                            className="relative min-w-[400px] w-[400px] flex-shrink-0 border border-white/10 p-10 flex flex-col justify-between bg-white/[0.02] rounded-lg group cursor-default"
                        >
                            <div>
                                <span className="absolute top-10 right-10 text-4xl font-cabinet text-white opacity-40 transition-all duration-500 group-hover:opacity-100 group-hover:scale-110 group-hover:rotate-[10deg]">{item.num}</span>
                                <h3 className="text-3xl font-bold mb-2 text-white transition-transform duration-500 group-hover:-translate-y-2">{item.title}</h3>
                            </div>
                            <p className="text-lg text-text-secondary leading-relaxed transition-all duration-500 group-hover:text-white/90 group-hover:-translate-y-1">
                                {item.desc}
                            </p>
                        </motion.div>
                    ))}

                    {/* Spacer to Ensure Full Scroll */}
                    <div className="w-[10vw]"></div>
                </motion.div>

            </div>
        </section>
    );
};

export default Expertise;
