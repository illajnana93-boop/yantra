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
            className={`fixed w-full z-[9999] transition-all duration-500 py-4 px-6 md:px-24 flex justify-between items-center border-b ${scrolled || mobileMenuOpen ? 'bg-[#0A1F3C] shadow-2xl py-3 border-[#D4AF37]/30' : 'bg-transparent border-transparent'}`}
        >
            {/* Logo */}
            <Link to="/" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-3 group relative z-[10001] interactive">
                <div className="relative">
                    <div className="absolute inset-0 bg-[#D4AF37] rounded-full blur-xl opacity-20 group-hover:opacity-40 transition-opacity"></div>
                    <svg width="32" height="32" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="relative z-10">
                        <circle cx="50" cy="50" r="45" stroke="#D4AF37" strokeWidth="1" opacity="0.3" />
                        <motion.circle
                            cx="50" cy="50" r="30" stroke="#D4AF37" strokeWidth="2"
                            animate={{ strokeDasharray: ["0, 200", "200, 0"] }}
                            transition={{ duration: 3, repeat: Infinity, ease: "linear" as const }}
                        />
                        <circle cx="50" cy="50" r="10" fill="#D4AF37" />
                    </svg>
                </div>
                <div className="flex flex-col">
                    <span className="text-white text-lg md:text-xl font-serif font-bold tracking-[0.2em] leading-none">
                        SRI SHYAM
                    </span>
                    <span className="text-[#F5D76E] text-[10px] md:text-[11px] uppercase tracking-[0.4em] font-bold opacity-70 mt-1">
                        Divine Yantra
                    </span>
                </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex gap-10 items-center">
                <div className="flex gap-8">
                    {navLinks.map((item) => (
                        <button
                            key={item.name}
                            onClick={() => handleLinkClick(item.path)}
                            className="text-[#F8F5F0] uppercase text-[12px] md:text-[13px] font-bold tracking-[0.2em] transition-all hover:text-[#F5D76E] relative group interactive"
                        >
                            {item.name}
                            <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-gold-gradient transition-all duration-300 group-hover:w-full" />
                        </button>
                    ))}
                </div>
            </div>

            {/* Mobile Menu Toggle Button */}
            <button
                className="md:hidden relative z-[10001] text-[#D4AF37] p-4 -mr-4 interactive"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
                <div className="w-8 h-4 flex flex-col justify-between">
                    <motion.span
                        animate={mobileMenuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
                        className="h-0.5 w-full bg-[#D4AF37] rounded-full"
                    />
                    <motion.span
                        animate={mobileMenuOpen ? { opacity: 0 } : { opacity: 1 }}
                        className="h-0.5 w-full bg-[#D4AF37] rounded-full"
                    />
                    <motion.span
                        animate={mobileMenuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
                        className="h-0.5 w-full bg-[#D4AF37] rounded-full"
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
