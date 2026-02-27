import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { placeOrder } from '../services/api'
import GurujiSection from '../components/GurujiSection'

/**
 * Contact Page v3 — Clean ivory layout with Guruji chat.
 */
export default function Contact() {
    const ref = useRef(null)
    const inView = useInView(ref, { once: true })

    const [form, setForm] = useState({
        name: '', phone: '', email: '', message: '', variant: '11g' as '11g' | '33g',
    })
    const [sending, setSending] = useState(false)
    const [sent, setSent] = useState(false)

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

    const handleSubmit = async () => {
        if (!form.name || !form.phone) { alert('Name and phone are required.'); return }
        setSending(true)
        try {
            await placeOrder({ name: form.name, phone: form.phone, address: form.message || 'Via contact form', variant: form.variant })
        } catch { /* show success anyway */ }
        setSent(true)
        setSending(false)
    }

    const inputStyle: React.CSSProperties = {
        width: '100%',
        padding: '0.65rem 1rem',
        border: '1px solid rgba(198,167,94,0.30)',
        background: '#f6f1e8',
        color: '#0f1c2e',
        fontFamily: 'Lato, sans-serif',
        fontSize: '0.875rem',
        outline: 'none',
        transition: 'border-color 0.2s',
    }

    return (
        <div style={{ paddingTop: 68 }}>
            {/* Banner */}
            <section style={{ background: '#f6f1e8', paddingTop: '4.5rem', paddingBottom: '4rem', borderBottom: '1px solid rgba(198,167,94,0.18)' }}>
                <div className="max-w-6xl mx-auto px-8 text-center">
                    <p className="label mb-5" style={{ fontSize: '0.62rem' }}>Get In Touch</p>
                    <h1 className="h-display mb-4" style={{ fontSize: 'clamp(1.6rem, 4vw, 2.4rem)', color: '#0f1c2e' }}>
                        Contact Us
                    </h1>
                    <div className="gold-rule" style={{ maxWidth: 48, margin: '0 auto 1rem' }} />
                    <p className="serif-body italic" style={{ fontSize: '1rem' }}>
                        Reach out for orders, questions, or Guruji's spiritual guidance
                    </p>
                </div>
            </section>

            {/* Contact Section */}
            <section ref={ref} style={{ background: '#faf7f1', paddingTop: '5rem', paddingBottom: '5rem', borderBottom: '1px solid rgba(198,167,94,0.15)' }}>
                <div className="max-w-5xl mx-auto px-8 grid md:grid-cols-2 gap-16 items-start">

                    {/* Left: Info */}
                    <motion.div
                        initial={{ opacity: 0, x: -24 }}
                        animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.7 }}
                    >
                        <p className="label mb-5" style={{ fontSize: '0.62rem' }}>How to Reach Us</p>
                        <h2 className="h-section mb-4">We're Here For You</h2>
                        <div className="gold-rule-left mb-6" />

                        <p className="serif-body italic mb-10" style={{ fontSize: '1.05rem', maxWidth: 360 }}>
                            Have a question about your Yantra, shipping, or energization process?
                            Fill the form and our team will respond within 24 hours.
                        </p>

                        <ul style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                            {[
                                { icon: '📞', label: 'Phone', value: '+91 XXXXX XXXXX *(replace)*' },
                                { icon: '📧', label: 'Email', value: 'info@srishyamyantra.in *(replace)*' },
                                { icon: '📍', label: 'Location', value: 'Rajasthan, India *(replace)*' },
                                { icon: '🕐', label: 'Hours', value: 'Mon – Sat · 9:00 AM – 7:00 PM IST' },
                            ].map(item => (
                                <li key={item.label} style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                                    <div style={{
                                        width: 36, height: 36, border: '1px solid rgba(198,167,94,0.35)',
                                        background: 'rgba(198,167,94,0.06)', display: 'flex', alignItems: 'center',
                                        justifyContent: 'center', fontSize: '0.85rem', flexShrink: 0,
                                    }}>
                                        {item.icon}
                                    </div>
                                    <div>
                                        <p className="label" style={{ fontSize: '0.57rem', marginBottom: 3 }}>{item.label}</p>
                                        <p style={{ fontFamily: 'Lato', fontSize: '0.875rem', color: '#3a4b5e' }}>{item.value}</p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Right: Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 24 }}
                        animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.7, delay: 0.15 }}
                    >
                        {sent ? (
                            <div style={{ border: '1px solid rgba(198,167,94,0.30)', padding: '4rem 2rem', textAlign: 'center', background: '#f6f1e8' }}>
                                <div style={{ fontSize: '2.5rem' }}>🙏</div>
                                <h3 className="h-display mt-4 mb-2" style={{ fontSize: '0.95rem' }}>Message Received</h3>
                                <p className="serif-body italic" style={{ fontSize: '1rem' }}>
                                    जय श्री श्याम 🙏<br />
                                    We'll contact you shortly on <span style={{ color: '#c6a75e' }}>{form.phone}</span>.
                                </p>
                            </div>
                        ) : (
                            <div>
                                {[
                                    { label: 'Full Name', name: 'name', type: 'text', ph: 'Your full name' },
                                    { label: 'Phone Number', name: 'phone', type: 'tel', ph: '10-digit mobile number' },
                                    { label: 'Email Address', name: 'email', type: 'email', ph: 'your@email.com (optional)' },
                                ].map(f => (
                                    <div key={f.name} style={{ marginBottom: '1.25rem' }}>
                                        <label className="label" style={{ display: 'block', fontSize: '0.58rem', marginBottom: 6 }}>{f.label}</label>
                                        <input
                                            id={`contact-${f.name}`}
                                            type={f.type}
                                            name={f.name}
                                            value={(form as any)[f.name]}
                                            onChange={handleChange}
                                            placeholder={f.ph}
                                            style={inputStyle}
                                        />
                                    </div>
                                ))}

                                <div style={{ marginBottom: '1.25rem' }}>
                                    <label className="label" style={{ display: 'block', fontSize: '0.58rem', marginBottom: 6 }}>Interested Variant</label>
                                    <select
                                        id="contact-variant"
                                        name="variant"
                                        value={form.variant}
                                        onChange={handleChange}
                                        style={{ ...inputStyle, background: '#f6f1e8', cursor: 'pointer' }}
                                    >
                                        <option value="11g">11 Grams — ₹2,100</option>
                                        <option value="33g">33 Grams — ₹6,000 (Premium)</option>
                                    </select>
                                </div>

                                <div style={{ marginBottom: '1.75rem' }}>
                                    <label className="label" style={{ display: 'block', fontSize: '0.58rem', marginBottom: 6 }}>Message / Address</label>
                                    <textarea
                                        id="contact-message"
                                        name="message"
                                        rows={3}
                                        value={form.message}
                                        onChange={handleChange}
                                        placeholder="Your delivery address or question…"
                                        style={{ ...inputStyle, resize: 'none' }}
                                    />
                                </div>

                                <button
                                    id="contact-submit-btn"
                                    onClick={handleSubmit}
                                    disabled={sending}
                                    className="btn-primary w-full"
                                >
                                    {sending ? 'Sending…' : '🙏 Send Message'}
                                </button>

                                <p style={{ fontFamily: 'Lato', fontSize: '0.72rem', color: '#a8893a', textAlign: 'center', marginTop: 12, letterSpacing: '0.08em' }}>
                                    Cash on Delivery · No advance payment required
                                </p>
                            </div>
                        )}
                    </motion.div>
                </div>
            </section>

            {/* Full Guruji chat on contact page */}
            <GurujiSection />
        </div>
    )
}
