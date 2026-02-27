import { useState, useRef, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import { sendChatMessage } from '../services/api'

interface Message {
    role: 'user' | 'guruji'
    text: string
}

/**
 * Guruji Chat Section v3 — Elegant minimal chat.
 * Used on Contact page. Navy bg, gold/ivory accents.
 */
export default function GurujiSection() {
    const ref = useRef(null)
    const inView = useInView(ref, { once: true, margin: '-60px' })
    const chatEnd = useRef<HTMLDivElement>(null)

    const [messages, setMessages] = useState<Message[]>([
        {
            role: 'guruji',
            text: 'जय श्री श्याम 🙏\nआपका स्वागत है। कोई भी आध्यात्मिक प्रश्न पूछें।',
        },
    ])
    const [input, setInput] = useState('')
    const [loading, setLoading] = useState(false)
    const [listening, setListening] = useState(false)

    useEffect(() => {
        chatEnd.current?.scrollIntoView({ behavior: 'smooth' })
    }, [messages])

    const handleSend = async () => {
        const text = input.trim()
        if (!text || loading) return
        setMessages(m => [...m, { role: 'user', text }])
        setInput('')
        setLoading(true)
        try {
            const res = await sendChatMessage({ message: text })
            setMessages(m => [...m, { role: 'guruji', text: res.reply }])
        } catch {
            setMessages(m => [...m, {
                role: 'guruji',
                text: 'क्षमा करें, अभी जुड़ नहीं पा रहे। थोड़ी देर बाद प्रयास करें। 🙏',
            }])
        } finally {
            setLoading(false)
        }
    }

    const handleVoice = () => {
        const SR = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
        if (!SR) { alert('Voice input not supported in this browser.'); return }
        const r = new SR()
        r.lang = 'hi-IN'
        r.onstart = () => setListening(true)
        r.onend = () => setListening(false)
        r.onresult = (e: any) => setInput(e.results[0][0].transcript)
        r.start()
    }

    return (
        <section
            id="ask-guruji"
            ref={ref}
            style={{ background: '#0f1c2e', paddingTop: '5.5rem', paddingBottom: '5.5rem' }}
        >
            <div className="max-w-4xl mx-auto px-8">
                {/* Heading */}
                <motion.div
                    className="text-center mb-12"
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.7 }}
                >
                    <p className="label mb-4" style={{ color: '#c6a75e', fontSize: '0.6rem' }}>✦ Divine Guidance ✦</p>
                    <h2 style={{ fontFamily: 'Cinzel Decorative, serif', color: '#f6f1e8', fontSize: 'clamp(1.2rem, 2.5vw, 1.75rem)', letterSpacing: '0.04em', marginBottom: '1rem' }}>
                        Ask Guruji
                    </h2>
                    <div style={{ height: 1, background: 'linear-gradient(90deg, transparent, rgba(198,167,94,0.40), transparent)', maxWidth: 48, margin: '0 auto 0.75rem' }} />
                    <p style={{ fontFamily: 'Cormorant Garamond, serif', fontStyle: 'italic', color: 'rgba(240,233,218,0.60)', fontSize: '0.95rem' }}>
                        Ask about usage, energization, and spiritual clarity
                    </p>
                </motion.div>

                <motion.div
                    className="grid md:grid-cols-[200px_1fr] gap-8 items-start"
                    initial={{ opacity: 0, y: 28 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.75, delay: 0.2 }}
                >
                    {/* Avatar column */}
                    <div className="flex flex-col items-center text-center">
                        <div
                            className="anim-float"
                            style={{
                                width: 80, height: 80, borderRadius: '50%',
                                border: '1px solid rgba(198,167,94,0.35)',
                                background: '#1a2e47',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                fontSize: '2.2rem',
                                marginBottom: '0.75rem',
                            }}
                        >
                            🕉️
                        </div>
                        <p style={{ fontFamily: 'Cinzel Decorative, serif', color: '#f6f1e8', fontSize: '0.78rem', marginBottom: 2 }}>Guruji</p>
                        <p style={{ fontFamily: 'Cormorant Garamond, serif', fontStyle: 'italic', color: '#c6a75e', fontSize: '0.72rem' }}>Sri Shyam Yantra</p>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 8 }}>
                            <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#c6a75e', opacity: 0.8 }} />
                            <span style={{ fontFamily: 'Lato', fontSize: '0.6rem', color: 'rgba(240,233,218,0.45)', textTransform: 'uppercase', letterSpacing: '0.12em' }}>Online</span>
                        </div>
                    </div>

                    {/* Chat window */}
                    <div style={{ border: '1px solid rgba(198,167,94,0.22)', background: '#1a2e47', display: 'flex', flexDirection: 'column' }}>
                        {/* Header */}
                        <div style={{ padding: '0.75rem 1.25rem', borderBottom: '1px solid rgba(198,167,94,0.12)', display: 'flex', alignItems: 'center', gap: 8 }}>
                            <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#c6a75e', opacity: 0.8 }} />
                            <span style={{ fontFamily: 'Lato', fontSize: '0.65rem', color: '#c6a75e', textTransform: 'uppercase', letterSpacing: '0.14em' }}>
                                Guruji · Online
                            </span>
                        </div>

                        {/* Messages */}
                        <div
                            id="guruji-chat-window"
                            style={{ minHeight: 250, maxHeight: 320, overflowY: 'auto', padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}
                        >
                            {messages.map((msg, i) => (
                                <div key={i} style={{ display: 'flex', justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start' }}>
                                    <div
                                        style={{
                                            maxWidth: '80%',
                                            padding: '0.65rem 1rem',
                                            ...(msg.role === 'guruji'
                                                ? { background: 'rgba(198,167,94,0.08)', border: '1px solid rgba(198,167,94,0.18)' }
                                                : { background: 'rgba(198,167,94,0.15)', border: '1px solid rgba(198,167,94,0.28)' }),
                                        }}
                                    >
                                        {msg.role === 'guruji' && (
                                            <p style={{ fontFamily: 'Lato', fontSize: '0.6rem', color: '#c6a75e', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 4 }}>
                                                🙏 Guruji
                                            </p>
                                        )}
                                        <p style={{
                                            fontFamily: 'Cormorant Garamond, serif',
                                            fontSize: '0.97rem',
                                            color: 'rgba(240,233,218,0.88)',
                                            lineHeight: 1.65,
                                            whiteSpace: 'pre-line',
                                        }}>
                                            {msg.text}
                                        </p>
                                    </div>
                                </div>
                            ))}

                            {loading && (
                                <div style={{ display: 'flex' }}>
                                    <div style={{ padding: '0.65rem 1rem', border: '1px solid rgba(198,167,94,0.18)', background: 'rgba(198,167,94,0.06)', display: 'flex', gap: 5, alignItems: 'center' }}>
                                        {[0, 1, 2].map(k => (
                                            <div key={k} style={{
                                                width: 5, height: 5, borderRadius: '50%',
                                                background: '#c6a75e',
                                                animation: `bounce 1.2s ${k * 0.2}s ease-in-out infinite`,
                                            }} />
                                        ))}
                                    </div>
                                </div>
                            )}
                            <div ref={chatEnd} />
                        </div>

                        {/* Input */}
                        <div style={{ padding: '0.75rem 1.25rem', borderTop: '1px solid rgba(198,167,94,0.12)', display: 'flex', alignItems: 'center', gap: 10 }}>
                            <input
                                id="guruji-chat-input"
                                type="text"
                                value={input}
                                onChange={e => setInput(e.target.value)}
                                onKeyDown={e => e.key === 'Enter' && handleSend()}
                                placeholder="अपना प्रश्न यहाँ लिखें…"
                                style={{
                                    flex: 1,
                                    background: 'transparent',
                                    border: 'none',
                                    borderBottom: '1px solid rgba(198,167,94,0.25)',
                                    padding: '0.3rem 0',
                                    color: 'rgba(240,233,218,0.85)',
                                    fontFamily: 'Cormorant Garamond, serif',
                                    fontSize: '0.97rem',
                                    outline: 'none',
                                    caretColor: '#c6a75e',
                                }}
                            />
                            <button
                                id="guruji-mic-btn"
                                onClick={handleVoice}
                                style={{ color: listening ? '#d9bc7a' : 'rgba(198,167,94,0.45)', transition: 'color 0.2s', flexShrink: 0 }}
                            >
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                                    <path d="M12 2a3 3 0 013 3v7a3 3 0 01-6 0V5a3 3 0 013-3z" />
                                    <path d="M19 10v2a7 7 0 01-14 0v-2" />
                                    <line x1="12" y1="19" x2="12" y2="23" />
                                    <line x1="8" y1="23" x2="16" y2="23" />
                                </svg>
                            </button>
                            <button
                                id="guruji-send-btn"
                                onClick={handleSend}
                                disabled={loading || !input.trim()}
                                className="btn-gold"
                                style={{ padding: '0.4rem 1rem', fontSize: '0.7rem', flexShrink: 0 }}
                            >
                                Send
                            </button>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
