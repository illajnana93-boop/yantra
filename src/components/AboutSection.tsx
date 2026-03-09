import { motion } from 'framer-motion';

const AboutSection = () => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: "easeOut" as const }
        }
    } as const;

    return (
        <section id="about" className="bg-[#081629] relative overflow-hidden py-20 md:py-24 border-y border-[#D4AF37]/10">
            {/* Ambient Lighting Effects */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-ambient-glow pointer-events-none opacity-20"></div>

            <div className="max-w-7xl mx-auto flex flex-col items-center gap-12 relative z-10 px-6 lg:px-12 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.8 }}
                >
                    <div className="flex flex-col items-center gap-2 mb-4 md:mb-5">
                        <img src="/om.png" alt="Om" className="w-8 h-8 md:w-10 h-10 object-contain filter drop-shadow-[0_0_10px_rgba(212,175,55,0.4)]" />
                        <p className="text-gold-gradient text-[10px] md:text-[11px] uppercase font-bold tracking-[0.5em]">The Sacred Essence</p>
                    </div>

                    <h2 className="text-3xl md:text-5xl lg:text-6xl text-white mb-6 md:mb-8 tracking-tight text-glow px-4">
                        What is <span className="text-gold-gradient italic">Sri Shyam Yantra?</span>
                    </h2>

                    <div className="w-20 h-[1px] bg-gold-gradient mx-auto mb-10 opacity-30"></div>

                    <p className="text-stone-100 text-xl md:text-3xl leading-relaxed italic font-light max-w-5xl tracking-wide mx-auto">
                        "The Sri Shyam Yantra is a <span className="text-[#F5D76E] font-bold">sacred geometric instrument</span> authorized by <span className="text-[#F5D76E] font-bold">10,000 years of Vedic tradition</span>, meticulously ritualized over <span className="text-[#F5D76E] font-bold">45 days</span> to serve as a conduit for the infinite grace of Shyam Baba."
                    </p>
                </motion.div>

                {/* Structured Heritage Features Grid */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-4 lg:gap-8 w-full mt-12"
                >
                    {[
                        { title: '10,000+ Years', sub: 'Ancient Vedic Purity', img: '/vedic.png', desc: 'Authorized by millennia of timeless tradition.' },
                        { title: '45-Day Ritual', sub: 'Hand-Crafted Legacy', img: '/hand.png', desc: 'Meticulously ritualized by master chanters.' },
                        { title: 'Divine Shield', sub: 'Celestial Protection', img: '/divine.png', desc: 'An impenetrable armor of spiritual energy.' },
                        { title: 'Sacred Energy', sub: 'Activated Life Force', img: '/sacred.png', desc: 'Channels the pure vibrations of Shyam Baba.' }
                    ].map((item) => (
                        <motion.div
                            key={item.title}
                            variants={itemVariants}
                            className="flex flex-col items-center group w-full"
                        >
                            {/* Sacred Image Container - Consistent Alignment Area */}
                            <div className="h-32 md:h-40 flex items-center justify-center mb-8 relative">
                                <div className="relative p-2 rounded-xl md:rounded-2xl border border-transparent transition-all duration-300 group-hover:border-[#D4AF37]/40 group-hover:bg-[#D4AF37]/5 group-hover:shadow-[0_0_25px_rgba(212,175,55,0.15)] group-hover:scale-105">
                                    <img
                                        loading="lazy"
                                        src={item.img}
                                        className="w-24 md:w-28 lg:w-32 h-auto max-h-full object-contain relative z-10 brightness-110 contrast-110"
                                        alt={item.title}
                                    />
                                </div>
                            </div>

                            {/* Content Alignment Area */}
                            <div className="flex flex-col gap-3 items-center min-h-[140px]">
                                <h3 className="text-[#F5D76E] text-xl md:text-2xl font-bold tracking-tight text-glow h-8 flex items-center">
                                    {item.title}
                                </h3>

                                <div className="h-[1px] w-10 bg-gold-gradient opacity-30"></div>

                                <span className="text-white text-[11px] md:text-[12px] font-bold uppercase tracking-[0.25em] opacity-90 h-4 flex items-center group-hover:text-[#F5D76E] group-hover:tracking-[0.35em] transition-all duration-300">
                                    {item.sub}
                                </span>

                                <p className="text-stone-200 text-base md:text-lg leading-relaxed max-w-[280px] italic font-light">
                                    {item.desc}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>

            {/* Background Decoration */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-[0.02]">
                <img src="/image copy 4.png" className="w-[450px] h-auto grayscale blur-[1px]" alt="" />
            </div>
        </section>
    );
};

export default AboutSection;
