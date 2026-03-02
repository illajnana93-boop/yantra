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

    const cardVariants = {
        hidden: { opacity: 0, y: 20, scale: 0.98 },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: { duration: 0.6, ease: "easeOut" }
        }
    };

    return (
        <section id="about" className="bg-[#0A1F3C] relative overflow-hidden py-12 md:py-20 border-y border-[#D4AF37]/10">
            {/* Ambient Lighting Effects */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-ambient-glow pointer-events-none opacity-30"></div>

            <div className="max-w-6xl mx-auto flex flex-col items-center gap-8 md:gap-10 relative z-10 px-6 md:px-8 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.8 }}
                >
                    <div className="flex flex-col items-center gap-2 mb-3 md:mb-4">
                        <span className="text-xl md:text-2xl filter drop-shadow-[0_0_10px_rgba(212,175,55,0.4)]">🕉️</span>
                        <p className="text-gold-gradient text-[8px] md:text-[9px] uppercase font-bold tracking-[0.3em] md:tracking-[0.4em]">The Sacred Essence</p>
                    </div>

                    <h2 className="text-3xl md:text-5xl font-serif text-white mb-4 md:mb-6 tracking-tight text-glow px-4">
                        What is <span className="text-gold-gradient italic">Sri Shyam Yantra?</span>
                    </h2>

                    <div className="w-12 md:w-16 h-[1px] bg-gold-gradient mx-auto mb-6 md:mb-8 opacity-40"></div>

                    <p className="text-[#F8F5F0] text-lg md:text-2xl leading-relaxed font-serif italic font-light max-w-4xl tracking-wide opacity-90">
                        "The Sri Shyam Yantra is a <span className="text-[#F5D76E] font-bold">sacred geometric instrument</span> authorized by Vedic tradition,
                        meticulously ritualized to serve as a conduit for the infinite grace of Shyam Baba."
                    </p>
                </motion.div>

                {/* Icons Grid */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 w-full mt-2 md:mt-4"
                >
                    {[
                        { title: 'Vedic Purity', icon: '✨', detail: 'Ancient Wisdom' },
                        { title: 'Hand-Crafted', icon: '🎨', detail: 'Artisanal Grace' },
                        { title: 'Divine Shield', icon: '🛡️', detail: 'Celestial Armor' },
                        { title: 'Sacred Energy', icon: '⚡', detail: 'Spiritual Life Force' }
                    ].map((item) => (
                        <motion.div
                            key={item.title}
                            variants={cardVariants}
                            whileHover={{ y: -5 }}
                            className="flex flex-col items-center gap-3 md:gap-4 group cursor-none"
                        >
                            <div className="relative w-14 h-14 md:w-16 md:h-16 rounded-xl border border-[#D4AF37]/20 flex items-center justify-center bg-[#081629]/50 group-hover:border-[#D4AF37]/60 transition-all duration-500 shadow-ambient-gold overflow-hidden rotate-45">
                                <div className="absolute inset-0 bg-gold-gradient opacity-0 group-hover:opacity-10 transition-all duration-500 -rotate-45"></div>
                                <span className="text-xl md:text-2xl filter drop-shadow-[0_0_10px_rgba(212,175,55,0.3)] -rotate-45 transition-transform duration-500">{item.icon}</span>
                            </div>
                            <div className="flex flex-col gap-0.5">
                                <span className="text-[#F5D76E] text-[8px] md:text-[9px] font-bold uppercase tracking-[0.2em] md:tracking-[0.3em]">
                                    {item.title}
                                </span>
                                <span className="text-stone-500 text-[7px] md:text-[8px] uppercase tracking-widest font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                                    {item.detail}
                                </span>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>

            {/* Background Decoration */}
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 0.02 }}
                viewport={{ once: true }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
            >
                <img src="/image copy 4.png" className="w-[300px] md:w-[400px] h-auto grayscale blur-[2px]" alt="" />
            </motion.div>
        </section>
    );
};

export default AboutSection;
