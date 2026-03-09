import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getSpiritualGuidance, generateKundli, getUserKundli, getTodayPanchang, getExtendedHoroscope } from '../services/api';
import type { GuidanceResponse, ExtendedHoroscopeResponse } from '../services/api';
import { FaHashtag, FaPalette, FaRegClock, FaRegSmile, FaMoon, FaSun, FaRedoAlt, FaArrowLeft, FaCalendarAlt, FaHistory, FaMapMarkerAlt, FaLocationArrow, FaCheck, FaTimes, FaStar, FaCaretUp, FaScroll, FaExclamationTriangle } from 'react-icons/fa';
import { FaHandsPraying, FaStarOfLife } from 'react-icons/fa6';
import { useAuth } from '../context/AuthContext';

const ZODIAC_SIGNS = [
    'Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo',
    'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'
];

const SIGN_ICONS: Record<string, React.ReactNode> = {
    'Aries': null, 'Taurus': null, 'Gemini': null, 'Cancer': null,
    'Leo': null, 'Virgo': null, 'Libra': null, 'Scorpio': null,
    'Sagittarius': null, 'Capricorn': null, 'Aquarius': null, 'Pisces': null
};

const MANTRAS = [
    "ॐ शं शनैश्चराय नमः",
    "ॐ नमो भगवते वासुदेवाय",
    "ॐ नमः शिवाय",
    "ॐ श्री गणेशाय नमः",
    "ॐ हं हनुमते नमः",
    "ॐ श्री श्याम देवाय नमः"
];

type ViewState = 'initial' | 'kundli-form' | 'confirmation' | 'zodiac-selector' | 'result' | 'error';

/** Safely format any Prokerala time value → "HH:MM AM/PM" or "N/A" */
const fmtTime = (raw: any): string => {
    if (!raw) return 'N/A';
    try {
        // Already a "HH:MM" or "HH:MM:SS" string (e.g. "06:08:00")
        if (typeof raw === 'string' && /^\d{1,2}:\d{2}/.test(raw)) {
            const [h, m] = raw.split(':').map(Number);
            const d = new Date(); d.setHours(h, m, 0);
            return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        }
        // ISO string or timestamp number
        const d = new Date(typeof raw === 'number' ? raw * 1000 : raw);
        if (!isNaN(d.getTime())) return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } catch { }
    return 'N/A';
};

/** Extract start/end from a Prokerala period item — period is an array: p.period[0].start */
const getPeriodStart = (p: any) => p?.start ?? p?.period?.[0]?.start ?? p?.begins ?? null;
const getPeriodEnd = (p: any) => p?.end ?? p?.period?.[0]?.end ?? p?.ends ?? null;

