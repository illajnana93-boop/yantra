import { Suspense, lazy } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import ContributionCard from '../components/ContributionCard';
import AboutSection from '../components/AboutSection';
import UseSection from '../components/UseSection';
import Footer from '../components/Footer';
import FloatingContribute from '../components/FloatingContribute';

// Lazy load heavy components
const TempleVision = lazy(() => import('../components/TempleVision'));
const GurujiHighlight = lazy(() => import('../components/GurujiHighlight'));
const Testimonials = lazy(() => import('../components/Testimonials'));

const DivineLoader = () => (
    <div className="w-full py-20 flex flex-col items-center justify-center space-y-4">
        <div className="w-12 h-12 border-2 border-[#D4AF37]/30 border-t-[#D4AF37] rounded-full animate-spin"></div>
        <p className="text-[#D4AF37]/60 text-xs uppercase tracking-widest font-serif italic">Loading Divine Presence...</p>
    </div>
);

const Home = () => {
    return (
        <div className="relative">
            <Navbar />
            <Hero />
            {/* Contribution card placed immediately after Hero for maximum visibility */}
            <ContributionCard />
            <AboutSection />
            <UseSection />

            <Suspense fallback={<DivineLoader />}>
                <TempleVision />
                <GurujiHighlight />
                <Testimonials />
            </Suspense>

            <FloatingContribute />
            <Footer />
        </div>
    );
};

export default Home;

