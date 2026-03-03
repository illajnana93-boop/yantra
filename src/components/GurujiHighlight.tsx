import { motion } from 'framer-motion';
import { useState, useRef } from 'react';

const GurujiHighlight = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const videoRef = useRef<HTMLVideoElement>(null);

    const handleTalkToGuruji = () => {
        if (videoRef.current) {
            setIsPlaying(true);
            setIsMuted(false);
            videoRef.current.muted = false;
            videoRef.current.currentTime = 0;
            videoRef.current.play().catch(err => console.error("Playback failed:", err));
        }
    };

    const toggleMute = () => {
        if (videoRef.current) {
            videoRef.current.muted = !videoRef.current.muted;
            setIsMuted(videoRef.current.muted);
        }
    };

    return (
        <section id="guruji-darshan" className="bg-[#0A1F3C] relative overflow-hidden py-20 md:py-24 border-t border-[#D4AF37]/20">
            {/* Ambient Lighting Shadow */}
            <div className="absolute top-[-10%] right-[-10%] w-[80%] md:w-[60%] h-[60%] bg-[#D4AF37]/5 rounded-full blur-[100px] md:blur-[180px] pointer-events-none"></div>

            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-8 md:gap-10 relative z-10 px-6 md:px-8">
                {/* Left: Video Stage */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: "easeOut" as const }}
                    className="relative w-full md:w-1/2"
                >
                    <div className="relative z-10 w-full aspect-video bg-[#081629] rounded-[1.5rem] md:rounded-[2.5rem] border border-[#D4AF37]/30 shadow-2xl overflow-hidden group interactive">
                        <div className="relative w-full h-full overflow-hidden">
                            <video
                                ref={videoRef}
                                src="/Avatar_IV_Video.mp4"
                                className="w-[105%] h-[105%] object-cover absolute -top-[2.5%] -left-[2.5%]"
                                playsInline
                                muted={isMuted}
                                onEnded={() => setIsPlaying(false)}
                            />

                            {!isPlaying && (
                                <div className="absolute inset-0 bg-black/40 flex items-center justify-center transition-opacity duration-700">
                                    <motion.div
                                        animate={{ scale: [1, 1.1, 1] }}
                                        transition={{ duration: 2, repeat: Infinity }}
                                        className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-gold-gradient flex items-center justify-center shadow-ambient-gold"
                                    >
                                        <div className="w-0 h-0 border-t-[8px] md:border-t-[12px] border-t-transparent border-l-[15px] md:border-l-[20px] border-l-[#0A1F3C] border-b-[8px] md:border-b-[12px] border-b-transparent ml-1.5 md:ml-2" />
                                    </motion.div>
                                </div>
                            )}

                            {/* Mute/Unmute Toggle Button - Only when playing */}
                            {isPlaying && (
                                <motion.button
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    onClick={toggleMute}
                                    className="absolute bottom-6 right-6 z-20 w-10 h-10 rounded-full bg-black/40 backdrop-blur-md border border-[#D4AF37]/30 flex items-center justify-center group interactive"
                                >
                                    {isMuted ? (
                                        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-[#F5D76E]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
                                        </svg>
                                    ) : (
                                        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-[#F5D76E]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                                        </svg>
                                    )}
                                </motion.button>
                            )}

                            <div className="absolute bottom-0 left-0 w-32 h-16 bg-gradient-to-tr from-[#081629] to-transparent pointer-events-none"></div>
                            <div className="absolute bottom-0 right-0 w-32 h-16 bg-gradient-to-tl from-[#081629] to-transparent pointer-events-none"></div>
                        </div>

                        <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#081629]/80 to-transparent pointer-events-none"></div>
                    </div>
                </motion.div>

                {/* Right: Content */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.2 }}
                    className="flex flex-col gap-6 md:gap-8 md:w-1/2 text-center md:text-left"
                >
                    <div className="space-y-3">
                        <p className="text-gold-gradient text-[9px] md:text-[10px] uppercase tracking-[0.4em] md:tracking-[0.6em] font-black">Divine Discourse</p>
                        <h2 className="text-white text-3xl md:text-6xl font-serif leading-tight text-glow px-4 md:px-0">Seek Sacred Advice</h2>
                        <div className="w-16 h-[1px] bg-gold-gradient md:mx-0 mx-auto opacity-50 mt-4"></div>
                    </div>

                    <p className="text-[#F8F5F0] text-lg md:text-2xl leading-relaxed font-serif italic font-light tracking-wide px-4 md:px-0">
                        Receive spiritual guidance directly from Guruji. Activate the video to experience a personal transmission of grace.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-8 mt-2">
                        {!isPlaying ? (
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={handleTalkToGuruji}
                                className="btn-gold-royal px-10 md:px-12 py-4 md:py-5 text-sm md:text-base rounded-full shadow-lg interactive"
                            >
                                Start Divine Darshan
                            </motion.button>
                        ) : (
                            <div className="flex items-center gap-4 text-gold-gradient font-serif italic text-xl md:text-2xl animate-pulse">
                                <span>🕉️</span>
                                <span>Receiving Blessings...</span>
                            </div>
                        )}
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default GurujiHighlight;
