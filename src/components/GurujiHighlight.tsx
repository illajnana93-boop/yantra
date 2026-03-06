import { motion, AnimatePresence } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';

const GurujiHighlight = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [question, setQuestion] = useState("");
    const [isThinking, setIsThinking] = useState(false);
    const [gurujiAnswer, setGurujiAnswer] = useState("");
    const [audioPlaybackBlocked, setAudioPlaybackBlocked] = useState(false);

    const videoRef = useRef<HTMLVideoElement>(null);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    // Sync audio muted state with isMuted state
    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.muted = isMuted;
        }
    }, [isMuted]);

    const handleAskGuruji = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!question.trim() || isThinking) return;

        // Reset and stop everything
        setAudioPlaybackBlocked(false);
        setGurujiAnswer("");
        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
            // Unlock audio engine to allow async autoplay later
            audioRef.current.src = "data:audio/wav;base64,UklGRigAAABXQVZFZm10IBIAAAABAAEARKwAAIhYAQACABAAAABkYXRhAgAAAAEA";
            audioRef.current.play().then(() => {
                if (audioRef.current) audioRef.current.pause();
            }).catch(() => { });
        }
        if (videoRef.current) {
            videoRef.current.pause();
            videoRef.current.currentTime = 0;
        }
        setIsPlaying(false);
        setIsThinking(true);

        try {
            // Use standard API URL resolution instead of hardcoded IPs
            const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8000';
            const response = await fetch(`${API_BASE}/ask-guruji`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ question }),
            });

            if (response.ok) {
                const data = await response.json();
                console.log("🕉️ Guruji guidance received:", data);
                setGurujiAnswer(data.answer_text);

                // Build the full backend URL for the audio
                const url = `${API_BASE}${data.audio_url}`;
                console.log("🎙️ Sacred voice URL:", url);

                // Auto-start avatar video movement
                setIsPlaying(true);
                if (videoRef.current) {
                    videoRef.current.play().catch(() => { });
                    videoRef.current.loop = true;
                }

                // Try autoplay (may be blocked by browser)
                if (audioRef.current) {
                    audioRef.current.src = url;
                    audioRef.current.load();
                    audioRef.current.muted = false;
                    audioRef.current.volume = 1.0;
                    audioRef.current.play().catch(err => {
                        console.warn("⚠️ Autoplay blocked - visible player shown instead:", err);
                        setAudioPlaybackBlocked(true);
                    });

                    audioRef.current.onended = () => {
                        setIsPlaying(false);
                        if (videoRef.current) {
                            videoRef.current.pause();
                            videoRef.current.currentTime = 0;
                        }
                        // Clear the textual answer 2 seconds after Guruji finishes speaking
                        setTimeout(() => {
                            setGurujiAnswer("");
                        }, 2000);
                    };
                }

            } else {
                setGurujiAnswer("बेटा, अभी ध्यान मुद्रा में लीन हूँ। जय श्री श्याम।");
            }
        } catch (err) {
            console.error("Connection error:", err);
            setGurujiAnswer("बेटा, संपर्क में कुछ बाधा है। जय श्री श्याम।");
        } finally {
            setIsThinking(false);
            setQuestion("");
        }
    };

    const handleStartDarshan = () => {
        if (videoRef.current) {
            setIsPlaying(true);
            videoRef.current.play().catch(() => { });
        }
    };

    const toggleMute = () => {
        setIsMuted(!isMuted);
    };

    return (
        <section id="guruji-darshan" className="bg-[#0A1F3C] relative overflow-hidden py-20 md:py-24 border-t border-[#D4AF37]/20">
            {/* Ambient Lighting */}
            <div className="absolute top-[-10%] right-[-10%] w-[80%] md:w-[60%] h-[60%] bg-[#D4AF37]/5 rounded-full blur-[100px] md:blur-[180px] pointer-events-none"></div>

            <audio ref={audioRef} />

            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-8 md:gap-14 relative z-10 px-6 md:px-8">
                {/* Left: Video Stage */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1 }}
                    className="relative w-full md:w-1/2"
                >
                    <div className="relative z-10 w-full aspect-video bg-[#081629] rounded-[1.5rem] md:rounded-[2.5rem] border border-[#D4AF37]/30 shadow-2xl overflow-hidden group">
                        <video
                            ref={videoRef}
                            src="/Avatar_IV_Video.mp4"
                            className="w-full h-full object-cover"
                            playsInline
                            muted={true}
                            preload="auto"
                        />

                        {/* Overlays */}
                        {!isPlaying && !isThinking && (
                            <div
                                className="absolute inset-0 flex items-center justify-center bg-black/30 cursor-pointer"
                                onClick={handleStartDarshan}
                            >
                                <div className="w-16 h-16 bg-[#D4AF37] rounded-full flex items-center justify-center text-white shadow-xl transform hover:scale-110 transition-transform">
                                    <svg className="w-8 h-8 fill-current ml-1" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                                </div>
                            </div>
                        )}

                        {isThinking && (
                            <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center text-[#D4AF37]">
                                <div className="w-10 h-10 border-4 border-[#D4AF37] border-t-transparent rounded-full animate-spin mb-3"></div>
                                <span className="text-sm font-medium tracking-widest uppercase">Connecting to Divine...</span>
                            </div>
                        )}

                        {audioPlaybackBlocked && isPlaying && (
                            <div
                                className="absolute inset-0 flex items-center justify-center bg-black/50 z-20 cursor-pointer"
                                onClick={() => {
                                    audioRef.current?.play();
                                    setAudioPlaybackBlocked(false);
                                }}
                            >
                                <motion.div
                                    animate={{ scale: [1, 1.05, 1] }}
                                    transition={{ repeat: Infinity, duration: 2 }}
                                    className="bg-[#D4AF37] text-[#0A1F3C] px-8 py-4 rounded-full font-bold shadow-2xl"
                                >
                                    🔊 Tap to Hear Guruji's Voice
                                </motion.div>
                            </div>
                        )}

                        {/* Video Controls & Audio Debug */}
                        <div className="absolute top-4 left-4 z-40 flex flex-col gap-2">
                            {isPlaying && (
                                <div className="bg-black/60 backdrop-blur-md p-3 rounded-2xl border border-[#D4AF37]/30 flex flex-col gap-2 shadow-2xl">
                                    <div className="flex items-center gap-3">
                                        <button
                                            onClick={toggleMute}
                                            className="text-[#D4AF37] hover:scale-110 transition-transform"
                                        >
                                            {isMuted ? (
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" /></svg>
                                            ) : (
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" /></svg>
                                            )}
                                        </button>
                                        <input
                                            type="range"
                                            min="0"
                                            max="1"
                                            step="0.01"
                                            value={isMuted ? 0 : 1}
                                            onChange={(e) => {
                                                const v = parseFloat(e.target.value);
                                                if (audioRef.current) audioRef.current.volume = v;
                                                if (v > 0) setIsMuted(false);
                                                else setIsMuted(true);
                                            }}
                                            className="w-20 h-1 accent-[#D4AF37] bg-[#D4AF37]/20 rounded-full cursor-pointer"
                                        />
                                    </div>
                                    <span className="text-[10px] text-[#D4AF37]/60 uppercase tracking-widest text-center">Spiritual Volume</span>
                                </div>
                            )}
                        </div>

                        {/* Mute Toggle (Original Position) */}
                        {isPlaying && (
                            <button
                                onClick={toggleMute}
                                className="absolute bottom-6 right-6 z-30 bg-black/40 hover:bg-black/60 p-3 rounded-full text-white backdrop-blur-sm transition-all"
                            >
                                {isMuted ? (
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" /></svg>
                                ) : (
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" /></svg>
                                )}
                            </button>
                        )}
                    </div>
                    {/* Audio Status Alert */}
                    <div className="mt-4 text-center">
                        <p className="text-[10px] text-slate-500 uppercase tracking-widest">
                            {isPlaying ? "🔈 Guruji is speaking... checking output channel" : "🔈 Standing by for divine question"}
                        </p>
                    </div>
                </motion.div>

                {/* Right: Interaction Stage */}
                <div className="w-full md:w-1/2 flex flex-col gap-6">
                    <div className="flex flex-col gap-2">
                        <span className="text-[#D4AF37] font-medium tracking-[0.2em] uppercase text-sm">Divine Interaction</span>
                        <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight">Consult with <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFD700] to-[#B8860B]">Guruji</span></h2>
                    </div>

                    <AnimatePresence mode="wait">
                        {gurujiAnswer ? (
                            <motion.div
                                key="answer"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="bg-[#D4AF37]/10 border border-[#D4AF37]/30 p-6 md:p-8 rounded-[1.5rem] relative"
                            >
                                <p className="text-[#D4AF37] italic text-lg leading-relaxed">{gurujiAnswer}</p>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="placeholder"
                                className="text-slate-400 text-lg leading-relaxed"
                            >
                                Ask your questions about Sri Shyam Yantra and receive divine guidance from Guruji's spiritual wisdom.
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <form onSubmit={handleAskGuruji} className="relative mt-4">
                        <input
                            type="text"
                            value={question}
                            onChange={(e) => setQuestion(e.target.value)}
                            placeholder="Type your question for Guruji..."
                            className="w-full bg-[#081629] border border-[#D4AF37]/20 rounded-full py-4 px-8 pr-16 text-white placeholder-slate-500 focus:outline-none focus:border-[#D4AF37]/50 transition-all shadow-inner"
                        />
                        <button
                            type="submit"
                            disabled={isThinking || !question.trim()}
                            className="absolute right-2 top-2 bottom-2 aspect-square bg-[#D4AF37] rounded-full flex items-center justify-center text-[#0A1F3C] hover:bg-[#FFD700] disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg"
                        >
                            {isThinking ? (
                                <div className="w-5 h-5 border-2 border-[#0A1F3C] border-t-transparent rounded-full animate-spin"></div>
                            ) : (
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                            )}
                        </button>
                    </form>

                    <div className="flex flex-wrap gap-4 mt-2">
                        {['Benefits of Yantra', 'Correct Placement', 'Spiritual Story'].map((tag) => (
                            <button
                                key={tag}
                                onClick={() => setQuestion(tag)}
                                className="text-xs text-[#D4AF37]/60 border border-[#D4AF37]/20 px-4 py-2 rounded-full hover:bg-[#D4AF37]/10 hover:border-[#D4AF37]/40 transition-all"
                            >
                                {tag}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default GurujiHighlight;
