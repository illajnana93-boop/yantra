import { motion } from 'framer-motion';
import { useState, useRef } from 'react';

const GurujiHighlight = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const videoRef = useRef<HTMLVideoElement>(null);

    const handleTalkToGuruji = () => {
        if (videoRef.current) {
            setIsPlaying(true);
            videoRef.current.muted = false;
            videoRef.current.currentTime = 0;
            videoRef.current.play().catch(err => console.error("Playback failed:", err));
        }
    };

    return (
        <section className="bg-[#0A1F3C] relative overflow-hidden py-24 border-t border-[#D4AF37]/20">
            {/* Ambient Gold Shadows */}
            <div className="absolute top-[-20%] right-[-10%] w-[60%] h-[60%] bg-[#D4AF37]/5 rounded-full blur-[180px] pointer-events-none"></div>

            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16 relative z-10 px-8">
                {/* Left: Video Stage */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="relative w-full md:w-1/2"
                >
                    <div className="relative z-10 w-full aspect-video bg-[#081629] rounded-[2.5rem] border border-[#D4AF37]/30 shadow-xl overflow-hidden group">
                        <div className="relative w-full h-full overflow-hidden">
                            <video
                                ref={videoRef}
                                src="/Avatar_IV_Video.mp4"
                                className="w-[105%] h-[105%] object-cover absolute -top-[2.5%] -left-[2.5%]"
                                playsInline
                                onEnded={() => setIsPlaying(false)}
                            />
                            {/* Masking overlays for watermark regions (bottom corners) */}
                            <div className="absolute bottom-0 left-0 w-32 h-16 bg-gradient-to-tr from-[#081629] to-transparent pointer-events-none"></div>
                            <div className="absolute bottom-0 right-0 w-32 h-16 bg-gradient-to-tl from-[#081629] to-transparent pointer-events-none"></div>
                        </div>


                        <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#081629]/80 to-transparent pointer-events-none"></div>
                    </div>
                </motion.div>

                {/* Right: Content - Scaled down */}
                <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="flex flex-col gap-8 md:w-1/2 text-center md:text-left"
                >
                    <div className="space-y-4">
                        <p className="text-gold-gradient text-[10px] uppercase tracking-[0.6em] font-black">Divine Discourse</p>
                        <h2 className="text-white text-4xl md:text-6xl font-serif leading-tight">Seek Sacred Advice</h2>
                        <div className="w-20 h-[1px] bg-gold-gradient md:mx-0 mx-auto opacity-50"></div>
                    </div>

                    <p className="text-[#F8F5F0] text-xl md:text-2xl leading-relaxed font-serif italic font-light tracking-wide opacity-90">
                        Receive spiritual guidance directly from Guruji. Activate the video to experience a personal transmission of grace energized by the divine connection.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center gap-8 mt-4">
                        {!isPlaying ? (
                            <button
                                onClick={handleTalkToGuruji}
                                className="btn-gold-royal px-12 py-5 text-base rounded-full shadow-lg"
                            >
                                Start Divine Darshan
                            </button>
                        ) : (
                            <div className="flex items-center gap-4 text-gold-gradient font-serif italic text-2xl animate-pulse">
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
