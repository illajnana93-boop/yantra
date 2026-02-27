
const Footer = () => {
    return (
        <footer className="bg-[#081629] text-[#F8F5F0] pt-20 pb-10 border-t border-[#D4AF37]/20 relative overflow-hidden">
            {/* Ambient Gold Halo */}
            <div className="absolute top-0 right-0 opacity-[0.03] pointer-events-none scale-125 transform translate-x-1/4 -translate-y-1/4">
                <div className="w-[500px] h-[500px] border-[20px] border-[#D4AF37] rounded-full blur-[1px]"></div>
            </div>

            <div className="max-w-7xl mx-auto px-10 md:px-16 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-16">
                    {/* Brand Section */}
                    <div className="flex flex-col gap-6">
                        <div>
                            <h3 className="text-gold-gradient text-2xl font-serif font-bold tracking-widest leading-none mb-3">
                                SRI SHYAM
                            </h3>
                            <p className="text-[#F5D76E] text-[10px] uppercase font-bold tracking-[0.4em] opacity-80">Divine Presence</p>
                        </div>
                        <p className="text-[#F8F5F0]/60 text-sm leading-relaxed font-serif italic font-light tracking-wide">
                            Bringing the sacred essence of Shyam Baba into every home through authentic Vedic instruments of protection and prosperity.
                        </p>
                    </div>

                    {/* Navigation */}
                    <div>
                        <h4 className="text-gold-gradient uppercase text-[10px] font-black tracking-[0.3em] mb-8">Sacred Links</h4>
                        <ul className="flex flex-col gap-4 text-[#F8F5F0]/70 text-[11px] font-bold tracking-widest leading-none uppercase">
                            <li className="hover:text-[#F5D76E] transition-all cursor-pointer">Divine Darshan</li>
                            <li className="hover:text-[#F5D76E] transition-all cursor-pointer">Sacred Guide</li>
                            <li className="hover:text-[#F5D76E] transition-all cursor-pointer">Product Gallery</li>
                            <li className="hover:text-[#F5D76E] transition-all cursor-pointer">Devotee Support</li>
                        </ul>
                    </div>

                    {/* Policy */}
                    <div>
                        <h4 className="text-gold-gradient uppercase text-[10px] font-black tracking-[0.3em] mb-8">Seva Info</h4>
                        <ul className="flex flex-col gap-4 text-[#F8F5F0]/70 text-[11px] font-bold tracking-widest leading-none uppercase">
                            <li className="hover:text-[#F5D76E] transition-all cursor-pointer">Authenticity Check</li>
                            <li className="hover:text-[#F5D76E] transition-all cursor-pointer">Shipping Status</li>
                            <li className="hover:text-[#F5D76E] transition-all cursor-pointer">Privacy Seva</li>
                            <li className="hover:text-[#F5D76E] transition-all cursor-pointer">Terms of Seva</li>
                        </ul>
                    </div>

                    {/* Subscription */}
                    <div>
                        <h4 className="text-gold-gradient uppercase text-[10px] font-black tracking-[0.3em] mb-8">Divine Circle</h4>
                        <p className="text-[#F8F5F0]/50 text-xs mb-8 leading-relaxed italic font-light">Stay enlightened with sacred batch updates and auspicious ritual timings.</p>
                        <div className="flex flex-col gap-3">
                            <input
                                type="email"
                                placeholder="Sacred Email Address"
                                className="bg-[#0A1F3C] border border-white/10 rounded-full px-6 py-4 text-[11px] focus:border-[#D4AF37]/30 outline-none text-[#F8F5F0] placeholder:text-[#F8F5F0]/20"
                            />
                            <button className="btn-gold-royal py-4 text-[9px] font-black tracking-[0.2em] rounded-full">
                                Join the Seva
                            </button>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-white/5 pt-12 flex flex-col md:flex-row justify-between items-center gap-8">
                    <p className="text-[#F8F5F0]/20 text-[9px] uppercase tracking-[0.6em] font-black">
                        © 2026 Pavan Guru Foundation • Eternal Grace
                    </p>
                    <div className="flex gap-10">
                        {['Instagram', 'YouTube', 'Facebook'].map(social => (
                            <span key={social} className="text-[#F8F5F0]/30 text-[9px] uppercase font-black tracking-[0.2em] hover:text-[#D4AF37] transition-all cursor-pointer">
                                {social}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
