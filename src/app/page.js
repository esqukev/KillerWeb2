"use client";

import { useState, useEffect } from "react";
import jsPDF from 'jspdf';

export default function Home() {
  const [activeSection, setActiveSection] = useState(null);
  const [aboutLanguage, setAboutLanguage] = useState('english');
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [mediaType, setMediaType] = useState(null);
  const [showNav, setShowNav] = useState(true);
  const [showFooter, setShowFooter] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const toggleSection = (section) => {
    console.log('Button clicked - v2:', section);
    setActiveSection(activeSection === section ? null : section);
  };

  const toggleAboutLanguage = () => {
    setAboutLanguage(aboutLanguage === 'english' ? 'spanish' : 'english');
  };

  const downloadBio = () => {
    const bioContent = aboutLanguage === 'english' ? 
      `Killer Nugget is an electronic music producer from Costa Rica, crafting driving house rhythms infused with sleek, minimal textures. Inspired by the global underground scene, his sound is built for deep club sessions and high-rotation playlists alike, bridging the underground's groove-forward energy with modern, high-fidelity production. Killer Nugget continues to refine his craft — pushing sonic and visual boundaries with each new release.

Currently focused full-time on music production, Killer Nugget is honing his sound under the influence of some of the world's top producers — including Josh Baker, Kolter, Sidney Charles, Gene On Earth, M-High, and more. His approach is rooted in clean, tight grooves and a commitment to constantly evolving his style.

Beyond his role as a producer and DJ, Killer Nugget has also played a key visual role in the Costa Rican electronic music scene — working as a photographer for some of the country's biggest festivals and events. His portfolio includes ongoing work with Electric Animals, Ocaso Festival, BPM Festival and many many more, helping shape the visual identity of the underground movement in Central America.

With a deep-rooted passion for sound design, groove, and underground culture, Killer Nugget is emerging as one promising name in the region. Whether behind the decks or in the studio, his goal remains the same — to move dancefloors and push sonic boundaries with every beat.` :
      `Killer Nugget es un productor de música electrónica originario de Costa Rica, que crea ritmos house contundentes con texturas minimalistas y elegantes. Inspirado por la escena underground global, su sonido está diseñado tanto para intensas sesiones de club como para rotación en playlist, uniendo la energía groove del underground con una producción moderna y de alta fidelidad. Killer Nugget continúa perfeccionando su arte, llevando al límite tanto lo sonoro como lo visual en cada nuevo lanzamiento.

Actualmente enfocado de lleno en la producción musical, está puliendo su estilo bajo la influencia de algunos de los productores más destacados del mundo, como Josh Baker, Kolter, Sidney Charles, Gene On Earth, M-High, entre otros. Su enfoque se basa en grooves precisos y ajustados, con un compromiso constante por evolucionar en cada track.

Además de su rol como productor y DJ, Killer Nugget ha tenido un papel visual clave en la escena electrónica de Costa Rica, trabajando como fotógrafo en algunos de los festivales y eventos más grandes del país. Su portafolio incluye colaboraciones constantes con Electric Animals, Ocaso Festival, BPM Festival, entre muchos otros, contribuyendo a definir la identidad visual del movimiento underground en Centroamérica.

Con una pasión profundamente arraigada por el diseño sonoro, el groove y la cultura underground, Killer Nugget se está posicionando como uno nombre bastante prometedor en la región. Ya sea tras los decks o en el estudio, su objetivo sigue siendo el mismo: hacer mover las pistas de baile y romper los límites del sonido con cada beat.`;

    // Create PDF
    const pdf = new jsPDF();
    
    // Set font and size
    pdf.setFont('helvetica');
    pdf.setFontSize(16);
    
    // Add title
    pdf.text('Killer Nugget - Bio', 20, 30);
    
    // Set font size for content
    pdf.setFontSize(12);
    
    // Split content into lines that fit the page width
    const splitText = pdf.splitTextToSize(bioContent, 170);
    
    // Add content
    pdf.text(splitText, 20, 50);
    
    // Save the PDF
    pdf.save(`Killer_Nugget_Bio_${aboutLanguage === 'english' ? 'EN' : 'ES'}.pdf`);
  };

  const openMedia = (src, type, title) => {
    setSelectedMedia(src);
    setMediaType(type);
  };

  const closeMedia = () => {
    setSelectedMedia(null);
    setMediaType(null);
  };

  const downloadMedia = async (src, filename) => {
    try {
      // For Cloudinary, use fl_attachment to force download
      let downloadUrl = src;
      
      if (src.includes('cloudinary.com')) {
        // Insert fl_attachment flag before the version number
        downloadUrl = src.replace('/upload/', '/upload/fl_attachment/');
      }
      
      // Try to fetch and download as blob
      const response = await fetch(downloadUrl, {
        mode: 'cors',
        credentials: 'omit'
      });
      
      if (!response.ok) throw new Error('Download failed');
      
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      // Clean up
      setTimeout(() => window.URL.revokeObjectURL(blobUrl), 100);
      
    } catch (error) {
      console.error('Download error:', error);
      // Fallback: open with fl_attachment in new tab
      const fallbackUrl = src.replace('/upload/', '/upload/fl_attachment/');
      window.open(fallbackUrl, '_blank');
    }
  };

  const navigateMedia = (direction) => {
    if (!selectedMedia) return;
    
    // Create arrays for all media items
    const allPhotos = [
      { src: '/DSC_6271_copy.jpg', alt: 'Killer Nugget Photo 1', filename: 'Killer_Nugget_Photo_1.jpg', type: 'image' },
      { src: '/DSC_0239.jpg', alt: 'Killer Nugget Photo 2', filename: 'Killer_Nugget_Photo_2.jpg', type: 'image' },
      { src: '/DSC_0423.jpg', alt: 'Killer Nugget Photo 3', filename: 'Killer_Nugget_Photo_3.jpg', type: 'image' },
      { src: '/DSC_1742-Mejorado-NR.jpg', alt: 'Killer Nugget Photo 4', filename: 'Killer_Nugget_Photo_4.jpg', type: 'image' },
      { src: '/DSC00176.jpeg', alt: 'Killer Nugget Photo 5', filename: 'Killer_Nugget_Photo_5.jpeg', type: 'image' },
      { src: '/photo6.jpg', alt: 'Killer Nugget Photo 6', filename: 'Killer_Nugget_Photo_6.jpg', type: 'image' },
      { src: '/visual1.png', alt: 'Visual Design 1', filename: 'Killer_Nugget_Visual_1.png', type: 'image' },
      { src: '/visual2.png', alt: 'Visual Design 2', filename: 'Killer_Nugget_Visual_2.png', type: 'image' }
    ];
    
    const allVideos = [
      { src: 'https://res.cloudinary.com/dpplgma25/video/upload/v1761006228/reel_killer_3_ozhlfb.mp4', alt: 'Reel Killer 3', filename: 'Killer_Nugget_Reel_Killer_3.mp4', type: 'video' },
      { src: 'https://res.cloudinary.com/dpplgma25/video/upload/v1761005706/another_world_reel_ohstg6.mp4', alt: 'Another World Reel', filename: 'Killer_Nugget_Another_World_Reel.mp4', type: 'video' },
      { src: 'https://res.cloudinary.com/dpplgma25/video/upload/v1761005696/97445a85e47045b0b73189f5b7c12fff_twfdc5.mp4', alt: 'Killer Nugget Video 4', filename: 'Killer_Nugget_Video_4.mp4', type: 'video' },
      { src: 'https://res.cloudinary.com/dpplgma25/video/upload/v1761005692/sunset_beats_vjp7y3.mp4', alt: 'Sunset Beats', filename: 'Killer_Nugget_Sunset_Beats.mp4', type: 'video' }
    ];
    
    const allMedia = [...allPhotos, ...allVideos];
    
    const currentIndex = allMedia.findIndex(media => media.src === selectedMedia);
    if (currentIndex === -1) return;
    
    let newIndex;
    if (direction === 'next') {
      newIndex = (currentIndex + 1) % allMedia.length;
    } else {
      newIndex = currentIndex === 0 ? allMedia.length - 1 : currentIndex - 1;
    }
    
    const newMedia = allMedia[newIndex];
    setSelectedMedia(newMedia.src);
    setMediaType(newMedia.type);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!selectedMedia) return;
      
      switch (e.key) {
        case 'Escape':
          closeMedia();
          break;
        case 'ArrowRight':
          navigateMedia('next');
          break;
        case 'ArrowLeft':
          navigateMedia('prev');
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [selectedMedia, navigateMedia]);
  
  // Hide/Show nav and footer on scroll with threshold
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollDifference = Math.abs(currentScrollY - lastScrollY);
      
      // Only react if scrolled more than 10px
      if (scrollDifference < 10) return;
      
      if (currentScrollY > lastScrollY && currentScrollY > 50) {
        // Scrolling down
        setShowNav(false);
        setShowFooter(true); // Footer appears when scrolling down
      } else if (currentScrollY < lastScrollY) {
        // Scrolling up - requires scrolling at least 10px up
        setShowNav(true);
        setShowFooter(false); // Footer hides when scrolling up
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <div className="min-h-screen w-full bg-black text-white font-mono relative overflow-hidden">
      {/* Carlita-Style Background */}
      <div className="absolute inset-0 z-0 bg-black">
        {/* Subtle Grid Pattern - BEHIND IMAGE - Brighter to show through */}
        <div className="absolute inset-0" style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)',
          backgroundSize: '50px 50px',
          opacity: 0.45,
          maskImage: 'radial-gradient(circle at center, black 30%, transparent 70%)',
          WebkitMaskImage: 'radial-gradient(circle at center, black 30%, transparent 70%)'
        }}></div>
        
        {/* FONDO FOTO - Background Image */}
        <div 
          className="fixed inset-0 bg-contain bg-no-repeat pointer-events-none" 
          style={{
            backgroundImage: 'url(/Fondo2.png)',
            backgroundPosition: 'center bottom'
          }}
        ></div>
        
        {/* FONDO FOTO - Gradient Overlay (Darker) */}
        <div className="fixed inset-0 bg-black/35 pointer-events-none"></div>
        
        {/* FONDO FIGURA - Gradient Background (Commented) */}
        {/* <div className="absolute inset-0 bg-gradient-to-br from-gray-900/80 via-black to-gray-800/80"></div> */}
        
        {/* Animated Gradient Light */}
        <div className="absolute inset-0" style={{
          background: 'radial-gradient(circle at var(--x, 50%) var(--y, 50%), rgba(100, 120, 255, 0.08) 0%, rgba(150, 100, 255, 0.04) 20%, transparent 50%)',
          animation: 'moveGradient 25s ease-in-out infinite',
          mixBlendMode: 'screen'
        }}></div>
        
        {/* Subtle Vignette Effect */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-transparent"></div>
        
        {/* FONDO FOTO - Large Dominant Circles - Hidden */}
        {/* <div className="absolute -top-1/2 -left-1/2 w-full h-full border border-white/1 rounded-full"></div> */}
        {/* <div className="absolute -top-1/2 -right-1/2 w-full h-full border border-white/0.5 rounded-full"></div> */}
        {/* <div className="absolute -bottom-1/2 -left-1/2 w-full h-full border border-white/0.5 rounded-full"></div> */}
        {/* <div className="absolute -bottom-1/2 -right-1/2 w-full h-full border border-white/0.5 rounded-full" style={{boxShadow: 'inset 0 0 20px rgba(0, 0, 0, 0.3)'}}></div> */}
        
        {/* FONDO FIGURA - Large Dominant Circles - Commented */}
        {/* <div className="absolute -top-1/2 -left-1/2 w-full h-full border border-white/1 rounded-full"></div> */}
        {/* <div className="absolute -top-1/2 -right-1/2 w-full h-full border border-white/0.5 rounded-full"></div> */}
        {/* <div className="absolute -bottom-1/2 -left-1/2 w-full h-full border border-white/0.5 rounded-full"></div> */}
        {/* <div className="absolute -bottom-1/2 -right-1/2 w-full h-full border border-white/0.5 rounded-full" style={{boxShadow: 'inset 0 0 20px rgba(0, 0, 0, 0.3)'}}></div> */}
        
        {/* Center Large Circle */}
        {/* <div className="absolute top-1/2 left-1/2 w-full h-full border-2 border-white/0.5 rounded-full transform -translate-x-1/2 -translate-y-1/2"></div> */}
        
        {/* Geometric Lines */}
        <div className="absolute top-1/4 left-0 right-0 h-[0.5px] bg-gradient-to-r from-transparent via-white/0.5 to-transparent"></div>
        <div className="absolute bottom-1/4 left-0 right-0 h-[0.5px] bg-gradient-to-r from-transparent via-white/0.5 to-transparent"></div>
        <div className="absolute top-0 bottom-0 left-1/4 w-[0.5px] bg-gradient-to-b from-transparent via-white/0.5 to-transparent"></div>
        <div className="absolute top-0 bottom-0 right-1/4 w-[0.5px] bg-gradient-to-b from-transparent via-white/0.5 to-transparent"></div>
        
        {/* Twinkling Stars/Lightning - Positioned in corners and edges, away from center photo */}
        <div className="absolute top-[5%] left-[10%] w-1 h-1 bg-white/30 rounded-full animate-pulse"></div>
        <div className="absolute top-[8%] right-[12%] w-1 h-1 bg-white/25 rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
        <div className="absolute top-[15%] left-[5%] w-1 h-1 bg-white/35 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-[12%] right-[8%] w-0.5 h-0.5 bg-white/40 rounded-full animate-pulse" style={{animationDelay: '1.5s'}}></div>
        <div className="absolute bottom-[15%] left-[8%] w-0.5 h-0.5 bg-white/20 rounded-full animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute bottom-[10%] right-[15%] w-1 h-1 bg-white/30 rounded-full animate-pulse" style={{animationDelay: '2.5s'}}></div>
        <div className="absolute top-[20%] left-[90%] w-0.5 h-0.5 bg-white/25 rounded-full animate-pulse" style={{animationDelay: '3s'}}></div>
        <div className="absolute top-[18%] right-[85%] w-1 h-1 bg-white/35 rounded-full animate-pulse" style={{animationDelay: '3.5s'}}></div>
        <div className="absolute bottom-[20%] left-[12%] w-0.5 h-0.5 bg-white/20 rounded-full animate-pulse" style={{animationDelay: '4s'}}></div>
        <div className="absolute bottom-[8%] right-[10%] w-1 h-1 bg-white/30 rounded-full animate-pulse" style={{animationDelay: '4.5s'}}></div>
        <div className="absolute top-[10%] left-[15%] w-0.5 h-0.5 bg-white/45 rounded-full animate-pulse" style={{animationDelay: '5s'}}></div>
        <div className="absolute bottom-[12%] right-[18%] w-1 h-1 bg-white/15 rounded-full animate-pulse" style={{animationDelay: '5.5s'}}></div>
        <div className="absolute top-[25%] left-[8%] w-0.5 h-0.5 bg-white/35 rounded-full animate-pulse" style={{animationDelay: '6s'}}></div>
        <div className="absolute top-[22%] right-[92%] w-1 h-1 bg-white/25 rounded-full animate-pulse" style={{animationDelay: '6.5s'}}></div>
        <div className="absolute bottom-[18%] left-[85%] w-1 h-1 bg-white/20 rounded-full animate-pulse" style={{animationDelay: '7s'}}></div>
        <div className="absolute bottom-[22%] right-[88%] w-0.5 h-0.5 bg-white/40 rounded-full animate-pulse" style={{animationDelay: '7.5s'}}></div>
        
        <style jsx global>{`
          body {
            overscroll-behavior: none;
            -webkit-overflow-scrolling: touch;
          }
          
          html {
            overscroll-behavior: none;
          }
          
          @keyframes moveGradient {
            0% { --x: 30%; --y: 20%; }
            25% { --x: 70%; --y: 30%; }
            50% { --x: 60%; --y: 70%; }
            75% { --x: 20%; --y: 60%; }
            100% { --x: 30%; --y: 20%; }
          }
          
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          
          .fade-in {
            animation: fadeIn 0.6s ease-out;
          }
        `}        </style>
      </div>

      {/* Header Menu */}
      <header className={`fixed left-0 right-0 z-30 transition-transform duration-500 ease-in-out ${showNav ? 'translate-y-[27px]' : '-translate-y-full'}`}>
        <div className="w-full px-4 md:px-6 py-4 md:py-8">
          {/* Mobile Layout - Centered */}
          <div className="md:hidden flex flex-col items-center">
            <nav className="flex flex-wrap justify-center space-x-0.5 sm:space-x-1 font-light tracking-[0.15em]" style={{fontSize: '15px'}}>
              <button 
                onClick={() => toggleSection('about')}
                className="px-1.5 sm:px-2 py-0.5 sm:py-1 hover:text-gray-300 transition-colors cursor-pointer relative group"
              >
                <span className="relative z-10">ABOUT</span>
                <div className="absolute inset-0 bg-white/5 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
              </button>
              <button 
                onClick={() => toggleSection('music')}
                className="px-1.5 sm:px-2 py-0.5 sm:py-1 hover:text-gray-300 transition-colors cursor-pointer relative group"
              >
                <span className="relative z-10">MUSIC</span>
                <div className="absolute inset-0 bg-white/5 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
              </button>
              <button 
                onClick={() => toggleSection('tour')}
                className="px-1.5 sm:px-2 py-0.5 sm:py-1 hover:text-gray-300 transition-colors cursor-pointer relative group"
              >
                <span className="relative z-10">MEDIA</span>
                <div className="absolute inset-0 bg-white/5 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
              </button>
              <button 
                onClick={() => toggleSection('contact')}
                className="px-1.5 sm:px-2 py-0.5 sm:py-1 hover:text-gray-300 transition-colors cursor-pointer relative group"
              >
                <span className="relative z-10">CONTACT</span>
                <div className="absolute inset-0 bg-white/5 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
              </button>
            </nav>
          </div>
          
          {/* Desktop Layout - Centered */}
          <div className="hidden md:flex justify-center items-center">
            <nav className="flex flex-wrap justify-center space-x-1 font-light tracking-[0.15em]" style={{fontSize: '21px'}}>
              <button 
                onClick={() => toggleSection('about')}
                className="px-4 py-2 hover:text-gray-300 transition-colors cursor-pointer relative group"
              >
                <span className="relative z-10">ABOUT</span>
                <div className="absolute inset-0 bg-white/5 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
              </button>
              <button 
                onClick={() => toggleSection('music')}
                className="px-4 py-2 hover:text-gray-300 transition-colors cursor-pointer relative group"
              >
                <span className="relative z-10">MUSIC</span>
                <div className="absolute inset-0 bg-white/5 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
              </button>
              <button 
                onClick={() => toggleSection('tour')}
                className="px-4 py-2 hover:text-gray-300 transition-colors cursor-pointer relative group"
              >
                <span className="relative z-10">MEDIA</span>
                <div className="absolute inset-0 bg-white/10 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
              </button>
              <button 
                onClick={() => toggleSection('contact')}
                className="px-4 py-2 hover:text-gray-300 transition-colors cursor-pointer relative group"
              >
                <span className="relative z-10">CONTACT</span>
                <div className="absolute inset-0 bg-white/5 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
              </button>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content - Inside Center Circle */}
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-40 flex items-center justify-center pointer-events-none" style={{width: '60vw', height: '60vh', isolation: 'isolate'}}>
        <div className="text-center opacity-40 hover:opacity-80 transition-opacity duration-500 pointer-events-auto relative z-40" style={{isolation: 'isolate'}}>
          {/* <div className="text-4xl md:text-6xl lg:text-8xl font-light tracking-[0.2em] mb-2 md:mb-4 text-white relative z-40" style={{position: 'relative', zIndex: 40}}>KILLER NUGGET</div> */}
          {/* <div className="text-sm md:text-lg lg:text-xl font-light tracking-[0.1em] text-gray-300 relative z-40" style={{position: 'relative', zIndex: 40}}>House Music Straight From The Jungle</div> */}
        </div>
      </div>

              {/* Popup Sections */}
        {activeSection && (
          <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm overflow-y-auto">
          <div className="min-h-screen flex items-start justify-center p-8">
            <div className="max-w-4xl mx-auto w-full py-8 fade-in">
              {/* Close Button */}
              <button 
                onClick={() => setActiveSection(null)}
                className="absolute top-4 md:top-8 right-4 md:right-8 text-3xl md:text-4xl font-light hover:text-gray-400 transition-colors z-10 hover:scale-110 transition-transform duration-200"
              >
                ×
              </button>

              {/* Music Section */}
              {activeSection === 'music' && (
                <div className="text-center px-4 md:px-8">
                  <h2 className="text-3xl md:text-5xl lg:text-6xl font-light tracking-[0.1em] mb-8 md:mb-16 uppercase">
                    Music
                  </h2>
                  
                  {/* Latest Releases */}
                  <div className="mb-8 md:mb-16">
                    <h3 className="text-xl md:text-2xl font-light mb-4 md:mb-8 tracking-[0.1em] uppercase">Latest Releases</h3>
                    <div className="max-w-4xl mx-auto px-4">
                      <iframe 
                        style={{borderRadius: '12px'}} 
                        src="https://open.spotify.com/embed/track/0rqt0hvn2AS6XeVsC57yJy?utm_source=generator&theme=0" 
                        width="100%" 
                        height="352" 
                        frameBorder="0" 
                        allowFullScreen="" 
                        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
                        loading="lazy"
                      ></iframe>
                    </div>
                  </div>

                  {/* Discography */}
                  <div className="mb-8 md:mb-16">
                    <h3 className="text-xl md:text-2xl font-light mb-4 md:mb-8 tracking-[0.1em] uppercase">Discography</h3>
                    <div className="max-w-4xl mx-auto px-4">
                      <iframe 
                        style={{borderRadius: '12px'}} 
                        src="https://open.spotify.com/embed/artist/4XxlOxSpBGPwmAeEHgvGA5?utm_source=generator&theme=0" 
                        width="100%" 
                        height="352" 
                        frameBorder="0" 
                        allowFullScreen="" 
                        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
                        loading="lazy"
                      ></iframe>
                    </div>
                  </div>

                  {/* Sets */}
                  <div>
                    <h3 className="text-xl md:text-2xl font-light mb-4 md:mb-8 tracking-[0.1em] uppercase">Sets</h3>
                    <div className="space-y-4 md:space-y-8 max-w-4xl mx-auto px-4">
                      <div>
                        <h4 className="text-lg font-light mb-4 tracking-[0.05em]">Cross Fade Radio Vol.166</h4>
                        <iframe 
                          width="100%" 
                          height="400" 
                          scrolling="no" 
                          frameBorder="no" 
                          allow="autoplay" 
                          src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/2037849956&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"
                        ></iframe>
                      </div>
                      <div>
                        <h4 className="text-lg font-light mb-4 tracking-[0.05em]">Live from Arenal Lake, Costa Rica</h4>
                        <iframe 
                          width="100%" 
                          height="400" 
                          scrolling="no" 
                          frameBorder="no" 
                          allow="autoplay" 
                          src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/1778301225&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"
                        ></iframe>
                      </div>
                      <div>
                        <h4 className="text-lg font-light mb-4 tracking-[0.05em]">Live from Arenal Lake, Costa Rica</h4>
                        <iframe 
                          width="100%" 
                          height="400" 
                          src="https://www.youtube.com/embed/JB4liIeetA4" 
                          title="Live from Arenal Lake, Costa Rica" 
                          frameBorder="0" 
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                          allowFullScreen
                        ></iframe>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Tour Section - Press Kit Gallery */}
              {activeSection === 'tour' && (
                <div className="text-center px-4 md:px-8">
                  <h2 className="text-3xl md:text-5xl lg:text-6xl font-light tracking-[0.1em] mb-8 md:mb-16 uppercase">
                    Media
                  </h2>
                  
                                    {/* Photos Section */}
                  <div className="mb-12 md:mb-16">
                    <h3 className="text-xl md:text-2xl font-light mb-6 md:mb-8 tracking-[0.1em] uppercase">Photos</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 max-w-6xl mx-auto">
                      {[
                        { src: '/DSC_6271_copy.jpg', alt: 'Killer Nugget Photo 1', filename: 'Killer_Nugget_Photo_1.jpg' },
                        { src: '/DSC_0239.jpg', alt: 'Killer Nugget Photo 2', filename: 'Killer_Nugget_Photo_2.jpg' },
                        { src: '/DSC_0423.jpg', alt: 'Killer Nugget Photo 3', filename: 'Killer_Nugget_Photo_3.jpg' },
                        { src: '/DSC_1742-Mejorado-NR.jpg', alt: 'Killer Nugget Photo 4', filename: 'Killer_Nugget_Photo_4.jpg' },
                        { src: '/DSC00176.jpeg', alt: 'Killer Nugget Photo 5', filename: 'Killer_Nugget_Photo_5.jpeg' },
                        { src: '/photo6.jpg', alt: 'Killer Nugget Photo 6', filename: 'Killer_Nugget_Photo_6.jpg' }
                      ].map((photo, index) => (
                        <div key={index} className="group relative overflow-hidden rounded-lg bg-white/5 border border-white/10 hover:border-white/20 transition-all duration-300 cursor-pointer" onClick={() => openMedia(photo.src, 'image', photo.alt)}>
                          <img 
                            src={photo.src} 
                            alt={photo.alt} 
                            className="w-full h-64 object-cover hover:scale-105 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <div className="absolute bottom-4 right-4">
                              <button 
                                onClick={(e) => {
                                  e.stopPropagation();
                                  downloadMedia(photo.src, photo.filename);
                                }}
                                className="bg-white/60 text-black px-3 py-1.5 font-light tracking-[0.1em] uppercase hover:bg-white/90 transition-all duration-300 text-xs rounded backdrop-blur-sm"
                              >
                                Download
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Visuals Section */}
                  <div className="mb-12 md:mb-16">
                    <h3 className="text-xl md:text-2xl font-light mb-6 md:mb-8 tracking-[0.1em] uppercase">Visuals</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-6xl mx-auto">
                      <div className="group relative overflow-hidden rounded-lg bg-white/5 border border-white/10 hover:border-white/20 transition-all duration-300 cursor-pointer" onClick={() => openMedia('/visual1.png', 'image', 'Visual Design 1')}>
                        <img 
                          src="/visual1.png" 
                          alt="Visual Design 1" 
                          className="w-full h-auto object-cover hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <div className="absolute bottom-4 right-4">
                            <button 
                              onClick={(e) => {
                                e.stopPropagation();
                                downloadMedia('/visual1.png', 'Killer_Nugget_Visual_1.png');
                              }}
                              className="bg-white/60 text-black px-3 py-1.5 font-light tracking-[0.1em] uppercase hover:bg-white/90 transition-all duration-300 text-xs rounded backdrop-blur-sm"
                            >
                              Download
                            </button>
                          </div>
                        </div>
                      </div>
                      
                      <div className="group relative overflow-hidden rounded-lg bg-white/5 border border-white/10 hover:border-white/20 transition-all duration-300 cursor-pointer" onClick={() => openMedia('/visual2.png', 'image', 'Visual Design 2')}>
                        <img 
                          src="/visual2.png" 
                          alt="Visual Design 2" 
                          className="w-full h-auto object-cover hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <div className="absolute bottom-4 right-4">
                            <button 
                              onClick={(e) => {
                                e.stopPropagation();
                                downloadMedia('/visual2.png', 'Killer_Nugget_Visual_2.png');
                              }}
                              className="bg-white/60 text-black px-3 py-1.5 font-light tracking-[0.1em] uppercase hover:bg-white/90 transition-all duration-300 text-xs rounded backdrop-blur-sm"
                            >
                              Download
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Videos Section */}
                  <div>
                    <h3 className="text-xl md:text-2xl font-light mb-6 md:mb-8 tracking-[0.1em] uppercase">Videos</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-4xl mx-auto">
                      {[
                        { src: 'https://res.cloudinary.com/dpplgma25/video/upload/v1761006228/reel_killer_3_ozhlfb.mp4', alt: 'Reel Killer 3', filename: 'Killer_Nugget_Reel_Killer_3.mp4' },
                        { src: 'https://res.cloudinary.com/dpplgma25/video/upload/v1761005706/another_world_reel_ohstg6.mp4', alt: 'Another World Reel', filename: 'Killer_Nugget_Another_World_Reel.mp4' },
                        { src: 'https://res.cloudinary.com/dpplgma25/video/upload/v1761005696/97445a85e47045b0b73189f5b7c12fff_twfdc5.mp4', alt: 'Killer Nugget Video 4', filename: 'Killer_Nugget_Video_4.mp4' },
                        { src: 'https://res.cloudinary.com/dpplgma25/video/upload/v1761005692/sunset_beats_vjp7y3.mp4', alt: 'Sunset Beats', filename: 'Killer_Nugget_Sunset_Beats.mp4' }
                      ].map((video, index) => (
                        <div key={index} className="group relative overflow-hidden rounded-lg bg-white/5 border border-white/10 hover:border-white/20 transition-all duration-300 cursor-pointer" onClick={() => openMedia(video.src, 'video', video.alt)}>
                          <video 
                            src={video.src}
                            poster={video.src.replace(/\.(mp4|mov)$/, '.jpg')}
                            className="w-full aspect-video object-cover hover:scale-105 transition-transform duration-500"
                            muted
                            preload="metadata"
                            playsInline
                          />
                          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <div className="absolute bottom-4 right-4">
                              <button 
                                onClick={(e) => {
                                  e.stopPropagation();
                                  downloadMedia(video.src, video.filename);
                                }}
                                className="bg-white/60 text-black px-3 py-1.5 font-light tracking-[0.1em] uppercase hover:bg-white/90 transition-all duration-300 text-xs rounded backdrop-blur-sm"
                              >
                                Download
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* About Section */}
              {activeSection === 'about' && (
                <div className="text-center max-w-4xl mx-auto px-4 md:px-8">
                  <div className="flex justify-between items-center mb-8 md:mb-16">
                    <h2 className="text-3xl md:text-5xl lg:text-6xl font-light tracking-[0.1em] uppercase">
                      About
                    </h2>
                    <button 
                      onClick={toggleAboutLanguage}
                      className="px-4 py-2 border border-white/20 hover:bg-white/10 transition-all duration-300 text-sm md:text-base font-light tracking-[0.1em] uppercase hover:scale-105 transform"
                    >
                      {aboutLanguage === 'english' ? 'ESPAÑOL' : 'ENGLISH'}
                    </button>
                  </div>
                  <div className="space-y-6 md:space-y-8 text-base md:text-lg leading-relaxed text-gray-300 tracking-wide text-left">
                    {aboutLanguage === 'english' ? (
                      <>
                        <p className="hover:scale-[1.08] transition-all duration-500 ease-out cursor-pointer inline-block" style={{transformOrigin: 'center center'}}>
                          Killer Nugget is an electronic music producer from Costa Rica, crafting driving house rhythms infused with sleek, minimal textures. Inspired by the global underground scene, his sound is built for deep club sessions and high-rotation playlists alike, bridging the underground&apos;s groove-forward energy with modern, high-fidelity production. Killer Nugget continues to refine his craft — pushing sonic and visual boundaries with each new release.
                        </p>
                        <p className="hover:scale-[1.08] transition-all duration-500 ease-out cursor-pointer inline-block" style={{transformOrigin: 'center center'}}>
                          Currently focused full-time on music production, Killer Nugget is honing his sound under the influence of some of the world&apos;s top producers — including Josh Baker, Kolter, Sidney Charles, Gene On Earth, M-High, and more. His approach is rooted in clean, tight grooves and a commitment to constantly evolving his style.
                        </p>
                        <p className="hover:scale-[1.08] transition-all duration-500 ease-out cursor-pointer inline-block" style={{transformOrigin: 'center center'}}>
                          Beyond his role as a producer and DJ, Killer Nugget has also played a key visual role in the Costa Rican electronic music scene — working as a photographer for some of the country&apos;s biggest festivals and events. His portfolio includes ongoing work with Electric Animals, Ocaso Festival, BPM Festival and many many more, helping shape the visual identity of the underground movement in Central America.
                        </p>
                        <p className="hover:scale-[1.08] transition-all duration-500 ease-out cursor-pointer inline-block" style={{transformOrigin: 'center center'}}>
                          With a deep-rooted passion for sound design, groove, and underground culture, Killer Nugget is emerging as one promising name in the region. Whether behind the decks or in the studio, his goal remains the same — to move dancefloors and push sonic boundaries with every beat.
                        </p>
                      </>
                    ) : (
                      <>
                        <p className="hover:scale-[1.08] transition-all duration-500 ease-out cursor-pointer inline-block" style={{transformOrigin: 'center center'}}>
                          Killer Nugget es un productor de música electrónica originario de Costa Rica, que crea ritmos house contundentes con texturas minimalistas y elegantes. Inspirado por la escena underground global, su sonido está diseñado tanto para intensas sesiones de club como para rotación en playlist, uniendo la energía groove del underground con una producción moderna y de alta fidelidad. Killer Nugget continúa perfeccionando su arte, llevando al límite tanto lo sonoro como lo visual en cada nuevo lanzamiento.
                        </p>
                        <p className="hover:scale-[1.08] transition-all duration-500 ease-out cursor-pointer inline-block" style={{transformOrigin: 'center center'}}>
                          Actualmente enfocado de lleno en la producción musical, está puliendo su estilo bajo la influencia de algunos de los productores más destacados del mundo, como Josh Baker, Kolter, Sidney Charles, Gene On Earth, M-High, entre otros. Su enfoque se basa en grooves precisos y ajustados, con un compromiso constante por evolucionar en cada track.
                        </p>
                        <p className="hover:scale-[1.08] transition-all duration-500 ease-out cursor-pointer inline-block" style={{transformOrigin: 'center center'}}>
                          Además de su rol como productor y DJ, Killer Nugget ha tenido un papel visual clave en la escena electrónica de Costa Rica, trabajando como fotógrafo en algunos de los festivales y eventos más grandes del país. Su portafolio incluye colaboraciones constantes con Electric Animals, Ocaso Festival, BPM Festival, entre muchos otros, contribuyendo a definir la identidad visual del movimiento underground en Centroamérica.
                        </p>
                        <p className="hover:scale-[1.08] transition-all duration-500 ease-out cursor-pointer inline-block" style={{transformOrigin: 'center center'}}>
                          Con una pasión profundamente arraigada por el diseño sonoro, el groove y la cultura underground, Killer Nugget se está posicionando como uno nombre bastante prometedor en la región. Ya sea tras los decks o en el estudio, su objetivo sigue siendo el mismo: hacer mover las pistas de baile y romper los límites del sonido con cada beat.
                        </p>
                      </>
                    )}
                  </div>
                </div>
              )}

              {/* Contact Section */}
              {activeSection === 'contact' && (
                <div className="flex items-center justify-center min-h-screen -mt-20 md:-mt-52">
                  <div className="text-center max-w-2xl mx-auto px-4 md:px-8">
                    <h2 className="text-3xl md:text-5xl lg:text-6xl font-light tracking-[0.1em] mb-8 md:mb-16 uppercase">
                      Contact
                    </h2>
                    <div className="space-y-6 md:space-y-8">
                      <div>
                        <h3 className="text-xl font-light mb-4 tracking-[0.1em] uppercase">Bookings</h3>
                        <a 
                          href="mailto:kevinbermudez46@gmail.com"
                          className="text-lg text-gray-400 tracking-[0.05em] hover:text-blue-400 hover:scale-105 transition-all duration-500 ease-out cursor-pointer inline-block"
                          style={{transformOrigin: 'center center'}}
                        >
                          kevinbermudez46@gmail.com
                        </a>
                      </div>
                      <div>
                        <h3 className="text-xl font-light mb-4 tracking-[0.1em] uppercase">Phone</h3>
                        <a 
                          href="tel:+50661371097"
                          className="text-lg text-gray-400 tracking-[0.05em] hover:text-purple-400 hover:scale-105 transition-all duration-500 ease-out cursor-pointer inline-block"
                          style={{transformOrigin: 'center center'}}
                        >
                          +506 61371097
                        </a>
                      </div>
                      <div>
                        <h3 className="text-xl font-light mb-4 tracking-[0.1em] uppercase">WhatsApp</h3>
                        <a 
                          href="https://api.whatsapp.com/send?phone=50661371097&text=Hola%20Killer" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-lg text-gray-400 tracking-[0.05em] hover:text-green-400 hover:scale-105 transition-all duration-500 ease-out inline-block"
                          style={{transformOrigin: 'center center'}}
                        >
                          Chat on WhatsApp
                        </a>
                      </div>
                      <div>
                        <h3 className="text-xl font-light mb-4 tracking-[0.1em] uppercase">Socials</h3>
                        <span className="text-lg text-gray-400 tracking-[0.05em] hover:text-pink-400 hover:scale-105 transition-all duration-500 ease-out cursor-pointer inline-block" style={{transformOrigin: 'center center'}}>
                          @killer_nugget
                        </span>
                      </div>
                      <div>
                        <h3 className="text-xl font-light mb-4 tracking-[0.1em] uppercase">All Links</h3>
                        <a 
                          href="https://linktr.ee/killer_nugget"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-lg text-gray-400 tracking-[0.05em] hover:text-yellow-400 hover:scale-105 transition-all duration-500 ease-out cursor-pointer inline-block"
                          style={{transformOrigin: 'center center'}}
                        >
                          linktr.ee/killer_nugget
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Media Modal */}
      {selectedMedia && (
        <div className="fixed inset-0 z-[60] bg-black/95 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="relative max-w-4xl max-h-[90vh] w-full">
            {/* Close Button */}
            <button 
              onClick={closeMedia}
              className="absolute -top-12 right-0 text-3xl md:text-4xl font-light hover:text-gray-400 transition-colors z-10 hover:scale-110 transition-transform duration-200"
            >
              ×
            </button>
            
            {/* Navigation Buttons */}
            <button 
              onClick={() => navigateMedia('prev')}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-4xl md:text-5xl font-light hover:text-gray-400 transition-colors z-10 hover:scale-110 transition-transform duration-200 bg-black/50 rounded-full w-12 h-12 flex items-center justify-center"
            >
              ‹
            </button>
            <button 
              onClick={() => navigateMedia('next')}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-4xl md:text-5xl font-light hover:text-gray-400 transition-colors z-10 hover:scale-110 transition-transform duration-200 bg-black/50 rounded-full w-12 h-12 flex items-center justify-center"
            >
              ›
            </button>
            
            {/* Media Content */}
            <div className="relative">
              {mediaType === 'image' ? (
                <img 
                  src={selectedMedia} 
                  alt="Media" 
                  className="w-full h-auto max-h-[80vh] object-contain rounded-lg"
                />
              ) : mediaType === 'video' ? (
                <video 
                  src={selectedMedia}
                  poster={selectedMedia ? selectedMedia.replace(/\.(mp4|mov)$/, '.jpg') : ''}
                  controls 
                  className="w-full h-auto max-h-[80vh] rounded-lg"
                  autoPlay
                  playsInline
                >
                  Your browser does not support the video tag.
                </video>
              ) : null}
              
              {/* Download Button */}
              <div className="absolute bottom-4 right-4">
                <button 
                  onClick={() => {
                    const filename = selectedMedia.split('/').pop();
                    downloadMedia(selectedMedia, filename);
                  }}
                  className="bg-white text-black px-4 py-2 font-light tracking-[0.1em] uppercase hover:bg-gray-200 transition-colors text-sm rounded"
                >
                  Download
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className={`absolute left-4 md:left-8 right-4 md:right-8 z-20 transition-transform duration-500 ease-in-out ${showFooter ? 'translate-y-0' : 'translate-y-full'}`} style={{top: 'calc(100vh - 65px)'}}>
        <div className="text-center" style={{paddingBottom: '8px'}}>
          {/* Social Media Icons */}
          <div className="flex justify-center space-x-4 md:space-x-6 mb-4 md:mb-6">
            <a 
              href="https://open.spotify.com/intl-es/artist/4XxlOxSpBGPwmAeEHgvGA5" 
            target="_blank"
            rel="noopener noreferrer"
              className="text-white hover:text-green-400 transition-colors"
            >
              <svg className="w-8 h-8 md:w-10 md:h-10" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
              </svg>
          </a>
          <a
              href="https://www.youtube.com/@killernugget" 
            target="_blank"
            rel="noopener noreferrer"
              className="text-white hover:text-red-500 transition-colors"
          >
              <svg className="w-8 h-8 md:w-10 md:h-10" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
          </a>
        <a
              href="https://killernugget.bandcamp.com/" 
          target="_blank"
          rel="noopener noreferrer"
              className="text-white hover:text-blue-400 transition-colors"
            >
              <svg className="w-8 h-8 md:w-10 md:h-10" fill="currentColor" viewBox="0 0 24 24">
                <path d="M0 18.75l7.437-13.5H24l-7.438 13.5H0z"/>
              </svg>
        </a>
        <a
              href="https://www.instagram.com/killer_nugget/" 
          target="_blank"
          rel="noopener noreferrer"
              className="text-white hover:text-pink-500 transition-colors"
            >
              <svg className="w-8 h-8 md:w-10 md:h-10" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
        </a>
        <a
              href="https://soundcloud.com/killernugget" 
          target="_blank"
          rel="noopener noreferrer"
              className="text-white hover:text-orange-500 transition-colors"
            >
              <svg className="w-8 h-8 md:w-10 md:h-10" viewBox="0 0 32 32" fill="currentColor">
                <g transform="scale(1.5) translate(-5, -5)">
                  <path d="M23.635 16.09c-.222 0-.44.02-.653.06-.37-2.09-2.24-3.68-4.44-3.68-.47 0-.92.07-1.35.2-.13.04-.21.16-.21.29v8.13c0 .16.13.29.29.29h6.36c1.54 0 2.79-1.25 2.79-2.79s-1.25-2.79-2.79-2.79z"/>
                  <path d="M6.368 15.61a.29.29 0 0 0-.29.29v3.67c0 .16.13.29.29.29h1.01c.16 0 .29-.13.29-.29v-3.67a.29.29 0 0 0-.29-.29z"/>
                  <path d="M8.438 15.01a.29.29 0 0 0-.29.29v4.87c0 .16.13.29.29.29h1.01c.16 0 .29-.13.29-.29v-4.87a.29.29 0 0 0-.29-.29z"/>
                  <path d="M10.508 14.41a.29.29 0 0 0-.29.29v6.07c0 .16.13.29.29.29h1.01c.16 0 .29-.13.29-.29v-6.07a.29.29 0 0 0-.29-.29z"/>
                  <path d="M12.578 13.81a.29.29 0 0 0-.29.29v7.27c0 .16.13.29.29.29h1.01c.16 0 .29-.13.29-.29v-7.27a.29.29 0 0 0-.29-.29z"/>
                  <path d="M14.648 13.21a.29.29 0 0 0-.29.29v8.13c0 .16.13.29.29.29h1.01c.16 0 .29-.13.29-.29v-7.65a.29.29 0 0 0-.29-.29z"/>
                </g>
              </svg>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

