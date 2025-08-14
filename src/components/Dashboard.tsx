import { useState, useEffect } from "react";
import { StoreCard } from "@/components/StoreCard";
import { AuraPulse } from "@/components/AuraPulse";
import { HeroSection } from "@/components/HeroSection";
import { CyberButton } from "@/components/ui/cyber-button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BarChart3, ShoppingBag, Clock, TrendingUp, Zap, MapPin, Star } from "lucide-react";
import storesData from "@/data/stores.json";
import purchasesData from "@/data/purchases.json";

export const Dashboard = () => {
  const [recommendedStores, setRecommendedStores] = useState(storesData.slice(0, 3));
  const [recentPurchases] = useState(purchasesData.slice(0, 3));
  const [timeOfDay, setTimeOfDay] = useState("morning");

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setTimeOfDay("morning");
    else if (hour < 18) setTimeOfDay("afternoon");
    else setTimeOfDay("evening");
  }, []);

  const handleNavigateToStore = (storeId: string) => {
    console.log(`Navigating to store: ${storeId}`);
    // Here you would integrate with the navigation system
  };

  const handleViewStoreDetails = (storeId: string) => {
    console.log(`Viewing details for store: ${storeId}`);
    // Here you would route to store details page
  };

  const totalSpent = recentPurchases.reduce((sum, purchase) => sum + purchase.price, 0);
  const avgSpent = Math.round(totalSpent / recentPurchases.length);

  return (
    <div className="space-y-6 h-full">
      {/* Hero Section */}
      <HeroSection />
      
      {/* Welcome Header */}
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-orbitron font-bold kinetic-text">
          Good {timeOfDay}, Alex
        </h1>
        <p className="text-xl text-muted-foreground">
          Your AuraThread is ready. <span className="text-accent">3 new recommendations</span> await.
        </p>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100%-8rem)]">
        
        {/* Left Column - Recommendations */}
        <div className="lg:col-span-2 space-y-6">
          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="p-4 hologram">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-accent/20">
                  <ShoppingBag className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Last 30 Days</p>
                  <p className="text-2xl font-orbitron font-bold text-accent">5 purchases</p>
                </div>
              </div>
            </Card>
            
            <Card className="p-4 hologram">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/20">
                  <BarChart3 className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Avg. Spend</p>
                  <p className="text-2xl font-orbitron font-bold text-primary">{avgSpent}¤</p>
                </div>
              </div>
            </Card>
            
            <Card className="p-4 hologram">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-secondary/20">
                  <TrendingUp className="w-5 h-5 text-secondary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Match Rate</p>
                  <p className="text-2xl font-orbitron font-bold text-secondary">92%</p>
                </div>
              </div>
            </Card>
          </div>

          {/* Top Recommendations */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-orbitron font-semibold kinetic-text">
                Neural Recommendations
              </h2>
              <Badge variant="secondary" className="bg-neural-pulse/20 text-neural-pulse border-neural-pulse/30">
                <Zap className="w-3 h-3 mr-1" />
                AI Enhanced
              </Badge>
            </div>
            
            <div className="grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-4">
              {recommendedStores.map((store) => (
                <StoreCard
                  key={store.id}
                  store={store}
                  onNavigate={handleNavigateToStore}
                  onViewDetails={handleViewStoreDetails}
                />
              ))}
            </div>
          </div>

          {/* Purchase History Snapshot */}
          <Card className="p-6 hologram">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-orbitron font-semibold kinetic-text">
                Recent Acquisitions
              </h3>
              <CyberButton variant="outline" size="sm">
                <Clock className="w-4 h-4 mr-1" />
                View Archive
              </CyberButton>
            </div>
            
            <div className="space-y-3">
              {recentPurchases.map((purchase) => (
                <div key={purchase.id} className="flex items-center gap-4 p-3 rounded-lg bg-surface/50 hover:bg-surface transition-colors">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                    <ShoppingBag className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-foreground">{purchase.itemName}</h4>
                    <p className="text-sm text-muted-foreground">{purchase.storeName}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs text-muted-foreground">
                        {new Date(purchase.date).toLocaleDateString()}
                      </span>
                      <div className="flex items-center gap-1">
                        {[...Array(purchase.rating)].map((_, i) => (
                          <Star key={i} className="w-3 h-3 text-accent fill-accent" />
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-orbitron font-semibold text-primary">{purchase.price}¤</p>
                    <Badge variant="outline" className="text-xs">
                      {purchase.category}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Right Column - AuraPulse */}
        <div className="space-y-6">
          <AuraPulse />
          
          {/* Navigation Quick Access */}
          <Card className="p-4 hologram">
            <h3 className="font-medium mb-3 kinetic-text flex items-center gap-2">
              <MapPin className="w-4 h-4 text-accent" />
              AuraGrid Navigator
            </h3>
            <div className="space-y-2">
              <CyberButton variant="neural" size="sm" className="w-full justify-start">
                Nearby Stores
              </CyberButton>
              <CyberButton variant="hologram" size="sm" className="w-full justify-start">
                Virtual Tours
              </CyberButton>
              <CyberButton variant="outline" size="sm" className="w-full justify-start">
                Route Planner
              </CyberButton>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};