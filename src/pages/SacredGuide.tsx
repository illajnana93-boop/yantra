import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Testimonials from '../components/Testimonials';
import Footer from '../components/Footer';

const SacredGuide = () => {
    return (
        <div className="bg-[#0A1F3C] min-h-screen text-[#F8F5F0]">
            <Navbar />

            {/* Hero Section - Responsive Optimization */}
            <section className="relative min-h-[50vh] md:h-[60vh] flex items-center justify-center overflow-hidden bg-[#0A1F3C] pt-28 md:pt-24 border-b border-[#D4AF37]/10">
                <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none">
                    <div className="w-[400px] h-[400px] md:w-[600px] md:h-[600px] border-[20px] md:border-[40px] border-[#D4AF37] rounded-full blur-[4px]"></div>
                </div>

                <div className="relative z-10 text-center px-6">
                    <motion.p
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-gold-gradient uppercase tracking-[0.4em] md:tracking-[0.6em] text-[8px] md:text-[10px] font-black mb-4 md:mb-6"
                    >
                        Spiritual Instructions • Path to Peace
                    </motion.p>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-white text-4xl md:text-7xl font-serif mb-6 md:mb-8 tracking-tight text-glow"
                    >
                        Sacred <span className="text-gold-gradient italic">Journey</span>
                    </motion.h1>
                    <motion.div
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ delay: 0.5, duration: 1 }}
                        className="h-[1px] w-24 md:w-40 bg-gold-gradient mx-auto shadow-ambient-gold rounded-full"
                    ></motion.div>
                </div>
            </section>

            {/* Placement Section - Mobile Alignment Fix */}
            <section className="py-16 md:py-24 px-6 md:px-24 bg-[#081629] border-b border-[#D4AF37]/10 relative">
                <div className="absolute inset-0 bg-ambient-glow opacity-10 pointer-events-none"></div>
                <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 md:gap-20 items-center relative z-10">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="relative order-2 md:order-1"
                    >
                        <div className="absolute -inset-3 md:-inset-6 border border-[#D4AF37]/10 rounded-[2rem] md:rounded-[3rem] rotate-1"></div>
                        <div className="w-full aspect-square bg-[#0A1F3C]/80 rounded-[1.5rem] md:rounded-[2.5rem] border border-[#D4AF37]/20 p-3 md:p-4 relative z-10 shadow-xl overflow-hidden glass-card">
                            <img
                                loading="lazy"
                                src="/image copy 7.png"
                                className="w-full h-full object-cover rounded-[1rem] md:rounded-[2rem] filter brightness-105"
                                alt="Yantra Placement"
                            />
                        </div>
                        <div className="absolute -bottom-4 -right-2 md:-bottom-6 md:-right-6 bg-gold-gradient p-4 md:p-8 text-[#0A1F3C] rounded-[1.5rem] md:rounded-[2.5rem] shadow-xl z-20 font-bold border-2 border-[#081629]">
                            <p className="font-serif text-lg md:text-2xl italic mb-1 leading-none">Ritual Time</p>
                            <p className="text-[7px] md:text-[9px] uppercase tracking-[0.2em] font-black opacity-80">Brahma Muhurta</p>
                        </div>
                    </motion.div>

                    <div className="flex flex-col gap-8 md:gap-10 order-1 md:order-2 text-center md:text-left">
                        <div className="space-y-4">
                            <h2 className="text-3xl md:text-5xl font-serif text-white tracking-tight">Sacred Usage</h2>
                            <p className="text-stone-200 text-lg md:text-2xl font-serif italic font-light max-w-xl mx-auto md:mx-0">
                                To unlock the divine frequencies of the Yantra, follow these authentic Vedic protocols.
                            </p>
                        </div>

                        <div className="space-y-8 md:space-y-10">
                            {[
                                { title: "Northeast Placement", desc: "The Ishanya Kon is the primary direction for spiritual transmission.", icon: "🕉️" },
                                { title: "Devotional Chanting", desc: "Activate the geometry through the vibration of sacred mantras.", icon: "📿" },
                                { title: "Golden Orientation", desc: "Ensure the Yantra faces the morning sun for solar charging.", icon: "🧭" }
                            ].map((item, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 15 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    className="flex flex-col md:flex-row gap-4 md:gap-8 items-center md:items-start group text-center md:text-left"
                                >
                                    <span className="text-3xl md:text-4xl filter drop-shadow-[0_0_10px_rgba(212,175,55,0.3)]">{item.icon}</span>
                                    <div>
                                        <h3 className="text-white font-bold text-lg md:text-xl mb-1 md:mb-2 group-hover:text-gold-gradient transition-all">{item.title}</h3>
                                        <p className="text-stone-200 text-lg md:text-xl leading-relaxed tracking-wide font-serif italic font-light">{item.desc}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Why Special Section - Responsive Grid Fix */}
            <section className="bg-[#0A1F3C] py-16 md:py-24 px-6 md:px-10 relative overflow-hidden border-b border-[#D4AF37]/10">
                <div className="max-w-7xl mx-auto relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.98 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="mb-12 md:mb-20"
                    >
                        <p className="text-gold-gradient uppercase tracking-[0.4em] md:tracking-[0.6em] text-[9px] md:text-[10px] font-black mb-3 md:mb-4">A Sacred Vow</p>
                        <h2 className="text-3xl md:text-6xl font-serif mb-6 md:mb-8 tracking-tight">The Seva Legacy</h2>
                        <div className="w-20 md:w-32 h-[1px] bg-gold-gradient mx-auto opacity-40"></div>
                    </motion.div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                        {[
                            { title: "Lifetime Grace", desc: "Eternal blessings for your generation.", img: "/image copy 2.png" },
                            { title: "Temple Legacy", desc: "Contribute to a living spiritual monument.", img: "/image copy 8.png" },
                            { title: "Ritualized Delivery", desc: "Handled with the utmost sanctity.", img: "/image copy 6.png" },
                            { title: "Sacred Integrity", desc: "Purity in every gram of gold.", img: "/image.png" }
                        ].map((card, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                className="glass-card p-6 md:p-8 group flex flex-col items-center text-center shadow-lg hover:border-[#D4AF37]/40 transition-all"
                            >
                                <div className="mb-6 md:mb-8 overflow-hidden rounded-[1.5rem] md:rounded-[2.5rem] aspect-[4/5] relative w-full border border-white/5">
                                    <img loading="lazy" src={card.img} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt={card.title} />
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#081629]/80 via-transparent to-transparent"></div>
                                </div>
                                <h4 className="text-white font-serif text-xl md:text-2xl mb-2 md:mb-3 group-hover:text-gold-gradient transition-all">{card.title}</h4>
                                <div className="w-10 h-[1px] bg-[#D4AF37]/30 mb-4 md:mb-6 group-hover:w-16 transition-all duration-500 mx-auto"></div>
                                <p className="text-[#F8F5F0]/60 text-xs md:text-sm leading-relaxed italic font-light tracking-wide">{card.desc}</p>
                            </motion.div>
                        ))}
                    </div>

                    <motion.div className="mt-16 md:mt-24 p-8 md:p-16 border border-[#D4AF37]/20 rounded-[2rem] md:rounded-[4rem] inline-block relative bg-[#0A1F3C]/60 glass-card max-w-3xl overflow-hidden mx-auto">
                        <div className="absolute inset-0 bg-gold-gradient opacity-5 animate-pulse"></div>
                        <p className="text-[#F8F5F0] font-serif text-xl md:text-4xl italic relative z-10 px-4 md:px-6 leading-tight font-light opacity-90">
                            "May the light of <span className="text-gold-gradient font-bold">Khatu Shyam</span> illuminate your sacred dwelling forever."
                        </p>
                    </motion.div>
                </div>
            </section>

            <Testimonials />
            <Footer />
        </div>
    );
};

export default SacredGuide;
