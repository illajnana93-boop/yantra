import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useContribution } from '../context/ContributionContext';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { 
    FaTruck, FaPhone, FaMapMarkerAlt, 
    FaUser, FaCheckCircle, FaArrowLeft, FaCreditCard, 
    FaQrcode, FaShieldAlt, FaLock, FaGlobe
} from 'react-icons/fa';
import { FaHandsPraying } from 'react-icons/fa6';
import { SiGooglepay, SiPhonepe, SiPaytm } from 'react-icons/si';

const Checkout = () => {
    const { items, totalCount } = useContribution();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        address: ''
    });
    const [cardData, setCardData] = useState({
        number: '',
        expiry: '',
        cvv: ''
    });
    const [paymentMethod, setPaymentMethod] = useState<'cod' | 'online'>('cod');
    const [onlineOption, setOnlineOption] = useState<'upi' | 'card' | 'qr'>('upi');
    const [isLoading, setIsLoading] = useState(false);
    const [isComingSoon, setIsComingSoon] = useState(false);

    const totalPrice = items.reduce((sum, item) => sum + (item.price * item.qty), 0);
    const taxRate = 0.12; 
    const taxAmount = totalPrice * taxRate;
    const finalTotal = totalPrice + taxAmount;

    // Scroll to top on load
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        setIsLoading(true);
        // Both COD and Online are now "Coming Soon"
        setTimeout(() => {
            setIsLoading(false);
            setIsComingSoon(true);
        }, 1500);
    };

    if (totalCount === 0) {
        return (
            <div className="min-h-screen bg-[#040C1A] text-white selection:bg-[#D4AF37]/30 flex flex-col overflow-hidden">
                <Navbar />
                
                {/* Background elements */}
                <div className="fixed inset-0 pointer-events-none z-0">
                    <div className="absolute top-0 right-0 w-[40vw] h-[40vw] bg-[#D4AF37]/5 rounded-full blur-[150px]" />
                    <div className="absolute bottom-0 left-0 w-[40vw] h-[40vw] bg-blue-900/5 rounded-full blur-[150px]" />
                </div>

                <div className="flex-grow flex flex-col items-center justify-center px-4 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-center py-20"
                    >
                        <FaHandsPraying className="text-8xl text-[#D4AF37]/10 mb-12 mx-auto" />
                        <h2 className="text-white text-4xl md:text-5xl font-serif mb-8 tracking-[0.1em] uppercase">Your Basket is Empty</h2>
                        <div className="w-24 h-px bg-gold-gradient mx-auto mb-10 opacity-60" />
                        <p className="text-stone-500 mb-16 max-w-md mx-auto leading-[2] text-sm md:text-base italic">
                            The cosmic alignment for your contribution hasn't begun. <br/>
                            Return to the collection to find your divine instrument.
                        </p>
                        <button 
                            onClick={() => navigate('/')}
                            className="btn-gold-royal px-16 py-6 rounded-full text-[10px] font-black tracking-[0.4em] shadow-ambient-gold relative group transition-all hover:scale-105 active:scale-95"
                        >
                            <span className="relative z-10">BROWSE SACRED COLLECTION</span>
                        </button>
                    </motion.div>
                </div>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#040C1A] text-white selection:bg-[#D4AF37]/30 flex flex-col">
            <Navbar />
            
            {/* Background elements */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <div className="absolute top-0 right-0 w-[40vw] h-[40vw] bg-[#D4AF37]/5 rounded-full blur-[150px]" />
                <div className="absolute bottom-0 left-0 w-[40vw] h-[40vw] bg-blue-900/5 rounded-full blur-[150px]" />
            </div>

            <main className="relative z-10 pt-32 pb-24 px-4 md:px-10 max-w-7xl mx-auto flex-grow w-full">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                    >
                        <button 
                            onClick={() => navigate(-1)}
                            className="flex items-center gap-2 text-[#D4AF37] text-[10px] uppercase font-bold tracking-[0.2em] mb-4 hover:gap-3 transition-all"
                        >
                            <FaArrowLeft /> Back to Sanctuary
                        </button>
                        <h1 className="text-4xl md:text-6xl font-serif tracking-tight leading-none mb-4">
                            Sacred <span className="text-gold-gradient italic">Contribution</span>
                        </h1>
                        <p className="text-stone-500 text-xs md:text-sm uppercase tracking-[0.5em] font-black flex items-center gap-3">
                            <span className="w-10 h-px bg-[#D4AF37]/30" /> Confirm Your Offering
                        </p>
                    </motion.div>

                    <motion.div 
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="hidden md:flex items-center gap-10"
                    >
                        {[
                            { icon: <FaShieldAlt />, label: 'Secure Transaction' },
                            { icon: <FaLock />, label: 'Encrypted Private' },
                            { icon: <FaGlobe />, label: 'Baba’s Global Grace' },
                        ].map((item, id) => (
                            <div key={id} className="flex flex-col items-center gap-2">
                                <span className="text-xl text-[#D4AF37]/40">{item.icon}</span>
                                <span className="text-[8px] uppercase tracking-widest font-black text-stone-600">{item.label}</span>
                            </div>
                        ))}
                    </motion.div>
                </div>

                <div className="grid lg:grid-cols-12 gap-12">
                    {/* Main Content Area */}
                    <div className="lg:col-span-8 space-y-10">
                        <AnimatePresence mode="wait">
                            {isComingSoon ? (
                                <motion.div 
                                    key="coming-soon"
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="bg-[#081629]/60 backdrop-blur-xl border border-[#00E5FF]/30 p-12 md:p-20 rounded-[3rem] text-center shadow-[0_0_50px_rgba(0,229,255,0.1)]"
                                >
                                    <div className="w-24 h-24 bg-gradient-to-br from-[#D4AF37] to-[#8B7355] rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl">
                                        <FaCreditCard className="text-white text-4xl" />
                                    </div>
                                    <h2 className="text-4xl font-serif mb-6 text-white tracking-tight leading-tight uppercase">Payment Gateway <br/> <span className="text-[#D4AF37]">Coming Soon</span></h2>
                                    <div className="w-20 h-[2px] bg-gold-gradient mx-auto mb-8" />
                                    <p className="text-stone-300 text-lg md:text-xl italic leading-relaxed mb-12 max-w-md mx-auto font-light">
                                        The contribution portal is currently under active development. We are perfecting a secure and seamless experience for all devotees. 
                                        <br/><span className="text-stone-500 text-sm mt-4 block">Please check back shortly for the official launch.</span>
                                    </p>
                                    <div className="flex flex-col md:flex-row items-center justify-center gap-6">
                                        <button 
                                            onClick={() => navigate('/')}
                                            className="btn-gold-royal px-16 py-5 rounded-full text-xs font-black tracking-[0.3em] shadow-xl"
                                        >
                                            RETURN TO SANCTUARY
                                        </button>
                                    </div>
                                </motion.div>
                            ) : (
                                <motion.form 
                                    key="form"
                                    onSubmit={handleSubmit}
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="space-y-10"
                                >
                                    {/* Section 1: Devotee Information */}
                                    <div className="bg-[#081629]/40 backdrop-blur-md border border-white/5 p-8 md:p-12 rounded-[2.5rem]">
                                        <div className="flex items-center gap-4 mb-10">
                                            <div className="w-10 h-10 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 flex items-center justify-center text-sm font-black text-[#D4AF37]">1</div>
                                            <h3 className="text-xl md:text-2xl font-serif tracking-wide">Devotee Details</h3>
                                        </div>

                                        <div className="grid md:grid-cols-2 gap-8">
                                            <div className="space-y-2">
                                                <label className="text-[10px] uppercase tracking-[0.25em] font-black text-[#D4AF37] ml-2">Sacred Name</label>
                                                <div className="relative group">
                                                    <FaUser className="absolute left-6 top-1/2 -translate-y-1/2 text-[#D4AF37]/30 group-focus-within:text-[#D4AF37] transition-colors" />
                                                    <input 
                                                        required
                                                        type="text"
                                                        placeholder="Full Name"
                                                        value={formData.name}
                                                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                                                        className="w-full bg-[#040C1A] border border-white/10 rounded-2xl py-5 pl-14 pr-6 text-white text-sm outline-none focus:border-[#D4AF37]/50 transition-all placeholder:text-stone-700"
                                                    />
                                                </div>
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-[10px] uppercase tracking-[0.25em] font-black text-[#D4AF37] ml-2">Phone / WhatsApp</label>
                                                <div className="relative group">
                                                    <FaPhone className="absolute left-6 top-1/2 -translate-y-1/2 text-[#D4AF37]/30 group-focus-within:text-[#D4AF37] transition-colors" />
                                                    <input 
                                                        required
                                                        type="tel"
                                                        placeholder="+91"
                                                        value={formData.phone}
                                                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                                                        className="w-full bg-[#040C1A] border border-white/10 rounded-2xl py-5 pl-14 pr-6 text-white text-sm outline-none focus:border-[#D4AF37]/50 transition-all placeholder:text-stone-700"
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="mt-8 space-y-2">
                                            <label className="text-[10px] uppercase tracking-[0.25em] font-black text-[#D4AF37] ml-2">Delivery Address</label>
                                            <div className="relative group">
                                                <FaMapMarkerAlt className="absolute left-6 top-6 text-[#D4AF37]/30 group-focus-within:text-[#D4AF37] transition-colors" />
                                                <textarea 
                                                    required
                                                    rows={4}
                                                    placeholder="House No, Street, Landmark, City, State & Pincode"
                                                    value={formData.address}
                                                    onChange={(e) => setFormData({...formData, address: e.target.value})}
                                                    className="w-full bg-[#040C1A] border border-white/10 rounded-2xl py-6 pl-14 pr-6 text-white text-sm outline-none focus:border-[#D4AF37]/50 transition-all placeholder:text-stone-700 resize-none"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Section 2: Mode of Offering */}
                                    <div className="bg-[#081629]/40 backdrop-blur-md border border-white/5 p-8 md:p-12 rounded-[2.5rem]">
                                        <div className="flex items-center gap-4 mb-10">
                                            <div className="w-10 h-10 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 flex items-center justify-center text-sm font-black text-[#D4AF37]">2</div>
                                            <h3 className="text-xl md:text-2xl font-serif tracking-wide">Mode of Offering</h3>
                                        </div>

                                        <div className="grid md:grid-cols-2 gap-6 mb-10">
                                            <button 
                                                type="button"
                                                onClick={() => setPaymentMethod('cod')}
                                                className={`relative p-8 rounded-3xl border transition-all duration-300 flex flex-col items-center gap-4 group overflow-hidden ${paymentMethod === 'cod' ? 'bg-[#D4AF37]/10 border-[#D4AF37] text-white' : 'bg-[#040C1A] border-white/5 text-stone-500 hover:border-[#D4AF37]/30'}`}
                                            >
                                                {paymentMethod === 'cod' && (
                                                    <motion.div layoutId="payment-active" className="absolute top-4 right-4 text-[#D4AF37]"><FaCheckCircle /></motion.div>
                                                )}
                                                <FaTruck className={`text-4xl ${paymentMethod === 'cod' ? 'text-[#D4AF37]' : 'text-stone-700 group-hover:text-[#D4AF37]/50'} transition-colors`} />
                                                <div className="text-center">
                                                    <span className="text-xs font-black uppercase tracking-[0.2em] block mb-1">Cash on Delivery</span>
                                                    <span className="text-[10px] text-stone-500 italic">Pay on Darshan</span>
                                                </div>
                                            </button>

                                            <button 
                                                type="button"
                                                onClick={() => setPaymentMethod('online')}
                                                className={`relative p-8 rounded-3xl border transition-all duration-300 flex flex-col items-center gap-4 group overflow-hidden ${paymentMethod === 'online' ? 'bg-[#D4AF37]/10 border-[#D4AF37] text-white' : 'bg-[#040C1A] border-white/5 text-stone-500 hover:border-[#D4AF37]/30'}`}
                                            >
                                                <div className="absolute top-3 left-3 px-3 py-1 bg-[#D4AF37] text-[#040C1A] text-[8px] font-black uppercase tracking-widest rounded-full opacity-60">Future</div>
                                                {paymentMethod === 'online' && (
                                                    <motion.div layoutId="payment-active" className="absolute top-4 right-4 text-[#D4AF37]"><FaCheckCircle /></motion.div>
                                                )}
                                                <FaCreditCard className={`text-4xl ${paymentMethod === 'online' ? 'text-[#D4AF37]' : 'text-stone-700 group-hover:text-[#D4AF37]/50'} transition-colors`} />
                                                <div className="text-center">
                                                    <span className="text-xs font-black uppercase tracking-[0.2em] block mb-1">Online Payment</span>
                                                    <span className="text-[10px] text-stone-500 italic">Instant Sanctity</span>
                                                </div>
                                            </button>
                                        </div>

                                        {/* Dynamic Payment Options UI */}
                                        <AnimatePresence mode="wait">
                                            {paymentMethod === 'online' ? (
                                                <motion.div 
                                                    key="online-ui"
                                                    initial={{ opacity: 0, height: 0 }}
                                                    animate={{ opacity: 1, height: 'auto' }}
                                                    exit={{ opacity: 0, height: 0 }}
                                                    className="overflow-hidden"
                                                >
                                                    <div className="bg-[#040C1A] border border-[#D4AF37]/20 rounded-3xl p-8 space-y-8">
                                                        <div className="flex flex-wrap gap-4 justify-center">
                                                            {[
                                                                { id: 'upi', icon: <FaQrcode />, label: 'UPI / QR' },
                                                                { id: 'card', icon: <FaCreditCard />, label: 'Card' }
                                                            ].map(opt => (
                                                                <button
                                                                    key={opt.id}
                                                                    type="button"
                                                                    onClick={() => setOnlineOption(opt.id as any)}
                                                                    className={`px-8 py-3 rounded-full text-[10px] font-black uppercase tracking-widest border transition-all ${onlineOption === opt.id ? 'bg-[#D4AF37] text-[#040C1A] border-[#D4AF37]' : 'bg-transparent border-white/10 text-stone-500'}`}
                                                                >
                                                                    <div className="flex items-center gap-2">
                                                                        {opt.icon} {opt.label}
                                                                    </div>
                                                                </button>
                                                            ))}
                                                        </div>

                                                        <div className="pt-4">
                                                            {onlineOption === 'upi' && (
                                                                <div className="flex flex-col items-center text-center gap-6">
                                                                    <div className="w-48 h-48 bg-white p-4 rounded-3xl shadow-[0_0_30px_rgba(255,255,255,0.1)] relative group cursor-pointer">
                                                                        <img src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=JaiShriShyam_Payment" alt="UPI QR" className="w-full h-full opacity-80 group-hover:opacity-100 transition-opacity" />
                                                                        <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity rounded-3xl">
                                                                            <span className="text-white text-[10px] font-black uppercase tracking-widest">Scan to Pay</span>
                                                                        </div>
                                                                    </div>
                                                                    <div className="flex gap-8 items-center justify-center opacity-40">
                                                                        <SiGooglepay size={32} />
                                                                        <SiPhonepe size={28} />
                                                                        <SiPaytm size={40} />
                                                                    </div>
                                                                    <p className="text-stone-500 text-[10px] italic">Scan with any UPI App (GPay, PhonePe, Paytm)</p>
                                                                </div>
                                                            )}

                                                            {onlineOption === 'card' && (
                                                                <div className="max-w-md mx-auto space-y-4">
                                                                    <div className="space-y-2">
                                                                        <label className="text-[9px] uppercase tracking-widest font-bold text-stone-600 ml-2">Card Number</label>
                                                                        <input 
                                                                            type="text" 
                                                                            placeholder="•••• •••• •••• ••••" 
                                                                            value={cardData.number}
                                                                            onChange={(e) => setCardData({...cardData, number: e.target.value})}
                                                                            className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-6 text-sm text-white outline-none focus:border-[#D4AF37]/50" 
                                                                        />
                                                                    </div>
                                                                    <div className="grid grid-cols-2 gap-4">
                                                                        <div className="space-y-2">
                                                                            <label className="text-[9px] uppercase tracking-widest font-bold text-stone-600 ml-2">Expiry</label>
                                                                            <input 
                                                                                type="text" 
                                                                                placeholder="MM/YY" 
                                                                                value={cardData.expiry}
                                                                                onChange={(e) => setCardData({...cardData, expiry: e.target.value})}
                                                                                className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-6 text-sm text-white outline-none focus:border-[#D4AF37]/50" 
                                                                            />
                                                                        </div>
                                                                        <div className="space-y-2">
                                                                            <label className="text-[9px] uppercase tracking-widest font-bold text-stone-600 ml-2">CVV</label>
                                                                            <input 
                                                                                type="password" 
                                                                                placeholder="•••" 
                                                                                value={cardData.cvv}
                                                                                onChange={(e) => setCardData({...cardData, cvv: e.target.value})}
                                                                                className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-6 text-sm text-white outline-none focus:border-[#D4AF37]/50" 
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                </motion.div>
                                            ) : (
                                                <motion.div 
                                                    key="cod-ui"
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    className="bg-[#D4AF37]/5 border border-[#D4AF37]/20 rounded-3xl p-8 flex items-center gap-6"
                                                >
                                                    <div className="w-16 h-16 rounded-2xl bg-[#D4AF37]/10 flex items-center justify-center text-3xl text-[#D4AF37]">
                                                        <FaHandsPraying />
                                                    </div>
                                                    <div>
                                                        <p className="text-white font-serif text-lg mb-1">Traditional Offerings</p>
                                                        <p className="text-stone-500 text-xs leading-relaxed italic">
                                                            Honor the ancient way of exchange. Pay only when you receive your blessed Yantra from our messenger.
                                                        </p>
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>

                                        <button 
                                            type="submit"
                                            disabled={isLoading}
                                            className="btn-gold-royal w-full py-6 rounded-2xl font-black text-xs md:text-sm tracking-[0.4em] shadow-xl relative overflow-hidden flex items-center justify-center mt-12 hover:shadow-ambient-gold transition-all"
                                        >
                                            {isLoading ? (
                                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                            ) : (
                                                `CONFIRM MY ${finalTotal.toLocaleString()} OFFERING`
                                            )}
                                        </button>
                                    </div>
                                </motion.form>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Summary Sidebar */}
                    <aside className="lg:col-span-4">
                        <div className="sticky top-28 space-y-6">
                            {/* Summary Card */}
                            <div className="bg-[#081629]/60 backdrop-blur-xl border border-[#D4AF37]/20 rounded-[2.5rem] overflow-hidden shadow-2xl">
                                <div className="bg-[#D4AF37]/10 p-7 border-b border-[#D4AF37]/10">
                                    <h3 className="text-[#F5D76E] text-[10px] uppercase tracking-[0.4em] font-black italic">Sacred Summary</h3>
                                </div>
                                
                                <div className="p-8 space-y-10">
                                    {/* Item List */}
                                    <ul className="space-y-6">
                                        {items.map(item => (
                                            <li key={item.id} className="flex justify-between items-start group">
                                                <div className="flex flex-col">
                                                    <span className="text-white font-serif text-base group-hover:text-[#D4AF37] transition-colors">{item.weight}</span>
                                                    <span className="text-stone-500 text-[9px] uppercase tracking-widest mt-1">
                                                        Qty: <span className="text-stone-300">{item.qty}</span> × ₹{item.price.toLocaleString()}
                                                    </span>
                                                </div>
                                                <span className="text-white font-serif font-black">₹{(item.price * item.qty).toLocaleString()}</span>
                                            </li>
                                        ))}
                                    </ul>

                                    {/* Cost Breakdown */}
                                    <div className="space-y-4 pt-8 border-t border-white/5">
                                        <div className="flex justify-between items-center text-[10px] uppercase tracking-widest text-stone-500 font-bold">
                                            <span>Subtotal Offering</span>
                                            <span className="text-white">₹{totalPrice.toLocaleString()}</span>
                                        </div>
                                        <div className="flex justify-between items-center text-[10px] uppercase tracking-widest text-stone-500 font-bold">
                                            <span>Sacred Seva Tax (12%)</span>
                                            <span className="text-white">₹{taxAmount.toLocaleString()}</span>
                                        </div>
                                        <div className="flex justify-between items-center text-[10px] uppercase tracking-widest text-stone-500 font-bold">
                                            <span>Divine Delivery</span>
                                            <span className="text-green-500 font-black italic">GRATIS</span>
                                        </div>
                                    </div>

                                    {/* Grand Total */}
                                    <div className="flex justify-between items-center pt-8 border-t border-white/10 mt-4">
                                        <div>
                                            <span className="text-[#F5D76E] text-[10px] uppercase tracking-[0.3em] font-black block mb-1">Total Offering</span>
                                            <span className="text-[#A5A5A5] text-[8px] uppercase tracking-[0.2em] italic font-bold">Fully Transparent</span>
                                        </div>
                                        <span className="text-gold-gradient text-4xl md:text-5xl font-serif font-black tracking-tighter">
                                            ₹{finalTotal.toLocaleString()}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Trust Badge */}
                            <div className="bg-[#081629]/30 rounded-3xl p-6 border border-white/5 text-center flex flex-col items-center gap-4">
                                <div className="text-[#D4AF37]/20"><FaShieldAlt size={40} /></div>
                                <p className="text-stone-500 text-[10px] leading-relaxed italic max-w-xs">
                                    "Your contribution fuels the eternal fire of the Baba Shyam Temple. May His grace be your eternal shield."
                                </p>
                                <div className="flex items-center gap-4 text-stone-700">
                                    <FaLock size={12} /> <span className="text-[8px] uppercase tracking-widest font-black">100% Divine Integrity</span>
                                </div>
                            </div>
                        </div>
                    </aside>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default Checkout;
