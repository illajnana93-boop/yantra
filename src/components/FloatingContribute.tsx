import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { FaHandHoldingHeart, FaWhatsapp, FaTimes } from 'react-icons/fa';
import { FaLandmark } from 'react-icons/fa6';

const FloatingContribute = () => {
    const [isHovered, setIsHovered] = useState(false);
    const [isWhatsappOpen, setIsWhatsappOpen] = useState(false);

    const scrollToProduct = () => {
        const el = document.getElementById('product');
        if (el) {
            const offset = 80;
            const top = el.getBoundingClientRect().top + window.pageYOffset - offset;
            window.scrollTo({ top, behavior: 'smooth' });
        }
    };

    return (
        <>
            <AnimatePresence>
                <motion.div
                    initial={{ opacity: 0, scale: 0, y: 40 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ type: 'spring', damping: 18, stiffness: 200 }}
                    className="fixed bottom-6 right-6 z-[9998] flex flex-col items-end gap-2"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    {/* Tooltip card */}
                    <AnimatePresence>
                        {isHovered && (
                            <motion.div
                                initial={{ opacity: 0, y: 8, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: 8, scale: 0.95 }}
                                transition={{ duration: 0.2 }}
                                className="bg-[#0a1929] border border-[#D4AF37]/40 rounded-2xl px-4 py-3 shadow-2xl max-w-[200px] text-right"
                            >
                                <div className="flex items-center gap-2 mb-1 justify-end">
                                    <FaLandmark className="text-[#F5D76E] text-sm" />
                                    <p className="text-[#F5D76E] text-xs font-black uppercase tracking-widest">
                                        Sacred Offering
                                    </p>
                                </div>
                                <p className="text-stone-300 text-[11px] font-serif italic leading-relaxed">
                                    Contribute & receive a blessed Shyam Yantra 🕉
                                </p>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Main FAB */}
                    <div className="relative flex items-center gap-4">

                        {/* WhatsApp Action Button pop-out */}
                        <AnimatePresence>
                            {isHovered && (
                                <motion.button
                                    initial={{ opacity: 0, x: 20, scale: 0.5 }}
                                    animate={{ opacity: 1, x: 0, scale: 1 }}
                                    exit={{ opacity: 0, x: 20, scale: 0.5 }}
                                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                                    onClick={() => setIsWhatsappOpen(true)}
                                    className="w-14 h-14 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-lg hover:shadow-[0_0_20px_rgba(37,211,102,0.6)] hover:scale-110 transition-all absolute right-[80px]"
                                >
                                    <FaWhatsapp className="w-7 h-7" />
                                </motion.button>
                            )}
                        </AnimatePresence>

                        {/* Pulsing glow rings */}
                        <div className="relative">
                            <span className="absolute inset-0 rounded-full bg-[#D4AF37]/30 animate-ping" />
                            <span className="absolute inset-[-6px] rounded-full border border-[#D4AF37]/20 animate-pulse" />

                            {/* FAB button */}
                            <motion.button
                                whileHover={{ scale: 1.12 }}
                                whileTap={{ scale: 0.94 }}
                                onClick={scrollToProduct}
                                onFocus={() => setIsHovered(true)}
                                onBlur={() => setIsHovered(false)}
                                aria-label="Contribute to temple"
                                className="relative w-16 h-16 rounded-full bg-gradient-to-br from-[#C9A227] via-[#F5D76E] to-[#C9A227] shadow-[0_8px_32px_rgba(212,175,55,0.5)] flex items-center justify-center group"
                            >
                                <FaHandHoldingHeart className="text-[#060f1e] text-2xl group-hover:scale-110 transition-transform duration-300" />
                            </motion.button>
                        </div>
                    </div>
                </motion.div>
            </AnimatePresence>

            {/* WhatsApp Popup Modal */}
            <AnimatePresence>
                {isWhatsappOpen && (
                    <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            className="bg-[#0A1F3C] border border-[#25D366]/30 rounded-2xl w-full max-w-md shadow-[0_0_40px_rgba(37,211,102,0.15)] overflow-hidden relative"
                        >
                            {/* Header */}
                            <div className="bg-gradient-to-r from-[#040C1A] to-[#0A1F3C] p-6 border-b border-[#25D366]/20 flex justify-between items-start relative">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-[#25D366]/10 blur-[50px] rounded-full translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
                                <div>
                                    <div className="flex items-center gap-3 mb-2">
                                        <div className="w-10 h-10 bg-[#25D366]/10 rounded-full flex items-center justify-center text-[#25D366]">
                                            <FaWhatsapp className="w-6 h-6" />
                                        </div>
                                        <h3 className="text-xl md:text-2xl font-serif text-white">Join Guruji Spiritual Community</h3>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setIsWhatsappOpen(false)}
                                    className="text-stone-400 hover:text-white transition-colors p-1"
                                >
                                    <FaTimes className="w-5 h-5" />
                                </button>
                            </div>

                            {/* Content */}
                            <div className="p-6">
                                <p className="text-[#D4AF37] mb-4 font-serif text-lg">Receive daily spiritual content directly on WhatsApp:</p>
                                <ul className="space-y-3 mb-8 text-[#E5E0D8] font-light">
                                    <li className="flex items-start gap-3">
                                        <span className="text-[#25D366] mt-1">•</span>
                                        <span>Daily Panchang</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="text-[#25D366] mt-1">•</span>
                                        <span>Mantras and Bhajans</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="text-[#25D366] mt-1">•</span>
                                        <span>Divine images of Lord Shyam</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="text-[#25D366] mt-1">•</span>
                                        <span>Temple construction updates</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="text-[#25D366] mt-1">•</span>
                                        <span>Special Ekadashi reminders</span>
                                    </li>
                                </ul>

                                <a
                                    href="https://chat.whatsapp.com/GsSlKeuXWac4ZrjMdQzrEk"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={() => setIsWhatsappOpen(false)}
                                    className="w-full bg-[#25D366] hover:bg-[#20BE5C] text-white font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 transition-all duration-300 shadow-[0_0_15px_rgba(37,211,102,0.3)] hover:shadow-[0_0_25px_rgba(37,211,102,0.5)] transform hover:-translate-y-1"
                                >
                                    <FaWhatsapp className="w-5 h-5" />
                                    Join WhatsApp Community
                                </a>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </>
    );
};

export default FloatingContribute;
