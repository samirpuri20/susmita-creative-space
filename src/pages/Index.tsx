
import React, { useEffect, useState, useRef } from "react";
import Header from "@/components/Header";
import AboutMe from "@/components/AboutMe";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";
import SocialLinks from "@/components/SocialLinks";
import PageLoader from "@/components/Loader";

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);
  const heroRef = useRef<HTMLDivElement>(null);

  // Handle scroll animations
  useEffect(() => {
    const handleScroll = () => {
      // Update scroll progress
      const scrollTop = window.scrollY;
      const winHeight = window.innerHeight;
      const docHeight = document.body.clientHeight;
      const totalDocScrollLength = docHeight - winHeight;
      const scrollPosition = Math.floor((scrollTop / totalDocScrollLength) * 100);
      setScrollProgress(scrollPosition);

      // Handle reveal animations
      const reveals = document.querySelectorAll(".scroll-fade");
      reveals.forEach((reveal) => {
        const elementTop = reveal.getBoundingClientRect().top;
        const elementVisible = 150;
        if (elementTop < window.innerHeight - elementVisible) {
          reveal.classList.add("active");
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle page loading completion
  const handleLoadComplete = () => {
    setIsLoading(false);
    // Initialize scroll animations after loading
    setTimeout(() => {
      const reveals = document.querySelectorAll(".scroll-fade");
      reveals.forEach((reveal) => {
        const elementTop = reveal.getBoundingClientRect().top;
        const elementVisible = 150;
        if (elementTop < window.innerHeight - elementVisible) {
          reveal.classList.add("active");
        }
      });
    }, 100);
  };

  // Parallax effect for the hero section
  useEffect(() => {
    const handleParallax = () => {
      if (heroRef.current) {
        const scroll = window.scrollY;
        heroRef.current.style.transform = `translateY(${scroll * 0.3}px)`;
      }
    };

    window.addEventListener("scroll", handleParallax);
    return () => window.removeEventListener("scroll", handleParallax);
  }, []);

  return (
    <>
      <PageLoader onLoadComplete={handleLoadComplete} />
      
      {!isLoading && (
        <div className="min-h-screen">
          {/* Progress bar */}
          <div 
            className="fixed top-0 left-0 z-50 h-1 bg-primary transition-all duration-300 ease-out"
            style={{ width: `${scrollProgress}%` }}
          />
          
          <Header />
          
          {/* Hero Section */}
          <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-softblue/50 via-white to-white pt-20">
            <div 
              ref={heroRef}
              className="absolute inset-0 w-full h-full"
              style={{ 
                backgroundImage: "url('https://images.unsplash.com/photo-1500673922987-e212871fec22?auto=format&fit=crop&w=2000&q=80')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                opacity: 0.15,
              }}
            />
            
            <div className="absolute inset-0 bg-gradient-to-b from-white/70 to-white/90" />
            
            <div className="container relative z-10 px-6 pt-20 pb-24 md:py-32 flex flex-col items-center justify-center text-center">
              <div className="animate-fade-in mb-8">
                <span className="inline-block px-3 py-1 text-sm font-medium bg-softpink text-primary mb-3 rounded-full">
                  Hello, I'm
                </span>
                <h1 className="font-display text-5xl md:text-7xl font-bold mb-4 text-foreground animated-gradient-text relative">
                  Susmita Giri
                  <span className="absolute -bottom-1 left-0 w-full h-1 bg-gradient-to-r from-softpink via-primary to-softblue transform scale-x-0 transition-transform duration-700 origin-left group-hover:scale-x-100"></span>
                </h1>
                <p className="text-foreground/70 text-xl max-w-xl mx-auto">
                  Content Creator & TikTok Enthusiast from Nepal
                </p>
              </div>
              
              <div className="animate-slide-up" style={{ animationDelay: "0.3s" }}>
                <SocialLinks />
              </div>
              
              <div className="mt-8 w-64 h-64 rounded-full overflow-hidden border-4 border-primary/30 shadow-xl animate-fade-in" style={{ animationDelay: "0.6s" }}>
                <img 
                  src="/lovable-uploads/a9a8ce5b-b724-4a84-a7f8-96fe94f4d8be.png" 
                  alt="Susmita Giri" 
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Scroll indicator */}
              <div 
                className="absolute bottom-12 left-1/2 transform -translate-x-1/2 flex flex-col items-center animate-pulse cursor-pointer"
                onClick={() => {
                  const aboutSection = document.getElementById("about");
                  if (aboutSection) {
                    aboutSection.scrollIntoView({ behavior: "smooth" });
                  }
                }}
              >
                <span className="text-sm text-foreground/70 mb-2">Scroll Down</span>
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="24" 
                  height="24" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  className="animate-bounce text-primary"
                >
                  <line x1="12" y1="5" x2="12" y2="19"></line>
                  <polyline points="19 12 12 19 5 12"></polyline>
                </svg>
              </div>
            </div>
          </section>
          
          {/* About Section */}
          <AboutMe />

          {/* TikTok Content Section */}
          <section id="content" className="py-24 px-6 md:px-12 relative overflow-hidden">
            <div className="absolute -top-40 -right-40 w-96 h-96 bg-peach/30 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-softblue/30 rounded-full blur-3xl"></div>
            
            <div className="max-w-6xl mx-auto relative z-10">
              <div className="text-center mb-16 scroll-fade fade-up">
                <span className="inline-block px-3 py-1 text-sm font-medium bg-softblue text-primary mb-3 rounded-full">
                  My Videos
                </span>
                <h2 className="text-3xl md:text-5xl font-display font-bold mb-6">
                  Creative <span className="text-primary">TikTok</span> Content
                </h2>
                <p className="text-foreground/70 max-w-3xl mx-auto">
                  Explore my world through creative TikTok videos. I love sharing glimpses of my daily life, travel adventures, 
                  cooking experiments, and artistic expressions with my audience.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {/* TikTok Video 1 */}
                <div className="scroll-fade fade-up glass rounded-2xl overflow-hidden shadow-lg" style={{ animationDelay: "0.1s" }}>
                  <div className="aspect-[9/16] w-full bg-black">
                    <iframe
                      src="https://www.tiktok.com/embed/v2/7476006011090799890"
                      allowFullScreen
                      className="w-full h-full"
                    ></iframe>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2">Travel Adventures</h3>
                    <p className="text-foreground/70 mb-4">
                      Exploring beautiful places in Nepal and sharing the scenic views with my followers.
                    </p>
                    <div className="flex items-center text-sm text-foreground/60">
                      <span className="mr-4 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                        524
                      </span>
                      <span className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                        </svg>
                        42
                      </span>
                    </div>
                  </div>
                </div>
                
                {/* TikTok Video 2 */}
                <div className="scroll-fade fade-up glass rounded-2xl overflow-hidden shadow-lg" style={{ animationDelay: "0.2s" }}>
                  <div className="aspect-[9/16] w-full bg-black">
                    <iframe
                      src="https://www.tiktok.com/embed/v2/7473775311075822853"
                      allowFullScreen
                      className="w-full h-full"
                    ></iframe>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2">Cooking Delights</h3>
                    <p className="text-foreground/70 mb-4">
                      Sharing my passion for cooking and trying out new recipes from Nepali and international cuisine.
                    </p>
                    <div className="flex items-center text-sm text-foreground/60">
                      <span className="mr-4 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                        782
                      </span>
                      <span className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                        </svg>
                        67
                      </span>
                    </div>
                  </div>
                </div>
                
                {/* TikTok Video 3 */}
                <div className="scroll-fade fade-up glass rounded-2xl overflow-hidden shadow-lg" style={{ animationDelay: "0.3s" }}>
                  <div className="aspect-[9/16] w-full bg-black">
                    <iframe
                      src="https://www.tiktok.com/embed/v2/7458593034486172935"
                      allowFullScreen
                      className="w-full h-full"
                    ></iframe>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2">Acting & Creativity</h3>
                    <p className="text-foreground/70 mb-4">
                      Showcasing my acting skills and creative expressions through short-form videos.
                    </p>
                    <div className="flex items-center text-sm text-foreground/60">
                      <span className="mr-4 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                        936
                      </span>
                      <span className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                        </svg>
                        89
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-16 text-center scroll-fade fade-up">
                <a 
                  href="https://www.tiktok.com/@susmitagiri56" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="px-8 py-3 rounded-full bg-primary text-white hover:bg-primary/90 transition-colors inline-flex items-center"
                >
                  Follow Me on TikTok
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </a>
              </div>
            </div>
          </section>

          {/* Photography Section */}
          <section className="py-24 px-6 md:px-12 bg-gradient-to-b from-white to-cream/30 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-white to-transparent"></div>
            
            <div className="max-w-6xl mx-auto relative z-10">
              <div className="text-center mb-16 scroll-fade fade-up">
                <span className="inline-block px-3 py-1 text-sm font-medium bg-peach text-primary mb-3 rounded-full">
                  Visual Stories
                </span>
                <h2 className="text-3xl md:text-5xl font-display font-bold mb-6">
                  Photography <span className="text-primary">Passion</span>
                </h2>
                <p className="text-foreground/70 max-w-3xl mx-auto">
                  Photography allows me to freeze beautiful moments in time. Through my lens, I capture the essence of people, 
                  places, and experiences that inspire me.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                <div className="scroll-fade fade-left">
                  <div className="aspect-video rounded-2xl overflow-hidden shadow-lg">
                    <img 
                      src="/lovable-uploads/a9a8ce5b-b724-4a84-a7f8-96fe94f4d8be.png" 
                      alt="Photography" 
                      className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                    />
                  </div>
                </div>
                
                <div className="flex flex-col justify-center scroll-fade fade-right">
                  <h3 className="text-2xl font-bold mb-4">The Art of Visual Storytelling</h3>
                  <p className="text-foreground/70 mb-6">
                    I believe each photograph tells a unique story. Whether I'm capturing the serene landscapes of Nepal, 
                    the vibrant cultural experiences, or candid moments of daily life, my goal is to convey emotion and narrative
                    through my images.
                  </p>
                  <p className="text-foreground/70">
                    Photography has taught me patience, perspective, and the art of finding beauty in the ordinary. 
                    It complements my content creation journey and allows me to express myself in different ways.
                  </p>
                </div>
              </div>
            </div>
          </section>
          
          {/* Contact Section */}
          <ContactForm />
          
          {/* Footer */}
          <Footer />
        </div>
      )}
    </>
  );
};

export default Index;
