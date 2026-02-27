import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

const testimonials = [
    {
        id: 1,
        name: "Rajesh Kumar",
        location: "Delhi, India",
        text: "The Sri Shyam Yantra has brought a profound sense of peace and protection to my home. The divine energy is truly palpable.",
        stars: 5
    },
    {
        id: 2,
        name: "Priya Sharma",
        location: "Mumbai, India",
        text: "Exquisite Vedic craftsmanship. The gold finish and spiritual resonance exceeded all my expectations for our family temple.",
        stars: 5
    },
    {
        id: 3,
        name: "Aman Verma",
        location: "Jaipur, Rajasthan",
        text: "A masterpiece of spiritual art. Since placing the yantra in our home, we have felt a distinct shift towards prosperity.",
        stars: 5
    }
];

const Testimonials = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % testimonials.length);
        }, 6000);
        return () => clearInterval(timer);
    }, []);

    return (
        <section className="relative py-24 overflow-hidden bg-[#0A1F3C] border-t border-[#D4AF37]/10">
            {/* Soft Gold Ambient Lighting */}
            <div className="absolute inset-0 bg-ambient-glow opacity-30"></div>

            <div className="max-w-4xl mx-auto px-10 relative z-10 text-center">
                <div className="mb-12">
                    <p className="text-gold-gradient uppercase tracking-[0.6em] text-[10px] font-black mb-2">Devoted Voices</p>
                    <h2 className="text-white text-3xl md:text-5xl font-serif">Sacred Experiences</h2>
                    <div className="w-20 divider-gold-thin mx-auto mt-4 opacity-50"></div>
                </div>

                {/* Reduced container height and padding for a more compact card */}
                <div className="relative h-[320px] md:h-[280px] flex items-center justify-center">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentIndex}
                            initial={{ opacity: 0, scale: 0.98, y: 10 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 1.02, y: -10 }}
                            transition={{ duration: 0.6, ease: "easeInOut" }}
                            className="glass-card p-8 md:p-12 shadow-lg w-full relative overflow-hidden"
                        >
                            <div className="relative z-10 flex flex-col items-center">
                                <div className="mb-4 flex gap-2">
                                    {[...Array(testimonials[currentIndex].stars)].map((_, i) => (
                                        <span key={i} className="text-[#F5D76E] text-xl filter drop-shadow-[0_0_8px_rgba(212,175,55,0.4)]">★</span>
                                    ))}
                                </div>

                                <p className="text-[#F8F5F0] text-lg md:text-2xl font-serif italic mb-8 leading-relaxed tracking-wide drop-shadow-sm font-light opacity-95">
                                    "{testimonials[currentIndex].text}"
                                </p>

                                <div className="flex flex-col items-center">
                                    <h4 className="text-white font-bold tracking-[0.3em] text-[10px] uppercase mb-1">
                                        {testimonials[currentIndex].name}
                                    </h4>
                                    <p className="text-gold-gradient text-[8px] font-black uppercase tracking-widest opacity-80">
                                        {testimonials[currentIndex].location}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Compact dot navigation */}
                <div className="flex justify-center gap-3 mt-10">
                    {testimonials.map((_, idx) => (
                        <button
                            key={idx}
                            onClick={() => setCurrentIndex(idx)}
                            className={`h-1 rounded-full transition-all duration-700 ${currentIndex === idx ? 'w-12 bg-gold-gradient shadow-ambient-gold' : 'w-3 bg-white/10 hover:bg-white/20'}`}
                            aria-label={`Go to testimonial ${idx + 1}`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
