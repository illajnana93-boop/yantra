import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import AboutSection from '../components/AboutSection';
import UseSection from '../components/UseSection';
import ProductSection from '../components/ProductSection';
import GurujiHighlight from '../components/GurujiHighlight';
import Testimonials from '../components/Testimonials';
import Footer from '../components/Footer';

const Home = () => {
    return (
        <div className="relative">
            <Navbar />
            <Hero />
            <AboutSection />
            <UseSection />
            <ProductSection />
            <GurujiHighlight />
            <Testimonials />
            <Footer />
        </div>
    );
};

export default Home;
