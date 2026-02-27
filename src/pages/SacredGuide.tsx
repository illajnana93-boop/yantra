import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Testimonials from '../components/Testimonials';
import Footer from '../components/Footer';

const SacredGuide = () => {
    return (
        <div className="bg-[#0A1F3C] min-h-screen text-[#F8F5F0]">
            <Navbar />

            {/* Hero Section - Scaled down */}
            <section className="relative h-[60vh] flex items-center justify-center overflow-hidden bg-[#0A1F3C] pt-24 border-b border-[#D4AF37]/10">
                <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none">
                    <div className="w-[600px] h-[600px] border-[40px] border-[#D4AF37] rounded-full blur-[4px]"></div>
                </div>

                <div className="relative z-10 text-center px-8">
                    <motion.p
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-gold-gradient uppercase tracking-[0.6em] text-[10px] font-black mb-6"
                    >
                        Spiritual Instructions • Path to Peace
                    </motion.p>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-white text-5xl md:text-7xl font-serif mb-8 tracking-tight text-glow"
                    >
                        Sacred <span className="text-gold-gradient italic">Journey</span>
                    </motion.h1>
                    <motion.div
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ delay: 0.5, duration: 1 }}
                        className="h-[1px] w-40 bg-gold-gradient mx-auto shadow-ambient-gold rounded-full"
                    ></motion.div>
                </div>
            </section>

            {/* Placement Section - Scaled down */}
            <section className="py-24 px-10 md:px-24 bg-[#081629] border-b border-[#D4AF37]/10 relative">
                <div className="absolute inset-0 bg-ambient-glow opacity-10 pointer-events-none"></div>
                <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-20 items-center relative z-10">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="relative"
                    >
                        <div className="absolute -inset-6 border border-[#D4AF37]/10 rounded-[3rem] rotate-1"></div>
                        <div className="w-full aspect-square bg-[#0A1F3C]/80 rounded-[2.5rem] border border-[#D4AF37]/20 p-4 relative z-10 shadow-xl overflow-hidden glass-card">
                            <img
                                src="/image copy 7.png"
                                className="w-full h-full object-cover rounded-[2rem] filter brightness-105"
                                alt="Yantra Placement"
                            />
                        </div>
                        <div className="absolute -bottom-6 -right-6 bg-gold-gradient p-6 md:p-8 text-[#0A1F3C] hidden md:block rounded-[2.5rem] shadow-xl z-20 font-bold border-2 border-[#081629]">
                            <p className="font-serif text-2xl italic mb-1 leading-none">Ritual Time</p>
                            <p className="text-[9px] uppercase tracking-[0.2em] font-black opacity-80">Brahma Muhurta</p>
                        </div>
                    </motion.div>

                    <div className="flex flex-col gap-10">
                        <div className="space-y-4">
                            <h2 className="text-4xl md:text-5xl font-serif text-white tracking-tight">Sacred Usage</h2>
                            <p className="text-[#F5D76E] text-xl font-serif italic max-w-xl font-light">
                                To unlock the divine frequencies of the Yantra, follow these authentic Vedic protocols.
                            </p>
                        </div>

                        <div className="space-y-10">
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
                                    className="flex gap-8 items-start group"
                                >
                                    <span className="text-4xl filter drop-shadow-[0_0_10px_rgba(212,175,55,0.3)]">{item.icon}</span>
                                    <div>
                                        <h3 className="text-white font-bold text-xl mb-2 group-hover:text-gold-gradient transition-all">{item.title}</h3>
                                        <p className="text-[#F8F5F0]/70 text-base leading-relaxed font-light font-serif italic">{item.desc}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Why Special Section - Scaled down */}
            <section className="bg-[#0A1F3C] py-24 px-10 relative overflow-hidden border-b border-[#D4AF37]/10">
                <div className="max-w-7xl mx-auto relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.98 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="mb-20"
                    >
                        <p className="text-gold-gradient uppercase tracking-[0.6em] text-[10px] font-black mb-4">A Sacred Vow</p>
                        <h2 className="text-white text-5xl md:text-6xl font-serif mb-8 tracking-tight">The Seva Legacy</h2>
                        <div className="w-32 h-[1px] bg-gold-gradient mx-auto opacity-40"></div>
                    </motion.div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            { title: "Lifetime Grace", desc: "Eternal blessings for your generation.", img: "/image copy 2.png" },
                            { title: "Temple Legacy", desc: "Contribute to a living spiritual monument.", img: "/image copy 3.png" },
                            { title: "Ritualized Delivery", desc: "Handled with the utmost sanctity.", img: "/image copy 6.png" },
                            { title: "Sacred Integrity", desc: "Purity in every gram of gold.", img: "/image.png" }
                        ].map((card, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                className="glass-card p-8 group flex flex-col items-center text-center shadow-lg"
                            >
                                <div className="mb-8 overflow-hidden rounded-[2.5rem] aspect-[4/5] relative w-full border border-white/5">
                                    <img src={card.img} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt={card.title} />
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#081629]/80 via-transparent to-transparent"></div>
                                </div>
                                <h4 className="text-white font-serif text-2xl mb-3 group-hover:text-gold-gradient transition-all">{card.title}</h4>
                                <div className="w-12 h-[1px] bg-[#D4AF37]/30 mb-6 group-hover:w-20 transition-all duration-500"></div>
                                <p className="text-[#F8F5F0]/60 text-sm leading-relaxed italic font-light tracking-wide">{card.desc}</p>
                            </motion.div>
                        ))}
                    </div>

                    <motion.div className="mt-24 p-12 md:p-16 border border-[#D4AF37]/20 rounded-[4rem] inline-block relative bg-[#0A1F3C]/60 glass-card max-w-3xl overflow-hidden">
                        <div className="absolute inset-0 bg-gold-gradient opacity-5 animate-pulse"></div>
                        <p className="text-[#F8F5F0] font-serif text-3xl md:text-4xl italic relative z-10 px-6 leading-tight font-light opacity-90">
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
