import { useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface GurujiAvatarProps {
    isOpen: boolean;
    onClose: () => void;
}

const GurujiAvatar = ({ isOpen, onClose }: GurujiAvatarProps) => {
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        if (isOpen && videoRef.current) {
            // Small delay to ensure modal animation is smooth before playing
            const timer = setTimeout(() => {
                videoRef.current?.play().catch(e => console.log("Autoplay blocked", e));
            }, 500);
            return () => clearTimeout(timer);
        } else if (!isOpen && videoRef.current) {
            videoRef.current.pause();
            videoRef.current.currentTime = 0;
        }
    }, [isOpen]);

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-[#0f3057]/95 backdrop-blur-md"
                >
                    <motion.div
                        initial={{ scale: 0.9, y: 20 }}
                        animate={{ scale: 1, y: 0 }}
                        exit={{ scale: 0.9, y: 20 }}
                        className="bg-[#f9f5ec] w-full max-w-xl rounded-3xl shadow-2xl overflow-hidden relative border border-[#d4af37]/30"
                    >
                        {/* Close Button */}
                        <button
                            onClick={onClose}
                            className="absolute top-6 right-6 text-[#0f3057]/50 hover:text-[#0f3057] transition-colors z-20"
                        >
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>

                        <div className="p-8 md:p-12 flex flex-col items-center">
                            {/* Avatar Area */}
                            <div className="relative mb-10">
                                {/* Subtle Halo / Glow behind video */}
                                <div className="absolute inset-0 bg-[#d4af37]/20 rounded-full blur-2xl animate-pulse"></div>

                                {/* Main Avatar Frame */}
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 1 }}
                                    className="relative w-64 h-64 md:w-72 md:h-72 z-10"
                                >
                                    <div className="absolute inset-0 border-4 border-[#d4af37] rounded-full z-10 shadow-[0_0_30px_rgba(212,175,55,0.3)]"></div>
                                    <div className="w-full h-full rounded-full overflow-hidden border-2 border-white/20 bg-[#0f3057]">
                                        <video
                                            ref={videoRef}
                                            src="/Avatar_IV_Video.mp4"
                                            className="w-full h-full object-cover"
                                            playsInline
                                            muted={false} // User expects sound for an avatar talk
                                        />
                                    </div>
                                </motion.div>

                                {/* Decorative Dots */}
                                <div className="absolute -top-4 -right-4 w-4 h-4 bg-[#d4af37] rounded-full blur-[1px]"></div>
                                <div className="absolute -bottom-2 -left-2 w-3 h-3 bg-[#d4af37]/60 rounded-full blur-[1px]"></div>
                            </div>

                            {/* Title & Description */}
                            <div className="text-center max-w-md">
                                <motion.h3
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.3 }}
                                    className="text-[#0f3057] font-serif text-3xl mb-3"
                                >
                                    Divine Darshan & Guidance
                                </motion.h3>
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: "60px" }}
                                    transition={{ delay: 0.5 }}
                                    className="h-0.5 bg-[#d4af37] mx-auto mb-6"
                                />
                                <motion.p
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.6 }}
                                    className="text-[#1a1a1a]/70 text-base leading-relaxed mb-8 italic"
                                >
                                    "Listen to the divine word of Guruji. May his blessings protect you and guide your path towards light and prosperity."
                                </motion.p>

                                <motion.button
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.8 }}
                                    onClick={onClose}
                                    className="px-10 py-3 bg-[#0f3057] text-[#d4af37] border border-[#d4af37] rounded-full font-bold uppercase tracking-[0.2em] text-xs hover:bg-[#d4af37] hover:text-[#0f3057] transition-all shadow-lg"
                                >
                                    Jai Shri Shyam
                                </motion.button>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default GurujiAvatar;
