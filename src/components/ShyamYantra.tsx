
const ShyamYantra = () => {
    return (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 overflow-hidden bg-[#081629]">
            <svg
                viewBox="0 0 100 100"
                className="w-full h-full max-w-[180vh] max-h-[180vh] opacity-60 select-none scale-[1.3]"
                style={{ filter: 'drop-shadow(0 0 35px rgba(212, 175, 55, 0.15))' }}
            >
                <defs>
                    <radialGradient id="binduGlow" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stopColor="#D4A853" stopOpacity="0.5" />
                        <stop offset="100%" stopColor="#D4A853" stopOpacity="0" />
                    </radialGradient>
                    <filter id="glow">
                        <feGaussianBlur stdDeviation="0.4" result="coloredBlur" />
                        <feMerge>
                            <feMergeNode in="coloredBlur" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                </defs>

                {/* Layer 1: Outer Ring (60s clockwise) */}
                <g className="animate-rotate-60" style={{ transformOrigin: '50px 50px' }}>
                    {/* Outer Circle Border */}
                    <circle cx="50" cy="50" r="48" fill="none" stroke="#D4A853" strokeWidth="0.06" strokeOpacity="0.4" />
                    
                    {/* Tick Marks */}
                    {[...Array(32)].map((_, i) => (
                        <line
                            key={`tick-${i}`}
                            x1="50" y1="2" x2="50" y2={i % 4 === 0 ? 5 : 4}
                            stroke="#D4A853" strokeWidth="0.06" strokeOpacity="0.3"
                            transform={`rotate(${11.25 * i} 50 50)`}
                        />
                    ))}

                    {/* 16-petal Lotus petals - Neutralized color */}
                    {[...Array(16)].map((_, i) => (
                        <path
                            key={`petal-16-${i}`}
                            d="M50 8 C56 22 53 32 50 40 C47 32 44 22 50 8"
                            fill="none" stroke="#D4A853" strokeWidth="0.08" strokeOpacity="0.3"
                            transform={`rotate(${22.5 * i} 50 50)`}
                        />
                    ))}
                </g>

                {/* Layer 2: Middle Ring (35s counter-clockwise) */}
                <g className="animate-rotate-35-ccw" style={{ transformOrigin: '50px 50px' }}>
                    {/* Inner Circle */}
                    <circle cx="50" cy="50" r="32" fill="none" stroke="#D4A853" strokeWidth="0.06" strokeOpacity="0.4" />
                    
                    {/* Shatkona */}
                    <polygon 
                        points="50,18 78,66 22,66" 
                        fill="none" stroke="#D4A853" strokeWidth="0.1" strokeOpacity="0.5" 
                    />
                    <polygon 
                        points="50,82 78,34 22,34" 
                        fill="none" stroke="#D4A853" strokeWidth="0.1" strokeOpacity="0.5" 
                    />

                    {/* 8-petal Lotus - Neutralized color */}
                    {[...Array(8)].map((_, i) => (
                        <path
                            key={`petal-8-${i}`}
                            d="M50 25 C54 33 52 43 50 50 C48 43 46 33 50 25"
                            fill="none" stroke="#D4A853" strokeWidth="0.1" strokeOpacity="0.35"
                            transform={`rotate(${45 * i} 50 50)`}
                        />
                    ))}
                </g>

                {/* Layer 3: Inner Core (20s clockwise) */}
                <g className="animate-rotate-20" style={{ transformOrigin: '50px 50px' }}>
                    {/* Smaller Inner Shatkona */}
                    <polygon 
                        points="50,42 57,54 43,54" 
                        fill="none" stroke="#D4A853" strokeWidth="0.12" strokeOpacity="0.6" 
                    />
                    <polygon 
                        points="50,58 57,46 43,46" 
                        fill="none" stroke="#D4A853" strokeWidth="0.12" strokeOpacity="0.6" 
                    />
                    
                    {/* Sacred Bindu */}
                    <circle cx="50" cy="50" r="0.6" fill="#F0C96A" filter="url(#glow)">
                        <animate attributeName="r" values="0.6;1.0;0.6" dur="3s" repeatCount="indefinite" />
                    </circle>
                    <circle cx="50" cy="50" r="4" fill="url(#binduGlow)" opacity="0.4" />
                </g>
            </svg>
            
            <style dangerouslySetInnerHTML={{ __html: `
                @keyframes rotate-60 { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
                @keyframes rotate-35-ccw { from { transform: rotate(360deg); } to { transform: rotate(0deg); } }
                @keyframes rotate-20 { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
                @keyframes pulse-slow { 
                    0%, 100% { opacity: 0.05; transform: scale(1); } 
                    50% { opacity: 0.15; transform: scale(1.05); } 
                }
                
                .animate-rotate-60 { animation: rotate-60 60s linear infinite; }
                .animate-rotate-35-ccw { animation: rotate-35-ccw 35s linear infinite; }
                .animate-rotate-20 { animation: rotate-20 20s linear infinite; }
                .animate-pulse-slow { animation: pulse-slow 4s ease-in-out infinite; }
            ` }} />
        </div>
    );
};

export default ShyamYantra;
