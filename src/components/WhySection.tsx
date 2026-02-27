import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const features = [
    {
        id: 'why-protection',
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
                <path d="M12 2L3 7v7c0 5 4 9 9 9s9-4 9-9V7L12 2z" />
                <polyline points="9 12 11 14 15 10" />
            </svg>
        ),
        title: 'Protection',
        desc: 'Creates a shield of divine energy around your home and family, warding off negative forces.',
    },
    {
        id: 'why-positivity',
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
                <circle cx="12" cy="12" r="5" />
                <line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" />
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                <line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" />
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
            </svg>
        ),
        title: 'Positivity',
        desc: 'Radiates uplifting vibrations that purify the atmosphere, bringing clarity and peace of mind.',
    },
    {
        id: 'why-blessings',
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
                <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
            </svg>
        ),
        title: 'Divine Blessings',
        desc: 'Channels the grace of Shyam Baba into your home, inviting prosperity and spiritual harmony.',
    },
]

/**
 * Why Section v3 — Three minimal columns, clean.
 */
export default function WhySection() {
    const ref = useRef(null)
    const inView = useInView(ref, { once: true, margin: '-60px' })

    return (
        <section
            id="why"
            ref={ref}
            style={{
                background: '#faf7f1',
                paddingTop: '5.5rem',
                paddingBottom: '5.5rem',
                borderBottom: '1px solid rgba(198,167,94,0.15)',
            }}
        >
            <div className="max-w-5xl mx-auto px-8">
                {/* Heading */}
                <motion.div
                    className="text-center mb-14"
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.7 }}
                >
                    <p className="label mb-5">Sacred Purpose</p>
                    <h2 className="h-section mb-4">Why Choose This Yantra</h2>
                    <div className="gold-rule" style={{ maxWidth: 48, margin: '0 auto' }} />
                </motion.div>

                {/* Three columns */}
                <div className="grid md:grid-cols-3 gap-8">
                    {features.map((f, i) => (
                        <motion.div
                            key={f.id}
                            id={f.id}
                            initial={{ opacity: 0, y: 24 }}
                            animate={inView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6, delay: 0.1 + i * 0.13 }}
                            className="flex flex-col"
                            style={{ padding: '2rem 1.5rem' }}
                        >
                            {/* Icon */}
                            <div
                                style={{
                                    width: 48,
                                    height: 48,
                                    border: '1px solid rgba(198,167,94,0.40)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: '#c6a75e',
                                    marginBottom: '1.25rem',
                                    flexShrink: 0,
                                    background: 'rgba(198,167,94,0.05)',
                                }}
                            >
                                {f.icon}
                            </div>

                            {/* Title */}
                            <h3
                                style={{
                                    fontFamily: 'Cinzel Decorative, serif',
                                    fontSize: '0.9rem',
                                    color: '#0f1c2e',
                                    letterSpacing: '0.04em',
                                    marginBottom: '0.75rem',
                                }}
                            >
                                {f.title}
                            </h3>

                            {/* Gold rule left */}
                            <div className="gold-rule-left mb-4" />

                            {/* Description */}
                            <p style={{ fontFamily: 'Lato', fontSize: '0.875rem', color: '#3a4b5e', lineHeight: 1.8 }}>
                                {f.desc}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
