import { motion } from 'framer-motion';
import { useState, useRef } from 'react';

const Hero = () => {
    const [isMuted, setIsMuted] = useState(true);
    const videoRef = useRef<HTMLVideoElement>(null);

    const toggleMute = () => {
        if (videoRef.current) {
            videoRef.current.muted = !videoRef.current.muted;
            setIsMuted(videoRef.current.muted);
        }
    };

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
        <section className="min-h-[85vh] flex items-center bg-[#081629] relative overflow-hidden pt-24 md:pt-0">
            {/* Ambient Lighting Background */}
            <div className="absolute inset-0 bg-navy-gradient opacity-60"></div>

            <div className="absolute top-[10%] right-[-5%] w-[80%] md:w-[50%] h-[50%] bg-[#D4AF37]/5 rounded-full blur-[100px] md:blur-[120px] pointer-events-none"></div>
            <div className="absolute bottom-[10%] left-[-5%] w-[70%] md:w-[40%] h-[40%] bg-blue-900/10 rounded-full blur-[80px] md:blur-[100px] pointer-events-none"></div>

            <div className="container mx-auto px-4 md:px-8 lg:px-12 grid grid-cols-1 md:grid-cols-[0.8fr_1.2fr] gap-8 md:gap-10 items-center relative z-10 py-16 md:py-20">
                {/* Left: Divine Content - Secondary focus */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="flex flex-col gap-6 md:gap-8 text-center md:text-left order-1"
                >
                    <div className="space-y-3 md:space-y-4">
                        <motion.h1
                            variants={itemVariants}
                            className="hindi-heading text-5xl md:text-6xl lg:text-7xl text-white leading-tight tracking-normal"
                        >
                            श्री श्याम
                        </motion.h1>
                        <motion.h2
                            variants={itemVariants}
                            className="text-3xl md:text-4xl lg:text-5xl font-serif text-gold-gradient italic"
                        >
                            Sacred Yantra
                        </motion.h2>
                    </div>

                    <motion.div variants={itemVariants} className="flex items-center justify-center md:justify-start gap-4">
                        <div className="h-[1px] w-8 md:w-16 bg-gold-gradient rounded-full"></div>
                        <p className="text-[#F5D76E] uppercase text-[9px] md:text-[10px] lg:text-xs font-bold tracking-[0.4em] opacity-90">
                            Energy • Protection • Peace
                        </p>
                        <div className="h-[1px] w-8 md:w-16 bg-gold-gradient rounded-full md:hidden"></div>
                    </motion.div>

                    <motion.p
                        variants={itemVariants}
                        className="text-stone-200 text-lg md:text-xl lg:text-2xl leading-relaxed font-serif italic font-light max-w-md tracking-wide mx-auto md:mx-0"
                    >
                        Experience the ethereal protection of Khatu Shyam Baba through this spiritually activated divine yantra.
                    </motion.p>

                    <motion.div variants={itemVariants} className="flex flex-wrap justify-center md:justify-start gap-6 mt-2">
                        <button
                            onClick={scrollToAvatar}
                            className="btn-gold-royal px-8 md:px-12 py-3.5 md:py-4 rounded-full group flex items-center gap-4 text-xs md:text-sm interactive"
                        >
                            <span className="tracking-widest">Get Divine Blessings</span>
                            <span className="text-xl group-hover:translate-x-1 transition-transform">→</span>
                        </button>
                    </motion.div>
                </motion.div>

                {/* Right: Divine Video Frame - PRIMARY FOCUS (60-65%) */}
                <div className="relative flex justify-center md:justify-end order-2">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="relative w-full md:max-w-none lg:max-w-[850px] aspect-video z-10"
                    >
                        <div
                            className="w-full h-full relative rounded-[1.5rem] md:rounded-[2.5rem] lg:rounded-[3rem] border border-[#D4AF37]/35 shadow-[0_0_80px_rgba(212,175,55,0.25)] overflow-hidden bg-[#050c18]"
                        >
                            <video
                                ref={videoRef}
                                src="/vid.mp4"
                                className="w-full h-full object-cover"
                                autoPlay
                                muted={isMuted}
                                loop
                                playsInline
                            />
                            {/* Subtle Overlays */}
                            <div className="absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-black/50 to-transparent pointer-events-none"></div>
                            <div className="absolute inset-0 ring-1 ring-inset ring-[#D4AF37]/15 rounded-[1.5rem] md:rounded-[2.5rem] lg:rounded-[3rem] pointer-events-none"></div>

                            {/* Mute/Unmute Toggle Button */}
                            <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={toggleMute}
                                className="absolute bottom-6 right-6 z-20 w-12 h-12 rounded-full bg-black/40 backdrop-blur-md border border-[#D4AF37]/30 flex items-center justify-center group interactive"
                            >
                                {isMuted ? (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-[#F5D76E]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
                                    </svg>
                                ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-[#F5D76E]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                                    </svg>
                                )}
                            </motion.button>
                        </div>

                        {/* Background Ambient Glow for the Video - LARGER for dominance */}
                        <div className="absolute -inset-10 bg-gold-gradient opacity-15 blur-[100px] rounded-full pointer-events-none z-0"></div>
                    </motion.div>
                </div>
            </div>

            {/* Subtle Divider Line */}
            <div className="absolute bottom-0 left-0 w-full divider-gold-thin opacity-30"></div>
        </section>
    );
};

export default Hero;
