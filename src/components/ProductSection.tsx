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
        <section id="product" className="relative bg-[#081629] py-32 overflow-hidden">
            {/* Ambient Lighting Background */}
            <div className="absolute inset-0 bg-ambient-glow opacity-30"></div>

            <div className="text-center mb-24 relative z-10 px-8">
                <div className="flex flex-col items-center gap-4">
                    <p className="text-gold-gradient uppercase tracking-[0.6em] text-[12px] font-black mb-2">Sacred Store</p>
                    <h2 className="text-white text-5xl md:text-7xl font-serif tracking-tight">Devotional Offerings</h2>
                    <div className="w-48 divider-gold-thin mx-auto mt-8"></div>
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-16 max-w-6xl mx-auto px-10 relative z-10">
                {products.map((p, i) => (
                    <motion.div
                        key={p.id}
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: i * 0.2 }}
                        className="glass-card p-12 group transition-all duration-700 hover:shadow-ambient-gold relative"
                    >
                        {/* Featured Badge Colors */}
                        {p.featured && (
                            <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-gold-gradient text-[#0A1F3C] text-[11px] font-bold uppercase tracking-[0.3em] px-12 py-3 rounded-full shadow-2xl z-20">
                                Most Sacred Choice
                            </div>
                        )}

                        {/* Product Image Stage */}
                        <div className="relative mb-12 flex justify-center">
                            <div className="w-full aspect-square bg-[#0A1F3C]/60 rounded-[3rem] border border-[#D4AF37]/20 p-10 shadow-inner flex items-center justify-center">
                                <img src={p.image} className="w-full h-full object-contain filter brightness-110 drop-shadow-2xl group-hover:scale-105 transition-transform duration-1000" alt={p.weight} />
                            </div>
                        </div>

                        {/* Content Area */}
                        <div className="text-center flex flex-col items-center">
                            <h3 className="text-white text-3xl font-serif mb-4 tracking-wide">{p.weight}</h3>
                            <div className="text-gold-gradient font-bold text-5xl mb-8 filtering drop-shadow-sm">₹{p.price.toLocaleString()}</div>

                            <ul className="w-full space-y-5 py-10 border-y border-white/5 mb-12">
                                {p.benefits.map((b) => (
                                    <li key={b} className="flex items-center justify-center gap-4 text-[#F8F5F0] font-medium tracking-wide">
                                        <div className="w-2 h-2 rounded-full bg-gold-gradient shadow-ambient-gold"></div>
                                        {b}
                                    </li>
                                ))}
                            </ul>

                            {/* Interaction Area */}
                            <div className="w-full flex flex-col items-center gap-10">
                                <div className="flex items-center gap-8">
                                    <button onClick={() => updateQuantity(p.id, -1)} className="w-14 h-14 rounded-full border border-white/10 flex items-center justify-center text-white hover:bg-white/10 transition-all text-3xl font-light">−</button>
                                    <span className="text-4xl font-serif font-bold text-[#F5D76E] min-w-[5rem]">{quantities[p.id]}</span>
                                    <button onClick={() => updateQuantity(p.id, 1)} className="w-14 h-14 rounded-full border border-white/10 flex items-center justify-center text-white hover:bg-white/10 transition-all text-3xl font-light">+</button>
                                </div>

                                <button className="btn-gold-royal w-full py-6 text-[13px] rounded-full">
                                    Include in My Prayer
                                </button>
                                <p className="text-[#F5D76E] text-[10px] font-bold uppercase tracking-[0.5em] opacity-60">Divine Grace • Free Shipping</p>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Subtle Gradient Transition */}
            <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#0A1F3C] to-transparent"></div>
        </section>
    );
};

export default ProductSection;
