import { motion } from 'framer-motion';

const uses = [
    {
        title: "Sacred Placement",
        desc: "Place in the Northeast corner of your dwelling to align with the core cosmic source of clarity.",
        icon: "🕉️"
    },
    {
        title: "Daily Mantras",
        desc: "Chant the specific Sri Shyam mantras provided to activate the geometric frequencies.",
        icon: "📿"
    },
    {
        title: "Weekly Offering",
        desc: "Apply a drop of sacred attar or sandalwood paste to keep the divine connection pure.",
        icon: "🧴"
    }
];

const UseSection = () => {
    return (
        <section className="bg-[#081629] pt-20 pb-8 md:pt-24 md:pb-12 overflow-hidden border-y border-[#D4AF37]/20 relative">
            {/* Ambient Lighting Background */}
            <div className="absolute inset-0 bg-ambient-glow opacity-10"></div>

            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="text-center mb-12 md:mb-16 relative z-10 px-6"
            >
                <p className="text-gold-gradient uppercase tracking-[0.4em] md:tracking-[0.5em] text-[9px] md:text-[10px] font-black mb-3">
                    The Ritual Path
                </p>
                <h2 className="text-white text-4xl md:text-6xl tracking-tight text-glow">
                    Divine Practice
                </h2>
                <div className="w-16 md:w-20 h-[1px] bg-gold-gradient mx-auto mt-6 opacity-30 shadow-ambient-gold"></div>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8 md:gap-10 max-w-6xl mx-auto px-6 md:px-10 relative z-10">
                {uses.map((use, i) => (
                    <motion.div
                        key={use.title}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: i * 0.1 }}
                        whileHover={{ y: -5 }}
                        className="glass-card p-8 md:p-10 text-center group transition-all duration-500 interactive relative overflow-hidden"
                    >
                        <div className="flex justify-center mb-6">
                            {use.icon === "🕉️" ? (
                                <img src="/om.png" alt="Om" className="w-12 h-12 md:w-16 h-16 object-contain filter drop-shadow-[0_0_10px_rgba(212,175,55,0.3)] group-hover:scale-105 transition-all duration-500" />
                            ) : (
                                <div className="text-4xl md:text-5xl filter drop-shadow-[0_0_10px_rgba(212,175,55,0.3)] group-hover:scale-105 transition-transform duration-500">
                                    {use.icon}
                                </div>
                            )}
                        </div>

                        <h3 className="text-white text-xl md:text-2xl mb-4 tracking-wide group-hover:text-gold-400 transition-colors">
                            {use.title}
                        </h3>
                        <p className="text-stone-200 text-lg md:text-xl leading-relaxed tracking-wide italic font-light">
                            {use.desc}
                        </p>

                        <div className="mt-6 md:mt-8 w-10 md:w-12 h-[1px] bg-gold-gradient mx-auto opacity-20 group-hover:w-16 transition-all duration-500"></div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default UseSection;
