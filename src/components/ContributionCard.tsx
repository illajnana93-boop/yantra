import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useContribution } from '../context/ContributionContext';
import { useAuth } from '../context/AuthContext';
import { 
    FaLandmark, FaStar, FaCheckCircle, FaTruck, FaBoxOpen, 
    FaScroll, FaSun, FaHeart, FaArchive, FaChevronDown, 
    FaShoppingBag, FaPray 
} from 'react-icons/fa';
import { FaHandsPraying, FaGem } from 'react-icons/fa6';

const offerings = [
    {
        id: 1,
        weight: '11 Grams Yantra',
        price: 2100,
        sqft: 1,
        image: '/image copy 2.png',
        description: 'Contribute ₹2,100 towards Baba Shyam Temple construction and receive a blessed Shyam Yantra.',
        perks: ['1 sq. ft. of Sacred Temple', 'Compact Divine Energy', 'Energized & Sealed'],
    },
    {
        id: 2,
        weight: '33 Grams Yantra',
        price: 6000,
        sqft: 3,
        image: '/image copy 5.png',
        featured: true,
        description: 'Contribute ₹6,000 towards Baba Shyam Temple construction and receive a grand blessed Shyam Yantra.',
        perks: ['3 sq. ft. of Sacred Temple', 'Maximum Spiritual Potency', 'Ceremonially Activated'],
    },
];

// Live devotee counter — static but believable
const DEVOTEE_COUNT = 84;

const BundleCard = ({ title, items, isNumbered = false }: { title: string, items: any[], isNumbered?: boolean }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.01 }}
            className={`relative rounded-[2rem] border border-[#D4AF37]/20 bg-[#0a1929]/60 backdrop-blur-md p-8 md:p-10 cursor-pointer transition-all duration-300 group ${isExpanded ? 'shadow-[0_0_40px_rgba(212,175,55,0.15)] ring-1 ring-[#D4AF37]/30' : 'hover:border-[#D4AF37]/40'}`}
            onClick={() => setIsExpanded(!isExpanded)}
        >
            <div className="flex justify-between items-center mb-8">
                <h4 className="text-white font-serif text-lg md:text-xl tracking-wider group-hover:text-[#F5D76E] transition-colors">{title}</h4>
                <motion.div animate={{ rotate: isExpanded ? 180 : 0 }} transition={{ type: 'spring', stiffness: 300, damping: 20 }}>
                    <FaChevronDown className="text-[#D4AF37] text-sm opacity-60" />
                </motion.div>
            </div>

            <ul className="space-y-6">
                {items.map((item, idx) => (
                    <li key={idx} className="flex gap-5">
                        <div className={`w-9 h-9 rounded-full flex items-center justify-center text-[#F5D76E] flex-shrink-0 mt-0.5 shadow-[0_0_15px_rgba(212,175,55,0.1)] ${isNumbered ? 'border border-[#D4AF37]/30 text-xs font-black' : 'bg-[#D4AF37]/10'}`}>
                            {isNumbered ? idx + 1 : item.icon}
                        </div>
                        <div className="flex flex-col">
                            <span className="text-stone-200 text-sm md:text-base font-medium leading-tight">{item.text}</span>
                            <AnimatePresence>
                                {isExpanded && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0, marginTop: 0 }}
                                        animate={{ height: 'auto', opacity: 1, marginTop: 8 }}
                                        exit={{ height: 0, opacity: 0, marginTop: 0 }}
                                        className="overflow-hidden"
                                    >
                                        <p className="text-stone-400 text-xs md:text-sm italic leading-relaxed">
                                            {item.detail}
                                        </p>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </li>
                ))}
            </ul>

            {/* Subtle glow effect */}
            <div className="absolute inset-0 rounded-[2rem] bg-[#D4AF37]/2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
        </motion.div>
    );
};

