import { motion } from 'framer-motion'

const items = [
    { icon: '🪬', label: '11g Yantra', sub: '₹2,100 · Cash on Delivery' },
    { icon: '✦', label: '33g Yantra', sub: '₹6,000 · Cash on Delivery', premium: true },
    { icon: '🚚', label: 'PAN India Delivery', sub: 'No advance · Pay on arrival' },
]

/**
 * Product Highlight Strip — horizontal ticker below Hero.
 */
export default function ProductStrip() {
    return (
        <div
            style={{
                background: '#071529',
                borderTop: '1px solid rgba(184,115,51,0.18)',
                borderBottom: '1px solid rgba(184,115,51,0.18)',
            }}
        >
            <div className="max-w-7xl mx-auto px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x"
                    style={{ '--tw-divide-opacity': 1 } as React.CSSProperties}>
                    {items.map((item, i) => (
                        <motion.div
                            key={item.label}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.1 + i * 0.12 }}
                            className="flex items-center gap-4 px-8 py-5"
                            style={{
                                borderColor: 'rgba(184,115,51,0.14)',
                            }}
                        >
                            <span
                                style={{
                                    fontSize: '1.3rem',
                                    color: item.premium ? '#d9822b' : '#b87333',
                                    minWidth: 24,
                                    textAlign: 'center',
                                }}
                            >
                                {item.icon}
                            </span>
                            <div>
                                <p
                                    className="heading-serif"
                                    style={{
                                        color: item.premium ? '#d9822b' : '#f8f4e3',
                                        fontSize: '0.8rem',
                                        letterSpacing: '0.06em',
                                    }}
                                >
                                    {item.label}
                                    {item.premium && (
                                        <span
                                            className="ml-2 px-1.5 py-0.5 text-[0.6rem] tracking-wider"
                                            style={{
                                                background: 'rgba(217,130,43,0.15)',
                                                border: '1px solid rgba(217,130,43,0.35)',
                                                color: '#d9822b',
                                                verticalAlign: 'middle',
                                            }}
                                        >
                                            PREMIUM
                                        </span>
                                    )}
                                </p>
                                <p style={{ color: '#a8a090', fontSize: '0.78rem', fontFamily: 'Lato', marginTop: 2 }}>
                                    {item.sub}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    )
}
