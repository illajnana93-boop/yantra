import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const tags = [
    'Original & Authentic',
    'Prepared for Spiritual Use',
    'Personalized Energization',
    'PAN India Delivery',
]

/**
 * About v3 — Centered, short, minimal.
 * One paragraph. Four tag pills.
 */
export default function AboutYantra() {
    const ref = useRef(null)
    const inView = useInView(ref, { once: true, margin: '-60px' })

    return (
        <section
            id="about"
            ref={ref}
            style={{
                background: '#faf7f1',
                paddingTop: '5.5rem',
                paddingBottom: '5.5rem',
                borderBottom: '1px solid rgba(198,167,94,0.15)',
            }}
        >
            <div className="max-w-3xl mx-auto px-8 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.7 }}
                >
                    <p className="label mb-5">The Yantra</p>

                    <h2 className="h-section mb-6">
                        What is Sri Shyam Yantra?
                    </h2>

                    {/* Centered gold rule */}
                    <div className="gold-rule mb-8" style={{ maxWidth: 56, margin: '0 auto 2rem' }} />

                    <p
                        className="serif-body mb-10"
                        style={{ fontSize: '1.08rem', maxWidth: 580, margin: '0 auto 2.5rem' }}
                    >
                        The Sri Shyam Yantra is a sacred geometric instrument, handcrafted and energized
                        through ancient Vedic rituals under the personal guidance of Guruji. It carries
                        the divine vibrations of Shyam Baba — bringing protection, peace, and blessings
                        to your home and family.
                    </p>

                    {/* Tag pills */}
                    <div className="flex flex-wrap gap-3 justify-center">
                        {tags.map(t => (
                            <span key={t} className="tag-pill">{t}</span>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
