import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useContribution } from '../context/ContributionContext';
import { 
    FaShieldAlt, FaLock, FaCheckCircle, FaTruck, FaCreditCard, FaLockOpen, FaUniversity,
    FaMobileAlt, FaShoppingBag, FaUser, FaPhoneAlt, FaMapMarkerAlt, FaScroll
} from 'react-icons/fa';
import { SiRazorpay } from 'react-icons/si';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabase';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Checkout: React.FC = () => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const { items, clearItems } = useContribution();
    const [isLoading, setIsLoading] = useState(false);
    const [showComingSoon, setShowComingSoon] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState<'cod' | 'online' | 'upi' | 'card' | 'netbanking' | 'razorpay'>('cod');
    
    // Devotee Information states
    const [formData, setFormData] = useState({
        fullName: '',
        phone: '',
        address: '',
        gotra: '',
        city: ''
    });

    useEffect(() => {
        window.scrollTo(0, 0);
        
        // Fetch known devotee details from Supabase
        const fetchDevoteeDetails = async () => {
            if (user) {
                try {
                    const { data, error } = await supabase
                        .from('temple_contributions')
                        .select('full_name, gotra, city')
                        .eq('user_id', user.id)
                        .order('created_at', { ascending: false })
                        .limit(1);

                    if (data && data.length > 0) {
                        setFormData(prev => ({
                            ...prev,
                            fullName: data[0].full_name,
                            gotra: data[0].gotra,
                            city: data[0].city,
                            phone: prev.phone || user.phone || ''
                        }));
                    } else if (user.name) {
                        setFormData(prev => ({ 
                            ...prev, 
                            fullName: user.name,
                            phone: prev.phone || user.phone || ''
                        }));
                    }
                } catch (err) {
                    console.error("Error fetching devotee details:", err);
                }
            }
        };
        fetchDevoteeDetails();
    }, [user]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const subtotal = items.reduce((acc, item) => acc + (item.price * item.qty), 0);
    const finalTotal = subtotal;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        
        setTimeout(() => {
            setIsLoading(false);
            // All payment methods are currently leading to the "Coming Soon" screen
            setShowComingSoon(true);
        }, 2000);
    };

    if (showSuccess) {
        return (
            <div className="min-h-screen bg-[#040C1A] text-white flex flex-col relative overflow-hidden">
                <Navbar />
                <main className="flex-grow flex items-center justify-center pt-40 pb-20 px-6 text-center relative z-10">
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="max-w-2xl w-full"
                    >
                        <div className="w-40 h-40 mb-10 relative mx-auto">
                            <motion.div 
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ type: 'spring', damping: 10, stiffness: 100, delay: 0.2 }}
                                className="absolute inset-0 bg-gold-gradient rounded-full blur-[30px] opacity-20"
                            />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <FaCheckCircle className="text-[#D4AF37] text-8xl drop-shadow-[0_0_20px_rgba(212,175,55,0.4)]" />
                            </div>
                        </div>

                        <h2 className="text-4xl md:text-5xl font-serif mb-6 uppercase tracking-[0.3em] text-[#D4AF37]">Order Successful</h2>
                        <div className="w-24 h-px bg-gold-gradient mx-auto mb-10" />
                        
                        <p className="text-stone-400 mb-12 italic text-lg leading-relaxed max-w-lg mx-auto">
                            "Divine Blessings! Your Cash on Delivery order has been placed successfully. 
                            The sacred energy will reach your doorstep soon."
                        </p>
                        
                        <button 
                            onClick={() => navigate('/')}
                            className="btn-gold-royal px-16 py-5 rounded-full text-[10px] font-black tracking-[0.4em] uppercase shadow-2xl hover:scale-105 transition-transform"
                        >
                            Back to Sacred Home
                        </button>

                        <p className="mt-12 text-stone-600 text-[9px] uppercase tracking-[0.3em] font-black">
                             You will receive a confirmation message shortly.
                        </p>
                    </motion.div>
                </main>
                <Footer />
            </div>
        );
    }

    if (showComingSoon) {
        return (
            <div className="min-h-screen bg-[#040C1A] text-white flex flex-col relative overflow-hidden">
                <Navbar />
                <main className="flex-grow flex items-center justify-center pt-40 pb-20 px-6 text-center relative z-10">
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="max-w-2xl w-full"
                    >
                        <div className="w-40 h-40 mb-10 relative mx-auto">
                            <motion.div 
                                animate={{ rotate: 360 }}
                                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                                className="absolute inset-0 border border-[#D4AF37]/20 rounded-full"
                            />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <SiRazorpay className="text-[#D4AF37] text-7xl opacity-20 animate-pulse" />
                            </div>
                        </div>

                        <h2 className="text-4xl md:text-5xl font-serif mb-6 uppercase tracking-[0.3em] text-[#D4AF37]">Bridge Under Construction</h2>
                        <div className="w-24 h-px bg-gold-gradient mx-auto mb-10" />
                        
                        <p className="text-stone-400 mb-12 italic text-lg leading-relaxed max-w-lg mx-auto">
                            "The sacred digital gateway is being ritually purified for secure offerings. 
                            Online payment integration (Razorpay) will be active soon."
                        </p>
                        
                        <div className="flex flex-col md:flex-row items-center justify-center gap-6">
                            <button 
                                onClick={() => setShowComingSoon(false)}
                                className="w-full md:w-auto border border-[#D4AF37]/30 px-12 py-4 rounded-full text-[10px] font-black tracking-[0.3em] uppercase hover:bg-[#D4AF37]/5 transition-all"
                            >
                                Go Back
                            </button>
                            <button 
                                onClick={() => { clearItems(); navigate('/'); }}
                                className="w-full md:w-auto btn-gold-royal px-12 py-4 rounded-full text-[10px] font-black tracking-[0.3em] uppercase shadow-2xl"
                            >
                                Home of Devotion
                            </button>
                        </div>
                    </motion.div>
                </main>
                <Footer />
            </div>
        );
    }

    if (items.length === 0) {
        return (
            <div className="min-h-screen bg-[#040C1A] text-white flex flex-col relative overflow-hidden">
                <Navbar />
                <main className="flex-grow flex items-center justify-center pt-40 pb-20 px-6 text-center relative z-10">
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="max-w-lg w-full"
                    >
                        <div className="w-32 h-32 bg-[#D4AF37]/5 rounded-full flex items-center justify-center mx-auto mb-10 border border-[#D4AF37]/10">
                            <FaShoppingBag className="text-[#D4AF37] text-5xl opacity-40" />
                        </div>
                        <h2 className="text-4xl font-serif mb-6 uppercase tracking-[0.3em] text-[#D4AF37]">Your Cart is Empty</h2>
                        <p className="text-stone-400 mb-12 italic text-lg leading-relaxed">
                            "The sacred temple awaits your devotion. Choose your spiritual offering to proceed with the blessing."
                        </p>
                        <button 
                            onClick={() => navigate('/')}
                            className="btn-gold-royal px-16 py-5 rounded-full text-xs font-black tracking-[0.3em] hover:scale-105 transition-transform"
                        >
                            Explore Collection
                        </button>
                    </motion.div>
                </main>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#040C1A] text-white selection:bg-[#D4AF37]/30 flex flex-col relative overflow-hidden">
            <Navbar />
            
            {/* Cosmic Background Elements */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <div className="absolute top-0 left-0 w-full h-full opacity-30 mix-blend-screen bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]" />
                <div className="absolute top-[-10%] right-[-10%] w-[70vw] h-[70vw] bg-[#D4AF37]/5 rounded-full blur-[150px] animate-pulse" />
                <div className="absolute bottom-[-20%] left-[-20%] w-[60vw] h-[60vw] bg-[#1E3A8A]/10 rounded-full blur-[120px]" />
            </div>

            <main className="relative z-10 pt-32 pb-24 px-4 md:px-10 max-w-6xl mx-auto flex-grow w-full">
                {/* 1. Header Section */}
                <div className="text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex flex-col items-center"
                    >
                        <div className="w-20 h-20 mb-6 relative">
                            <motion.div 
                                animate={{ rotate: 360 }}
                                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                                className="absolute inset-0 border-2 border-dashed border-[#D4AF37]/30 rounded-full"
                            />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <span className="text-4xl text-[#D4AF37] drop-shadow-[0_0_15px_rgba(212,175,55,0.5)]">☸</span>
                            </div>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-serif tracking-tight uppercase mb-4 text-gold-gradient">
                            Secure Payment
                        </h1>
                        <p className="text-stone-400 text-xs md:text-sm uppercase tracking-[0.4em] font-black italic">
                            Complete Your Offering / Seva Safely
                        </p>
                    </motion.div>
                </div>

                <div className="grid lg:grid-cols-12 gap-12 items-start">
                    {/* LEFT COLUMN: Details & Payment Methods */}
                    <div className="lg:col-span-7 space-y-12">
                        
                        {/* Section A: Devotee Details */}
                        <div className="space-y-8">
                            <h2 className="text-xl md:text-2xl font-serif uppercase tracking-[0.3em] text-[#D4AF37]">
                                Devotee Information
                            </h2>
                            <div className="grid md:grid-cols-2 gap-6 p-8 bg-[#081629]/40 border border-white/5 rounded-[2.5rem]">
                                <div className="space-y-2 md:col-span-2">
                                    <p className="text-stone-500 text-[10px] uppercase font-black tracking-widest italic mb-1">Full name</p>
                                    <div className="relative group">
                                        <FaUser className="absolute left-6 top-1/2 -translate-y-1/2 text-stone-600 transition-colors group-focus-within:text-[#D4AF37]" />
                                        <input 
                                            type="text" 
                                            name="fullName"
                                            value={formData.fullName}
                                            onChange={handleInputChange}
                                            placeholder="SHYAM BHAKT" 
                                            required
                                            className="w-full bg-[#040C1A] border border-white/5 rounded-2xl py-5 pl-14 pr-6 text-white text-xs font-black tracking-widest outline-none focus:border-[#D4AF37]/30 transition-all placeholder:text-stone-800" 
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <p className="text-stone-500 text-[10px] uppercase font-black tracking-widest italic mb-1">Gotra</p>
                                    <div className="relative group">
                                        <FaScroll className="absolute left-6 top-1/2 -translate-y-1/2 text-stone-600 transition-colors group-focus-within:text-[#D4AF37]" />
                                        <input 
                                            type="text" 
                                            name="gotra"
                                            value={formData.gotra}
                                            onChange={handleInputChange}
                                            placeholder="BHARDWAJ / KASHYAP" 
                                            required
                                            className="w-full bg-[#040C1A] border border-white/5 rounded-2xl py-5 pl-14 pr-6 text-white text-xs font-black tracking-widest outline-none focus:border-[#D4AF37]/30 transition-all placeholder:text-stone-800" 
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <p className="text-stone-500 text-[10px] uppercase font-black tracking-widest italic mb-1">City</p>
                                    <div className="relative group">
                                        <FaMapMarkerAlt className="absolute left-6 top-1/2 -translate-y-1/2 text-stone-600 transition-colors group-focus-within:text-[#D4AF37]" />
                                        <input 
                                            type="text" 
                                            name="city"
                                            value={formData.city}
                                            onChange={handleInputChange}
                                            placeholder="JAIPUR / DELHI" 
                                            required
                                            className="w-full bg-[#040C1A] border border-white/5 rounded-2xl py-5 pl-14 pr-6 text-white text-xs font-black tracking-widest outline-none focus:border-[#D4AF37]/30 transition-all placeholder:text-stone-800" 
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2 md:col-span-2">
                                    <p className="text-stone-500 text-[10px] uppercase font-black tracking-widest italic mb-1">Delivery Address</p>
                                    <div className="relative group">
                                        <FaMapMarkerAlt className="absolute left-6 top-6 text-stone-600 transition-colors group-focus-within:text-[#D4AF37]" />
                                        <textarea 
                                            name="address"
                                            value={formData.address}
                                            onChange={handleInputChange}
                                            rows={3} 
                                            placeholder="COMPLETE SACRED ADDRESS FOR DELIVERY" 
                                            required
                                            className="w-full bg-[#040C1A] border border-white/5 rounded-2xl py-5 pl-14 pr-6 text-white text-xs font-black tracking-widest outline-none focus:border-[#D4AF37]/30 transition-all placeholder:text-stone-800 resize-none" 
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Section B: Payment Method */}
                        <div className="space-y-8">
                            <h2 className="text-xl md:text-2xl font-serif uppercase tracking-[0.3em] text-[#D4AF37]">
                                Choose Payment Method
                            </h2>
                            
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                {[
                                    { id: 'upi', icon: <FaMobileAlt />, label: 'UPI' },
                                    { id: 'card', icon: <FaCreditCard />, label: 'Card' },
                                    { id: 'netbanking', icon: <FaUniversity />, label: 'NB' },
                                    { id: 'razorpay', icon: <SiRazorpay />, label: 'Razor' },
                                    { id: 'cod', icon: <FaTruck />, label: 'COD' },
                                ].map((method) => (
                                    <button
                                        key={method.id}
                                        onClick={() => setPaymentMethod(method.id as any)}
                                        className={`relative p-6 rounded-3xl border transition-all duration-300 flex flex-col items-center justify-center gap-3 group ${
                                            paymentMethod === method.id 
                                                ? 'bg-[#D4AF37]/10 border-[#D4AF37] shadow-[0_0_20px_rgba(212,175,55,0.1)]' 
                                                : 'bg-[#081629]/40 border-white/5 hover:border-[#D4AF37]/30'
                                        }`}
                                    >
                                        <div className={`text-2xl ${paymentMethod === method.id ? 'text-[#D4AF37]' : 'text-stone-600'}`}>
                                            {method.icon}
                                        </div>
                                        <span className={`text-[10px] font-black uppercase tracking-widest ${paymentMethod === method.id ? 'text-white' : 'text-stone-500'}`}>
                                            {method.label}
                                        </span>
                                        {paymentMethod === method.id && (
                                            <div className="absolute top-2 right-2 text-[#D3AF37] text-xs">
                                                <FaCheckCircle />
                                            </div>
                                        )}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Section C: Method Details */}
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={paymentMethod}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="bg-[#081629]/80 backdrop-blur-xl border border-[#D4AF37]/20 p-8 rounded-[2.5rem] space-y-6"
                            >
                                <div className="flex items-center gap-4 border-b border-white/5 pb-6">
                                    <div className="p-3 bg-[#D4AF37]/10 rounded-xl text-[#D4AF37]">
                                        <FaShieldAlt />
                                    </div>
                                    <h3 className="text-lg font-serif uppercase tracking-widest text-white">Verification</h3>
                                </div>

                                {paymentMethod === 'upi' && (
                                    <div className="space-y-4">
                                        <p className="text-stone-500 text-[10px] uppercase font-black tracking-widest italic">UPI Identifier</p>
                                        <input type="text" placeholder="UPI-ID@OKBANK" className="w-full bg-[#040C1A] border border-white/5 rounded-2xl py-5 px-6 text-white text-xs font-black tracking-widest outline-none focus:border-[#D4AF37]/30 transition-all placeholder:text-stone-800" />
                                    </div>
                                )}

                                {paymentMethod === 'card' && (
                                    <div className="space-y-4">
                                        <input type="text" placeholder="CARD NUMBER" className="w-full bg-[#040C1A] border border-white/5 rounded-2xl py-5 px-6 text-white text-xs font-black tracking-widest outline-none focus:border-[#D4AF37]/30 transition-all placeholder:text-stone-800" />
                                        <div className="grid grid-cols-2 gap-4">
                                            <input type="text" placeholder="MM/YY" className="bg-[#040C1A] border border-white/5 rounded-2xl py-5 px-6 text-white text-xs font-black tracking-widest outline-none focus:border-[#D4AF37]/30" />
                                            <input type="password" placeholder="CVV" maxLength={3} className="bg-[#040C1A] border border-white/5 rounded-2xl py-5 px-6 text-white text-xs font-black tracking-widest outline-none focus:border-[#D4AF37]/30" />
                                        </div>
                                    </div>
                                )}

                                {paymentMethod === 'netbanking' && (
                                    <select className="w-full bg-[#040C1A] border border-white/5 rounded-2xl py-5 px-6 text-white text-xs font-black tracking-widest outline-none focus:border-[#D4AF37]/30 appearance-none cursor-pointer">
                                        <option value="">SELECT BANK</option>
                                        <option value="sbi">SBI</option>
                                        <option value="hdfc">HDFC</option>
                                        <option value="icici">ICICI</option>
                                    </select>
                                )}

                                {paymentMethod === 'cod' && (
                                    <div className="flex gap-4">
                                        <FaTruck className="text-2xl text-[#D4AF37]" />
                                        <p className="text-xs text-stone-500 italic leading-relaxed">
                                            "Pay the collection amount at your doorstep after receiving the sacred blessing."
                                        </p>
                                    </div>
                                )}

                                {paymentMethod === 'razorpay' && (
                                    <div className="text-center py-4">
                                        <SiRazorpay className="text-[#D4AF37] text-3xl mx-auto mb-4" />
                                        <p className="text-xs text-stone-600 tracking-widest uppercase">Secure Redirection Active</p>
                                    </div>
                                )}
                            </motion.div>
                        </AnimatePresence>

                        {/* Section D: Trust Badges */}
                        <div className="grid grid-cols-4 gap-4 text-center pb-8">
                            {[
                                { icon: <FaShieldAlt className="text-[#34D399]" />, label: 'SAFE' },
                                { icon: <FaLock className="text-[#60A5FA]" />, label: 'PCI' },
                                { icon: <FaLockOpen className="text-[#A78BFA]" />, label: 'SSL' },
                                { icon: <SiRazorpay className="text-[#D4AF37]" />, label: 'UPI' },
                            ].map((badge, i) => (
                                <div key={i} className="flex flex-col items-center gap-2">
                                    <div className="text-lg opacity-40">{badge.icon}</div>
                                    <span className="text-[8px] font-black uppercase tracking-widest text-stone-600">{badge.label}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* RIGHT COLUMN: Order Summary (Fixed/Sticky) */}
                    <div className="lg:col-span-5 sticky top-32 space-y-8">
                        <motion.div 
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="bg-[#081629]/80 backdrop-blur-xl border border-[#D4AF37]/30 p-8 rounded-[2.5rem] relative"
                        >
                            <div className="absolute top-0 right-0 w-32 h-32 bg-[#D4AF37]/5 rounded-bl-[100px] -z-10" />
                            <h3 className="text-xl font-serif uppercase tracking-widest text-[#D4AF37] mb-8 border-b border-[#D4AF37]/10 pb-4">Devotion Summary</h3>
                            
                            <div className="space-y-6 max-h-[40vh] overflow-y-auto pr-2 custom-scrollbar">
                                {items.map((item, idx) => (
                                    <div key={idx} className="flex items-center gap-6 group">
                                        <div className="w-16 h-16 bg-[#040C1A] border border-white/5 rounded-2xl p-2 flex items-center justify-center transition-transform group-hover:scale-110">
                                            <img src="/image copy.png" alt="Offering" className="w-full h-full object-contain" />
                                        </div>
                                        <div className="flex-grow">
                                            <h4 className="text-xs font-black text-white uppercase tracking-widest line-clamp-1">{item.weight}</h4>
                                            <p className="text-stone-500 text-[10px] mt-1 uppercase font-bold tracking-tighter">Qty: {item.qty} × ₹{item.price.toLocaleString()}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-8 space-y-3 text-[10px] font-black uppercase tracking-widest text-stone-500">
                                <div className="flex justify-between">
                                    <span>Seva Subtotal</span>
                                    <span className="text-white">₹{subtotal.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Ritual Shipping</span>
                                    <span className="text-green-500 italic">COMPLIMENTARY</span>
                                </div>
                                <div className="flex justify-between pt-6 border-t border-white/5 items-center">
                                    <span className="text-sm text-[#D4AF37]">Devotion Total</span>
                                    <span className="text-3xl font-serif text-white">₹{finalTotal.toLocaleString()}</span>
                                </div>
                            </div>

                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={handleSubmit}
                                disabled={isLoading}
                                className="w-full mt-10 btn-gold-royal py-6 rounded-3xl flex items-center justify-center gap-4 shadow-xl overflow-hidden"
                            >
                                {isLoading ? (
                                    <div className="w-5 h-5 border-2 border-[#040C1A] border-t-white/30 rounded-full animate-spin" />
                                ) : (
                                    <>
                                        <FaShieldAlt className="opacity-40" />
                                        <span className="text-xs font-black uppercase tracking-[0.3em]">Complete Seva</span>
                                    </>
                                )}
                            </motion.button>
                        </motion.div>
                        
                        <p className="text-center text-[9px] uppercase font-black tracking-[0.2em] text-stone-700">
                             🔒 256-Bit Encrypted Secure Connection
                        </p>
                    </div>
                </div>
            </main>

            <Footer />

            <style dangerouslySetInnerHTML={{ __html: `
                .custom-scrollbar::-webkit-scrollbar { width: 4px; }
                .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
                .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(212, 175, 55, 0.1); border-radius: 10px; }
            ` }} />
        </div>
    );
};

export default Checkout;
