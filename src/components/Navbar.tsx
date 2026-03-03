import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Handle body scroll locking when menu is open
    useEffect(() => {
        if (mobileMenuOpen) {
            document.body.style.overflow = 'hidden';
            document.body.style.touchAction = 'none';
        } else {
            document.body.style.overflow = '';
            document.body.style.touchAction = '';
        }
    }, [mobileMenuOpen]);

    // Global Scroll logic for cross-page hash navigation
    useEffect(() => {
        setMobileMenuOpen(false);
        if (location.hash) {
            const id = location.hash.substring(1);
            setTimeout(() => {
                const element = document.getElementById(id);
                if (element) {
                    const offset = 80;
                    const elementPosition = element.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - offset;
                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            }, 500);
        }
    }, [location.pathname]);

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'Sacred Guide', path: '/sacred-guide' },
        { name: 'About', path: '/#about' },
        { name: 'Product', path: '/#product' },
        { name: 'Contact', path: '/#contact' }
    ];

    const handleLinkClick = (path: string) => {
        setMobileMenuOpen(false);
        if (path.startsWith('/#')) {
            const id = path.substring(2);
            if (location.pathname === '/') {
                const element = document.getElementById(id);
                if (element) {
                    const offset = 80;
                    const elementPosition = element.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - offset;
                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            } else {
                navigate(path);
            }
        } else {
            navigate(path);
        }
    };

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.8 }}
            className={`fixed w-full z-[9999] transition-all duration-700 flex justify-between items-center border-b h-[90px] px-8 md:px-24 ${scrolled || mobileMenuOpen ? 'bg-[#040515] shadow-[0_10px_40px_rgba(0,0,0,0.5)] border-[#D4AF37]/40 backdrop-blur-xl' : 'bg-[#040515]/95 border-white/5 backdrop-blur-sm'}`}
        >
            {/* Logo - Centered vertically and made more dominant */}
            <Link to="/" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-5 group relative z-[10001] interactive">
                <div className="relative">
                    <div className="absolute inset-0 bg-[#D4AF37] rounded-full blur-3xl opacity-20 group-hover:opacity-40 transition-opacity"></div>
                    <img
                        src="/logo.png"
                        alt="Sri Shyam Logo"
                        className="h-14 md:h-16 w-auto relative z-10 transition-transform duration-500 group-hover:scale-105"
                    />
                </div>
                <div className="flex flex-col">
                    <span className="text-white text-xl md:text-2xl font-serif font-bold tracking-[0.25em] leading-none text-glow">
                        SRI SHYAM
                    </span>
                    <span className="text-[#F5D76E] text-[11px] md:text-[12px] uppercase tracking-[0.5em] font-black opacity-80 mt-1.5">
                        Divine Yantra
                    </span>
                </div>
            </Link>

            {/* Desktop Navigation - Spaced eavenly with serif font */}
            <div className="hidden lg:flex gap-16 items-center">
                <div className="flex gap-12">
                    {navLinks.map((item) => (
                        <button
                            key={item.name}
                            onClick={() => handleLinkClick(item.path)}
                            className="text-[#F8F5F0] uppercase text-[13px] md:text-[14px] font-serif font-bold tracking-[0.25em] transition-all hover:text-[#F5D76E] relative group interactive"
                        >
                            {item.name}
                            <span className="absolute -bottom-2 left-0 w-0 h-[2px] bg-gold-gradient transition-all duration-500 group-hover:w-full shadow-[0_0_10px_rgba(212,175,55,0.8)]" />
                        </button>
                    ))}
                </div>
            </div>

            {/* Mobile Menu Toggle Button */}
            <button
                className="lg:hidden relative z-[10001] text-[#D4AF37] p-4 -mr-4 interactive"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
                <div className="w-9 h-5 flex flex-col justify-between">
                    <motion.span
                        animate={mobileMenuOpen ? { rotate: 45, y: 9 } : { rotate: 0, y: 0 }}
                        className="h-0.5 w-full bg-[#D4AF37] rounded-full shadow-[0_0_8px_rgba(212,175,55,0.5)]"
                    />
                    <motion.span
                        animate={mobileMenuOpen ? { opacity: 0, x: -10 } : { opacity: 1, x: 0 }}
                        className="h-0.5 w-full bg-[#D4AF37] rounded-full"
                    />
                    <motion.span
                        animate={mobileMenuOpen ? { rotate: -45, y: -9 } : { rotate: 0, y: 0 }}
                        className="h-0.5 w-full bg-[#D4AF37] rounded-full shadow-[0_0_8px_rgba(212,175,55,0.5)]"
                    />
                </div>
            </button>

            {/* FIXED MOBILE MENU OVERLAY */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-[#081629] z-[10000] flex flex-col h-screen w-screen left-0 top-0"
                    >
                        {/* Background Decoration */}
                        <div className="absolute inset-0 opacity-10 pointer-events-none">
                            <div className="absolute top-[10%] right-[-10%] w-[80%] h-[40%] bg-[#D4AF37] rounded-full blur-[100px]" />
                            <div className="absolute bottom-[20%] left-[-10%] w-[80%] h-[40%] bg-blue-900 rounded-full blur-[100px]" />
                        </div>

                        <div className="flex flex-col items-center justify-center h-full gap-2 relative z-10 px-6">
                            {navLinks.map((item, i) => (
                                <motion.div
                                    key={item.name}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.1 * i }}
                                    className="w-full text-center"
                                >
                                    <button
                                        onClick={() => handleLinkClick(item.path)}
                                        className="text-[#F8F5F0] uppercase text-3xl font-serif tracking-[0.1em] py-5 w-full flex flex-col items-center group active:scale-95 transition-transform"
                                    >
                                        <span className="text-gold-gradient mb-1 opacity-0 group-hover:opacity-100 transition-opacity">~ 🕉 ~</span>
                                        {item.name}
                                        <div className="w-12 h-[1px] bg-[#D4AF37]/20 mt-4 mx-auto" />
                                    </button>
                                </motion.div>
                            ))}

                            <motion.button
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.6 }}
                                onClick={() => handleLinkClick('/#product')}
                                className="mt-12 px-12 py-5 btn-gold-royal rounded-full text-xs font-bold tracking-[0.2em] shadow-2xl w-full max-w-[280px]"
                            >
                                Get Divine Yantra
                            </motion.button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
};

export default Navbar;
