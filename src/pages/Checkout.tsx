import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useContribution } from '../context/ContributionContext';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { 
    FaTruck, FaPhone, FaMapMarkerAlt, 
    FaUser, FaCheckCircle, FaArrowLeft, FaCreditCard, 
    FaShieldAlt, FaLock
} from 'react-icons/fa';
import { FaHandsPraying } from 'react-icons/fa6';

const Checkout = () => {
    const { items, totalCount } = useContribution();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        address: ''
    });
    const [paymentMethod, setPaymentMethod] = useState<'cod' | 'online'>('cod');
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
        <div className="min-h-screen bg-[#0a1f3c] text-white selection:bg-[#D4AF37]/30 flex flex-col">
            <Navbar />
            
            {/* Celestial Background Elements */}
            <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
                <div className="absolute top-0 right-[-10%] w-[60vw] h-[60vw] bg-[#D4AF37]/5 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-blue-400/10 rounded-full blur-[100px]" />
            </div>

            <main className="relative z-10 pt-32 pb-24 px-4 md:px-10 max-w-7xl mx-auto flex-grow w-full">
                {/* Header Section */}
                <div className="mb-16">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                    >
                        <button 
                            onClick={() => navigate(-1)}
                            className="flex items-center gap-2 text-[#D4AF37] text-xs uppercase font-bold tracking-[0.2em] mb-6 hover:gap-3 transition-all"
                        >
                            <FaArrowLeft /> Back to Sanctuary
                        </button>
                        <h1 className="text-4xl md:text-6xl font-serif tracking-tight leading-none mb-4 uppercase">
                            Sacred <span className="text-gold-gradient italic">Contribution</span>
                        </h1>
                        <p className="text-stone-400 text-xs md:text-sm uppercase tracking-[0.5em] font-black flex items-center gap-3">
                            <span className="w-12 h-px bg-[#D4AF37]/30" /> Confirm Your Offering
                        </p>
                    </motion.div>
                </div>

                <div className="grid lg:grid-cols-12 gap-10 items-start">
                    {/* LEFT COLUMN: Main Form */}
                    <div className="lg:col-span-7 space-y-8">
                        <AnimatePresence mode="wait">
                            {isComingSoon ? (
                                <motion.div 
                                    key="coming-soon"
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="bg-[#132c4e]/60 backdrop-blur-xl border border-white/5 p-12 md:p-20 rounded-[3rem] text-center shadow-2xl"
                                >
                                    <div className="w-24 h-24 bg-gradient-to-br from-[#D4AF37] to-[#8B7355] rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl">
                                        <FaCreditCard className="text-white text-4xl" />
                                    </div>
                                    <h2 className="text-3xl md:text-4xl font-serif mb-6 text-white tracking-tight uppercase">Portal <span className="text-[#D4AF37]">Coming Soon</span></h2>
                                    <p className="text-stone-300 text-lg leading-relaxed mb-12 max-w-md mx-auto font-light">
                                        Our celestial payment gateway is being perfected for your security. Please check back shortly.
                                    </p>
                                    <button 
                                        onClick={() => navigate('/')}
                                        className="btn-gold-royal px-16 py-5 rounded-full text-xs font-black tracking-[0.3em] shadow-xl"
                                    >
                                        Return Home
                                    </button>
                                </motion.div>
                            ) : (
                                <motion.form 
                                    key="form"
                                    onSubmit={handleSubmit}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="space-y-8"
                                >
                                    {/* Section 1: Devotee Details */}
                                    <div className="bg-[#132c4e]/40 backdrop-blur-md border border-white/5 p-8 md:p-12 rounded-[2.5rem] shadow-xl">
                                        <div className="flex items-center gap-5 mb-10">
                                            <div className="w-12 h-12 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 flex items-center justify-center text-lg font-black text-[#D4AF37]">1</div>
                                            <h3 className="text-2xl md:text-3xl font-serif tracking-wide text-white">Devotee Details</h3>
                                        </div>

                                        <div className="grid md:grid-cols-2 gap-8">
                                            <div className="space-y-3">
                                                <label className="text-xs uppercase tracking-[0.2em] font-black text-[#D4AF37] ml-2">Sacred Name</label>
                                                <div className="relative group">
                                                    <FaUser className="absolute left-6 top-1/2 -translate-y-1/2 text-[#D4AF37]/30 group-focus-within:text-[#D4AF37] text-lg transition-colors" />
                                                    <input 
                                                        required
                                                        type="text"
                                                        placeholder="Full Name"
                                                        value={formData.name}
                                                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                                                        className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 pl-16 pr-6 text-white text-base outline-none focus:border-[#D4AF37]/50 focus:bg-white/10 transition-all placeholder:text-stone-500 font-medium"
                                                    />
                                                </div>
                                            </div>
                                            <div className="space-y-3">
                                                <label className="text-xs uppercase tracking-[0.2em] font-black text-[#D4AF37] ml-2">Phone Number</label>
                                                <div className="relative group">
                                                    <FaPhone className="absolute left-6 top-1/2 -translate-y-1/2 text-[#D4AF37]/30 group-focus-within:text-[#D4AF37] text-lg transition-colors" />
                                                    <input 
                                                        required
                                                        type="tel"
                                                        placeholder="+91"
                                                        value={formData.phone}
                                                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                                                        className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 pl-16 pr-6 text-white text-base outline-none focus:border-[#D4AF37]/50 focus:bg-white/10 transition-all placeholder:text-stone-500 font-medium"
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="mt-8 space-y-3">
                                            <label className="text-xs uppercase tracking-[0.2em] font-black text-[#D4AF37] ml-2">Delivery Address</label>
                                            <div className="relative group">
                                                <FaMapMarkerAlt className="absolute left-6 top-6 text-[#D4AF37]/30 group-focus-within:text-[#D4AF37] text-lg transition-colors" />
                                                <textarea 
                                                    required
                                                    rows={4}
                                                    placeholder="House No, Street, Landmark, Pin-code"
                                                    value={formData.address}
                                                    onChange={(e) => setFormData({...formData, address: e.target.value})}
                                                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-6 pl-16 pr-6 text-white text-base outline-none focus:border-[#D4AF37]/50 focus:bg-white/10 transition-all placeholder:text-stone-500 resize-none font-medium"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Section 2: Mode of Offering */}
                                    <div className="bg-[#132c4e]/40 backdrop-blur-md border border-white/5 p-8 md:p-12 rounded-[2.5rem] shadow-xl">
                                        <div className="flex items-center gap-5 mb-10">
                                            <div className="w-12 h-12 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 flex items-center justify-center text-lg font-black text-[#D4AF37]">2</div>
                                            <h3 className="text-2xl md:text-3xl font-serif tracking-wide text-white">Mode of Offering</h3>
                                        </div>

                                        <div className="grid md:grid-cols-2 gap-6 mb-10">
                                            <button 
                                                type="button"
                                                onClick={() => setPaymentMethod('cod')}
                                                className={`relative p-8 rounded-3xl border transition-all duration-300 flex flex-col items-center gap-4 group overflow-hidden ${paymentMethod === 'cod' ? 'bg-[#D4AF37]/10 border-[#D4AF37] text-white shadow-[0_0_30px_rgba(212,175,55,0.1)]' : 'bg-[#0a1f3c] border-white/5 text-stone-500 hover:border-[#D4AF37]/30'}`}
                                            >
                                                {paymentMethod === 'cod' && (
                                                    <motion.div layoutId="payment-active" className="absolute top-4 right-4 text-[#D4AF37]"><FaCheckCircle className="text-xl" /></motion.div>
                                                )}
                                                <FaTruck className={`text-4xl ${paymentMethod === 'cod' ? 'text-[#D4AF37]' : 'text-stone-700 group-hover:text-[#D4AF37]/50'} transition-colors`} />
                                                <div className="text-center">
                                                    <span className="text-sm font-black uppercase tracking-[0.2em] block mb-1">Cash on Delivery</span>
                                                    <span className="text-[10px] text-stone-500 italic uppercase tracking-widest">Pay on Arrival</span>
                                                </div>
                                            </button>

                                            <button 
                                                type="button"
                                                onClick={() => setPaymentMethod('online')}
                                                className={`relative p-8 rounded-3xl border transition-all duration-300 flex flex-col items-center gap-4 group overflow-hidden opacity-60 grayscale hover:grayscale-0 ${paymentMethod === 'online' ? 'bg-[#D4AF37]/10 border-[#D4AF37] text-white shadow-[0_0_30px_rgba(212,175,55,0.1)]' : 'bg-white/5 border-white/5 text-stone-400 hover:border-[#D4AF37]/30'}`}
                                            >
                                                {paymentMethod === 'online' && (
                                                    <motion.div layoutId="payment-active" className="absolute top-4 right-4 text-[#D4AF37]"><FaCheckCircle className="text-xl" /></motion.div>
                                                )}
                                                <FaCreditCard className={`text-4xl ${paymentMethod === 'online' ? 'text-[#D4AF37]' : 'text-stone-400 group-hover:text-[#D4AF37]'} transition-colors`} />
                                                <div className="text-center">
                                                    <span className="text-sm font-black uppercase tracking-[0.2em] block mb-1">Online Payment</span>
                                                    <span className="text-[10px] text-stone-500 italic uppercase tracking-widest">Instant Grace</span>
                                                </div>
                                            </button>
                                        </div>

                                        <div className="bg-[#0a1f3c] border border-[#D4AF37]/20 rounded-3xl p-8 mb-12 flex items-center gap-8 group">
                                            <div className="w-20 h-20 rounded-2xl bg-[#D4AF37]/10 flex items-center justify-center text-4xl text-[#D4AF37] shadow-inner group-hover:scale-105 transition-transform">
                                                <FaHandsPraying />
                                            </div>
                                            <div>
                                                <p className="text-white font-serif text-xl mb-1 tracking-wide">Traditional Offering</p>
                                                <p className="text-stone-500 text-xs leading-relaxed italic max-w-sm">
                                                    {paymentMethod === 'cod' 
                                                        ? "Honor the traditional way. Pay only when your blessed instrument is delivered."
                                                        : "Online payments are currently in maintenance. Please use Cash on Delivery for swift processing."
                                                    }
                                                </p>
                                            </div>
                                        </div>

                                        <button 
                                            type="submit"
                                            disabled={isLoading}
                                            className="btn-gold-royal w-full py-7 rounded-2xl font-black text-sm md:text-base tracking-[0.4em] shadow-2xl relative overflow-hidden transition-all hover:scale-[1.01] active:scale-[0.99] hover:shadow-ambient-gold"
                                        >
                                            {isLoading ? (
                                                <div className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin mx-auto"></div>
                                            ) : (
                                                `CONFIRM ORDER • ₹${finalTotal.toLocaleString()}`
                                            )}
                                        </button>
                                    </div>
                                </motion.form>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* RIGHT COLUMN: Summary Sidebar */}
                    <aside className="lg:col-span-5">
                        <div className="sticky top-28 space-y-8">
                            {/* Summary Card */}
                            <div className="bg-[#132c4e]/60 backdrop-blur-xl border border-[#D4AF37]/20 rounded-[3rem] overflow-hidden shadow-2xl">
                                <div className="bg-[#D4AF37]/10 py-8 px-10 border-b border-[#D4AF37]/10 flex justify-between items-center">
                                    <h3 className="text-[#F5D76E] text-xs uppercase tracking-[0.4em] font-black italic">Sacred Summary</h3>
                                    <span className="text-[10px] text-stone-500 font-bold uppercase tracking-widest">Ritual: {items.length} Items</span>
                                </div>
                                
                                <div className="p-10 space-y-10">
                                    {/* Item List */}
                                    <ul className="space-y-8">
                                        {items.map(item => (
                                            <li key={item.id} className="flex gap-6 items-center group">
                                                <div className="w-20 h-20 bg-[#0a1f3c] border border-white/5 rounded-2xl flex items-center justify-center p-4 relative overflow-hidden shadow-inner">
                                                    <img src="/yantra-detail.png" alt="Yantra" className="w-full h-full object-contain opacity-50 group-hover:opacity-100 transition-opacity" />
                                                </div>
                                                <div className="flex-grow">
                                                    <span className="text-white font-serif text-lg block tracking-wide">{item.weight} Blessed Yantra</span>
                                                    <span className="text-stone-500 text-[10px] uppercase tracking-widest mt-1 block">
                                                        Qty: <span className="text-white">{item.qty}</span> × ₹{item.price.toLocaleString()}
                                                    </span>
                                                </div>
                                                <span className="text-white font-serif text-xl font-bold">₹{(item.price * item.qty).toLocaleString()}</span>
                                            </li>
                                        ))}
                                    </ul>

                                    {/* Cost Breakdown */}
                                    <div className="space-y-5 pt-10 border-t border-white/5">
                                        <div className="flex justify-between items-center text-xs uppercase tracking-widest text-stone-500 font-bold">
                                            <span>Subtotal Offering</span>
                                            <span className="text-white">₹{totalPrice.toLocaleString()}</span>
                                        </div>
                                        <div className="flex justify-between items-center text-xs uppercase tracking-widest text-stone-500 font-bold">
                                            <span>Ritual Seva Tax (12%)</span>
                                            <span className="text-white">₹{taxAmount.toLocaleString()}</span>
                                        </div>
                                        <div className="flex justify-between items-center text-xs uppercase tracking-widest text-stone-500 font-bold">
                                            <span>Divine Delivery</span>
                                            <span className="text-green-500 font-black italic tracking-widest">GRATIS</span>
                                        </div>
                                    </div>

                                    {/* Grand Total */}
                                    <div className="flex justify-between items-center pt-10 border-t border-white/20 mt-4">
                                        <div>
                                            <span className="text-[#F5D76E] text-xs uppercase tracking-[0.3em] font-black block mb-1">Total Offering</span>
                                            <span className="text-[#A5A5A5] text-[9px] uppercase tracking-[0.2em] italic font-bold">Safe & Blessed</span>
                                        </div>
                                        <span className="text-gold-gradient text-4xl md:text-5xl font-serif font-black tracking-tighter">
                                            ₹{finalTotal.toLocaleString()}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Trust Badges */}
                            <div className="grid grid-cols-3 gap-4 pt-4">
                                {[
                                    { icon: <FaShieldAlt />, label: 'Secure' },
                                    { icon: <FaLock />, label: 'Private' },
                                    { icon: <FaCheckCircle />, label: 'Genuine' },
                                ].map((item, id) => (
                                    <div key={id} className="bg-white/5 rounded-3xl p-6 border border-white/5 text-center flex flex-col items-center gap-3 hover:border-[#D4AF37]/30 transition-all group">
                                        <div className="text-[#F5D76E] text-2xl group-hover:scale-110 transition-transform">{item.icon}</div>
                                        <span className="text-[10px] uppercase tracking-widest font-black text-stone-300">{item.label}</span>
                                    </div>
                                ))}
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
