import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { FaHandHoldingHeart, FaWhatsapp, FaTimes } from 'react-icons/fa';

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
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ type: 'spring', damping: 20, stiffness: 100 }}
                    className="fixed bottom-10 right-10 z-[9998]"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    <div className="relative w-16 h-16 flex items-center justify-center">
                        {/* Gold Card (Contribution) - Stays base or moves down on hover */}
                        <motion.button
                            animate={{
                                y: isHovered ? 10 : -8,
                                x: isHovered ? 0 : 8,
                                rotate: isHovered ? 0 : 8
                            }}
                            whileHover={{ scale: 1.1 }}
                            onClick={scrollToProduct}
                            className="absolute w-14 h-14 rounded-xl bg-gradient-to-br from-[#F5D76E] via-[#D4AF37] to-[#C9A227] shadow-lg flex items-center justify-center border border-white/20 z-10 cursor-pointer"
                            title="Sacred Offering"
                        >
                            <FaHandHoldingHeart className="text-[#060f1e] text-2xl" />
                        </motion.button>

                        {/* Green Card (WhatsApp) - Moves up on hover */}
                        <motion.button
                            animate={{
                                y: isHovered ? -55 : 8,
                                x: isHovered ? 0 : -8,
                                rotate: isHovered ? 0 : -8
                            }}
                            whileHover={{ scale: 1.1 }}
                            onClick={() => setIsWhatsappOpen(true)}
                            className="absolute w-14 h-14 rounded-xl bg-gradient-to-br from-[#25D366] to-[#128C7E] shadow-xl flex items-center justify-center border border-white/20 z-20 cursor-pointer"
                            title="Join WhatsApp"
                        >
                            <FaWhatsapp className="text-white text-3xl shadow-sm" />
                        </motion.button>
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
                                        <h3 className="text-xl md:text-2xl text-white">Join Guruji Spiritual Community</h3>
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
                                <p className="text-[#D4AF37] mb-4 text-lg">Receive daily spiritual content directly on WhatsApp:</p>
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
