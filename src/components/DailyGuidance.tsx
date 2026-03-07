import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getSpiritualGuidance } from '../services/api';
import type { GuidanceResponse } from '../services/api';
import { FaHashtag, FaPalette, FaRegClock, FaRegSmile, FaMoon, FaRedoAlt } from 'react-icons/fa';

const ZODIAC_SIGNS = [
    'Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo',
    'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'
];

const SIGN_EMOJIS: Record<string, string> = {
    'Aries': '♈', 'Taurus': '♉', 'Gemini': '♊', 'Cancer': '♋',
    'Leo': '♌', 'Virgo': '♍', 'Libra': '♎', 'Scorpio': '♏',
    'Sagittarius': '♐', 'Capricorn': '♑', 'Aquarius': '♒', 'Pisces': '♓'
};


const DailyGuidance = () => {
    const [selectedSign, setSelectedSign] = useState<string | null>(null);
    const [hoveredSign, setHoveredSign] = useState<string | null>(null);
    const [guidanceData, setGuidanceData] = useState<GuidanceResponse | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSelectSign = async (sign: string) => {
        setSelectedSign(sign);
        localStorage.setItem('user_zodiac', sign);
        setIsLoading(true);
        setError(null);

        try {
            const data = await getSpiritualGuidance(sign);
            setGuidanceData(data);
        } catch (err: any) {
            console.error("Error fetching guidance:", err);
            setError("Failed to fetch divine guidance at this moment. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleReset = () => {
        setSelectedSign(null);
        setGuidanceData(null);
        localStorage.removeItem('user_zodiac');
    };

    return (
        <section id="daily-spiritual" className="bg-[#0A1F3C] relative overflow-hidden py-20 md:py-24 border-t border-[#D4AF37]/20">
            {/* Ambient Lighting - Navy Blue / Peacock accents */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] md:w-[70%] h-[70%] bg-[#D4AF37]/5 rounded-full blur-[120px] md:blur-[200px] pointer-events-none z-0"></div>
            <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#00A8CC]/10 rounded-full blur-[100px] pointer-events-none z-0"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <p className="text-[#00E5FF] filter drop-shadow-[0_0_8px_rgba(0,229,255,0.4)] text-[10px] md:text-[12px] uppercase font-bold tracking-[0.6em] mb-4">Divine Insights</p>
                    <h2 className="text-4xl md:text-6xl font-serif text-white tracking-tight mb-6 text-glow">
                        Daily <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] to-[#F5D76E] italic">Spiritual Guidance</span>
                    </h2>
                    <div className="w-24 h-[1px] bg-gold-gradient mx-auto opacity-40"></div>
                </motion.div>

                <AnimatePresence mode="wait">
                    {!selectedSign ? (
                        <motion.div
                            key="selection"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.5 }}
                            className="bg-[#081629]/60 backdrop-blur-md border border-[#D4AF37]/20 p-8 md:p-14 rounded-[2.5rem] shadow-[0_0_50px_rgba(0,0,0,0.5)] relative overflow-hidden mx-auto max-w-5xl"
                        >
                            <div className="text-center mb-12 relative z-10">
                                <p className="text-[#00E5FF]/80 text-[10px] md:text-xs uppercase font-bold tracking-[0.4em] mb-2 font-sans">Cosmic Alignment</p>
                                <h3 className="text-[#D4AF37] text-2xl md:text-4xl font-serif text-glow mb-4">Select Your Zodiac Sign</h3>
                                <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mx-auto opacity-70 filter drop-shadow-[0_0_8px_rgba(212,175,55,0.8)]"></div>
                            </div>

                            <div className="relative w-[280px] h-[280px] md:w-[420px] md:h-[420px] mx-auto mb-16 mt-12 flex items-center justify-center">
                                {/* Orbit rings perfectly matching the circle */}
                                <div className="absolute inset-0 border border-[#D4AF37]/30 rounded-full animate-[spin_80s_linear_infinite] shadow-[0_0_30px_rgba(212,175,55,0.1)_inset]"></div>
                                <div className="absolute inset-6 md:inset-10 border border-[#00A8CC]/20 rounded-full border-dashed animate-[spin_50s_linear_infinite_reverse]"></div>

                                {/* Center Element */}
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-28 md:w-36 md:h-36 rounded-full border border-[#D4AF37]/50 bg-gradient-to-br from-[#081629] to-[#040C1A] flex flex-col items-center justify-center shadow-[0_0_40px_rgba(212,175,55,0.4)] z-10 transition-all duration-300">
                                    <div className="absolute inset-1 border-[2px] border-[#D4AF37]/10 rounded-full pointer-events-none"></div>
                                    <span className="text-4xl md:text-6xl mb-1 filter drop-shadow-[0_0_15px_rgba(212,175,55,0.8)] text-[#D4AF37] transition-all duration-300">
                                        {hoveredSign ? SIGN_EMOJIS[hoveredSign] : "✨"}
                                    </span>
                                    <span className="text-[9px] md:text-[11px] text-[#F5D76E] uppercase tracking-[0.3em] font-bold transition-all duration-300">
                                        {hoveredSign ? hoveredSign : "Zodiac"}
                                    </span>
                                </div>

                                {/* Zodiac Cards */}
                                {ZODIAC_SIGNS.map((sign, index) => {
                                    // Calculate precise X and Y coordinates on the circle perimeter
                                    const angle = (index * 360) / ZODIAC_SIGNS.length - 90;
                                    const radian = angle * (Math.PI / 180);
                                    const x = 50 + 50 * Math.cos(radian);
                                    const y = 50 + 50 * Math.sin(radian);

                                    return (
                                        <button
                                            key={sign}
                                            onClick={() => handleSelectSign(sign)}
                                            onMouseEnter={() => setHoveredSign(sign)}
                                            onMouseLeave={() => setHoveredSign(null)}
                                            className="absolute flex flex-col items-center justify-center bg-gradient-to-br from-[#081629] to-[#0A1F3C] border border-[#D4AF37]/40 hover:border-[#F5D76E] hover:bg-[#D4AF37]/20 text-stone-200 rounded-full transition-all duration-300 hover:shadow-[0_0_30px_rgba(212,175,55,0.6)] hover:scale-125 group w-14 h-14 md:w-16 md:h-16 z-20"
                                            style={{
                                                top: `${y}%`,
                                                left: `${x}%`,
                                                transform: 'translate(-50%, -50%)'
                                            }}
                                        >
                                            <span className="text-2xl md:text-3xl filter drop-shadow-[0_0_5px_rgba(212,175,55,0.4)] text-[#D4AF37] group-hover:text-[#F5D76E] transition-all">
                                                {SIGN_EMOJIS[sign]}
                                            </span>
                                            <span className="absolute -bottom-6 opacity-0 group-hover:opacity-100 transition-opacity text-[10px] md:text-[11px] text-[#F5D76E] tracking-[0.2em] font-serif whitespace-nowrap bg-[#040515]/90 px-3 py-1 rounded-full border border-[#D4AF37]/40 pointer-events-none drop-shadow-md">
                                                {sign}
                                            </span>
                                        </button>
                                    );
                                })}
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="guidance"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.5 }}
                            className="max-w-5xl mx-auto"
                        >
                            <div className="relative w-full">
                                {/* Ambient Glow */}
                                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#00A8CC]/5 blur-[120px] pointer-events-none rounded-full translate-x-1/2 -translate-y-1/2"></div>

                                {isLoading ? (
                                    <div className="flex flex-col items-center justify-center py-32 z-10 relative">
                                        <div className="w-16 h-16 border-4 border-[#D4AF37]/20 border-t-[#D4AF37] rounded-full animate-spin mb-6 shadow-[0_0_15px_rgba(212,175,55,0.2)]"></div>
                                        <p className="text-[#D4AF37]/80 text-sm tracking-[0.3em] uppercase font-serif italic">Reading the Stars...</p>
                                    </div>
                                ) : error ? (
                                    <div className="text-center py-20 z-10 relative">
                                        <p className="text-red-400 font-serif text-xl mb-8">{error}</p>
                                        <button
                                            onClick={() => handleSelectSign(selectedSign)}
                                            className="text-[#D4AF37] border border-[#D4AF37]/50 px-8 py-3 rounded-full hover:bg-[#D4AF37]/10 transition-colors uppercase tracking-widest text-sm font-bold shadow-[0_0_15px_rgba(212,175,55,0.1)]"
                                        >
                                            Try Again
                                        </button>
                                    </div>
                                ) : guidanceData ? (
                                    <div className="relative z-10 w-full px-4 md:px-0 mx-auto">
                                        {/* Header */}
                                        <div className="flex flex-col justify-start items-start mb-14 pb-8 border-b border-[#D4AF37]/10 relative w-full">
                                            <div>
                                                <p className="text-[#D4AF37]/80 text-[10px] md:text-xs uppercase tracking-[0.3em] font-bold mb-3 flex items-center gap-3 font-sans">
                                                    {guidanceData.current_date}
                                                </p>
                                                <h3 className="text-white text-3xl md:text-5xl font-serif text-glow flex items-center gap-3">
                                                    {guidanceData.sign}
                                                    <span className="text-[#D4AF37] filter drop-shadow-[0_0_10px_rgba(212,175,55,0.6)] text-2xl md:text-3xl ml-1">{SIGN_EMOJIS[guidanceData.sign]}</span>
                                                </h3>
                                            </div>
                                            <button
                                                onClick={handleReset}
                                                className="absolute top-0 right-0 flex items-center gap-2 text-[#D4AF37]/80 hover:text-[#F5D76E] text-[9px] md:text-[10px] uppercase tracking-[0.2em] border border-[#D4AF37]/40 hover:border-[#D4AF37]/80 hover:bg-[#D4AF37]/10 px-4 md:px-5 py-2 md:py-2.5 rounded-full transition-all duration-300 hover:shadow-[0_0_20px_rgba(212,175,55,0.3)] bg-[#040C1A]/50"
                                            >
                                                <FaRedoAlt className="w-2.5 h-2.5" />
                                                <span className="hidden sm:inline">Change Sign</span>
                                                <span className="sm:hidden">Change</span>
                                            </button>
                                        </div>

                                        {/* Info Cards Layout */}
                                        <div className="flex flex-wrap lg:flex-nowrap justify-center gap-4 lg:gap-5 mb-16 w-full mx-auto">
                                            {[
                                                { label: "Lucky Number", value: guidanceData.lucky_number, icon: <FaHashtag className="w-3.5 h-3.5 md:w-4 md:h-4" /> },
                                                { label: "Lucky Color", value: guidanceData.color, icon: <FaPalette className="w-3.5 h-3.5 md:w-4 md:h-4" /> },
                                                { label: "Lucky Time", value: guidanceData.lucky_time, icon: <FaRegClock className="w-3.5 h-3.5 md:w-4 md:h-4" /> },
                                                { label: "Mood", value: guidanceData.mood, icon: <FaRegSmile className="w-3.5 h-3.5 md:w-4 md:h-4" /> },
                                                { label: "Rahu Kaal", value: guidanceData.rahu_kaal, highlight: true, icon: <FaMoon className="w-3.5 h-3.5 md:w-4 md:h-4" /> }
                                            ].map((item, idx) => (
                                                <motion.div
                                                    key={idx}
                                                    whileHover={{ y: -3 }}
                                                    className={`bg-[#061121] flex-1 min-w-[140px] px-4 py-8 rounded-xl border ${item.highlight ? 'border-[#ff4d4d]/30 shadow-[0_0_15px_rgba(255,100,100,0.05)]' : 'border-[#D4AF37]/10'} text-center overflow-hidden transition-all duration-300 group flex flex-col items-center justify-between gap-5 relative`}
                                                >
                                                    {/* Icon */}
                                                    <div className={`${item.highlight ? 'text-[#ff6666]' : 'text-[#D4AF37]/60'} transition-transform duration-500`}>
                                                        {item.icon}
                                                    </div>

                                                    <div className="flex flex-col gap-2 items-center">
                                                        <p className={`${item.highlight ? 'text-[#ff6666]/80' : 'text-[#00E5FF]/70'} text-[9px] md:text-[10px] uppercase tracking-[0.15em] font-bold`}>
                                                            {item.label}
                                                        </p>
                                                        <p className={`${item.highlight ? 'text-white' : 'text-[#F5D76E]'} text-lg md:text-xl font-serif font-medium`}>{item.value}</p>
                                                    </div>
                                                </motion.div>
                                            ))}
                                        </div>

                                        {/* Message Section */}
                                        <div className="bg-[#061121]/50 p-8 md:p-12 rounded-[2rem] border border-[#D4AF37]/10 relative shadow-inner w-full mx-auto max-w-4xl">
                                            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#040C1A] border border-[#D4AF37]/30 px-6 py-1.5 rounded-full shadow-md">
                                                <span className="text-[#D4AF37] text-[9px] md:text-[10px] uppercase tracking-[0.2em] font-bold whitespace-nowrap">Today's Message</span>
                                            </div>
                                            <div className="pt-4 flex flex-col items-center">
                                                <div className="text-[#D4AF37]/30 text-xl font-light mb-4 italic">/ /</div>
                                                <p className="text-[#E5E0D8] text-xl md:text-[22px] font-serif italic text-center leading-relaxed md:leading-[2] font-light opacity-90 px-2 lg:px-12">
                                                    {guidanceData.description}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ) : null}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </section>
    );
};

export default DailyGuidance;
