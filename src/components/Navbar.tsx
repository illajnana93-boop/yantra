import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="fixed w-full z-50 bg-[#0A1F3C]/95 backdrop-blur-md py-4 px-8 md:px-24 flex justify-between items-center border-b border-[#D4AF37]/20 shadow-lg">
            <Link to="/" className="flex items-center gap-3 group">
                <div className="relative">
                    <div className="absolute inset-0 bg-[#D4AF37] rounded-full blur-xl opacity-10"></div>
                    <svg width="32" height="32" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="relative z-10">
                        <circle cx="50" cy="50" r="45" stroke="#D4AF37" strokeWidth="1.5" opacity="0.4" />
                        <circle cx="50" cy="50" r="30" stroke="#D4AF37" strokeWidth="2" />
                        <circle cx="50" cy="50" r="12" fill="#D4AF37" />
                    </svg>
                </div>
                <div className="flex flex-col">
                    <span className="text-gold-gradient text-xl font-serif font-bold tracking-widest leading-none">
                        SRI SHYAM
                    </span>
                    <span className="text-[#F5D76E] text-[9px] uppercase tracking-[0.3em] font-bold opacity-80 mt-1">
                        Divine Yantra
                    </span>
                </div>
            </Link>

            <div className="hidden md:flex gap-10 items-center">
                {['Home', 'Sacred Guide', 'About', 'Product', 'Contact'].map((item) => (
                    <Link
                        key={item}
                        to={item === 'Home' ? '/' : `/${item.toLowerCase().replace(' ', '-')}`}
                        className="text-[#F8F5F0] uppercase text-[10px] font-bold tracking-[0.15em] transition-all hover:text-[#F5D76E] relative group"
                    >
                        {item}
                        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gold-gradient transition-all group-hover:w-full"></span>
                    </Link>
                ))}

                <button className="ml-4 px-6 py-2 btn-gold-royal rounded-full text-[9px] shadow-lg">
                    Get Yantra
                </button>
            </div>

            <div className="md:hidden">
                <button className="text-[#D4AF37]">
                    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                    </svg>
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
