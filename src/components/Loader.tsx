
import React, { useEffect, useState } from "react";
import { CircleOff, Sparkles } from "lucide-react";

interface PageLoaderProps {
  onLoadComplete: () => void;
}

const PageLoader: React.FC<PageLoaderProps> = ({ onLoadComplete }) => {
  const [progress, setProgress] = useState(0);
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        setProgress((prevProgress) => {
          const newProgress = prevProgress + Math.floor(Math.random() * 15);
          
          if (newProgress >= 100) {
            clearInterval(interval);
            
            setTimeout(() => {
              setShowLoader(false);
              onLoadComplete();
            }, 500);
            
            return 100;
          }
          
          return newProgress;
        });
      }, 200);

      return () => clearInterval(interval);
    }, 500);

    return () => clearTimeout(timer);
  }, [onLoadComplete]);

  if (!showLoader) return null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-br from-softblue/80 via-background to-softpink/80 transition-opacity duration-500">
      <div className="relative">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-28 h-28 rounded-full border-4 border-primary/30 flex items-center justify-center">
            <div 
              className="w-24 h-24 rounded-full border-4 border-t-primary border-r-primary border-b-transparent border-l-transparent animate-spin-slow"
            />
          </div>
        </div>
        
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-3xl font-cursive animated-gradient-text animate-bounce">SG</div>
        </div>
        
        <div className="absolute -top-4 -right-4">
          <Sparkles className="w-8 h-8 text-yellow-400 animate-pulse" />
        </div>
        
        <div className="absolute -bottom-4 -left-4">
          <Sparkles className="w-8 h-8 text-purple-400 animate-pulse" style={{ animationDelay: "0.5s" }} />
        </div>
        
        <div className="w-36 h-36 flex items-center justify-center invisible">
          {/* Placeholder to create space */}
        </div>
      </div>
      
      <div className="mt-8 w-64 h-2 bg-white/30 rounded-full overflow-hidden">
        <div 
          className="h-full bg-gradient-to-r from-purple-500 via-primary to-pink-500 rounded-full transition-all duration-300 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
      
      <p className="mt-4 font-cursive text-2xl tracking-wide text-foreground animated-gradient-text">
        {progress === 100 ? "Welcome!" : "Loading..."}
      </p>
      
      <div className="mt-2 text-center text-sm text-foreground/70 max-w-md px-6">
        <p>{progress < 50 ? "Creating magic..." : "Almost there..."}</p>
      </div>
    </div>
  );
};

export default PageLoader;
