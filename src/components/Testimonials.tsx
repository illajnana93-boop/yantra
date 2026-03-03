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
        text: "Exquisite Vedic craftsmanship. The gold finish and spiritual resonance exceeded all my expectations.",
        stars: 5
    },
    {
        id: 3,
        name: "Aman Verma",
        location: "Jaipur, Rajasthan",
        text: "A masterpiece of spiritual art. Since placing the yantra, we have felt a distinct shift towards prosperity.",
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
        <section className="relative py-20 md:py-24 overflow-hidden bg-[#0A1F3C] border-t border-[#D4AF37]/10">
            {/* Soft Gold Ambient Lighting */}
            <div className="absolute inset-0 bg-ambient-glow opacity-30"></div>

            <div className="max-w-4xl mx-auto px-6 md:px-10 relative z-10 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-12 md:mb-16"
                >
                    <p className="text-gold-gradient uppercase tracking-[0.4em] md:tracking-[0.6em] text-[9px] md:text-[10px] font-black mb-3">Devoted Voices</p>
                    <h2 className="text-white text-3xl md:text-6xl font-serif text-glow">Sacred Experiences</h2>
                    <div className="w-16 md:w-20 h-[1px] bg-gold-gradient mx-auto mt-6 opacity-40"></div>
                </motion.div>

                <div className="relative h-[420px] sm:h-[350px] md:h-[320px] flex items-center justify-center">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentIndex}
                            initial={{ opacity: 0, x: 30, filter: "blur(5px)" }}
                            animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                            exit={{ opacity: 0, x: -30, filter: "blur(5px)" }}
                            transition={{ duration: 0.8, ease: "easeOut" as const }}
                            className="glass-card p-8 md:p-16 shadow-2xl w-full relative overflow-hidden group interactive"
                        >
                            <div className="relative z-10 flex flex-col items-center">
                                <div className="mb-6 flex gap-2">
                                    {[...Array(testimonials[currentIndex].stars)].map((_, i) => (
                                        <span key={i} className="text-[#F5D76E] text-lg md:text-2xl filter drop-shadow-[0_0_10px_rgba(212,175,55,0.5)]">★</span>
                                    ))}
                                </div>

                                <p className="text-[#F8F5F0] text-lg md:text-2xl font-serif italic mb-8 md:mb-10 leading-relaxed tracking-wide font-light opacity-95">
                                    "{testimonials[currentIndex].text}"
                                </p>

                                <div className="flex flex-col items-center">
                                    <h4 className="text-white font-bold tracking-[0.3em] text-[10px] uppercase mb-2">
                                        {testimonials[currentIndex].name}
                                    </h4>
                                    <div className="flex items-center gap-2">
                                        <div className="h-[1px] w-4 bg-gold-500/20"></div>
                                        <p className="text-gold-gradient text-[8px] font-black uppercase tracking-widest">
                                            {testimonials[currentIndex].location}
                                        </p>
                                        <div className="h-[1px] w-4 bg-gold-500/20"></div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Navigation Dots */}
                <div className="flex justify-center gap-3 mt-12 md:mt-16">
                    {testimonials.map((_, idx) => (
                        <button
                            key={idx}
                            onClick={() => setCurrentIndex(idx)}
                            className={`h-1 rounded-full transition-all duration-700 interactive ${currentIndex === idx ? 'w-10 md:w-16 bg-gold-gradient shadow-ambient-gold' : 'w-3 md:w-4 bg-white/10 hover:bg-white/30'}`}
                            aria-label={`Go to testimonial ${idx + 1}`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
