import { motion } from 'framer-motion';

const uses = [
    {
        title: "Sacred Placement",
        desc: "Place in the Northeast corner of your dwelling to align with the core cosmic source of clarity and prosperity.",
        icon: "🕉️"
    },
    {
        title: "Daily Mantras",
        desc: "Chant the specific Sri Shyam mantras provided to activate the geometric frequencies of the yantra.",
        icon: "📿"
    },
    {
        title: "Weekly Offering",
        desc: "Apply a drop of sacred attar or sandalwood paste to keep the divine connection vibrant and pure.",
        icon: "🧴"
    }
];

const UseSection = () => {
    return (
        <section className="bg-[#081629] py-32 overflow-hidden border-y border-[#D4AF37]/20 relative">
            {/* Ambient Lighting Background */}
            <div className="absolute inset-0 bg-ambient-glow opacity-20"></div>

            <div className="text-center mb-28 relative z-10 px-8">
                <p className="text-gold-gradient uppercase tracking-[0.8em] text-[12px] font-black mb-4">The Ritual Path</p>
                <h2 className="text-white text-6xl md:text-8xl font-serif tracking-tight text-glow">Divine Practice</h2>
                <div className="w-32 h-[1px] bg-gold-gradient mx-auto mt-8 opacity-40"></div>
            </div>

            <div className="grid md:grid-cols-3 gap-12 max-w-7xl mx-auto px-10 relative z-10">
                {uses.map((use, i) => (
                    <motion.div
                        key={use.title}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: i * 0.2 }}
                        className="glass-card p-14 text-center group hover:scale-[1.02] transition-all duration-700"
                    >
                        <div className="text-6xl mb-10 filter drop-shadow-[0_0_15px_rgba(212,175,55,0.4)] group-hover:scale-110 transition-transform duration-500">
                            {use.icon}
                        </div>
                        <h3 className="text-white text-3xl font-serif mb-8 tracking-wide">
                            {use.title}
                        </h3>
                        <p className="text-[#F8F5F0] text-lg leading-relaxed font-serif italic font-light drop-shadow-sm tracking-wide">
                            {use.desc}
                        </p>

                        {/* Elegant Divider */}
                        <div className="mt-12 w-16 h-[1px] bg-gold-gradient mx-auto opacity-30 shadow-ambient-gold group-hover:w-24 transition-all duration-700"></div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default UseSection;
