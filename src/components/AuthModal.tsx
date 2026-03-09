import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { FaTimes, FaUser, FaEnvelope, FaPhone, FaLock } from 'react-icons/fa';

const AuthModal = () => {
    const { isAuthModalOpen, closeAuthModal, signIn, signUp } = useAuth();
    const [mode, setMode] = useState<'login' | 'signup'>('signup');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (isAuthModalOpen) {
            document.body.classList.add('sacred-form-active');
        } else {
            document.body.classList.remove('sacred-form-active');
            setError(null);
            setIsSubmitting(false);
        }
        return () => document.body.classList.remove('sacred-form-active');
    }, [isAuthModalOpen]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setIsSubmitting(true);

        try {
            if (mode === 'signup') {
                const { error: signUpError } = await signUp(email, password, { name, phone });
                if (signUpError) throw signUpError;
            } else {
                const { error: signInError } = await signIn(email, password);
                if (signInError) throw signInError;
            }
            closeAuthModal();
        } catch (err: any) {
            setError(err.message || "An authentication error occurred.");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!isAuthModalOpen) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-[20000] flex items-center justify-center p-4">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={closeAuthModal}
                    className="absolute inset-0 bg-[#050c18]/90 backdrop-blur-xl"
                />

                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 10 }}
                    className="relative w-full max-w-[400px] bg-[#f9f5ec] border border-[#D4AF37]/30 rounded-[2rem] p-6 md:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.25)] overflow-hidden"
                >
                    {/* Decorative Elements */}
                    <div className="absolute top-0 left-0 w-full h-1 bg-gold-gradient" />
                    <div className="absolute -top-16 -right-16 w-32 h-32 bg-[#D4AF37]/5 rounded-full blur-2xl" />

                    <button
                        onClick={closeAuthModal}
                        className="absolute top-4 right-4 text-stone-500 hover:text-[#D4AF37] transition-all"
                    >
                        <FaTimes size={18} />
                    </button>

                    <div className="text-center mb-6">
                        <div className="flex justify-center mb-3">
                            <img src="/om.png" alt="Om" className="w-10 h-10 object-contain filter drop-shadow-sm" />
                        </div>
                        <h2 className="text-2xl text-[#0A1F3C] font-serif font-bold tracking-tight mb-1">
                            {mode === 'signup' ? 'New Devotee' : 'Devotee Login'}
                        </h2>
                        <p className="text-[#8B7355] text-[9px] uppercase tracking-[0.3em] font-black opacity-80">
                            {mode === 'signup' ? 'Join the Sacred Circle' : 'Jai Shri Shyam'}
                        </p>
                    </div>

                    {error && (
                        <motion.div
                            initial={{ opacity: 0, y: -5 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-red-50 border border-red-200 text-red-700 text-[10px] p-3 rounded-lg mb-5 text-center italic"
                        >
                            {error}
                        </motion.div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-3.5">
                        {mode === 'signup' && (
                            <>
                                <div className="relative group">
                                    <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-[#D4AF37]/60 text-xs" />
                                    <input
                                        required
                                        type="text"
                                        placeholder="Full Name"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        className="w-full bg-white border border-[#D4AF37]/20 rounded-xl py-3 pl-10 pr-4 text-[#0A1F3C] text-sm outline-none focus:border-[#D4AF37] transition-all"
                                    />
                                </div>
                                <div className="relative group">
                                    <FaPhone className="absolute left-4 top-1/2 -translate-y-1/2 text-[#D4AF37]/60 text-xs" />
                                    <input
                                        required
                                        type="tel"
                                        placeholder="Mobile Number"
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                        className="w-full bg-white border border-[#D4AF37]/20 rounded-xl py-3 pl-10 pr-4 text-[#0A1F3C] text-sm outline-none focus:border-[#D4AF37] transition-all"
                                    />
                                </div>
                            </>
                        )}

                        <div className="relative group">
                            <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-[#D4AF37]/60 text-xs" />
                            <input
                                required
                                type="email"
                                placeholder="Email Address"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full bg-white border border-[#D4AF37]/20 rounded-xl py-3 pl-10 pr-4 text-[#0A1F3C] text-sm outline-none focus:border-[#D4AF37] transition-all"
                            />
                        </div>

                        <div className="relative group">
                            <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-[#D4AF37]/60 text-xs" />
                            <input
                                required
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-white border border-[#D4AF37]/20 rounded-xl py-3 pl-10 pr-4 text-[#0A1F3C] text-sm outline-none focus:border-[#D4AF37] transition-all"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="btn-gold-royal w-full py-3.5 rounded-xl font-black text-[11px] tracking-[0.25em] shadow-md mt-2 flex justify-center items-center h-12"
                        >
                            {isSubmitting ? (
                                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            ) : (
                                mode === 'signup' ? 'REGISTER' : 'LOGIN'
                            )}
                        </button>
                    </form>

                    <div className="mt-6 text-center">
                        <button
                            onClick={() => { setMode(mode === 'login' ? 'signup' : 'login'); setError(null); }}
                            className="text-[#D4AF37] text-xs font-bold hover:underline underline-offset-4 tracking-wide"
                        >
                            {mode === 'login' ? "New Devotee? Register Here" : "Existing Member? Log In"}
                        </button>
                    </div>

                    <p className="text-center text-stone-400 text-[9px] mt-6 leading-relaxed max-w-[240px] mx-auto opacity-70 italic">
                        Securing your spiritual data with Baba's grace.
                    </p>
                </motion.div>
            </div>
        </AnimatePresence>
    );
};

export default AuthModal;
