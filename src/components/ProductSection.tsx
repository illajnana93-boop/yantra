import { motion } from 'framer-motion';
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

    const updateQuantity = (id: number, delta: number) => {
        setQuantities(prev => ({ ...prev, [id]: Math.max(1, prev[id] + delta) }));
    };

    return (
        <section id="product" className="relative bg-[#081629] py-16 md:py-32 overflow-hidden">
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

            <div className="grid md:grid-cols-2 gap-8 md:gap-16 max-w-6xl mx-auto px-6 md:px-10 relative z-10">
                {products.map((p, i) => (
                    <motion.div
                        key={p.id}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8, delay: i * 0.2 }}
                        className="glass-card p-8 md:p-12 group transition-all duration-700 hover:shadow-ambient-gold relative cursor-none interactive"
                    >
                        {/* Featured Badge */}
                        {p.featured && (
                            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gold-gradient text-[#0A1F3C] text-[9px] md:text-[11px] font-bold uppercase tracking-[0.2em] md:tracking-[0.3em] px-6 md:px-12 py-2 md:py-3 rounded-full shadow-2xl z-20 whitespace-nowrap">
                                Most Sacred Choice
                            </div>
                        )}

                        {/* Product Image Stage */}
                        <div className="relative mb-8 md:mb-12 flex justify-center">
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                className="w-full aspect-square bg-[#0A1F3C]/60 rounded-[2rem] md:rounded-[3rem] border border-[#D4AF37]/20 p-6 md:p-10 shadow-inner flex items-center justify-center relative overflow-hidden"
                            >
                                <img src={p.image} className="w-full h-full object-contain filter brightness-110 drop-shadow-2xl relative z-10" alt={p.weight} />
                            </motion.div>
                        </div>

                        {/* Content Area */}
                        <div className="text-center flex flex-col items-center">
                            <h3 className="text-white text-2xl md:text-3xl font-serif mb-3 md:mb-4 tracking-wide group-hover:text-gold-500 transition-colors duration-500">{p.weight}</h3>
                            <div className="text-gold-gradient font-bold text-4xl md:text-5xl mb-6 md:mb-8 filtering drop-shadow-sm">₹{p.price.toLocaleString()}</div>

                            <ul className="w-full space-y-4 md:space-y-5 py-6 md:py-10 border-y border-white/5 mb-8 md:mb-12">
                                {p.benefits.map((b) => (
                                    <li key={b} className="flex items-center justify-center gap-3 md:gap-4 text-[#F8F5F0] text-sm md:text-base font-medium tracking-wide">
                                        <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-gold-gradient shadow-ambient-gold"></div>
                                        {b}
                                    </li>
                                ))}
                            </ul>

                            {/* Interaction Area */}
                            <div className="w-full flex flex-col items-center gap-6 md:gap-10">
                                <div className="flex items-center gap-6 md:gap-8">
                                    <button onClick={() => updateQuantity(p.id, -1)} className="w-10 h-10 md:w-14 md:h-14 rounded-full border border-white/10 flex items-center justify-center text-white hover:bg-white/10 text-2xl font-light interactive">−</button>
                                    <span className="text-3xl md:text-4xl font-serif font-bold text-[#F5D76E] min-w-[3rem] md:min-w-[5rem]">{quantities[p.id]}</span>
                                    <button onClick={() => updateQuantity(p.id, 1)} className="w-10 h-10 md:w-14 md:h-14 rounded-full border border-white/10 flex items-center justify-center text-white hover:bg-white/10 text-2xl font-light interactive">+</button>
                                </div>

                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="btn-gold-royal w-full py-5 md:py-6 text-[11px] md:text-[13px] rounded-full interactive"
                                >
                                    Include in My Prayer
                                </motion.button>
                                <p className="text-[#F5D76E] text-[8px] md:text-[10px] font-bold uppercase tracking-[0.4em] md:tracking-[0.5em] opacity-60">Divine Grace • Free Shipping</p>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#0A1F3C] to-transparent"></div>
        </section>
    );
};

export default ProductSection;
