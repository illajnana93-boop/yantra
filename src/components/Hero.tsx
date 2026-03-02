import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

const images = [
    '/image copy.png',
    '/image copy 2.png',
    '/image copy 3.png',
    '/image.png'
];

const Hero = () => {
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrent((prev) => (prev + 1) % images.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.3
            }
        }
    } as const;

    const itemVariants = {
        hidden: { opacity: 0, y: 15 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: "easeOut" as const }
        }
    } as const;

    const scrollToAvatar = () => {
        const element = document.getElementById('guruji-darshan');
        if (element) {
            const offset = 80;
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - offset;
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    };

    return (
        <section className="min-h-screen flex items-center bg-[#081629] relative overflow-hidden pt-20 md:pt-0">
            {/* Ambient Lighting Background */}
            <div className="absolute inset-0 bg-navy-gradient opacity-60"></div>

            <div className="absolute top-[10%] right-[-5%] w-[80%] md:w-[50%] h-[50%] bg-[#D4AF37]/5 rounded-full blur-[100px] md:blur-[120px] pointer-events-none"></div>
            <div className="absolute bottom-[10%] left-[-5%] w-[70%] md:w-[40%] h-[40%] bg-blue-900/10 rounded-full blur-[80px] md:blur-[100px] pointer-events-none"></div>

            <div className="container mx-auto px-6 md:px-24 grid md:grid-cols-2 gap-12 md:gap-20 items-center relative z-10 py-12 md:py-20">
                {/* Left: Divine Content */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="flex flex-col gap-5 md:gap-6 text-center md:text-left order-2 md:order-1"
                >
                    <div className="relative">
                        <motion.h1
                            variants={itemVariants}
                            className="hindi-heading text-5xl md:text-7xl text-white mb-2 leading-tight tracking-normal"
                        >
                            श्री श्याम
                        </motion.h1>
                        <motion.h2
                            variants={itemVariants}
                            className="text-3xl md:text-5xl font-serif text-gold-gradient italic"
                        >
                            Sacred Yantra
                        </motion.h2>
                    </div>

                    <motion.div variants={itemVariants} className="flex items-center justify-center md:justify-start gap-4">
                        <div className="h-[1px] w-8 md:w-12 bg-gold-gradient rounded-full"></div>
                        <p className="text-[#F5D76E] uppercase text-[8px] md:text-[10px] font-bold tracking-[0.3em] md:tracking-[0.4em] opacity-90">
                            Energy • Protection • Peace
                        </p>
                        <div className="h-[1px] w-8 md:w-12 bg-gold-gradient rounded-full md:hidden"></div>
                    </motion.div>

                    <motion.p
                        variants={itemVariants}
                        className="text-[#F8F5F0] text-base md:text-xl leading-relaxed font-serif italic max-w-lg font-light tracking-wide opacity-80 mx-auto md:mx-0"
                    >
                        Experience the ethereal protection of Shyam Baba through this spiritually activated yantra.
                    </motion.p>

                    <motion.div variants={itemVariants} className="flex flex-wrap justify-center md:justify-start gap-6 mt-2 md:mt-4">
                        <button
                            onClick={scrollToAvatar}
                            className="btn-gold-royal px-8 md:px-10 py-4 rounded-full group flex items-center gap-3 text-[10px] md:text-xs interactive"
                        >
                            <span className="tracking-widest">Get Divine Blessings</span>
                            <span className="text-lg md:text-xl group-hover:translate-x-1 transition-transform">→</span>
                        </button>
                    </motion.div>
                </motion.div>

                {/* Right: Glass Frame */}
                <div className="relative flex justify-center md:justify-end order-1 md:order-2">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="relative w-full max-w-[280px] md:max-w-md aspect-[4/5] z-10"
                    >
                        <motion.div
                            animate={{ y: [0, -10, 0] }}
                            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                            className="w-full h-full relative p-3 md:p-4 bg-white/5 backdrop-blur-xl rounded-[2rem] md:rounded-[2.5rem] border border-[#D4AF37]/30 shadow-2xl overflow-hidden"
                        >
                            <div className="w-full h-full overflow-hidden relative rounded-[1.5rem] md:rounded-[2rem] shadow-inner border border-white/5 bg-black/20">
                                <AnimatePresence mode="wait">
                                    <motion.img
                                        key={current}
                                        src={images[current]}
                                        initial={{ opacity: 0, scale: 1.05 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.95 }}
                                        transition={{ duration: 1, ease: "easeInOut" }}
                                        className="w-full h-full object-cover"
                                        alt="Sri Shyam Yantra"
                                    />
                                </AnimatePresence>
                                <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#081629] to-transparent pointer-events-none"></div>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </div>

            {/* Subtle Divider Line */}
            <div className="absolute bottom-0 left-0 w-full divider-gold-thin opacity-30"></div>
        </section>
    );
};

export default Hero;
