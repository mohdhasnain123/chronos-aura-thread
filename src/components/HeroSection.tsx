import { CyberButton } from "@/components/ui/cyber-button";
import { Badge } from "@/components/ui/badge";
import { Zap, Brain, Globe } from "lucide-react";
import heroBackground from "@/assets/hero-background.png";

export const HeroSection = () => {
  return (
    <div 
      className="relative min-h-[60vh] flex items-center justify-center overflow-hidden rounded-xl"
      style={{
        backgroundImage: `url(${heroBackground})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" />
      
      {/* Neural grid overlay */}
      <div className="absolute inset-0 neural-grid opacity-30" />
      
      {/* Content */}
      <div className="relative z-10 text-center space-y-6 max-w-4xl mx-auto px-6">
        <Badge variant="secondary" className="bg-accent/20 text-accent border-accent/30 mb-4">
          <Brain className="w-4 h-4 mr-1" />
          Neural Intelligence Active
        </Badge>
        
        <h1 className="text-6xl md:text-8xl font-orbitron font-bold kinetic-text">
          Welcome to the Future
        </h1>
        
        <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
          Your personal apparel navigator for 2035. Discover stores that match your neural patterns and style preferences.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <CyberButton variant="cyber" size="xl" className="group">
            <Zap className="w-5 h-5 mr-2 group-hover:animate-pulse" />
            Activate AuraThread
          </CyberButton>
          <CyberButton variant="hologram" size="xl">
            <Globe className="w-5 h-5 mr-2" />
            Explore Navigator
          </CyberButton>
        </div>
        
        {/* Floating stats */}
        <div className="flex justify-center gap-8 mt-8">
          <div className="text-center">
            <div className="text-3xl font-orbitron font-bold text-primary neural-pulse">2,847</div>
            <div className="text-sm text-muted-foreground">Active Stores</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-orbitron font-bold text-accent neural-pulse">98.7%</div>
            <div className="text-sm text-muted-foreground">Match Accuracy</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-orbitron font-bold text-secondary neural-pulse">156K</div>
            <div className="text-sm text-muted-foreground">Neural Users</div>
          </div>
        </div>
      </div>
      
      {/* Floating elements */}
      <div className="absolute top-20 left-20 w-4 h-4 bg-primary rounded-full animate-float opacity-60" />
      <div className="absolute top-40 right-32 w-3 h-3 bg-accent rounded-full animate-float opacity-80" style={{ animationDelay: '1s' }} />
      <div className="absolute bottom-32 left-1/4 w-2 h-2 bg-secondary rounded-full animate-float opacity-70" style={{ animationDelay: '2s' }} />
    </div>
  );
};