import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Link } from 'react-router-dom'

/**
 * Guruji CTA Section v3 — Subtle navy section, no full chat.
 * Centered, quiet, just a CTA to visit Contact page.
 */
export default function GurujiCTA() {
    const ref = useRef(null)
    const inView = useInView(ref, { once: true, margin: '-60px' })

    return (
        <section
            id="guruji-cta"
            ref={ref}
            style={{
                background: '#0f1c2e',
                paddingTop: '5.5rem',
                paddingBottom: '5.5rem',
            }}
        >
            <div className="max-w-2xl mx-auto px-8 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.7 }}
                >
                    {/* Small Guruji avatar */}
                    <div
                        className="anim-float"
                        style={{
                            width: 72,
                            height: 72,
                            borderRadius: '50%',
                            border: '1px solid rgba(198,167,94,0.40)',
                            background: '#1a2e47',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            margin: '0 auto 1.75rem',
                            fontSize: '2rem',
                            boxShadow: '0 0 0 6px rgba(198,167,94,0.07)',
                        }}
                    >
                        🕉️
                    </div>

                    <p
                        className="label mb-4"
                        style={{ color: '#c6a75e', fontSize: '0.62rem' }}
                    >
                        ✦ Divine Guidance ✦
                    </p>

                    <h2
                        style={{
                            fontFamily: 'Cinzel Decorative, serif',
                            color: '#f6f1e8',
                            fontSize: 'clamp(1.3rem, 2.5vw, 1.8rem)',
                            letterSpacing: '0.04em',
                            marginBottom: '1rem',
                        }}
                    >
                        Seek Guidance
                    </h2>

                    <div
                        style={{
                            height: 1,
                            background: 'linear-gradient(90deg, transparent, rgba(198,167,94,0.40), transparent)',
                            maxWidth: 48,
                            margin: '0 auto 1.5rem',
                        }}
                    />

                    <p
                        style={{
                            fontFamily: 'Cormorant Garamond, serif',
                            fontStyle: 'italic',
                            color: 'rgba(240,233,218,0.70)',
                            fontSize: '1.05rem',
                            lineHeight: 1.7,
                            marginBottom: '2.5rem',
                        }}
                    >
                        Ask Guruji about usage, energization, and spiritual clarity.
                    </p>

                    <Link to="/contact">
                        <button id="guruji-cta-btn" className="btn-gold">
                            Ask Guruji
                        </button>
                    </Link>
                </motion.div>
            </div>
        </section>
    )
}
