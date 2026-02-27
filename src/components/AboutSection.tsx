import { motion } from 'framer-motion';

const AboutSection = () => {
    return (
        <section id="about" className="bg-[#0A1F3C] relative overflow-hidden py-24 border-y border-[#D4AF37]/10">
            {/* Ambient Lighting Effects */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-ambient-glow pointer-events-none opacity-40"></div>

            <div className="max-w-5xl mx-auto flex flex-col items-center gap-12 relative z-10 px-8 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <div className="flex flex-col items-center gap-2 mb-4">
                        <span className="text-2xl filter drop-shadow-[0_0_10px_rgba(212,175,55,0.4)]">🕉️</span>
                        <p className="text-gold-gradient text-[10px] uppercase font-bold tracking-[0.4em]">The Sacred Essence</p>
                    </div>

                    <h2 className="text-4xl md:text-5xl font-serif text-white mb-8 tracking-tight text-glow">
                        What is <span className="text-gold-gradient italic">Sri Shyam Yantra?</span>
                    </h2>

                    <div className="w-24 h-[1px] bg-gold-gradient mx-auto mb-12 opacity-50"></div>

                    <p className="text-[#F8F5F0] text-xl md:text-2xl leading-relaxed font-serif italic font-light max-w-4xl tracking-wide opacity-90">
                        "The Sri Shyam Yantra is a <span className="text-[#F5D76E] font-bold">sacred geometric instrument</span> authorized by Vedic tradition,
                        meticulously ritualized to serve as a conduit for the infinite grace of Shyam Baba,
                        bringing divine protection and peace to every dwelling."
                    </p>
                </motion.div>

                {/* Icons Grid - Scaled down */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.3 }}
                    className="grid grid-cols-2 md:grid-cols-4 gap-8 w-full mt-4"
                >
                    {[
                        { title: 'Vedic Purity', icon: '✨' },
                        { title: 'Hand-Crafted', icon: '🎨' },
                        { title: 'Divine Shield', icon: '🛡️' },
                        { title: 'Sacred Energy', icon: '⚡' }
                    ].map((item, idx) => (
                        <div key={item.title} className="flex flex-col items-center gap-4 group">
                            <div className="relative w-16 h-16 rounded-full border border-[#D4AF37]/20 flex items-center justify-center bg-[#081629]/50 group-hover:border-[#D4AF37]/60 transition-all duration-500 shadow-ambient-gold overflow-hidden">
                                <div className="absolute inset-0 bg-gold-gradient opacity-0 group-hover:opacity-10 transition-opacity"></div>
                                <span className="text-2xl filter drop-shadow-[0_0_10px_rgba(212,175,55,0.3)]">{item.icon}</span>
                            </div>
                            <span className="text-[#F5D76E] text-[9px] font-bold uppercase tracking-[0.3em] group-hover:text-white transition-colors">
                                {item.title}
                            </span>
                        </div>
                    ))}
                </motion.div>
            </div>

            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.02] pointer-events-none scale-125">
                <img src="/image copy 4.png" className="w-[400px] h-auto grayscale" alt="" />
            </div>
        </section>
    );
};

export default AboutSection;
