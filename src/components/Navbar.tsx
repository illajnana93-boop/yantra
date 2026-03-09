import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useContribution } from '../context/ContributionContext';
import { useAuth } from '../context/AuthContext';
import { FaOm, FaUser } from 'react-icons/fa';
import { GiLotus } from 'react-icons/gi';

const Navbar = () => {
    const { user, openAuthModal, signOut } = useAuth();
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [showUserMenu, setShowUserMenu] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const { totalCount } = useContribution();

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        if (mobileMenuOpen) {
            document.body.style.overflow = 'hidden';
            document.body.style.touchAction = 'none';
        } else {
            document.body.style.overflow = '';
            document.body.style.touchAction = '';
        }
    }, [mobileMenuOpen]);

    useEffect(() => {
        setMobileMenuOpen(false);
        if (location.hash) {
            const id = location.hash.substring(1);
            setTimeout(() => {
                const element = document.getElementById(id);
                if (element) {
                    const offset = 80;
                    const offsetPosition = element.getBoundingClientRect().top + window.pageYOffset - offset;
                    window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
                }
            }, 500);
        }
    }, [location.pathname]);


    // "Contribute" is removed from navLinks — it lives as the cart button only
    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'Sacred Guide', path: '/sacred-guide' },
        { name: 'About', path: '/#about' },
        { name: 'Contact', path: '/#contact' },
    ];

    const handleLinkClick = (path: string) => {
        setMobileMenuOpen(false);
        if (path.includes('#daily-spiritual') && !user) {
            openAuthModal();
            return;
        }

        if (path.startsWith('/#')) {
            const id = path.substring(2);
            if (location.pathname === '/') {
                const element = document.getElementById(id);
                if (element) {
                    const offset = 80;
                    const offsetPosition = element.getBoundingClientRect().top + window.pageYOffset - offset;
                    window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
                }
            } else {
                navigate(path);
            }
        } else {
            navigate(path);
        }
    };

    return (
        // ... rest of the nav until desktop section
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.8 }}
            className={`fixed w-full z-[9999] transition-all duration-700 flex justify-between items-center border-b h-[80px] px-6 md:px-14 ${scrolled || mobileMenuOpen
                ? 'bg-[#040515] shadow-[0_10px_40px_rgba(0,0,0,0.5)] border-[#D4AF37]/40 backdrop-blur-xl'
                : 'bg-[#040515]/95 border-white/5 backdrop-blur-sm'
                }`}
        >
            {/* ── Logo ── */}
            <Link
                to="/"
                className="flex items-center gap-3 md:gap-4 group interactive"
            >
                <div className="relative w-12 h-12 md:w-14 md:h-14 flex items-center justify-center overflow-hidden rounded-full border border-[#D4AF37]/30 bg-[#081629]/50 backdrop-blur-sm shadow-[0_0_20px_rgba(212,175,55,0.1)]">
                    <div className="absolute inset-0 bg-[#D4AF37] opacity-0 group-hover:opacity-10 transition-opacity" />
                    <img
                        src="/logo.png"
                        alt="Sri Shyam Logo"
                        className="h-[160%] w-auto max-w-none relative z-10 transition-transform duration-500 group-hover:scale-110 transform -translate-y-[2%]"
                    />
                </div>
                <div className="flex flex-col leading-tight">
                    <span className="text-white text-base md:text-lg font-serif font-bold tracking-[0.2em] text-glow">
                        SRI SHYAM
                    </span>
                    <span className="text-[#F5D76E] text-[8px] md:text-[9px] uppercase tracking-[0.45em] font-black opacity-80">
                        Divine Yantra
                    </span>
                </div>
            </Link>

            {/* ── Desktop Nav ── */}
            <div className="hidden lg:flex items-center gap-8">
                {/* Nav links */}
                <div className="flex items-center gap-9">
                    {navLinks.map((item) => (
                        <button
                            key={item.name}
                            onClick={() => handleLinkClick(item.path)}
                            className="text-[#F8F5F0] uppercase text-[13px] font-bold tracking-[0.22em] transition-all hover:text-[#F5D76E] relative group interactive"
                        >
                            {item.name}
                            <span className="absolute -bottom-1.5 left-0 w-0 h-[1.5px] bg-gold-gradient transition-all duration-400 group-hover:w-full" />
                        </button>
                    ))}
                </div>

                {/* Divider */}
                <div className="h-6 w-[1px] bg-[#D4AF37]/20" />

                {/* Daily Spiritual button — single, clean */}
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleLinkClick('/#daily-spiritual')}
                    className="relative flex items-center gap-2.5 px-5 py-2.5 rounded-full border border-[#D4AF37]/50 bg-[#D4AF37]/10 text-[#F5D76E] hover:bg-[#D4AF37]/20 transition-all interactive"
                    aria-label="Today’s Blessing"
                >
                    <GiLotus className="w-5 h-5 text-[#F5D76E]" />
                    <span className="text-[11px] font-black uppercase tracking-[0.18em] text-[#F5D76E]">Today’s Blessing</span>
                </motion.button>

                {/* User Menu (Only if logged in) */}
                {user && (
                    <div className="relative">
                        <button
                            onClick={() => setShowUserMenu(!showUserMenu)}
                            className="w-10 h-10 rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/10 flex items-center justify-center text-[#F5D76E] hover:bg-[#D4AF37]/20 transition-all interactive"
                        >
                            <FaUser className="w-4 h-4" />
                        </button>
                        {showUserMenu && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="absolute top-12 right-0 w-48 bg-[#040515] border border-[#D4AF37]/30 rounded-xl py-2 shadow-2xl z-[10002]"
                            >
                                <div className="px-4 py-2 border-b border-white/10 mb-1">
                                    <p className="text-[#F5D76E] text-[10px] uppercase tracking-widest font-bold">Devotee</p>
                                    <p className="text-white text-xs truncate font-medium">{user.email}</p>
                                </div>
                                <button
                                    onClick={() => { signOut(); setShowUserMenu(false); }}
                                    className="w-full text-left px-4 py-2 text-stone-300 hover:text-white hover:bg-white/5 text-xs transition-all"
                                >
                                    Sign Out
                                </button>
                            </motion.div>
                        )}
                    </div>
                )}
            </div>

            {/* ── Mobile: right side icons ── */}
            <div className="lg:hidden flex items-center gap-3 z-[10001]">
                {/* Mobile User icon (Only if logged in) */}
                {user && (
                    <motion.button
                        whileTap={{ scale: 0.9 }}
                        onClick={() => signOut()}
                        className="relative w-9 h-9 rounded-full border border-[#D4AF37]/40 bg-[#D4AF37]/10 text-[#F5D76E] flex items-center justify-center interactive"
                    >
                        <FaUser className="w-4 h-4 text-[#F5D76E]" />
                        <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-[#040515]" />
                    </motion.button>
                )}

                {/* Mobile Daily Spiritual icon */}
                <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleLinkClick('/#daily-spiritual')}
                    className="relative w-9 h-9 rounded-full border border-[#D4AF37]/40 bg-[#D4AF37]/10 text-[#F5D76E] flex items-center justify-center interactive"
                >
                    <GiLotus className="w-5 h-5 text-[#F5D76E]" />
                </motion.button>

                {/* Hamburger */}
                <button
                    className="text-[#D4AF37] p-2 interactive"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    aria-label="Toggle menu"
                >
                    <div className="w-7 h-4 flex flex-col justify-between">
                        <motion.span
                            animate={mobileMenuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
                            className="h-0.5 w-full bg-[#D4AF37] rounded-full"
                        />
                        <motion.span
                            animate={mobileMenuOpen ? { opacity: 0, x: -8 } : { opacity: 1, x: 0 }}
                            className="h-0.5 w-full bg-[#D4AF37] rounded-full"
                        />
                        <motion.span
                            animate={mobileMenuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
                            className="h-0.5 w-full bg-[#D4AF37] rounded-full"
                        />
                    </div>
                </button>
            </div>

            {/* ── Mobile Menu Overlay ── */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-[#081629] z-[10000] flex flex-col h-screen w-screen left-0 top-0"
                    >
                        <div className="absolute inset-0 opacity-10 pointer-events-none">
                            <div className="absolute top-[10%] right-[-10%] w-[80%] h-[40%] bg-[#D4AF37] rounded-full blur-[100px]" />
                            <div className="absolute bottom-[20%] left-[-10%] w-[80%] h-[40%] bg-blue-900 rounded-full blur-[100px]" />
                        </div>

                        <div className="flex flex-col items-center justify-center h-full gap-1 relative z-10 px-6">
                            {/* Om icon */}
                            <FaOm className="text-[#D4AF37]/30 text-5xl mb-6" />

                            {navLinks.map((item, i) => (
                                <motion.div
                                    key={item.name}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.08 * i }}
                                    className="w-full text-center"
                                >
                                    <button
                                        onClick={() => handleLinkClick(item.path)}
                                        className="text-[#F8F5F0] uppercase text-3xl tracking-[0.1em] py-4 w-full flex flex-col items-center group active:scale-95 transition-transform"
                                    >
                                        <span className="text-gold-gradient mb-1 opacity-0 group-hover:opacity-100 transition-opacity text-sm">~ 🕉 ~</span>
                                        {item.name}
                                        <div className="w-10 h-[1px] bg-[#D4AF37]/20 mt-3 mx-auto" />
                                    </button>
                                </motion.div>
                            ))}

                            <motion.button
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.45 }}
                                onClick={() => handleLinkClick('/#daily-spiritual')}
                                className="mt-10 flex items-center gap-3 px-12 py-4 btn-gold-royal rounded-full text-xs font-black tracking-[0.2em] shadow-2xl w-full max-w-[280px] justify-center relative"
                            >
                                <GiLotus className="w-5 h-5" />
                                Today’s Blessing
                                {totalCount > 0 && (
                                    <span className="absolute -top-2 -right-2 min-w-[20px] h-[20px] rounded-full bg-[#060f1e] text-[#F5D76E] text-[9px] font-black flex items-center justify-center px-1 border border-[#D4AF37]/50">
                                        {totalCount}
                                    </span>
                                )}
                            </motion.button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
};

export default Navbar;
