import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import ProductSection from '../components/ProductSection'
import WhySection from '../components/WhySection'

/**
 * Product Page v3 — Clean ivory banner + products + why section.
 */
export default function Product() {
    const ref = useRef(null)
    const inView = useInView(ref, { once: true })

    return (
        <div style={{ paddingTop: 68 }}>
            {/* Banner */}
            <section
                ref={ref}
                style={{
                    background: '#f6f1e8',
                    paddingTop: '4.5rem',
                    paddingBottom: '4rem',
                    borderBottom: '1px solid rgba(198,167,94,0.20)',
                }}
            >
                <motion.div
                    className="max-w-6xl mx-auto px-8 text-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.7 }}
                >
                    <p className="label mb-5" style={{ fontSize: '0.62rem' }}>Sacred Instruments</p>
                    <h1 className="h-display mb-4" style={{ fontSize: 'clamp(1.6rem, 4vw, 2.5rem)', color: '#0f1c2e' }}>
                        Sacred Yantra Collection
                    </h1>
                    <div className="gold-rule" style={{ maxWidth: 48, margin: '0 auto 1rem' }} />
                    <p className="serif-body italic" style={{ fontSize: '1rem' }}>
                        Handcrafted · Vedic Energized · Cash on Delivery
                    </p>
                </motion.div>
            </section>

            <ProductSection />
            <WhySection />
        </div>
    )
}
