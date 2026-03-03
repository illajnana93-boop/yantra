import { motion } from 'framer-motion';

const Footer = () => {
    return (
        <footer id="contact" className="bg-[#081629] text-[#F8F5F0] pt-20 pb-12 border-t border-[#D4AF37]/20 relative overflow-hidden">
            {/* Animated Ambient Gold Halo */}
            <motion.div
                animate={{
                    scale: [1, 1.1, 1],
                    opacity: [0.03, 0.06, 0.03],
                }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" as const }}
                className="absolute top-0 right-0 pointer-events-none transform translate-x-1/4 -translate-y-1/4"
            >
                <div className="w-[600px] h-[600px] border-[15px] border-[#D4AF37] rounded-full blur-[2px]"></div>
            </motion.div>

            <div className="max-w-7xl mx-auto px-10 md:px-16 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
                    {/* Brand Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="flex flex-col gap-8"
                    >
                        <div className="interactive">
                            <h3 className="text-gold-gradient text-3xl font-serif font-bold tracking-[0.2em] leading-none mb-4">
                                SRI SHYAM
                            </h3>
                            <p className="text-[#F5D76E] text-[10px] uppercase font-bold tracking-[0.5em] opacity-80">Divine Presence</p>
                        </div>
                        <p className="text-[#F8F5F0]/60 text-base leading-relaxed font-serif italic font-light tracking-wide max-w-xs">
                            Bringing the sacred essence of Shyam Baba into every home through authentic Vedic instruments of protection and prosperity.
                        </p>
                    </motion.div>

                    {/* Navigation */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                    >
                        <h4 className="text-gold-gradient uppercase text-[11px] font-black tracking-[0.4em] mb-10">Sacred Links</h4>
                        <ul className="flex flex-col gap-5 text-[#F8F5F0]/70 text-[12px] font-bold tracking-widest leading-none uppercase">
                            {['Divine Darshan', 'Sacred Guide', 'Product Gallery', 'Devotee Support'].map(link => (
                                <li key={link} className="hover:text-[#F5D76E] transition-all interactive hover:translate-x-2 duration-300 inline-block pointer-events-auto cursor-none">
                                    {link}
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Policy */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                    >
                        <h4 className="text-gold-gradient uppercase text-[11px] font-black tracking-[0.4em] mb-10">Seva Info</h4>
                        <ul className="flex flex-col gap-5 text-[#F8F5F0]/70 text-[12px] font-bold tracking-widest leading-none uppercase">
                            {['Authenticity Check', 'Shipping Status', 'Privacy Seva', 'Terms of Seva'].map(link => (
                                <li key={link} className="hover:text-[#F5D76E] transition-all interactive hover:translate-x-2 duration-300 inline-block pointer-events-auto cursor-none">
                                    {link}
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Subscription */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4 }}
                    >
                        <h4 className="text-gold-gradient uppercase text-[11px] font-black tracking-[0.4em] mb-10">Divine Circle</h4>
                        <p className="text-[#F8F5F0]/50 text-sm mb-10 leading-relaxed italic font-light">Stay enlightened with sacred batch updates and auspicious ritual timings.</p>
                        <div className="flex flex-col gap-4">
                            <input
                                type="email"
                                placeholder="Sacred Email Address"
                                className="bg-[#0A1F3C]/50 border border-white/10 rounded-full px-8 py-5 text-[12px] focus:border-[#D4AF37]/50 outline-none text-[#F8F5F0] placeholder:text-[#F8F5F0]/20 transition-all focus:bg-[#0A1F3C] interactive"
                            />
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="btn-gold-royal py-5 text-[10px] font-black tracking-[0.3em] rounded-full interactive"
                            >
                                Join the Seva
                            </motion.button>
                        </div>
                    </motion.div>
                </div>

                {/* Bottom Bar */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="border-t border-white/10 pt-16 flex flex-col md:flex-row justify-between items-center gap-10"
                >
                    <p className="text-[#F8F5F0]/20 text-[10px] uppercase tracking-[0.6em] font-black text-center md:text-left">
                        © 2026 Pavan Guru Foundation • Eternal Grace
                    </p>
                    <div className="flex gap-10 items-center">
                        {[
                            {
                                name: 'Instagram',
                                icon: (
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                                        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                                        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                                    </svg>
                                )
                            },
                            {
                                name: 'YouTube',
                                icon: (
                                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path>
                                        <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
                                    </svg>
                                )
                            },
                            {
                                name: 'Twitter',
                                icon: (
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932 6.064-6.932zm-1.292 19.497h2.039L6.486 3.24H4.298l13.311 17.41z" />
                                    </svg>
                                )
                            }
                        ].map(social => (
                            <motion.a
                                key={social.name}
                                href="#"
                                whileHover={{ y: -5, color: "#F5D76E" }}
                                className="text-[#F8F5F0]/30 transition-all interactive p-2 hover:bg-white/5 rounded-full"
                                aria-label={social.name}
                            >
                                {social.icon}
                            </motion.a>
                        ))}
                    </div>
                </motion.div>
            </div>

            {/* Aesthetic Glow at bottom */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-1/2 bg-gradient-to-t from-[#D4AF37]/5 to-transparent pointer-events-none" />
        </footer>
    );
};

export default Footer;
