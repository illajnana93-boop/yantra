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

    return (
        <section className="min-h-screen flex items-center bg-[#081629] relative overflow-hidden">
            {/* Ambient Lighting Background */}
            <div className="absolute inset-0 bg-navy-gradient opacity-60"></div>
            <div className="absolute top-[20%] right-[-10%] w-[60%] h-[60%] bg-[#D4AF37]/5 rounded-full blur-[150px] pointer-events-none"></div>

            <div className="container mx-auto px-8 md:px-24 grid md:grid-cols-2 gap-12 items-center relative z-10 py-20">
                {/* Left: Divine Content */}
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1 }}
                    className="flex flex-col gap-6"
                >
                    <div className="relative">
                        <motion.h1
                            className="hindi-heading text-6xl md:text-7xl text-white mb-2 leading-tight tracking-normal"
                        >
                            श्री श्याम
                        </motion.h1>
                        <h2 className="text-4xl md:text-5xl font-serif text-gold-gradient italic">
                            Sacred Yantra
                        </h2>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="h-[1px] w-12 bg-gold-gradient rounded-full"></div>
                        <p className="text-[#F5D76E] uppercase text-[10px] font-bold tracking-[0.4em] opacity-90">
                            Divine Energy • Protection • Peace
                        </p>
                    </div>

                    <p className="text-[#F8F5F0] text-lg md:text-xl leading-relaxed font-serif italic max-w-lg font-light tracking-wide opacity-80">
                        Experience the ethereal protection of Shyam Baba through this spiritually activated yantra,
                        imbued with ancient Vedic frequencies and divine grace.
                    </p>

                    <div className="flex flex-wrap gap-6 mt-4">
                        <button className="btn-gold-royal px-10 py-4 rounded-full group flex items-center gap-3 text-xs">
                            <span className="tracking-widest">Get Divine Blessings</span>
                            <span className="text-xl group-hover:translate-x-1 transition-transform">→</span>
                        </button>
                    </div>
                </motion.div>

                {/* Right: Glass Frame (Previous structure style) */}
                <div className="relative flex justify-center md:justify-end">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1 }}
                        className="relative w-full max-w-md aspect-[4/5] z-10"
                    >
                        {/* Reverted Frame Style: Glass Card with precise border */}
                        <div className="w-full h-full relative p-4 bg-white/5 backdrop-blur-xl rounded-[2.5rem] border border-[#D4AF37]/30 shadow-2xl overflow-hidden">
                            <div className="w-full h-full overflow-hidden relative rounded-[2rem] shadow-inner border border-white/5 bg-black/20">
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
                                <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#081629] to-transparent"></div>
                            </div>
                        </div>

                        {/* Soft Gold Glow Shadows */}
                        <div className="absolute -top-6 -right-6 w-20 h-20 bg-[#D4AF37]/10 rounded-full blur-3xl animate-pulse"></div>
                    </motion.div>
                </div>
            </div>

            {/* Subtle Divider Line */}
            <div className="absolute bottom-0 left-0 w-full divider-gold-thin opacity-50"></div>
        </section>
    );
};

export default Hero;
