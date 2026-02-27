import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const benefits = [
    {
        id: 'benefit-protection',
        icon: (
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
                <path d="M12 2L3 7v7c0 5 4 9 9 9s9-4 9-9V7L12 2z" />
            </svg>
        ),
        title: 'Protection',
        desc: 'Creates an invisible shield of divine energy around you and your family, warding off negative forces and evil eye.',
    },
    {
        id: 'benefit-positivity',
        icon: (
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
                <circle cx="12" cy="12" r="5" />
                <line x1="12" y1="1" x2="12" y2="3" />
                <line x1="12" y1="21" x2="12" y2="23" />
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                <line x1="1" y1="12" x2="3" y2="12" />
                <line x1="21" y1="12" x2="23" y2="12" />
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
            </svg>
        ),
        title: 'Positivity',
        desc: 'Radiates uplifting vibrations that purify the atmosphere of your home, bringing clarity and peace of mind.',
    },
    {
        id: 'benefit-energy',
        icon: (
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
                <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
            </svg>
        ),
        title: 'Energy Alignment',
        desc: 'Harmonizes the five cosmic elements (Pancha Bhuta) in your living space, aligning your chakras and inner energy.',
    },
    {
        id: 'benefit-blessings',
        icon: (
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
                <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
            </svg>
        ),
        title: 'Divine Blessings',
        desc: 'Channels the grace of Shyam Baba directly into your home, inviting prosperity, health, and spiritual growth.',
    },
]

/**
 * Benefits Section — 4 vertical cards with copper bronze outline icons.
 */
export default function BenefitsSection() {
    const ref = useRef(null)
    const inView = useInView(ref, { once: true, margin: '-80px' })

    return (
        <section
            id="benefits"
            ref={ref}
            className="relative py-24 overflow-hidden"
            style={{ background: '#0b1f3a' }}
        >
            {/* Subtle top line */}
            <div style={{ height: 1, background: 'linear-gradient(90deg, transparent, rgba(184,115,51,0.25), transparent)' }} />

            <div className="max-w-7xl mx-auto px-8 pt-2">
                {/* Heading */}
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 24 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.7 }}
                >
                    <p className="section-label mb-4">✦ Sacred Purpose ✦</p>
                    <h2 className="section-title-v2 mb-4">Spiritual Benefits</h2>
                    <div className="copper-divider" />
                </motion.div>

                {/* Cards grid */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {benefits.map((b, i) => (
                        <motion.div
                            key={b.id}
                            id={b.id}
                            initial={{ opacity: 0, y: 32 }}
                            animate={inView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.65, delay: 0.1 + i * 0.13 }}
                            className="group relative flex flex-col p-8"
                            style={{
                                border: '1px solid rgba(184,115,51,0.20)',
                                background: 'rgba(17,40,72,0.40)',
                                transition: 'border-color 0.3s, box-shadow 0.3s',
                            }}
                            onMouseEnter={e => {
                                ; (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(184,115,51,0.55)'
                                    ; (e.currentTarget as HTMLDivElement).style.boxShadow = '0 0 24px rgba(184,115,51,0.12)'
                            }}
                            onMouseLeave={e => {
                                ; (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(184,115,51,0.20)'
                                    ; (e.currentTarget as HTMLDivElement).style.boxShadow = 'none'
                            }}
                        >
                            {/* Copper number */}
                            <span
                                className="absolute top-5 right-6 heading-serif"
                                style={{ color: 'rgba(184,115,51,0.18)', fontSize: '2rem' }}
                            >
                                0{i + 1}
                            </span>

                            {/* Icon */}
                            <div
                                className="mb-6 w-14 h-14 flex items-center justify-center"
                                style={{
                                    border: '1px solid rgba(184,115,51,0.40)',
                                    color: '#b87333',
                                    background: 'rgba(184,115,51,0.06)',
                                }}
                            >
                                {b.icon}
                            </div>

                            {/* Title */}
                            <h3
                                className="heading-serif mb-3"
                                style={{ color: '#f8f4e3', fontSize: '0.95rem', letterSpacing: '0.05em' }}
                            >
                                {b.title}
                            </h3>

                            {/* Divider */}
                            <div className="copper-divider-left mb-4" style={{ width: 32 }} />

                            {/* Description */}
                            <p style={{ color: '#a8a090', fontSize: '0.875rem', fontFamily: 'Lato', lineHeight: 1.75 }}>
                                {b.desc}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