const DailyGuidance = () => {
    const { user, openAuthModal } = useAuth();
    const [view, setView] = useState<ViewState>('initial');
    const [hoveredSign, setHoveredSign] = useState<string | null>(null);
    const [calculatedSign, setCalculatedSign] = useState<string | null>(null);
    const [guidanceData, setGuidanceData] = useState<GuidanceResponse | null>(null);
    const [panchangData, setPanchangData] = useState<any | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [extendedHoroscope, setExtendedHoroscope] = useState<ExtendedHoroscopeResponse | null>(null);
    const [extendedPeriod, setExtendedPeriod] = useState<'weekly' | 'monthly' | 'yearly' | null>(null);
    const [extendedLoading, setExtendedLoading] = useState(false);

    // Form fields
    const [dob, setDob] = useState('');
    const [tob, setTob] = useState('');
    const [pob, setPob] = useState('');
    const [suggestions, setSuggestions] = useState<any[]>([]);
    const [coords, setCoords] = useState<{ lat: number, lon: number } | null>(null);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [pendingForm, setPendingForm] = useState(false);
    const [apiError, setApiError] = useState<string | null>(null);

    // Fetch location suggestions
    useEffect(() => {
        const fetchSuggestions = async () => {
            if (pob.length < 3) {
                setSuggestions([]);
                return;
            }
            try {
                // Focused on cities/places only
                const resp = await fetch(`https://photon.komoot.io/api/?q=${encodeURIComponent(pob)}&limit=5&osm_tag=place`);
                const data = await resp.json();
                setSuggestions(data.features || []);
            } catch (err) {
                console.error("Location search failed:", err);
            }
        };

        const timeoutId = setTimeout(fetchSuggestions, 300);
        return () => clearTimeout(timeoutId);
    }, [pob]);

    const handleGetCurrentLocation = () => {
        if (!navigator.geolocation) {
            setApiError("Geolocation is not supported by your browser.");
            return;
        }

        setIsLoading(true);
        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const { latitude, longitude } = position.coords;
                setCoords({ lat: latitude, lon: longitude });

                try {
                    // Reverse geocode to get name
                    const resp = await fetch(`https://photon.komoot.io/reverse?lon=${longitude}&lat=${latitude}`);
                    const data = await resp.json();
                    if (data.features && data.features.length > 0) {
                        const p = data.features[0].properties;
                        const name = [p.name, p.city, p.country].filter(Boolean).join(', ');
                        setPob(name);
                    } else {
                        setPob(`Current Location (${latitude.toFixed(2)}, ${longitude.toFixed(2)})`);
                    }
                } catch (err) {
                    setPob("Current Location");
                }
                setIsLoading(false);
                setShowSuggestions(false);
            },
            () => {
                setIsLoading(false);
                setApiError("Could not retrieve your location. Please search for your city.");
            }
        );
    };

    // Reset on logout
    useEffect(() => {
        if (!user) {
            handleReset();
        }
    }, [user]);

    useEffect(() => {
        const checkSavedKundli = async () => {
            if (!user || user.id === undefined) return;
            // Prevent redundant checks if we already have data in view
            if (view !== 'initial' && view !== 'error') return;

            // ── Phase 1: Instant restore from localStorage ───────────────
            const cacheKey = `kundli_${user.id}`;
            const cached = localStorage.getItem(cacheKey);
            if (cached) {
                try {
                    const { sign, panchang, lat, lon } = JSON.parse(cached);
                    setCalculatedSign(sign);
                    setPanchangData(panchang || null);
                    setView('result');

                    // Background: fetch fresh guidance + today's panchang
                    Promise.all([
                        getSpiritualGuidance(sign),
                        getTodayPanchang(lat || 28.6139, lon || 77.2090).catch(() => panchang || null)
                    ]).then(([guidance, freshPanchang]) => {
                        setGuidanceData(guidance);
                        if (freshPanchang) setPanchangData(freshPanchang);
                    }).catch(() => { });

                    return; // done — no need for full backend call
                } catch {
                    localStorage.removeItem(cacheKey);
                }
            }

            // ── Phase 2: No cache — full backend lookup ───────────────────
            setIsLoading(true);
            try {
                const saved = await getUserKundli(user.id);
                if (saved) {
                    const savedData = saved.data || {};
                    const sign = savedData.zodiac || 'Aries';
                    const lat = saved.latitude || 28.6139;
                    const lon = saved.longitude || 77.2090;

                    setCalculatedSign(sign);
                    setPanchangData(savedData.panchang || null);

                    const [guidance, freshPanchang] = await Promise.all([
                        getSpiritualGuidance(sign),
                        getTodayPanchang(lat, lon).catch(() => savedData.panchang || null)
                    ]);

                    setGuidanceData(guidance);
                    if (freshPanchang) setPanchangData(freshPanchang);
                    setView('result');

                    // Save to localStorage for future instant loads
                    localStorage.setItem(cacheKey, JSON.stringify({
                        sign,
                        panchang: freshPanchang || savedData.panchang,
                        lat,
                        lon
                    }));
                }
            } catch (err) {
                console.error("Failed to load saved Kundli:", err);
            } finally {
                setIsLoading(false);
                // If we checked backend and still no data, and they clicked the button before logging in
                if (pendingForm && view === 'initial') {
                    setView('kundli-form');
                    setPendingForm(false);
                }
            }
        };

        checkSavedKundli();
    }, [user]);

    useEffect(() => {
        if (view === 'kundli-form') {
            document.body.classList.add('sacred-form-active');
        } else {
            document.body.classList.remove('sacred-form-active');
        }
        return () => document.body.classList.remove('sacred-form-active');
    }, [view]);

    const handleOpenKundliForm = () => {
        if (!user) {
            setPendingForm(true);
            openAuthModal();
            return;
        }

        // If data is already in state, skip form
        if (calculatedSign && guidanceData) {
            setView('result');
            return;
        }

        setView('kundli-form');
    };

    const handleGenerateKundli = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user) return;
        if (!coords) {
            setApiError("Please select a valid location from the suggestions.");
            return;
        }

        setIsLoading(true);
        setApiError(null);

        try {
            const result = await generateKundli({
                dob,
                tob,
                pob,
                latitude: coords.lat,
                longitude: coords.lon
            }, user.id);

            // Real Prokerala fields
            const sign = result.data?.zodiac || 'Aries';
            const birthPanchang = result.data?.panchang || null;

            // Fetch actual today's panchang so the section displays current data
            let todayPanchang = birthPanchang;
            try {
                const freshPanchang = await getTodayPanchang(coords.lat, coords.lon);
                if (freshPanchang) {
                    todayPanchang = freshPanchang;
                }
            } catch (err) {
                console.warn("Could not fetch today's panchang, falling back to birth panchang max", err);
            }

            setCalculatedSign(sign);
            setPanchangData(todayPanchang);

            // Cache to localStorage so returning users skip the form
            if (user) {
                localStorage.setItem(`kundli_${user.id}`, JSON.stringify({
                    sign,
                    panchang: todayPanchang,
                    lat: coords.lat,
                    lon: coords.lon
                }));
            }

            setView('confirmation');
        } catch (err: any) {
            console.error("Kundli generation failed:", err);
            setApiError(err.response?.data?.detail || "The stars are momentarily obscured. Please try again in a few moments.");
            setView('error');
        } finally {
            setIsLoading(false);
        }
    };

    const handleSelectSign = async (sign: string) => {
        setIsLoading(true);

        try {
            const data = await getSpiritualGuidance(sign);
            setGuidanceData(data);
            setView('result');
        } catch (err: any) {
            console.error("Error fetching guidance:", err);
        } finally {
            setIsLoading(false);
        }
    };

    const handleReset = () => {
        setView('initial');
        setGuidanceData(null);
        setPanchangData(null);
        setCalculatedSign(null);
        setApiError(null);
        setDob('');
        setTob('');
        setPob('');
        setCoords(null);
        setPendingForm(false);
        setExtendedPeriod(null);
        setExtendedHoroscope(null);
        // Clear cache so user can re-generate if they choose to reset
        if (user) localStorage.removeItem(`kundli_${user.id}`);
    };

    const getDailyMantra = (sign: string) => {
        const seed = new Date().getDate() + sign.length;
        return MANTRAS[seed % MANTRAS.length];
    };

    return (
        <section id="daily-spiritual" className="bg-[#0A1F3C] relative overflow-hidden py-20 md:py-24 border-t border-[#D4AF37]/20">
            {/* Ambient Lighting */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] md:w-[70%] h-[70%] bg-[#D4AF37]/5 rounded-full blur-[120px] md:blur-[200px] pointer-events-none z-0"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <p className="text-[#00E5FF] filter drop-shadow-[0_0_8px_rgba(0,229,255,0.4)] text-[10px] md:text-[12px] uppercase font-bold tracking-[0.6em] mb-4">Divine Insights</p>
                    <h2 className="text-4xl md:text-6xl text-white tracking-tight mb-6 text-glow">
                        Today’s <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] to-[#F5D76E] italic">Blessing</span>
                    </h2>
                    <div className="w-24 h-[1px] bg-gold-gradient mx-auto opacity-40"></div>
                </motion.div>

                <AnimatePresence mode="wait">
                    {view === 'initial' && (
                        <motion.div
                            key="initial"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="max-w-2xl mx-auto w-full px-4"
                        >
                            {/* Personalized Path (Full Width / Centered) */}
                            <button
                                onClick={handleOpenKundliForm}
                                className="w-full glass-card p-10 md:p-14 text-center group interactive hover:shadow-ambient-gold transition-all duration-500 rounded-[3rem] flex flex-col items-center justify-center border border-[#D4AF37]/20 bg-[#081629]/60 backdrop-blur-sm"
                            >
                                <div className="flex justify-center mb-6">
                                    <img src="/om.png" alt="Om" className="w-16 h-16 object-contain filter drop-shadow-[0_0_20px_rgba(212,175,55,0.4)] group-hover:scale-110 transition-transform duration-500" />
                                </div>
                                <h3 className="text-2xl md:text-3xl text-white mb-4 tracking-tight group-hover:text-[#D4AF37] transition-colors line-clamp-1">Personalized Path</h3>
                                <p className="text-stone-400 text-sm md:text-base leading-relaxed mb-8 max-w-md mx-auto">
                                    Create a permanent profile with your birth details to unlock your cosmic legacy and receive daily personalized blessings.
                                </p>
                                <span className="btn-gold-royal px-12 py-4 rounded-full text-xs font-black tracking-[0.2em] shadow-2xl whitespace-nowrap">GET MY KUNDLI</span>
                            </button>
                        </motion.div>
                    )}

                    {view === 'kundli-form' && (
                        <motion.div
                            key="form"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="bg-[#f9f5ec] border border-[#D4AF37]/30 p-8 md:p-14 rounded-[2.5rem] shadow-[0_20px_60px_rgba(0,0,0,0.2)] relative overflow-hidden mx-auto max-w-2xl"
                        >
                            {/* Decorative Elements */}
                            <div className="absolute top-0 left-0 w-full h-1.5 bg-gold-gradient" />
                            <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#D4AF37]/5 rounded-full blur-2xl" />

                            <button onClick={() => setView('initial')} className="absolute top-8 left-8 text-stone-500 hover:text-[#D4AF37] hover:scale-110 transition-all z-10">
                                <FaArrowLeft size={18} />
                            </button>

                            <div className="text-center mb-10 relative z-10">
                                <div className="text-4xl mb-4 filter drop-shadow-sm text-[#D4AF37] flex justify-center"><FaScroll /></div>
                                <h3 className="text-[#0A1F3C] text-2xl md:text-3xl font-serif font-bold tracking-tight mb-2">Sacred Birth Details</h3>
                                <div className="w-12 h-[2px] bg-gold-gradient mx-auto mb-4" />
                                <p className="text-[#8B7355] text-[10px] uppercase tracking-[0.3em] font-black">Divine Calculation for Your Kundli</p>
                            </div>

                            <form onSubmit={handleGenerateKundli} className="space-y-6 relative z-10">
                                <div className="relative group">
                                    <label className="text-[10px] uppercase tracking-widest font-black text-[#D4AF37] mb-2 block ml-1">Date of Birth</label>
                                    <div className="relative">
                                        <FaCalendarAlt className="absolute left-4 top-1/2 -translate-y-1/2 text-[#D4AF37]/50" />
                                        <input
                                            required
                                            type="date"
                                            value={dob}
                                            onChange={(e) => setDob(e.target.value)}
                                            className="w-full bg-white border border-[#D4AF37]/20 rounded-2xl py-4 pl-12 pr-4 text-[#0A1F3C] text-sm outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]/20 transition-all"
                                        />
                                    </div>
                                </div>
                                <div className="relative group">
                                    <label className="text-[10px] uppercase tracking-widest font-black text-[#D4AF37] mb-2 block ml-1">Time of Birth</label>
                                    <div className="relative">
                                        <FaHistory className="absolute left-4 top-1/2 -translate-y-1/2 text-[#D4AF37]/50" />
                                        <input
                                            required
                                            type="time"
                                            value={tob}
                                            onChange={(e) => setTob(e.target.value)}
                                            className="w-full bg-white border border-[#D4AF37]/20 rounded-2xl py-4 pl-12 pr-4 text-[#0A1F3C] text-sm outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]/20 transition-all"
                                        />
                                    </div>
                                </div>
                                <div className="relative group">
                                    <label className="text-[10px] uppercase tracking-widest font-black text-[#D4AF37] mb-2 block ml-1">Place of Birth</label>
                                    <div className="relative">
                                        <FaMapMarkerAlt className="absolute left-4 top-1/2 -translate-y-1/2 text-[#D4AF37]/50" />
                                        <input
                                            required
                                            type="text"
                                            placeholder="Search your birth city..."
                                            value={pob}
                                            onChange={(e) => {
                                                setPob(e.target.value);
                                                setShowSuggestions(true);
                                                setCoords(null); // Reset coords if they type manually
                                            }}
                                            onFocus={() => setShowSuggestions(true)}
                                            className="w-full bg-white border border-[#D4AF37]/20 rounded-2xl py-4 pl-12 pr-12 text-[#0A1F3C] text-sm outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]/20 transition-all placeholder:text-stone-300"
                                        />

                                        <button
                                            type="button"
                                            onClick={handleGetCurrentLocation}
                                            className="absolute right-4 top-1/2 -translate-y-1/2 text-[#D4AF37] hover:bg-[#D4AF37]/10 p-2 rounded-full transition-all"
                                            title="Use my current location"
                                        >
                                            <FaLocationArrow size={14} className={isLoading ? "animate-pulse" : ""} />
                                        </button>

                                        {/* Suggestions Dropdown */}
                                        <AnimatePresence>
                                            {showSuggestions && suggestions.length > 0 && (
                                                <motion.div
                                                    initial={{ opacity: 0, y: -10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    exit={{ opacity: 0, y: -10 }}
                                                    className="absolute z-50 w-full mt-2 bg-white border border-[#D4AF37]/20 rounded-xl shadow-2xl overflow-hidden max-h-60 overflow-y-auto"
                                                >
                                                    {suggestions.map((feat, idx) => {
                                                        const p = feat.properties;
                                                        const name = [p.name, p.city, p.state, p.country].filter(Boolean).join(', ');
                                                        return (
                                                            <button
                                                                key={idx}
                                                                type="button"
                                                                onClick={() => {
                                                                    setPob(name);
                                                                    setCoords({
                                                                        lat: feat.geometry.coordinates[1],
                                                                        lon: feat.geometry.coordinates[0]
                                                                    });
                                                                    setShowSuggestions(false);
                                                                }}
                                                                className="w-full text-left px-5 py-4 text-xs text-stone-600 hover:bg-[#D4AF37]/10 hover:text-[#0A1F3C] transition-all border-b border-[#D4AF37]/5 last:border-0 flex items-center gap-3"
                                                            >
                                                                <FaMapMarkerAlt className="text-[#D4AF37]/40" />
                                                                {name}
                                                            </button>
                                                        );
                                                    })}
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                    {coords && (
                                        <p className="text-[9px] text-green-600 mt-2 ml-1 font-bold flex items-center gap-1">
                                            <FaCheck className="text-[8px]" /> Coordinates locked: {coords.lat.toFixed(4)}, {coords.lon.toFixed(4)}
                                        </p>
                                    )}
                                    {apiError && !showSuggestions && (
                                        <p className="text-[9px] text-red-500 mt-2 ml-1 font-bold">
                                            {apiError}
                                        </p>
                                    )}
                                </div>

                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="btn-gold-royal w-full py-5 rounded-2xl font-black text-sm tracking-[0.25em] shadow-xl relative overflow-hidden flex items-center justify-center h-16"
                                >
                                    {isLoading ? (
                                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                    ) : (
                                        "GENERATE KUNDLI"
                                    )}
                                </button>
                            </form>
                        </motion.div>
                    )}

                    {view === 'confirmation' && (
                        <motion.div
                            key="confirmation"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="bg-[#081629]/80 backdrop-blur-xl border border-[#D4AF37]/20 p-10 md:p-16 rounded-[3rem] shadow-[0_0_50px_rgba(0,0,0,0.8)] max-w-5xl mx-auto"
                        >
                            <div className="flex flex-col items-center mb-10">
                                <h3 className="text-white text-3xl font-serif tracking-[0.1em] mb-2 uppercase">Analysis Complete</h3>
                                <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37]/50 to-transparent"></div>
                            </div>

                            <div className="text-stone-300 mb-12 text-center">
                                <p className="mb-8 opacity-60 uppercase text-[9px] tracking-[0.4em] font-black">Celestial alignment identifies your sign as:</p>
                                <div className="relative py-8">
                                    {/* Subtle glowing ring behind text */}
                                    <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-px bg-white/5 mx-auto w-[80%]"></div>
                                    <span className="relative z-10 text-5xl md:text-7xl text-gold-gradient font-serif font-black tracking-widest px-8 bg-[#081629]">
                                        {calculatedSign}
                                    </span>
                                </div>
                            </div>

                            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                                <button
                                    onClick={() => handleSelectSign(calculatedSign || "Aries")}
                                    className="btn-gold-royal px-12 py-4 rounded-full font-black text-xs tracking-[0.2em] w-full"
                                >
                                    YES, CONTINUE
                                </button>
                                <button
                                    onClick={() => setView('zodiac-selector')}
                                    className="text-[#D4AF37] border border-[#D4AF37]/40 px-8 py-4 rounded-full font-black text-xs tracking-[0.2em] hover:bg-[#D4AF37]/10 transition-all w-full"
                                >
                                    CHOOSE MY SIGN
                                </button>
                            </div>
                        </motion.div>
                    )}

                    {view === 'zodiac-selector' && (
                        <motion.div
                            key="selector"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="bg-[#081629]/60 backdrop-blur-sm border border-[#D4AF37]/20 p-8 md:p-14 rounded-[2.5rem] shadow-[0_0_50px_rgba(0,0,0,0.5)] relative overflow-hidden mx-auto max-w-5xl"
                        >
                            <button onClick={() => setView('initial')} className="absolute top-8 left-8 text-[#D4AF37] hover:scale-110 transition-transform">
                                <FaArrowLeft size={18} />
                            </button>

                            <div className="text-center mb-12">
                                <h3 className="text-[#D4AF37] text-2xl md:text-3xl text-glow">Select Your Sign</h3>
                            </div>

                            <div className="relative w-[280px] h-[280px] md:w-[420px] md:h-[420px] mx-auto mb-16 mt-12 flex items-center justify-center">
                                {/* Orbit Rings from original design */}
                                <div className="absolute inset-0 border-[1.5px] border-[#D4AF37]/20 rounded-full animate-[spin_40s_linear_infinite] shadow-[0_0_40px_rgba(212,175,55,0.15)_inset]"></div>
                                <div className="absolute inset-6 md:inset-10 border border-[#00A8CC]/30 rounded-full border-dashed animate-[spin_25s_linear_infinite_reverse]"></div>

                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-28 md:w-36 md:h-36 rounded-full border border-[#D4AF37]/50 bg-gradient-to-br from-[#081629] to-[#040C1A] flex flex-col items-center justify-center shadow-[0_0_40px_rgba(212,175,55,0.4)] z-10 transition-all duration-300">
                                    <span className="text-4xl md:text-6xl mb-1 filter drop-shadow-[0_0_15px_rgba(212,175,55,0.8)] text-[#D4AF37]">
                                        {hoveredSign ? SIGN_ICONS[hoveredSign] : <FaStar />}
                                    </span>
                                    <span className="text-[9px] md:text-[11px] text-[#F5D76E] uppercase tracking-[0.3em] font-bold">
                                        {hoveredSign ? hoveredSign : "Zodiac"}
                                    </span>
                                </div>

                                {ZODIAC_SIGNS.map((sign, index) => {
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
                                            style={{ top: `${y}%`, left: `${x}%`, transform: 'translate(-50%, -50%)' }}
                                        >
                                            <span className="text-2xl md:text-3xl filter drop-shadow-[0_0_5px_rgba(212,175,55,0.4)] text-[#D4AF37]">
                                                {SIGN_ICONS[sign]}
                                            </span>
                                        </button>
                                    );
                                })}
                            </div>
                        </motion.div>
                    )}

                    {view === 'error' && (
                        <motion.div
                            key="error"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="bg-[#081629]/60 backdrop-blur-sm border border-[#ff4d4d]/30 p-12 rounded-[2.5rem] shadow-[0_0_50px_rgba(255,77,77,0.1)] text-center max-w-xl mx-auto"
                        >
                            <div className="text-4xl text-[#ff4d4d] mb-6 flex justify-center"><FaExclamationTriangle /></div>
                            <h3 className="text-white text-2xl mb-4 tracking-tight">Cosmic Interference</h3>
                            <p className="text-stone-300 mb-8 leading-relaxed">
                                {apiError || "The stars are momentarily obscured. We couldn't calculate your Kundli right now."}
                            </p>

                            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                                <button
                                    onClick={() => setView('kundli-form')}
                                    className="btn-gold-royal px-12 py-4 rounded-full font-black text-xs tracking-[0.2em] w-full"
                                >
                                    TRY AGAIN
                                </button>
                                <button
                                    onClick={handleReset}
                                    className="text-stone-400 border border-stone-700 px-8 py-4 rounded-full font-black text-xs tracking-[0.2em] hover:bg-stone-800 transition-all w-full"
                                >
                                    BACK TO START
                                </button>
                            </div>
                        </motion.div>
                    )}

                    {view === 'result' && guidanceData && (
                        <motion.div
                            key="result"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="max-w-5xl mx-auto"
                        >
                            <div className="relative w-full">
                                <div className="relative z-10 w-full px-4 md:px-0 mx-auto">
                                    <div className="flex flex-col justify-start items-start mb-14 pb-8 border-b border-[#D4AF37]/10 relative w-full">
                                        <div>
                                            <p className="text-[#D4AF37]/80 text-[10px] md:text-xs uppercase tracking-[0.3em] font-bold mb-3 flex items-center gap-3">
                                                {guidanceData.current_date}
                                            </p>
                                            <h3 className="text-white text-3xl md:text-5xl text-glow flex items-center gap-4">
                                                <span className="font-serif">{guidanceData.sign}</span>
                                            </h3>
                                        </div>
                                        <button
                                            onClick={handleReset}
                                            className="absolute top-0 right-0 flex items-center gap-2 text-[#D4AF37]/80 hover:text-[#F5D76E] text-[9px] md:text-[10px] uppercase tracking-[0.2em] border border-[#D4AF37]/40 hover:bg-[#D4AF37]/10 px-5 py-2.5 rounded-full transition-all duration-300 bg-[#040C1A]/50"
                                        >
                                            <FaRedoAlt className="w-2.5 h-2.5" />
                                            <span>Back</span>
                                        </button>
                                    </div>

                                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-16 w-full mx-auto">
                                        {[
                                            { label: "Lucky Number", value: guidanceData.lucky_number, icon: <FaHashtag />, iconColor: 'text-[#D4AF37]', iconBg: 'bg-[#D4AF37]/20 border-[#D4AF37]/40', cardBg: 'bg-[#0d1f3c] border-[#D4AF37]/40 hover:border-[#D4AF37]/80' },
                                            { label: "Lucky Color", value: guidanceData.color, icon: <FaPalette />, iconColor: 'text-[#00E5FF]', iconBg: 'bg-[#00E5FF]/20 border-[#00E5FF]/40', cardBg: 'bg-[#0d1f3c] border-[#00E5FF]/40 hover:border-[#00E5FF]/80' },
                                            { label: "Auspicious Time", value: guidanceData.lucky_time, icon: <FaRegClock />, iconColor: 'text-[#a78bfa]', iconBg: 'bg-[#8B5CF6]/20 border-[#8B5CF6]/40', cardBg: 'bg-[#0d1f3c] border-[#8B5CF6]/40 hover:border-[#a78bfa]/80', isTime: true },
                                            { label: "Mood", value: guidanceData.mood, icon: <FaRegSmile />, iconColor: 'text-[#34d399]', iconBg: 'bg-[#10B981]/20 border-[#10B981]/40', cardBg: 'bg-[#0d1f3c] border-[#10B981]/40 hover:border-[#34d399]/80' },
                                            { label: "Rahu Kaal", value: guidanceData.rahu_kaal, icon: <FaMoon />, iconColor: 'text-[#f87171]', iconBg: 'bg-[#EF4444]/20 border-[#EF4444]/40', cardBg: 'bg-[#0d1f3c] border-[#EF4444]/40 hover:border-[#f87171]/80 shadow-[0_0_20px_rgba(239,68,68,0.15)]', isTime: true },
                                        ].map((item, idx) => {
                                            // Split "HH:MM AM - HH:MM PM" into two lines
                                            const timeParts = item.isTime && item.value
                                                ? item.value.split(' - ')
                                                : null;
                                            return (
                                                <motion.div
                                                    key={idx}
                                                    whileHover={{ y: -8, scale: 1.03 }}
                                                    className={`flex flex-col items-center justify-center p-6 rounded-[2rem] border backdrop-blur-sm text-center group gap-4 relative overflow-hidden transition-all duration-300 ${item.cardBg}`}
                                                >
                                                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center border text-2xl shadow-lg ${item.iconBg} ${item.iconColor}`}>
                                                        {item.icon}
                                                    </div>
                                                    <div className="flex flex-col gap-1 items-center w-full">
                                                        <p className="text-stone-400 text-[9px] uppercase tracking-[0.3em] font-black group-hover:text-stone-200 transition-colors w-full text-center mb-1">
                                                            {item.label}
                                                        </p>
                                                        {timeParts ? (
                                                            <div className="w-full flex flex-col items-center gap-0.5">
                                                                <span className="text-[#F5D76E] text-[13px] font-bold font-mono tabular-nums tracking-tight leading-snug text-center">
                                                                    {timeParts[0]?.trim()}
                                                                </span>
                                                                {timeParts[1] && (
                                                                    <span className="text-[#F5D76E] text-[13px] font-bold font-mono tabular-nums tracking-tight leading-snug text-center">
                                                                        {timeParts[1]?.trim()}
                                                                    </span>
                                                                )}
                                                            </div>
                                                        ) : (
                                                            <p className="text-[#F5D76E] text-sm md:text-base font-bold leading-tight break-words drop-shadow-sm font-serif w-full text-center">
                                                                {item.value || 'N/A'}
                                                            </p>
                                                        )}
                                                    </div>
                                                </motion.div>
                                            );
                                        })}
                                    </div>


                                    <div className="bg-[#061121]/50 p-8 md:p-12 rounded-[2rem] border border-[#D4AF37]/10 relative shadow-inner w-full mx-auto max-w-4xl mb-12">
                                        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#040C1A] border border-[#D4AF37]/30 px-6 py-1.5 rounded-full shadow-md">
                                            <span className="text-[#D4AF37] text-[9px] md:text-[10px] uppercase tracking-[0.2em] font-bold">Daily Mantra</span>
                                        </div>

                                        <div className="pt-4 flex flex-col items-center">
                                            <motion.div
                                                initial={{ scale: 0.9, opacity: 0 }}
                                                animate={{ scale: 1, opacity: 1 }}
                                                className="text-[#F5D76E] text-2xl md:text-4xl font-serif text-center mb-8 drop-shadow-[0_0_10px_rgba(245,215,110,0.4)]"
                                            >
                                                {getDailyMantra(guidanceData.sign)}
                                            </motion.div>

                                            <div className="w-16 h-[1px] bg-[#D4AF37]/20 mb-8"></div>

                                            <p className="text-[#E5E0D8] text-xl md:text-[22px] italic text-center leading-relaxed font-light opacity-90 px-2 lg:px-12">
                                                "{guidanceData.description}"
                                            </p>

                                            <div className="mt-10 flex items-center justify-center gap-4 text-[#D4AF37]/60">
                                                <FaHandsPraying />
                                                <span className="text-[10px] uppercase tracking-[0.3em] font-bold whitespace-nowrap">Receive This Grace</span>
                                                <FaHandsPraying />
                                            </div>
                                        </div>
                                    </div>

                                    {/* ── Extended Horoscope Section ── */}
                                    {guidanceData && calculatedSign && (
                                        <div className="w-full mt-16 border-t border-[#D4AF37]/10 pt-14">
                                            <div className="text-center mb-10">
                                                <p className="text-stone-400 text-[10px] uppercase tracking-[0.5em] font-black mb-3">Deeper Cosmic Insights</p>
                                                <div className="flex justify-center gap-4 flex-wrap">
                                                    {(['weekly', 'monthly'] as const).map(period => (
                                                        <button
                                                            key={period}
                                                            onClick={async () => {
                                                                if (extendedPeriod === period) { setExtendedPeriod(null); setExtendedHoroscope(null); return; }
                                                                setExtendedLoading(true);
                                                                setExtendedPeriod(period);
                                                                setExtendedHoroscope(null);
                                                                try {
                                                                    const data = await getExtendedHoroscope(calculatedSign, period);
                                                                    setExtendedHoroscope(data);
                                                                } catch (e) {
                                                                    setExtendedHoroscope({ horoscope: 'Could not fetch horoscope at this time.' });
                                                                } finally {
                                                                    setExtendedLoading(false);
                                                                }
                                                            }}
                                                            className={`capitalize px-8 py-3 rounded-full text-[11px] uppercase tracking-[0.25em] font-black transition-all duration-300 border
                                                                ${extendedPeriod === period
                                                                    ? 'bg-[#D4AF37]/20 border-[#D4AF37] text-[#D4AF37] shadow-[0_0_25px_rgba(212,175,55,0.35)]'
                                                                    : 'bg-transparent border-[#D4AF37]/30 text-stone-400 hover:border-[#D4AF37]/70 hover:text-[#D4AF37] hover:shadow-[0_0_15px_rgba(212,175,55,0.2)]'
                                                                }`}
                                                        >
                                                            {period} Horoscope
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>

                                            {/* Result Card */}
                                            {(extendedLoading || extendedHoroscope) && (
                                                <motion.div
                                                    initial={{ opacity: 0, y: 20 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    className="relative max-w-4xl mx-auto"
                                                >
                                                    {/* Card Nebula Glow */}
                                                    <div className="absolute -inset-1 bg-gradient-to-br from-[#D4AF37]/10 via-transparent to-[#00E5FF]/10 rounded-[3rem] blur-xl pointer-events-none"></div>

                                                    <div className="relative bg-[#061121]/90 backdrop-blur-xl border border-[#D4AF37]/30 rounded-[2.5rem] p-10 shadow-[0_30px_60px_rgba(0,0,0,0.6)]">
                                                        {/* Header */}
                                                        <div className="flex items-center gap-4 mb-8 pb-6 border-b border-[#D4AF37]/15">
                                                            <div className="w-12 h-12 rounded-full bg-[#D4AF37]/10 flex items-center justify-center border border-[#D4AF37]/30 shadow-[0_0_15px_rgba(212,175,55,0.15)]">
                                                                <span className="text-xl text-[#00E5FF]"><FaHistory /></span>
                                                            </div>
                                                            <div>
                                                                <h5 className="text-[#D4AF37] font-serif font-black text-xl md:text-2xl capitalize">{extendedPeriod} Horoscope</h5>
                                                                <p className="text-stone-500 text-[10px] uppercase tracking-[0.3em] mt-1">{calculatedSign} • Cosmic Reading</p>
                                                            </div>
                                                        </div>

                                                        {/* Content */}
                                                        {extendedLoading ? (
                                                            <div className="flex flex-col items-center justify-center py-16 gap-4">
                                                                <div className="w-10 h-10 border-2 border-[#D4AF37]/30 border-t-[#D4AF37] rounded-full animate-spin"></div>
                                                                <p className="text-stone-500 text-xs uppercase tracking-widest">Reading the cosmos…</p>
                                                            </div>
                                                        ) : extendedHoroscope ? (
                                                            <div className="space-y-6">
                                                                {/* Full horoscope text broken into readable paragraphs */}
                                                                {(extendedHoroscope.horoscope || '').split(/(?<=[.!?])\s+(?=[A-Z])/).map((para, idx) => (
                                                                    para.trim() && (
                                                                        <p key={idx} className="text-[#E5E0D8] text-base leading-relaxed font-light opacity-90">
                                                                            {para.trim()}
                                                                        </p>
                                                                    )
                                                                ))}
                                                            </div>
                                                        ) : null}
                                                    </div>
                                                </motion.div>
                                            )}
                                        </div>
                                    )}

                                    {/* ── Sacred Cosmic Dashboard ───────────────────────────── */}
                                    {panchangData && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 30 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="w-full relative mt-16 pt-20 pb-12 overflow-hidden rounded-[3rem]"
                                        >
                                            {/* Deep Cosmic Background */}
                                            <div className="absolute inset-0 pointer-events-none z-0">
                                                {/* Nebula Glow */}
                                                <div className="absolute top-[20%] left-[10%] w-[600px] h-[600px] bg-[#00E5FF]/5 rounded-full blur-[120px] mix-blend-screen opacity-50 animate-pulse"></div>
                                                <div className="absolute bottom-[10%] right-[10%] w-[500px] h-[500px] bg-[#D4AF37]/5 rounded-full blur-[100px] mix-blend-screen opacity-40"></div>

                                                {/* Slow Rotating Orbit Lines */}
                                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120vw] h-[120vw] md:w-[80vw] md:h-[80vw] border border-white/5 rounded-full animate-[spin_40s_linear_infinite] opacity-30"></div>
                                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] h-[90vw] md:w-[60vw] md:h-[60vw] border border-white/5 rounded-full animate-[spin_30s_linear_infinite_reverse] opacity-20"></div>

                                                {/* Subtle Star Particles */}
                                                <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay bg-noise"></div>
                                            </div>

                                            <div className="relative z-10 max-w-7xl mx-auto px-4 lg:px-8">
                                                <div className="text-center mb-16">
                                                    <h4 className="text-[#D4AF37] text-4xl md:text-6xl tracking-[0.1em] uppercase font-serif font-black mb-6 drop-shadow-[0_10px_10px_rgba(0,0,0,0.5)]">Sacred Panchang</h4>
                                                    <div className="w-48 h-[3px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mx-auto opacity-80 mb-6"></div>
                                                    <p className="text-stone-300 text-xs md:text-sm uppercase tracking-[0.6em] font-black opacity-90 drop-shadow-sm font-serif">Aligning with the Universe</p>
                                                </div>

                                                <div className="flex flex-col gap-10">

                                                    {/* TOP ROW – SOLAR & LUNAR TIMINGS */}
                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                                        {/* Sun Timings */}
                                                        <div className="bg-[#0a1a2f]/80 backdrop-blur-xl border border-[#D4AF37]/20 rounded-[2.5rem] p-8 shadow-[0_0_30px_rgba(0,0,0,0.5)] relative overflow-hidden group hover:border-[#F5D76E]/40 transition-all duration-500">
                                                            <div className="absolute -top-6 -right-6 w-32 h-32 opacity-20 pointer-events-none group-hover:scale-110 group-hover:opacity-30 transition-all duration-700" style={{ maskImage: 'radial-gradient(circle, black 40%, transparent 80%)', WebkitMaskImage: 'radial-gradient(circle, black 40%, transparent 80%)' }}>
                                                                <img src="/sun.png" alt="" className="w-full h-full object-contain mix-blend-screen" />
                                                            </div>
                                                            <h5 className="text-[#F5D76E] text-xs uppercase tracking-[0.4em] font-black mb-8 flex items-center gap-3">
                                                                <span className="bg-[#F5D76E]/10 p-2 rounded-lg border border-[#F5D76E]/20 text-lg shadow-[0_0_15px_rgba(245,215,110,0.1)]">
                                                                    <FaSun />
                                                                </span>
                                                                Solar Cycle
                                                            </h5>

                                                            <div className="flex justify-between items-end mb-6">
                                                                <div>
                                                                    <p className="text-stone-400 text-[10px] uppercase tracking-widest mb-1">Sunrise</p>
                                                                    <p className="text-[#F5D76E] text-2xl font-serif font-black">{panchangData.sunrise ? fmtTime(panchangData.sunrise) : '—'}</p>
                                                                </div>
                                                                <div className="text-right">
                                                                    <p className="text-stone-400 text-[10px] uppercase tracking-widest mb-1">Sunset</p>
                                                                    <p className="text-[#F5D76E] text-2xl font-serif font-black">{panchangData.sunset ? fmtTime(panchangData.sunset) : '—'}</p>
                                                                </div>
                                                            </div>

                                                            {/* Sun Progress Bar */}
                                                            <div className="w-full h-1.5 bg-black/40 rounded-full overflow-hidden mt-8 relative">
                                                                {(() => {
                                                                    if (!panchangData.sunrise || !panchangData.sunset) return null;
                                                                    const now = new Date();
                                                                    const start = new Date(panchangData.sunrise);
                                                                    const end = new Date(panchangData.sunset);
                                                                    let progress = 0;
                                                                    if (now > start && now < end) {
                                                                        progress = ((now.getTime() - start.getTime()) / (end.getTime() - start.getTime())) * 100;
                                                                    } else if (now >= end) {
                                                                        progress = 100;
                                                                    }
                                                                    return (
                                                                        <div
                                                                            className="absolute top-0 left-0 h-full bg-gradient-to-r from-[#D4AF37] to-[#F5D76E] shadow-[0_0_10px_#F5D76E] transition-all duration-1000"
                                                                            style={{ width: `${progress}%` }}
                                                                        ></div>
                                                                    );
                                                                })()}
                                                            </div>
                                                            <p className="text-center text-stone-500 text-[9px] uppercase tracking-widest mt-3">Daylight Progress</p>
                                                        </div>

                                                        {/* Moon Timings */}
                                                        <div className="bg-[#0a1a2f]/80 backdrop-blur-xl border border-[#B8C0FF]/20 rounded-[2.5rem] p-8 shadow-[0_0_30px_rgba(0,0,0,0.5)] relative overflow-hidden group hover:border-[#B8C0FF]/40 transition-all duration-500">
                                                            <div className="absolute -bottom-6 -right-6 w-32 h-32 opacity-[0.15] pointer-events-none group-hover:scale-110 group-hover:opacity-[0.25] transition-all duration-700" style={{ maskImage: 'radial-gradient(circle, black 40%, transparent 80%)', WebkitMaskImage: 'radial-gradient(circle, black 40%, transparent 80%)' }}>
                                                                <img src="/moon.png" alt="" className="w-full h-full object-contain mix-blend-screen" />
                                                            </div>
                                                            <h5 className="text-[#B8C0FF] text-xs uppercase tracking-[0.4em] font-black mb-8 flex items-center gap-3">
                                                                <span className="bg-[#B8C0FF]/10 p-2 rounded-lg border border-[#B8C0FF]/20 text-lg shadow-[0_0_15px_rgba(184,192,255,0.1)]">
                                                                    <FaMoon />
                                                                </span>
                                                                Lunar Cycle
                                                            </h5>

                                                            <div className="flex justify-between items-end mb-6">
                                                                <div>
                                                                    <p className="text-stone-400 text-[10px] uppercase tracking-widest mb-1">Moonrise</p>
                                                                    <p className="text-[#B8C0FF] text-2xl font-serif font-black">{panchangData.moonrise ? fmtTime(panchangData.moonrise) : '—'}</p>
                                                                </div>
                                                                <div className="text-right">
                                                                    <p className="text-stone-400 text-[10px] uppercase tracking-widest mb-1">Moonset</p>
                                                                    <p className="text-[#B8C0FF] text-2xl font-serif font-black">{panchangData.moonset ? fmtTime(panchangData.moonset) : '—'}</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {/* SECOND ROW – TODAY'S PANCHANG */}
                                                    <div className="bg-gradient-to-br from-[#061121]/90 to-[#0a1a2f]/90 backdrop-blur-xl border border-[#D4AF37]/30 rounded-[3rem] p-10 flex flex-col md:flex-row items-center justify-between gap-12 shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative overflow-hidden group hover:border-[#D4AF37]/50 transition-all duration-700">
                                                        <div className="w-full md:w-1/2 z-10">
                                                            <h5 className="text-[#D4AF37] text-sm uppercase tracking-[0.4em] font-black mb-10 pb-4 border-b border-[#D4AF37]/20">Panchang Elements</h5>
                                                            <ul className="space-y-6">
                                                                {[
                                                                    { label: 'Tithi', val: panchangData.tithi?.[0]?.name || panchangData.tithi?.name || '—', icon: <FaMoon /> },
                                                                    { label: 'Nakshatra', val: panchangData.nakshatra?.[0]?.name || panchangData.nakshatra?.name || '—', icon: <FaStar /> },
                                                                    { label: 'Yoga', val: panchangData.yoga?.[0]?.name || panchangData.yoga?.name || '—', icon: <FaSun /> },
                                                                    { label: 'Karana', val: panchangData.karana?.[0]?.name || panchangData.karana?.name || '—', icon: <FaCaretUp /> },
                                                                    { label: 'Rashi', val: panchangData.today_rashi || calculatedSign || '—', icon: <FaStarOfLife /> },
                                                                ].map((item, idx) => (
                                                                    <li key={idx} className="flex justify-between items-center bg-white/[0.02] border border-white/5 p-4 rounded-2xl hover:bg-white/[0.05] transition-colors">
                                                                        <div className="flex items-center gap-4">
                                                                            <span className="text-2xl text-[#D4AF37] drop-shadow-[0_0_10px_rgba(212,175,55,0.4)]">{item.icon}</span>
                                                                            <span className="text-stone-400 text-[10px] uppercase tracking-[0.3em] font-black">{item.label}</span>
                                                                        </div>
                                                                        <span className="text-white text-lg md:text-xl font-serif font-black">{item.val}</span>
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        </div>

                                                        <div className="w-full md:w-1/2 flex justify-center items-center relative z-10">
                                                            {/* Premium Zodiac Illustration */}
                                                            <div className="relative w-72 h-72 md:w-[28rem] md:h-[28rem] flex items-center justify-center">
                                                                {/* Background Glows */}
                                                                <div className="absolute inset-0 bg-[#D4AF37]/15 rounded-full blur-[80px] animate-pulse"></div>

                                                                {/* Circular Image Container with Golden Border */}
                                                                <motion.div
                                                                    className="w-full h-full rounded-full overflow-hidden border border-[#D4AF37]/40 shadow-[0_0_50px_rgba(0,0,0,0.5)] relative z-10"
                                                                    animate={{ rotate: 360 }}
                                                                    transition={{
                                                                        duration: 120,
                                                                        repeat: Infinity,
                                                                        ease: "linear"
                                                                    }}
                                                                >
                                                                    <img
                                                                        src="/2276.jpg"
                                                                        alt="Zodiac Chart"
                                                                        className="w-full h-full object-cover"
                                                                    />
                                                                    {/* Subtle Dark Overlay to help it blend with the theme */}
                                                                    <div className="absolute inset-0 bg-black/10 pointer-events-none"></div>
                                                                </motion.div>

                                                                {/* Orbiting Sparkles */}
                                                                <motion.div
                                                                    className="absolute inset-[-20px] pointer-events-none z-20"
                                                                    animate={{ rotate: -360 }}
                                                                    transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                                                                >
                                                                    {[...Array(8)].map((_, i) => (
                                                                        <motion.div
                                                                            key={i}
                                                                            className="absolute w-1 h-1 bg-[#D4AF37] rounded-full"
                                                                            style={{
                                                                                top: '50%',
                                                                                left: '50%',
                                                                                transform: `rotate(${i * 45}deg) translateY(-160px)`,
                                                                                boxShadow: '0 0 10px #D4AF37, 0 0 20px #D4AF37'
                                                                            }}
                                                                            animate={{
                                                                                opacity: [0.2, 0.8, 0.2]
                                                                            }}
                                                                            transition={{
                                                                                duration: 2 + Math.random() * 2,
                                                                                repeat: Infinity,
                                                                                delay: i * 0.5
                                                                            }}
                                                                        />
                                                                    ))}
                                                                </motion.div>

                                                                {/* Subtle Outer Ring for depth */}
                                                                <div className="absolute inset-[-15px] border border-[#D4AF37]/10 rounded-full animate-[spin_60s_linear_infinite_reverse]"></div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {/* THIRD ROW – TIME RECOMMENDATIONS */}
                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                                        {/* Good Times */}
                                                        <div className="bg-[#0a1a2f]/80 backdrop-blur-xl border border-[#4ade80]/20 rounded-[2.5rem] p-8 shadow-[0_0_30px_rgba(0,0,0,0.5)] hover:border-[#4ade80]/40 transition-all duration-500">
                                                            <h5 className="text-[#4ade80] text-xs uppercase tracking-[0.4em] font-black mb-8 pb-4 border-b border-[#4ade80]/20 flex items-center gap-3">
                                                                <span className="bg-[#4ade80]/10 p-2 rounded-full border border-[#4ade80]/30 shadow-[0_0_15px_rgba(74,222,128,0.2)]"><FaCheck className="text-[#4ade80]" /></span> Auspicious Timings
                                                            </h5>
                                                            <div className="space-y-4">
                                                                {([
                                                                    ...(panchangData.auspicious_period || []),
                                                                    ...(panchangData.brahma_muhurat ? [{ name: 'Brahma Muhurat', type: 'Auspicious', period: panchangData.brahma_muhurat }] : [])
                                                                ])
                                                                    .filter((p: any) => ['Abhijit', 'Amrit', 'Vijay', 'Brahma'].some(n => p.name.includes(n)))
                                                                    .filter((p: any, idx: number, self: any[]) => idx === self.findIndex((t: any) => t.name === p.name))
                                                                    .map((p: any, i: number) => (
                                                                        <div key={i} className="flex justify-between items-center bg-[#4ade80]/5 border border-[#4ade80]/10 p-5 rounded-[1.5rem] hover:bg-[#4ade80]/10 hover:scale-[1.02] transition-all cursor-default">
                                                                            <span className="text-white text-[11px] font-bold uppercase tracking-widest">{p.name}</span>
                                                                            <span className="text-[#4ade80] text-sm md:text-base tabular-nums tracking-wider font-black italic">
                                                                                {fmtTime(getPeriodStart(p))} – {fmtTime(getPeriodEnd(p))}
                                                                            </span>
                                                                        </div>
                                                                    ))}
                                                                {(!panchangData.auspicious_period || panchangData.auspicious_period.length === 0) && (
                                                                    <p className="text-stone-500 text-xs italic text-center py-4">No major auspicious timings found.</p>
                                                                )}
                                                            </div>
                                                        </div>

                                                        {/* Avoid Times */}
                                                        <div className="bg-[#0a1a2f]/80 backdrop-blur-xl border border-[#f87171]/20 rounded-[2.5rem] p-8 shadow-[0_0_30px_rgba(0,0,0,0.5)] hover:border-[#f87171]/40 transition-all duration-500">
                                                            <h5 className="text-[#f87171] text-xs uppercase tracking-[0.4em] font-black mb-8 pb-4 border-b border-[#f87171]/20 flex items-center gap-3">
                                                                <span className="bg-[#f87171]/10 p-2 rounded-full border border-[#f87171]/30 shadow-[0_0_15px_rgba(248,113,113,0.2)]"><FaTimes className="text-[#f87171]" /></span> Times to Avoid
                                                            </h5>
                                                            <div className="space-y-4">
                                                                {(panchangData.inauspicious_period || [])
                                                                    .filter((p: any) => ['Rahu', 'Yamaganda', 'Gulika', 'Dur'].some(n => p.name.includes(n)))
                                                                    .filter((p: any, idx: number, self: any[]) => idx === self.findIndex((t: any) => t.name === p.name))
                                                                    .map((p: any, i: number) => (
                                                                        <div key={i} className="flex justify-between items-center bg-[#f87171]/5 border border-[#f87171]/10 p-5 rounded-[1.5rem] hover:bg-[#f87171]/10 hover:scale-[1.02] transition-all cursor-default">
                                                                            <span className="text-white text-[11px] font-bold uppercase tracking-widest">{p.name}</span>
                                                                            <span className="text-[#fca5a5] text-sm md:text-base tabular-nums tracking-wider font-black italic opacity-90">
                                                                                {fmtTime(getPeriodStart(p))} – {fmtTime(getPeriodEnd(p))}
                                                                            </span>
                                                                        </div>
                                                                    ))}
                                                                {(!panchangData.inauspicious_period || panchangData.inauspicious_period.length === 0) && (
                                                                    <p className="text-stone-500 text-xs italic text-center py-4">No major inauspicious timings found.</p>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>


                                                </div>
                                            </div>
                                        </motion.div>
                                    )}


                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </section>
    );
};

export default DailyGuidance;
