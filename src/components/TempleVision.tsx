import { motion } from 'framer-motion';
import { FaUser, FaMapMarkerAlt, FaOm } from 'react-icons/fa';

const TempleVision = () => {
    return (
        <section className="bg-[#0b1d36] relative overflow-hidden py-24 md:py-32 border-t border-[#D4AF37]/20">
            {/* Ambient Spiritual Lighting */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
                <div className="absolute top-[10%] left-[-10%] w-[50%] h-[50%] bg-[#D4AF37]/5 rounded-full blur-[120px]"></div>
                <div className="absolute bottom-[10%] right-[-10%] w-[50%] h-[50%] bg-blue-900/10 rounded-full blur-[120px]"></div>
            </div>

            <div className="max-w-[1300px] mx-auto px-6 relative z-10">
                {/* 1. Top Center Heading */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16 md:mb-24"
                >
                    <p className="text-[#D4AF37]/80 text-[10px] md:text-[12px] uppercase font-bold tracking-[0.6em] mb-4">Divine Mission</p>
                    <h2 className="text-gold-gradient text-4xl md:text-6xl lg:text-7xl font-serif tracking-tight leading-tight uppercase mb-6 filter drop-shadow-[0_0_10px_rgba(212,175,55,0.3)]">
                        The 100 Temple Vision
                    </h2>
                    <p className="text-[#F5D76E] text-lg md:text-xl font-serif italic tracking-wide opacity-90">
                        Building 100 Sacred Temples Over 20 Years
                    </p>
                    <div className="divider-gold-thin max-w-2xl mx-auto mt-10"></div>
                </motion.div>

                {/* 2. Main Content Area (Two Column Layout) */}
                <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-20 items-center mb-24">

                    {/* LEFT SIDE: Video */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1 }}
                        className="relative group"
                    >
                        {/* Video Frame with Matte Gold Border & Glow */}
                        <div className="relative rounded-[18px] overflow-hidden border border-[#D4AF37]/40 shadow-[0_20px_60px_rgba(0,0,0,0.6),0_0_20px_rgba(212,175,55,0.1)] transition-transform duration-700 group-hover:scale-[1.02] bg-[#050c18]">
                            <video
                                src="/temple.mp4"
                                controls
                                className="w-full aspect-video object-cover"
                            />
                        </div>

                        {/* Subtle Corner Accents */}
                        <div className="absolute -top-3 -left-3 w-10 h-10 border-t-2 border-l-2 border-[#D4AF37]/30 rounded-tl-xl pointer-events-none"></div>
                        <div className="absolute -bottom-3 -right-3 w-10 h-10 border-b-2 border-r-2 border-[#D4AF37]/30 rounded-br-xl pointer-events-none"></div>
                    </motion.div>

                    {/* RIGHT SIDE: Mission Text */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.2 }}
                        className="flex flex-col space-y-8"
                    >
                        <div className="space-y-6">
                            <h3 className="text-[#F5D76E] text-2xl md:text-3xl font-serif font-bold italic tracking-wide leading-snug">
                                Establishing a Legacy of Devotion
                            </h3>
                            <p className="text-stone-300 text-lg leading-relaxed font-serif italic font-light">
                                Our sacred mission is to establish 100 temples over the next two decades, creating permanent sanctuaries of peace, protection, and divine connection for devotees worldwide.
                            </p>
                            <p className="text-stone-400 text-base leading-relaxed">
                                Each temple serves as a beacon of Vedic wisdom and spiritual awakening, constructed with traditional precision and sacred activation.
                            </p>
                        </div>

                        {/* Mandir Address Card */}
                        <motion.div
                            whileHover={{ y: -5 }}
                            className="bg-[#051124] border border-[#D4AF37]/30 p-8 rounded-2xl relative overflow-hidden group shadow-xl"
                        >
                            <div className="absolute top-4 right-4 text-[#D4AF37]/20 text-4xl">
                                <FaOm />
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="text-[#D4AF37] text-2xl mt-1">
                                    <FaMapMarkerAlt />
                                </div>
                                <div>
                                    <p className="text-[#D4AF37] text-xs font-black uppercase tracking-widest mb-3">Mandir Address</p>
                                    <p className="text-white text-lg font-serif leading-relaxed tracking-wide">
                                        Plot No. 340, Kothur Penjerla Village,<br />
                                        Mahabubnagar District,<br />
                                        Telangana – 509228
                                    </p>
                                </div>
                            </div>
                        </motion.div>

                        <p className="text-[#F5D76E]/80 text-base font-serif italic border-l-2 border-[#D4AF37]/30 pl-6">
                            "Every devotee's name becomes a permanent part of the temple wall."
                        </p>
                    </motion.div>
                </div>

                {/* 3. Golden Divider Line */}
                <div className="w-full flex justify-center mb-24">
                    <div className="h-[1px] w-full max-w-4xl bg-gradient-to-r from-transparent via-[#D4AF37]/40 to-transparent relative">
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-[#D4AF37] rounded-full blur-[4px]"></div>
                    </div>
                </div>

                {/* 4. Seva Details Section */}
                <div className="text-center mb-16">
                    <h4 className="text-[#D4AF37] text-sm font-black tracking-[0.4em] uppercase mb-12">Seva Details Required</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                        {[
                            { label: 'Full Name', icon: <FaUser /> },
                            { label: 'Gotra', icon: <FaOm /> },
                            { label: 'City', icon: <FaMapMarkerAlt /> }
                        ].map((item, idx) => (
                            <motion.div
                                key={idx}
                                whileHover={{ scale: 1.05, y: -5 }}
                                className="glass-card p-8 rounded-2xl border border-[#D4AF37]/20 flex flex-col items-center gap-4 transition-all duration-500 hover:border-[#D4AF37]/50"
                            >
                                <div className="p-4 bg-[#D4AF37]/10 rounded-full text-[#D4AF37] text-2xl">
                                    {item.icon}
                                </div>
                                <span className="text-white font-serif text-lg tracking-wide uppercase">{item.label}</span>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* 5. Centered CTA Button */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="flex justify-center mt-16"
                >
                    <motion.button
                        whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(212,175,55,0.4)" }}
                        whileTap={{ scale: 0.98 }}
                        className="bg-gold-gradient text-[#0b1d36] px-12 py-5 rounded-[30px] text-sm font-black uppercase tracking-[0.2em] shadow-2xl transition-all duration-500"
                    >
                        Contribute to Temple Construction
                    </motion.button>
                </motion.div>
            </div>

            {/* Bottom Decoration */}
            <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37]/20 to-transparent"></div>
        </section>
    );
};

export default TempleVision;