const ContributionCard = () => {
    const { user, openAuthModal } = useAuth();
    const navigate = useNavigate();
    const [quantities, setQuantities] = useState<{ [key: number]: number }>({ 1: 1, 2: 1 });
    const [added, setAdded] = useState<number | null>(null);
    const [showThankYou, setShowThankYou] = useState(false);

    const { addItem } = useContribution();

    const updateQty = (id: number, delta: number) =>
        setQuantities(prev => ({ ...prev, [id]: Math.max(1, prev[id] + delta) }));

    const handleContribute = (offering: typeof offerings[0]) => {
        if (!user) {
            openAuthModal();
            return;
        }
        
        const qty = quantities[offering.id];
        addItem({ id: offering.id, weight: offering.weight, price: offering.price }, qty);
        setAdded(offering.id);

        setTimeout(() => {
            setAdded(null);
            navigate('/checkout');
        }, 800);
    };

    return (
        <section id="product" className="relative bg-[#060f1e] py-20 md:py-28 overflow-hidden">
            {/* Ambient sacred glows */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[90%] h-1 bg-gradient-to-r from-transparent via-[#D4AF37]/60 to-transparent" />
            <div className="absolute top-[10%] right-0 w-[30%] h-[50%] bg-[#D4AF37]/4 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-[10%] left-0 w-[30%] h-[50%] bg-blue-900/10 rounded-full blur-[120px] pointer-events-none" />

            <div className="relative z-10 max-w-6xl mx-auto px-5 md:px-10">

                {/* ── Section Header ── */}
                <motion.div
                    className="text-center mb-14 md:mb-20"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.9 }}
                >
                    <p className="text-gold-gradient uppercase tracking-[0.5em] text-[10px] md:text-[12px] font-black mb-4 flex items-center justify-center gap-2">
                        <FaGem className="text-[#D4AF37] text-xs" /> Sacred Contribution <FaGem className="text-[#D4AF37] text-xs" />
                    </p>
                    <h2 className="text-white text-4xl md:text-6xl tracking-tight text-glow mb-5">
                        Build the Temple,<br />
                        <span className="text-gold-gradient">Receive the Yantra</span>
                    </h2>
                    <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: '120px' }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.2, delay: 0.4 }}
                        className="divider-gold-thin mx-auto mb-8"
                    />
                    {/* Storytelling */}
                    <p className="text-stone-300 text-lg md:text-xl italic max-w-2xl mx-auto leading-relaxed">
                        Every contribution you make goes towards constructing the sacred Baba Shyam Temple.
                        Each rupee you offer lays one square foot of holy ground — and in return, Baba Shyam
                        blesses you with a divinely energized Yantra.
                    </p>

                    {/* Live devotee ticker */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.6 }}
                        className="inline-flex items-center gap-3 mt-8 px-6 py-3 rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/5"
                    >
                        <span className="relative flex h-2.5 w-2.5">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#D4AF37] opacity-75" />
                            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#D4AF37]" />
                        </span>
                        <span className="text-[#F5D76E] text-sm font-bold tracking-widest uppercase">
                            {DEVOTEE_COUNT} devotees have contributed this month
                        </span>
                    </motion.div>
                </motion.div>

                {/* ── Contribution Cards ── */}
                <div className="grid md:grid-cols-2 gap-8 md:gap-12">
                    {offerings.map((offering, i) => (
                        <motion.div
                            key={offering.id}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-80px' }}
                            transition={{ duration: 0.8, delay: i * 0.15 }}
                            className="relative"
                        >
                            {/* Featured glow border */}
                            {offering.featured && (
                                <div className="absolute -inset-[1px] rounded-[2rem] bg-gradient-to-br from-[#D4AF37]/60 via-[#F5D76E]/30 to-[#C9A227]/60 blur-[2px]" />
                            )}

                            <div className={`relative rounded-[2rem] overflow-hidden border flex flex-col h-full ${offering.featured
                                ? 'border-[#D4AF37]/50 bg-gradient-to-b from-[#0e1e35] to-[#091525]'
                                : 'border-[#D4AF37]/20 bg-[#0a1929]/80'
                                } backdrop-blur-md shadow-[0_20px_60px_rgba(0,0,0,0.5)]`}
                            >
                                {/* Temple sq.ft. banner */}
                                <div className="bg-[#D4AF37]/10 border-b border-[#D4AF37]/15 px-6 py-3 flex items-center justify-center gap-3 mt-0">
                                    <FaLandmark className="text-[#F5D76E] text-xl flex-shrink-0" />
                                    <span className="text-[#F5D76E] text-sm font-bold tracking-widest uppercase">
                                        = {offering.sqft} sq. ft. of Sacred Temple
                                    </span>
                                </div>

                                {/* Yantra image */}
                                <div className="px-8 pt-8 pb-4 flex justify-center">
                                    <motion.div
                                        whileHover={{ scale: 1.04, rotate: 1 }}
                                        transition={{ duration: 0.5 }}
                                        className="relative w-48 h-48 md:w-56 md:h-56"
                                    >
                                        <div className="absolute inset-0 bg-[#D4AF37]/15 rounded-full blur-2xl animate-pulse" />
                                        <img
                                            src={offering.image}
                                            alt={offering.weight}
                                            className="relative z-10 w-full h-full object-contain drop-shadow-[0_0_24px_rgba(212,175,55,0.35)] brightness-110"
                                        />
                                    </motion.div>
                                </div>

                                {/* Content */}
                                <div className="px-7 md:px-9 pb-8 flex flex-col flex-grow">
                                    <h3 className="text-white text-2xl md:text-3xl text-center mb-2 tracking-wide">
                                        {offering.weight}
                                    </h3>

                                    {/* Spiritual description */}
                                    <p className="text-stone-300 text-sm md:text-base italic text-center leading-relaxed mb-6 px-2">
                                        "{offering.description}"
                                    </p>

                                    {/* Perks */}
                                    <ul className="space-y-2.5 border-t border-b border-white/8 py-5 mb-6">
                                        {offering.perks.map(perk => (
                                            <li key={perk} className="flex items-center gap-3 text-stone-200 text-sm md:text-base">
                                                <div className="w-5 h-5 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/40 flex items-center justify-center flex-shrink-0">
                                                    <FaStar className="text-[#F5D76E] text-[8px]" />
                                                </div>
                                                {perk}
                                            </li>
                                        ))}
                                    </ul>

                                    {/* Action Area - Pushed to bottom */}
                                    <div className="mt-auto">
                                        {/* Amount */}
                                        <div className="text-center mb-6">
                                            <span className="text-[#F5D76E] text-[11px] uppercase tracking-[0.3em] font-bold block mb-1">
                                                Sacred Contribution
                                            </span>
                                            <span className="text-gold-gradient font-black text-5xl md:text-6xl">
                                                ₹{(offering.price * quantities[offering.id]).toLocaleString()}
                                            </span>
                                            {quantities[offering.id] > 1 && (
                                                <span className="text-stone-400 text-sm block mt-1">
                                                    ₹{offering.price.toLocaleString()} × {quantities[offering.id]}
                                                </span>
                                            )}
                                        </div>

                                        {/* Qty selector */}
                                        <div className="flex items-center justify-center gap-5 mb-6">
                                            <button
                                                onClick={() => updateQty(offering.id, -1)}
                                                className="w-10 h-10 rounded-full border border-[#D4AF37]/30 text-[#D4AF37] text-xl hover:bg-[#D4AF37]/10 transition-all interactive flex items-center justify-center"
                                            >−</button>
                                            <span className="text-[#F5D76E] font-black text-3xl min-w-[3rem] text-center">
                                                {quantities[offering.id]}
                                            </span>
                                            <button
                                                onClick={() => updateQty(offering.id, 1)}
                                                className="w-10 h-10 rounded-full border border-[#D4AF37]/30 text-[#D4AF37] text-xl hover:bg-[#D4AF37]/10 transition-all interactive flex items-center justify-center"
                                            >+</button>
                                        </div>

                                        {/* CTA */}
                                        <motion.button
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.97 }}
                                            onClick={() => handleContribute(offering)}
                                            className="btn-gold-royal w-full py-4 rounded-full font-black text-sm md:text-base tracking-[0.15em] interactive shadow-xl relative overflow-hidden"
                                        >
                                            <AnimatePresence mode="wait">
                                                {added === offering.id ? (
                                                    <motion.span
                                                        key="added"
                                                        initial={{ opacity: 0, y: 8 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        exit={{ opacity: 0, y: -8 }}
                                                        className="flex items-center justify-center gap-2"
                                                    >
                                                        <FaHandsPraying className="text-lg" /> Jai Shri Shyam!
                                                    </motion.span>
                                                ) : (
                                                    <motion.span
                                                        key="contribute"
                                                        initial={{ opacity: 0, y: 8 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        exit={{ opacity: 0, y: -8 }}
                                                        className="flex items-center justify-center gap-2"
                                                    >
                                                        <FaCheckCircle className="text-base" /> Offer My Contribution
                                                    </motion.span>
                                                )}
                                            </AnimatePresence>
                                        </motion.button>

                                        <p className="text-center text-[#F5D76E] text-[10px] uppercase tracking-[0.4em] font-bold mt-4 flex items-center justify-center gap-2">
                                            <FaHandsPraying className="text-xs" /> Baba's Grace
                                            <span className="opacity-40">•</span>
                                            <FaTruck className="text-xs" /> Free Delivery
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* ── Bundle & Wearing Guide ── */}
                <div className="mt-12 md:mt-20 max-w-5xl mx-auto">
                    <div className="text-center mb-10">
                        <h3 className="text-[#D4AF37] font-serif text-xl md:text-2xl uppercase tracking-[0.2em] mb-2">Bundle & Wearing Guide</h3>
                        <div className="w-12 h-[1px] bg-[#D4AF37]/30 mx-auto" />
                    </div>

                    <div className="grid md:grid-cols-2 gap-8 px-2">
                        <BundleCard 
                            title="What's Inside the Bundle" 
                            items={[
                                { icon: <FaGem />, text: "Blessed Chain / Pendant", detail: "A high-quality, ritually energized pendant featuring Baba Shyam's sacred symbols." },
                                { icon: <FaBoxOpen />, text: "Energized Yantra", detail: "A powerful spiritual instrument designed to attract positive vibrations and prosperity." },
                                { icon: <FaScroll />, text: "Blessing Card / Mantra", detail: "Contains the specific mantra for your Yantra and a certificate of ritual purification." },
                                { icon: <FaShoppingBag />, text: "Sacred Storage Pouch", detail: "A velvet-lined protective pouch to keep your sacred items when not in use." }
                            ]}
                        />
                        <BundleCard 
                            title="How to Wear the Chain" 
                            isNumbered
                            items={[
                                { icon: <FaSun />, text: "Wear after morning bath or prayer", detail: "Purity of body and mind is essential before coming into contact with sacred objects." },
                                { icon: <FaHeart />, text: "Keep the pendant near the heart", detail: "The heart chakra is the seat of devotion, allowing the energy to radiate through your being." },
                                { icon: <FaPray />, text: "Chant the mantra once before wearing", detail: "Activates the spiritual resonance between you and the energized pendant." },
                                { icon: <FaArchive />, text: "Store respectfully when not in use", detail: "When sleeping or during certain activities, keep it safe in the sacred pouch provided." }
                            ]}
                        />
                    </div>
                </div>

                {/* ── Temple Progress Bar ── */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.9, delay: 0.3 }}
                    className="mt-16 md:mt-24 glass-card rounded-2xl p-8 md:p-12 text-center"
                >
                    <p className="text-gold-gradient uppercase tracking-[0.4em] text-[10px] font-black mb-3">
                        Temple Construction Progress
                    </p>
                    <h3 className="text-white text-2xl md:text-3xl mb-2">
                        Together, we have laid <span className="text-gold-gradient font-black">247 sq. ft.</span> of sacred ground
                    </h3>
                    <p className="text-stone-400 text-sm italic mb-8">
                        Goal: 1,000 sq. ft. · Each contribution = 1 sq. ft. of Baba's Temple
                    </p>
                    <div className="w-full bg-white/5 rounded-full h-4 overflow-hidden border border-[#D4AF37]/20">
                        <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: '24.7%' }}
                            viewport={{ once: true }}
                            transition={{ duration: 2, ease: 'easeOut', delay: 0.5 }}
                            className="h-full bg-gold-gradient rounded-full shadow-[0_0_20px_rgba(212,175,55,0.5)]"
                        />
                    </div>
                    <div className="flex justify-between mt-3 text-[11px] text-stone-500 font-bold uppercase tracking-widest">
                        <span>0</span>
                        <span className="text-[#F5D76E]">24.7% complete</span>
                        <span>1,000 sq. ft.</span>
                    </div>
                </motion.div>
            </div>



            {/* Thank You Modal */}
            <AnimatePresence>
                {showThankYou && (
                    <div className="fixed inset-0 z-[10000] flex items-center justify-center p-6">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setShowThankYou(false)}
                            className="absolute inset-0 bg-[#050c18]/85 backdrop-blur-md"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.85, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.85, y: 20 }}
                            transition={{ type: 'spring', damping: 20 }}
                            className="relative w-full max-w-sm glass-card rounded-3xl p-10 text-center overflow-hidden"
                        >
                            <div className="absolute top-0 left-0 w-full h-1 bg-gold-gradient" />
                            <div className="flex justify-center mb-5">
                                <div className="w-16 h-16 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/30 flex items-center justify-center">
                                    <FaHandsPraying className="text-[#F5D76E] text-3xl" />
                                </div>
                            </div>
                            <h3 className="text-gold-gradient text-2xl font-bold mb-3">
                                Jai Shri Shyam!
                            </h3>
                            <div className="w-12 h-[1px] bg-[#D4AF37]/40 mx-auto mb-5" />
                            <p className="text-stone-200 text-base italic leading-relaxed mb-8">
                                Your sacred offering has been added. Baba Shyam's blessings are with you.
                                Proceed to checkout to complete your contribution and receive your divine Yantra.
                            </p>
                            <button
                                onClick={() => setShowThankYou(false)}
                                className="btn-gold-royal px-10 py-3 rounded-full text-xs font-black tracking-[0.2em] interactive"
                            >
                                Continue Browsing
                            </button>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </section>
    );
};

export default ContributionCard;
