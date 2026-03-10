import { motion, AnimatePresence } from 'framer-motion';
import { FaUser, FaMapMarkerAlt, FaOm, FaTimes } from 'react-icons/fa';
import { FaHandsPraying } from 'react-icons/fa6';
import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useContribution } from '../context/ContributionContext';
import { supabase } from '../lib/supabase';
import { useNavigate } from 'react-router-dom';

const TempleVision = () => {
    const { user, openAuthModal } = useAuth();
    const { addItem } = useContribution();
    const navigate = useNavigate();

    const [showModal, setShowModal] = useState(false);
    const [formName, setFormName] = useState('');
    const [gotra, setGotra] = useState('');
    const [city, setCity] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (user) setFormName(user.name || '');
    }, [user]);

    const handleOpenModal = () => {
        if (!user) {
            openAuthModal();
            return;
        }
        setShowModal(true);
    };

    const handleSubmit = async () => {
        if (!user || !formName || !gotra || !city) return;
        setIsSubmitting(true);

        try {
            // Default to 11g Yantra (id: 1) for this CTA
            const offering = { id: 1, weight: '11 Grams Yantra', price: 2100, sqft: 1 };
            
            const { error } = await supabase.from('temple_contributions').insert({
                user_id: user.id,
                full_name: formName,
                gotra: gotra,
                city: city,
                offering_id: offering.id,
                offering_weight: offering.weight,
                price: offering.price,
                quantity: 1,
                total_amount: offering.price,
                sqft_contribution: offering.sqft
            });

            if (error) throw error;

            addItem({ id: offering.id, weight: offering.weight, price: offering.price }, 1);
            setShowModal(false);
            
            // Navigate to checkout after a brief moment
            setTimeout(() => {
                navigate('/checkout');
            }, 500);

        } catch (err) {
            console.error("Contribution error:", err);
            alert("Failed to save spiritual details. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

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
                    <h2 className="text-gold-gradient text-4xl md:text-6xl lg:text-7xl tracking-tight leading-tight uppercase mb-6 filter drop-shadow-[0_0_10px_rgba(212,175,55,0.3)]">
                        The 100 Temple Vision
                    </h2>
                    <p className="text-[#F5D76E] text-lg md:text-xl italic tracking-wide opacity-90">
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
                                preload="metadata"
                                className="w-full aspect-video object-cover"
                            />
                        </div>

                        {/* Subtle Corner Accents */}
                        <div className="absolute -top-3 -left-3 w-10 h-10 border-t-2 border-l-2 border-[#D4AF37]/30 rounded-tl-xl pointer-events-none"></div>
                        <div className="absolute -bottom-3 -right-3 w-10 h-10 border-b-2 border-r-2 border-[#D4AF37]/30 rounded-br-xl pointer-events-none"></div>
                    </motion.div>

                    {/* RIGHT SIDE: Mission Pillars (Visual Refactor) */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.2 }}
                        className="flex flex-col space-y-12"
                    >
                        <div className="space-y-4">
                            <h3 className="text-[#F5D76E] text-2xl md:text-3xl font-bold italic tracking-wide leading-snug">
                                Establishing a Legacy of Devotion
                            </h3>
                            <div className="w-16 h-[2px] bg-gold-gradient mb-8" />
                        </div>

                        {/* Bento-style Pillars */}
                        <div className="grid grid-cols-1 gap-6">
                            {[
                                { title: "Sacred Mission", subtitle: "100 Temples in 20 Years", desc: "Creating a lasting legacy of spiritual sanctuaries." },
                                { title: "Divine Purpose", subtitle: "Peace & Protection", desc: "Permanent spaces for divine connection and inner silence." },
                                { title: "Vedic Awakening", subtitle: "Wisdom & Precision", desc: "Built with traditional science and sacred activation." }
                            ].map((pillar, idx) => (
                                <div key={idx} className="flex gap-5 group">
                                    <div className="w-12 h-12 rounded-xl bg-[#D4AF37]/10 flex items-center justify-center text-[#D4AF37] border border-[#D4AF37]/20 group-hover:bg-[#D4AF37]/20 transition-colors flex-shrink-0">
                                        <FaOm className="text-xl" />
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-[#D4AF37] text-[10px] uppercase tracking-[0.3em] font-black">{pillar.title}</span>
                                        <h4 className="text-white text-lg font-bold mb-1">{pillar.subtitle}</h4>
                                        <p className="text-stone-400 text-sm leading-relaxed">{pillar.desc}</p>
                                    </div>
                                </div>
                            ))}
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
                                    <p className="text-white text-lg leading-relaxed tracking-wide">
                                        Plot No. 340, Kothur Penjerla Village,<br />
                                        Mahabubnagar District,<br />
                                        Telangana – 509228
                                    </p>
                                </div>
                            </div>
                        </motion.div>

                        <p className="text-[#F5D76E]/80 text-base italic border-l-2 border-[#D4AF37]/30 pl-6">
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
                                <span className="text-white text-lg tracking-wide uppercase">{item.label}</span>
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
                        onClick={handleOpenModal}
                        className="bg-gold-gradient text-[#0b1d36] px-12 py-5 rounded-[30px] text-sm font-black uppercase tracking-[0.2em] shadow-2xl transition-all duration-500"
                    >
                        Contribute to Temple & Take Yantra Home
                    </motion.button>
                </motion.div>
            </div>

            {/* Devotee Details Modal */}
            <AnimatePresence>
                {showModal && (
                    <div className="fixed inset-0 z-[10005] flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setShowModal(false)}
                            className="absolute inset-0 bg-black/80 backdrop-blur-md"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 30 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 30 }}
                            className="relative w-full max-w-lg bg-[#f9f5ec] rounded-[3rem] p-10 md:p-14 overflow-hidden shadow-[0_30px_100px_rgba(0,0,0,0.8)]"
                        >
                            <div className="absolute top-0 left-0 w-full h-2 bg-gold-gradient" />
                            <button
                                onClick={() => setShowModal(false)}
                                className="absolute top-8 right-8 text-stone-400 hover:text-[#D4AF37] transition-colors"
                            >
                                <FaTimes size={20} />
                            </button>

                            <div className="text-center mb-10">
                                <FaHandsPraying className="text-[#D4AF37] text-4xl mx-auto mb-4 animate-pulse" />
                                <h3 className="text-[#0A1F3C] text-2xl font-serif font-black uppercase tracking-tight">Sacred Seva & Yantra</h3>
                                <p className="text-stone-500 text-[10px] uppercase tracking-[0.3em] font-black mt-2">Bring Baba home with your contribution</p>
                            </div>

                            <div className="space-y-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] uppercase tracking-widest font-black text-[#8B7355] ml-1">Full Name</label>
                                    <input
                                        type="text"
                                        value={formName}
                                        onChange={(e) => setFormName(e.target.value)}
                                        placeholder="Full Name as in Records"
                                        className="w-full bg-white border border-[#D4AF37]/20 rounded-2xl py-4 px-6 text-[#0A1F3C] outline-none focus:border-[#D4AF37] transition-all"
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-[10px] uppercase tracking-widest font-black text-[#8B7355] ml-1">Gotra</label>
                                        <input
                                            type="text"
                                            value={gotra}
                                            onChange={(e) => setGotra(e.target.value)}
                                            placeholder="Ex: Bhardwaj"
                                            className="w-full bg-white border border-[#D4AF37]/20 rounded-2xl py-4 px-6 text-[#0A1F3C] outline-none focus:border-[#D4AF37] transition-all"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] uppercase tracking-widest font-black text-[#8B7355] ml-1">City</label>
                                        <input
                                            type="text"
                                            value={city}
                                            onChange={(e) => setCity(e.target.value)}
                                            placeholder="Ex: Jaipur"
                                            className="w-full bg-white border border-[#D4AF37]/20 rounded-2xl py-4 px-6 text-[#0A1F3C] outline-none focus:border-[#D4AF37] transition-all"
                                        />
                                    </div>
                                </div>

                                <button
                                    onClick={handleSubmit}
                                    disabled={!formName || !gotra || !city || isSubmitting}
                                    className="btn-gold-royal w-full py-5 rounded-2xl font-black text-sm tracking-[0.2em] shadow-xl disabled:opacity-50 mt-4 flex justify-center items-center h-16"
                                >
                                    {isSubmitting ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : "OFFER SEVA & GET YANTRA"}
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* Bottom Decoration */}
            <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37]/20 to-transparent"></div>
        </section>
    );
};

export default TempleVision;
