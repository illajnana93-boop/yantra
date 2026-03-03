import React, { useMemo } from 'react';

const DivineSection: React.FC = () => {
    const particles = useMemo(() => [...Array(6)].map((_, i) => ({
        id: i,
        size: Math.random() * 2 + 2,
        top: Math.random() * 100 + '%',
        left: Math.random() * 100 + '%',
        duration: Math.random() * 10 + 10,
        delay: Math.random() * 5
    })), []);

    return (
        <section className="relative py-16 md:py-24 px-6 overflow-hidden bg-[#081629]">
            {/* Subtle Background Gradients & Glows */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-[80%] md:w-[50%] h-[50%] bg-blue-900/10 rounded-full blur-[80px] md:blur-[120px] opacity-40" />
                <div className="absolute bottom-1/4 right-1/4 w-[60%] md:w-[40%] h-[40%] bg-gold-600/5 rounded-full blur-[70px] md:blur-[100px] opacity-30" />

                {/* Floating Light Particles */}
                {particles.map((p) => (
                    <div
                        key={p.id}
                        className="absolute bg-gold-200/10 rounded-full blur-[1px] animate-float"
                        style={{
                            width: p.size + 'px',
                            height: p.size + 'px',
                            top: p.top,
                            left: p.left,
                            animationDuration: p.duration + 's',
                            animationDelay: p.delay + 's',
                        }}
                    />
                ))}
            </div>

            <div className="relative max-w-6xl mx-auto text-center z-10">

                {/* 
                {/* Video Frame */}
                {/* <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2 }}
                    className="relative group max-w-4xl mx-auto"
                >
                    <div className="absolute -inset-1 bg-gold-400/10 rounded-[2rem] md:rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition duration-1000" />

                    <div className="relative aspect-video rounded-2xl md:rounded-3xl overflow-hidden border border-gold-500/30 shadow-[0_0_50px_rgba(212,175,55,0.15)] bg-[#050c18] group-hover:border-gold-500/60 transition-all duration-700">
                        <video
                            className="w-full h-full object-cover"
                            autoPlay
                            muted
                            loop
                            playsInline
                        >
                            <source src="/vid.mp4" type="video/mp4" />
                        </video>
                        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
                        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40 pointer-events-none" />
                    </div>
                </motion.div> */}
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
        @keyframes float {
          0%, 100% { transform: translateY(0); opacity: 0; }
          50% { transform: translateY(-60px); opacity: 0.4; }
        }
        .animate-float {
          animation: float infinite ease-in-out;
        }
      `}} />
        </section>
    );
};

export default DivineSection;
