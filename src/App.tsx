import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import SacredGuide from './pages/SacredGuide';
import { ContributionProvider } from './context/ContributionContext';
import ParticleBackground from './components/ParticleBackground';

function App() {
  return (
    <ContributionProvider>
      <Router>
        <div className="bg-[#f9f5ec] relative">
          <ParticleBackground />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/sacred-guide" element={<SacredGuide />} />
            <Route path="/about" element={<Home />} />
            <Route path="/product" element={<Home />} />
            <Route path="/contact" element={<Home />} />
          </Routes>
        </div>
      </Router>
    </ContributionProvider>
  );
}

export default App;
