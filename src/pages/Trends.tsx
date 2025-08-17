import { useState, useEffect } from "react";
import { MainLayout } from "@/components/MainLayout";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CyberButton } from "@/components/ui/cyber-button";
import { TrendingUp, TrendingDown, Activity, Zap, BarChart3, PieChart, Globe, Users } from "lucide-react";
import trendsData from "@/data/trends.json";

const Trends = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [timeframe, setTimeframe] = useState("24h");
  const [pulseIndex, setPulseIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPulseIndex((prev) => (prev + 1) % trendsData.currentTrends.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const categories = ["all", "fabrics", "accessories", "styles", "colors"];
  const timeframes = ["1h", "24h", "7d", "30d"];

  return (
    <MainLayout>
      <div className="space-y-6 h-full">
        {/* Header Section */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-3">
            <Activity className="w-8 h-8 text-accent neural-pulse" />
            <h1 className="text-4xl font-orbitron font-bold kinetic-text">
              Global Fashion Trends
            </h1>
            <Badge variant="secondary" className="bg-neural-pulse/20 text-neural-pulse border-neural-pulse/30 animate-pulse">
              LIVE DATA
            </Badge>
          </div>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Real-time analysis of global fashion trends powered by neural networks and 
            consumer behavior analytics across the AuraThread network.
          </p>
        </div>

        {/* Controls */}
        <div className="flex flex-wrap justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Category:</span>
            <div className="flex gap-1">
              {categories.map((category) => (
                <CyberButton
                  key={category}
                  variant={selectedCategory === category ? "cyber" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className="capitalize"
                >
                  {category}
                </CyberButton>
              ))}
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Timeframe:</span>
            <div className="flex gap-1">
              {timeframes.map((tf) => (
                <CyberButton
                  key={tf}
                  variant={timeframe === tf ? "neural" : "outline"}
                  size="sm"
                  onClick={() => setTimeframe(tf)}
                >
                  {tf}
                </CyberButton>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          
          {/* Live Trends Feed */}
          <div className="xl:col-span-2 space-y-6">
            
            {/* Current Trends */}
            <Card className="p-6 hologram">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-orbitron font-semibold kinetic-text">
                  Current Trends
                </h2>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-accent rounded-full animate-pulse" />
                  <span className="text-xs text-muted-foreground">Updated every 15s</span>
                </div>
              </div>

              <div className="grid gap-4">
                {trendsData.currentTrends.map((trend, index) => {
                  const isActive = index === pulseIndex;
                  const isRising = trend.change.startsWith('+');
                  
                  return (
                    <div 
                      key={trend.category}
                      className={`p-4 rounded-lg border transition-all duration-500 data-stream ${
                        isActive 
                          ? 'border-accent bg-accent/10 cyber-glow transform scale-105' 
                          : 'border-muted/30 bg-surface/50 hover:bg-surface/80'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <h3 className={`font-orbitron font-semibold text-lg ${
                          isActive ? 'text-accent kinetic-text' : 'text-foreground'
                        }`}>
                          {trend.category}
                        </h3>
                        <div className="flex items-center gap-2">
                          {isRising ? (
                            <TrendingUp className="w-5 h-5 text-success" />
                          ) : (
                            <TrendingDown className="w-5 h-5 text-destructive" />
                          )}
                          <span className={`text-lg font-orbitron font-bold ${
                            isRising ? 'text-success' : 'text-destructive'
                          }`}>
                            {trend.change}
                          </span>
                        </div>
                      </div>
                      
                      {/* Popularity bar */}
                      <div className="w-full bg-muted/30 rounded-full h-3 mb-3">
                        <div 
                          className={`h-full rounded-full transition-all duration-1000 ${
                            isActive ? 'bg-accent cyber-glow' : 'bg-primary'
                          }`}
                          style={{ 
                            width: `${trend.popularity}%`,
                            boxShadow: isActive ? '0 0 15px currentColor' : 'none'
                          }}
                        />
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Global Adoption</span>
                        <span className={`text-xl font-orbitron font-bold ${
                          isActive ? 'text-accent text-glow' : 'text-foreground'
                        }`}>
                          {trend.popularity}%
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </Card>

            {/* Emerging Colors */}
            <Card className="p-6 hologram">
              <h2 className="text-xl font-orbitron font-semibold mb-4 kinetic-text">
                Emerging Color Palette
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {trendsData.emergingColors.map((color, index) => (
                  <div key={color.name} className="group cursor-pointer">
                    <div 
                      className="w-full h-24 rounded-lg border-2 border-muted/30 group-hover:border-accent transition-all duration-300 mb-2 cyber-glow-hover"
                      style={{ backgroundColor: color.hex }}
                    />
                    <div className="text-center">
                      <h4 className="font-medium text-sm">{color.name}</h4>
                      <p className="text-xs text-muted-foreground">{color.hex}</p>
                      <Badge variant="outline" className="text-xs mt-1">
                        {color.usage}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Analytics Sidebar */}
          <div className="space-y-6">
            
            {/* Real-time Stats */}
            <Card className="p-4 hologram">
              <div className="flex items-center gap-2 mb-4">
                <BarChart3 className="w-5 h-5 text-primary" />
                <h3 className="font-orbitron font-semibold kinetic-text">Live Analytics</h3>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Globe className="w-4 h-4 text-accent" />
                    <span className="text-sm">Global Reach</span>
                  </div>
                  <span className="font-orbitron font-bold text-accent">847M</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-primary" />
                    <span className="text-sm">Active Users</span>
                  </div>
                  <span className="font-orbitron font-bold text-primary">2.3M</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-secondary" />
                    <span className="text-sm">Trend Updates</span>
                  </div>
                  <span className="font-orbitron font-bold text-secondary">15.7K/hr</span>
                </div>
              </div>
            </Card>

            {/* Price Range Distribution */}
            <Card className="p-4 hologram">
              <div className="flex items-center gap-2 mb-4">
                <PieChart className="w-5 h-5 text-accent" />
                <h3 className="font-orbitron font-semibold kinetic-text">Price Distribution</h3>
              </div>
              
              <div className="space-y-3">
                {Object.entries(trendsData.priceRanges).map(([key, data]) => (
                  <div key={key} className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span className="capitalize text-muted-foreground">{key}</span>
                      <span className="font-orbitron">{data.percentage}%</span>
                    </div>
                    <div className="w-full bg-muted/30 rounded-full h-2">
                      <div 
                        className="h-full bg-gradient-to-r from-primary to-accent rounded-full"
                        style={{ width: `${data.percentage}%` }}
                      />
                    </div>
                    <div className="text-xs text-muted-foreground">{data.range}¤</div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Trend Forecast */}
            <Card className="p-4 hologram">
              <h3 className="font-orbitron font-semibold mb-4 kinetic-text">
                7-Day Forecast
              </h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-3 p-2 rounded-lg bg-surface/50">
                  <TrendingUp className="w-4 h-4 text-success" />
                  <div>
                    <p className="font-medium">Sustainable Materials</p>
                    <p className="text-xs text-muted-foreground">Expected +23% growth</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 p-2 rounded-lg bg-surface/50">
                  <TrendingUp className="w-4 h-4 text-success" />
                  <div>
                    <p className="font-medium">AR Integration</p>
                    <p className="text-xs text-muted-foreground">Expected +18% growth</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 p-2 rounded-lg bg-surface/50">
                  <TrendingDown className="w-4 h-4 text-destructive" />
                  <div>
                    <p className="font-medium">Traditional Fabrics</p>
                    <p className="text-xs text-muted-foreground">Expected -8% decline</p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Trends;