import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

const products = [
    {
        id: 1,
        weight: "11 Grams Yantra",
        price: 2100,
        benefits: ["Home Protection", "Compact Energy", "Ritualized Gold"],
        image: "/image copy 2.png"
    },
    {
        id: 2,
        weight: "33 Grams Yantra",
        price: 6000,
        benefits: ["Maximum Potency", "Divine Presence", "Sacred Activation"],
        image: "/image copy 5.png",
        featured: true
    }
];

const ProductSection = () => {
    const [quantities, setQuantities] = useState<{ [key: number]: number }>({ 1: 1, 2: 1 });
    const [showComingSoon, setShowComingSoon] = useState(false);

    const updateQuantity = (id: number, delta: number) => {
        setQuantities(prev => ({ ...prev, [id]: Math.max(1, prev[id] + delta) }));
    };

    return (
        <section id="product" className="relative bg-[#081629] pt-12 md:pt-16 pb-20 md:pb-24 overflow-hidden">
            {/* Ambient Lighting Background */}
            <div className="absolute inset-0 bg-ambient-glow opacity-30"></div>

            <div className="text-center mb-12 md:mb-24 relative z-10 px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                    className="flex flex-col items-center gap-4"
                >
                    <p className="text-gold-gradient uppercase tracking-[0.4em] md:tracking-[0.6em] text-[10px] md:text-[12px] font-black mb-2">Sacred Store</p>
                    <h2 className="text-white text-4xl md:text-7xl font-serif tracking-tight text-glow px-4">Devotional Offerings</h2>
                    <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: "120px" }}
                        transition={{ duration: 1.5, delay: 0.5 }}
                        className="divider-gold-thin mx-auto mt-6 md:mt-8"
                    ></motion.div>
                </motion.div>
            </div>

            <div className="grid md:grid-cols-2 gap-8 md:gap-10 max-w-6xl mx-auto px-6 md:px-10 relative z-10">
                {products.map((p, i) => (
                    <motion.div
                        key={p.id}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8, delay: i * 0.2 }}
                        className="glass-card p-6 md:p-10 group transition-all duration-700 hover:shadow-ambient-gold relative cursor-none interactive h-full flex flex-col"
                    >
                        {/* Featured Badge */}
                        {p.featured && (
                            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gold-gradient text-[#0A1F3C] text-[11px] md:text-[13px] font-black uppercase tracking-[0.2em] md:tracking-[0.3em] px-8 md:px-14 py-2.5 md:py-3.5 rounded-full shadow-2xl z-20 whitespace-nowrap">
                                Most Sacred Choice
                            </div>
                        )}

                        {/* Product Image Stage */}
                        <div className="relative mb-6 md:mb-8 flex justify-center">
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                className="w-full aspect-video md:aspect-square bg-[#0A1F3C]/60 rounded-[1.5rem] md:rounded-[2.5rem] border border-[#D4AF37]/20 p-4 md:p-8 shadow-inner flex items-center justify-center relative overflow-hidden"
                            >
                                <img src={p.image} className="w-full h-full object-contain filter brightness-110 drop-shadow-2xl relative z-10" alt={p.weight} />
                            </motion.div>
                        </div>

                        {/* Content Area */}
                        <div className="text-center flex flex-col items-center flex-grow justify-between gap-6">
                            <div>
                                <h3 className="text-white text-3xl md:text-4xl mb-2 md:mb-3 tracking-wide group-hover:text-gold-500 transition-colors duration-500 font-serif">{p.weight}</h3>
                                <div className="text-gold-gradient font-black text-4xl md:text-6xl mb-4 md:mb-6 filtering drop-shadow-sm">₹{p.price.toLocaleString()}</div>

                                <ul className="w-full space-y-3 md:space-y-4 py-4 md:py-6 border-y border-white/10 mb-2 md:mb-4">
                                    {p.benefits.map((b) => (
                                        <li key={b} className="flex items-center justify-center gap-3 md:gap-4 text-stone-100 text-base md:text-lg font-bold tracking-wide">
                                            <div className="w-2 h-2 rounded-full bg-gold-gradient shadow-ambient-gold"></div>
                                            {b}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Interaction Area */}
                            <div className="w-full flex flex-col items-center gap-5 md:gap-7 mt-auto">
                                <div className="flex items-center gap-6 md:gap-8">
                                    <button onClick={() => updateQuantity(p.id, -1)} className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white/10 text-xl md:text-2xl font-light interactive">−</button>
                                    <span className="text-3xl md:text-4xl font-serif font-black text-[#F5D76E] min-w-[3rem] md:min-w-[4rem]">{quantities[p.id]}</span>
                                    <button onClick={() => updateQuantity(p.id, 1)} className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white/10 text-xl md:text-2xl font-light interactive">+</button>
                                </div>

                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={() => setShowComingSoon(true)}
                                    className="btn-gold-royal w-full py-4 md:py-5 text-sm md:text-base font-black rounded-full interactive shadow-xl"
                                >
                                    Include in My Prayer
                                </motion.button>
                                <p className="text-[#F5D76E] text-[10px] md:text-[12px] font-black uppercase tracking-[0.4em] md:tracking-[0.5em]">Divine Grace • Free Shipping</p>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#0A1F3C] to-transparent"></div>

            {/* Coming Soon Modal */}
            <AnimatePresence>
                {showComingSoon && (
                    <div className="fixed inset-0 z-[10000] flex items-center justify-center p-6">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setShowComingSoon(false)}
                            className="absolute inset-0 bg-[#050c18]/80 backdrop-blur-md"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            className="relative w-full max-w-md glass-card p-10 md:p-12 text-center overflow-hidden"
                        >
                            {/* Decorative Elements */}
                            <div className="absolute top-0 left-0 w-full h-1 bg-gold-gradient"></div>
                            <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#D4AF37]/10 rounded-full blur-3xl"></div>

                            <div className="text-5xl md:text-6xl mb-6 filter drop-shadow-[0_0_15px_rgba(212,175,55,0.4)]">🕉️</div>

                            <h3 className="text-gold-gradient text-2xl md:text-3xl font-serif font-bold mb-4">Divine Grace Awaits</h3>
                            <div className="w-16 h-[1px] bg-[#D4AF37]/30 mx-auto mb-6"></div>

                            <p className="text-stone-200 text-lg leading-relaxed font-serif italic mb-8">
                                "The sacred digital gateway for devotee prayers is currently being ritualized. This feature will be available soon."
                            </p>

                            <button
                                onClick={() => setShowComingSoon(false)}
                                className="btn-gold-royal px-10 py-3.5 rounded-full text-xs font-bold tracking-[0.2em] outline-none interactive"
                            >
                                CLOSE
                            </button>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </section>
    );
};

export default ProductSection;
