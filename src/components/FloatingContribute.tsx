import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { FaHandHoldingHeart } from 'react-icons/fa';
import { FaLandmark } from 'react-icons/fa6';

const FloatingContribute = () => {
    const [showTooltip, setShowTooltip] = useState(false);

    const scrollToProduct = () => {
        const el = document.getElementById('product');
        if (el) {
            const offset = 80;
            const top = el.getBoundingClientRect().top + window.pageYOffset - offset;
            window.scrollTo({ top, behavior: 'smooth' });
        }
    };

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0, scale: 0, y: 40 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ type: 'spring', damping: 18, stiffness: 200 }}
                className="fixed bottom-6 right-6 z-[9998] flex flex-col items-end gap-2"
            >
                {/* Tooltip card */}
                <AnimatePresence>
                    {showTooltip && (
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
                <div className="relative flex items-center gap-3">
                    {/* Pulsing glow rings */}
                    <div className="relative">
                        <span className="absolute inset-0 rounded-full bg-[#D4AF37]/30 animate-ping" />
                        <span className="absolute inset-[-6px] rounded-full border border-[#D4AF37]/20 animate-pulse" />

                        {/* FAB button */}
                        <motion.button
                            whileHover={{ scale: 1.12 }}
                            whileTap={{ scale: 0.94 }}
                            onClick={scrollToProduct}
                            onMouseEnter={() => setShowTooltip(true)}
                            onMouseLeave={() => setShowTooltip(false)}
                            onFocus={() => setShowTooltip(true)}
                            onBlur={() => setShowTooltip(false)}
                            aria-label="Contribute to temple"
                            className="relative w-16 h-16 rounded-full bg-gradient-to-br from-[#C9A227] via-[#F5D76E] to-[#C9A227] shadow-[0_8px_32px_rgba(212,175,55,0.5)] flex flex-col items-center justify-center gap-0.5 group"
                        >
                            <FaHandHoldingHeart className="text-[#060f1e] text-xl group-hover:scale-110 transition-transform duration-300" />
                            <span className="text-[#060f1e] text-[8px] font-black uppercase tracking-[0.1em] leading-none">
                                Contrib.
                            </span>
                        </motion.button>
                    </div>
                </div>
            </motion.div>
        </AnimatePresence>
    );
};

export default FloatingContribute;
