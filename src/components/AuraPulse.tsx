import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, Activity } from "lucide-react";
import trendsData from "@/data/trends.json";

export const AuraPulse = () => {
  const [trends, setTrends] = useState(trendsData.currentTrends);
  const [pulseIndex, setPulseIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPulseIndex((prev) => (prev + 1) % trends.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [trends.length]);

  return (
    <Card className="p-4 hologram h-full">
      <div className="flex items-center gap-2 mb-4">
        <Activity className="w-5 h-5 text-accent neural-pulse" />
        <h2 className="font-orbitron font-semibold text-lg kinetic-text">AuraPulse</h2>
        <Badge variant="secondary" className="bg-neural-pulse/20 text-neural-pulse border-neural-pulse/30">
          LIVE
        </Badge>
      </div>

      <div className="space-y-3">
        {trends.map((trend, index) => {
          const isActive = index === pulseIndex;
          const isRising = trend.change.startsWith('+');
          
          return (
            <div 
              key={trend.category}
              className={`p-3 rounded-lg border transition-all duration-500 data-stream ${
                isActive 
                  ? 'border-accent bg-accent/10 cyber-glow' 
                  : 'border-muted bg-surface/50'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className={`font-medium text-sm ${isActive ? 'text-accent' : 'text-foreground'}`}>
                  {trend.category}
                </h3>
                <div className="flex items-center gap-1">
                  {isRising ? (
                    <TrendingUp className="w-3 h-3 text-success" />
                  ) : (
                    <TrendingDown className="w-3 h-3 text-destructive" />
                  )}
                  <span className={`text-xs font-orbitron ${
                    isRising ? 'text-success' : 'text-destructive'
                  }`}>
                    {trend.change}
                  </span>
                </div>
              </div>
              
              {/* Popularity bar */}
              <div className="w-full bg-muted/30 rounded-full h-2 mb-1">
                <div 
                  className={`h-full rounded-full transition-all duration-1000 ${
                    isActive ? 'bg-accent' : 'bg-primary'
                  }`}
                  style={{ 
                    width: `${trend.popularity}%`,
                    boxShadow: isActive ? '0 0 10px currentColor' : 'none'
                  }}
                />
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-xs text-muted-foreground">Popularity</span>
                <span className={`text-sm font-orbitron font-semibold ${
                  isActive ? 'text-accent text-glow' : 'text-foreground'
                }`}>
                  {trend.popularity}%
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Live data indicator */}
      <div className="mt-4 pt-3 border-t border-muted/30">
        <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
          <div className="w-2 h-2 bg-accent rounded-full animate-pulse" />
          Real-time fashion trend analysis
        </div>
      </div>
    </Card>
  );
};