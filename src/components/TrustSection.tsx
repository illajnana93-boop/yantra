import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const trustItems = [
    {
        id: 'trust-authentic',
        icon: (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
                <path d="M12 2L3 7v7c0 5 4 9 9 9s9-4 9-9V7L12 2z" />
                <polyline points="9 12 11 14 15 10" />
            </svg>
        ),
        title: 'Authentic Spiritual Preparation',
        desc: 'Every Yantra is individually handcrafted and energized through Vedic rituals personally performed by Guruji. No mass production — each piece carries genuine spiritual intent.',
    },
    {
        id: 'trust-cod',
        icon: (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
                <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
                <line x1="1" y1="10" x2="23" y2="10" />
            </svg>
        ),
        title: 'Cash on Delivery Available',
        desc: 'No advance payment required. No payment gateway. Pay safely in cash only when your Yantra is delivered at your doorstep — across all of India.',
    },
    {
        id: 'trust-packaging',
        icon: (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
                <polyline points="21 8 21 21 3 21 3 8" />
                <rect x="1" y="3" width="22" height="5" />
                <line x1="10" y1="12" x2="14" y2="12" />
            </svg>
        ),
        title: 'Secure Packaging & Support',
        desc: 'Sacred packaging preserves the divine energies during transit. Our team provides post-delivery guidance on Yantra placement, care, and Attar energization.',
    },
]

/**
 * Trust Section v2 — Three wide horizontal cards with copper border.
 */
export default function TrustSection() {
    const ref = useRef(null)
    const inView = useInView(ref, { once: true, margin: '-80px' })

    return (
        <section
            id="trust"
            ref={ref}
            className="relative py-24 overflow-hidden"
            style={{ background: '#0b1f3a', borderTop: '1px solid rgba(184,115,51,0.12)' }}
        >
            <div className="max-w-6xl mx-auto px-8">
                {/* Heading */}
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.7 }}
                >
                    <p className="section-label mb-4">✦ Our Promise ✦</p>
                    <h2 className="section-title-v2 mb-4">Why Trust Us</h2>
                    <div className="copper-divider" />
                </motion.div>

                {/* Three wide cards */}
                <div className="grid md:grid-cols-3 gap-6">
                    {trustItems.map((item, i) => (
                        <motion.div
                            key={item.id}
                            id={item.id}
                            initial={{ opacity: 0, y: 28 }}
                            animate={inView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.65, delay: 0.1 + i * 0.15 }}
                            className="flex flex-col p-8"
                            style={{
                                border: '1px solid rgba(184,115,51,0.22)',
                                background: 'rgba(17,40,72,0.35)',
                                boxShadow: '0 4px 24px rgba(0,0,0,0.15)',
                                transition: 'border-color 0.3s, box-shadow 0.3s',
                            }}
                            onMouseEnter={e => {
                                const el = e.currentTarget as HTMLDivElement
                                el.style.borderColor = 'rgba(184,115,51,0.50)'
                                el.style.boxShadow = '0 0 28px rgba(184,115,51,0.10), 0 4px 24px rgba(0,0,0,0.20)'
                            }}
                            onMouseLeave={e => {
                                const el = e.currentTarget as HTMLDivElement
                                el.style.borderColor = 'rgba(184,115,51,0.22)'
                                el.style.boxShadow = '0 4px 24px rgba(0,0,0,0.15)'
                            }}
                        >
                            {/* Icon */}
                            <div
                                className="mb-6 w-14 h-14 flex items-center justify-center flex-shrink-0"
                                style={{ border: '1px solid rgba(184,115,51,0.35)', color: '#b87333', background: 'rgba(184,115,51,0.05)' }}
                            >
                                {item.icon}
                            </div>

                            {/* Title */}
                            <h3
                                className="heading-serif mb-3"
                                style={{ color: '#f8f4e3', fontSize: '0.9rem', letterSpacing: '0.04em' }}
                            >
                                {item.title}
                            </h3>

                            {/* Short copper line */}
                            <div className="copper-divider-left mb-4" style={{ width: 40 }} />

                            {/* Desc */}
                            <p style={{ color: '#a8a090', fontSize: '0.875rem', fontFamily: 'Lato', lineHeight: 1.8, flex: 1 }}>
                                {item.desc}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
