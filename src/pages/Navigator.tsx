import { useState, useEffect, useRef } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { MainLayout } from "@/components/MainLayout";
import { CyberButton } from "@/components/ui/cyber-button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Navigation, Eye, Clock, Zap, Star } from "lucide-react";
import storesData from "@/data/stores.json";

const Navigator = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [selectedStoreId, setSelectedStoreId] = useState<string | null>(
    searchParams.get('storeId')
  );
  const [isNavigating, setIsNavigating] = useState(false);

  // Find selected store
  const selectedStore = selectedStoreId 
    ? storesData.find(store => store.id === selectedStoreId)
    : null;

  // Dummy map visualization with store locations
  const [mapCenter, setMapCenter] = useState({ x: 50, y: 50 });
  const [mapZoom, setMapZoom] = useState(1);

  useEffect(() => {
    // Simulate store data loading
    if (selectedStoreId) {
      const store = storesData.find(s => s.id === selectedStoreId);
      if (store) {
        setMapCenter({ 
          x: store.locationCoords.x * 10, 
          y: store.locationCoords.y * 10 
        });
        setMapZoom(1.5);
      }
    }
  }, [selectedStoreId]);

  const handleNavigateToStore = () => {
    if (!selectedStore) return;
    
    setIsNavigating(true);
    
    // Simulate navigation
    setTimeout(() => {
      setIsNavigating(false);
      // Here you would integrate with actual navigation system
      alert(`Navigation started to ${selectedStore.name}!`);
    }, 2000);
  };

  const handleVirtualTour = () => {
    if (!selectedStore) return;
    alert(`Starting virtual tour of ${selectedStore.name}!`);
  };


  return (
    <MainLayout>
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 h-full">
        {/* Map Container */}
        <div className="xl:col-span-2">
          <Card className="p-0 h-full hologram overflow-hidden">
            <div className="p-4 border-b border-primary/20 bg-surface/30">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-orbitron font-semibold kinetic-text">
                  AuraGrid Navigator
                </h2>
                <Badge variant="secondary" className="bg-accent/20 text-accent">
                  <MapPin className="w-3 h-3 mr-1" />
                  {storesData.length} Stores Mapped
                </Badge>
              </div>
            </div>
            {/* Dummy Interactive Map */}
            <div className="h-[calc(100%-4rem)] relative bg-gradient-to-br from-surface/30 to-background/50 overflow-hidden">
              {/* Neural Grid Background */}
              <div className="absolute inset-0 bg-neural-grid opacity-20" />
              
              {/* Map Surface with improved visibility */}
              <div 
                className="relative w-full h-full transition-transform duration-700 ease-out bg-gradient-to-br from-primary/10 to-accent/10"
                style={{ 
                  transform: `translate(${-mapCenter.x}px, ${-mapCenter.y}px) scale(${mapZoom})`,
                }}
              >
                {/* Store Markers with better positioning */}
                {storesData.map((store, index) => {
                  const xPos = 10 + (index % 4) * 20 + (store.locationCoords.x * 0.5);
                  const yPos = 10 + Math.floor(index / 4) * 20 + (store.locationCoords.y * 0.3);
                  
                  return (
                    <div
                      key={store.id}
                      className={`absolute w-12 h-12 rounded-full border-2 cursor-pointer flex items-center justify-center transition-all duration-300 hover:scale-125 ${
                        selectedStoreId === store.id 
                          ? 'bg-accent border-accent shadow-lg cyber-glow animate-pulse' 
                          : 'bg-primary/80 border-accent hover:bg-accent hover:border-primary'
                      }`}
                      style={{
                        left: `${xPos}%`,
                        top: `${yPos}%`,
                      }}
                      onClick={() => setSelectedStoreId(store.id)}
                      title={store.name}
                    >
                      <div className="w-6 h-6 bg-accent rounded-full animate-pulse" />
                      
                      {/* Store label */}
                      <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-surface/90 backdrop-blur-sm px-2 py-1 rounded text-xs text-foreground whitespace-nowrap border border-primary/30">
                        {store.name}
                      </div>
                    </div>
                  );
                })}

                {/* Connection Lines between stores with better visibility */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none">
                  {storesData.map((store, index) => {
                    if (index === 0) return null;
                    const prevIndex = index - 1;
                    const prevXPos = 10 + (prevIndex % 4) * 20 + (storesData[prevIndex].locationCoords.x * 0.5);
                    const prevYPos = 10 + Math.floor(prevIndex / 4) * 20 + (storesData[prevIndex].locationCoords.y * 0.3);
                    const xPos = 10 + (index % 4) * 20 + (store.locationCoords.x * 0.5);
                    const yPos = 10 + Math.floor(index / 4) * 20 + (store.locationCoords.y * 0.3);
                    
                    return (
                      <line
                        key={`line-${store.id}`}
                        x1={`${prevXPos + 3}%`}
                        y1={`${prevYPos + 3}%`}
                        x2={`${xPos + 3}%`}
                        y2={`${yPos + 3}%`}
                        stroke="hsl(var(--accent))"
                        strokeWidth="2"
                        strokeOpacity="0.5"
                        strokeDasharray="8,4"
                        className="animate-pulse"
                      />
                    );
                  })}
                </svg>
              </div>

              {/* Map Controls */}
              <div className="absolute top-4 right-4 space-y-2">
                <button
                  onClick={() => setMapZoom(prev => Math.min(prev * 1.2, 3))}
                  className="w-10 h-10 bg-surface/80 backdrop-blur-sm border border-primary/30 rounded-lg flex items-center justify-center text-primary hover:bg-accent/20 transition-colors"
                >
                  +
                </button>
                <button
                  onClick={() => setMapZoom(prev => Math.max(prev / 1.2, 0.5))}
                  className="w-10 h-10 bg-surface/80 backdrop-blur-sm border border-primary/30 rounded-lg flex items-center justify-center text-primary hover:bg-accent/20 transition-colors"
                >
                  -
                </button>
                <button
                  onClick={() => {
                    setMapCenter({ x: 50, y: 50 });
                    setMapZoom(1);
                  }}
                  className="w-10 h-10 bg-surface/80 backdrop-blur-sm border border-primary/30 rounded-lg flex items-center justify-center text-primary hover:bg-accent/20 transition-colors text-xs"
                >
                  ⌂
                </button>
              </div>

              {/* Coordinate Display */}
              <div className="absolute bottom-4 left-4 bg-surface/80 backdrop-blur-sm border border-primary/30 rounded-lg px-3 py-2">
                <div className="text-xs text-muted-foreground">
                  Coordinates: {mapCenter.x.toFixed(1)}, {mapCenter.y.toFixed(1)} | Zoom: {mapZoom.toFixed(1)}x
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Store Details Panel */}
        <div className="space-y-6">
          {selectedStore ? (
            <>
              {/* Store Info */}
              <Card className="p-6 hologram">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary to-accent p-0.5">
                    <div className="w-full h-full rounded-lg bg-card flex items-center justify-center">
                      <Zap className="w-6 h-6 text-primary" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-orbitron font-semibold text-lg kinetic-text">
                      {selectedStore.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">{selectedStore.tagline}</p>
                  </div>
                </div>

                {/* Scores */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="text-center p-3 bg-surface/30 rounded-lg">
                    <div className="text-2xl font-orbitron font-bold text-accent">
                      {selectedStore.auraScore}
                    </div>
                    <div className="text-xs text-muted-foreground">AuraScore</div>
                  </div>
                  <div className="text-center p-3 bg-surface/30 rounded-lg">
                    <div className="text-2xl font-orbitron font-bold text-primary">
                      {selectedStore.matchScore}%
                    </div>
                    <div className="text-xs text-muted-foreground">Match</div>
                  </div>
                </div>

                {/* Specialties */}
                <div className="mb-4">
                  <h4 className="text-sm font-medium mb-2">Specialties</h4>
                  <div className="flex flex-wrap gap-1">
                    {selectedStore.specialties.map((specialty, index) => (
                      <Badge 
                        key={index}
                        variant="outline" 
                        className="text-xs border-primary/30"
                      >
                        {specialty}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="space-y-2">
                  <CyberButton 
                    variant="cyber" 
                    className="w-full"
                    onClick={handleNavigateToStore}
                    disabled={isNavigating}
                  >
                    {isNavigating ? (
                      <>
                        <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin mr-2" />
                        Calculating Route...
                      </>
                    ) : (
                      <>
                        <Navigation className="w-4 h-4 mr-2" />
                        Start Navigation
                      </>
                    )}
                  </CyberButton>
                  
                  <CyberButton 
                    variant="hologram" 
                    className="w-full"
                    onClick={handleVirtualTour}
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    Virtual Tour
                  </CyberButton>
                  
                  <CyberButton 
                    variant="outline" 
                    className="w-full"
                    onClick={() => navigate(`/store/${selectedStore.id}`)}
                  >
                    View Full Details
                  </CyberButton>
                </div>
              </Card>

              {/* Featured Items */}
              <Card className="p-4 hologram">
                <h3 className="font-medium mb-3 kinetic-text">Featured Items</h3>
                <div className="space-y-3">
                  {selectedStore.featuredItems.map((item) => (
                    <div key={item.id} className="flex items-center gap-3 p-2 rounded-lg bg-surface/30">
                      <div className="w-10 h-10 rounded bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                        <Star className="w-4 h-4 text-accent" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-sm font-medium">{item.name}</h4>
                        <p className="text-xs text-muted-foreground">{item.price}¤</p>
                      </div>
                      <Badge variant={item.inStock ? "secondary" : "destructive"} className="text-xs">
                        {item.inStock ? "In Stock" : "Out of Stock"}
                      </Badge>
                    </div>
                  ))}
                </div>
              </Card>
            </>
          ) : (
            <Card className="p-8 text-center hologram">
              <MapPin className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-lg font-orbitron font-semibold mb-2 kinetic-text">
                Select a Store
              </h3>
              <p className="text-muted-foreground text-sm">
                Click on any glowing marker on the map to view store details and start navigation
              </p>
            </Card>
          )}

          {/* Quick Actions */}
          <Card className="p-4 hologram">
            <h3 className="font-medium mb-3 kinetic-text">Quick Actions</h3>
            <div className="space-y-2">
              <CyberButton 
                variant="neural" 
                size="sm" 
                className="w-full justify-start"
                onClick={() => navigate("/archive")}
              >
                <Clock className="w-4 h-4 mr-2" />
                Recent Routes
              </CyberButton>
              <CyberButton 
                variant="outline" 
                size="sm" 
                className="w-full justify-start"
                onClick={() => navigate("/archive")}
              >
                <Star className="w-4 h-4 mr-2" />
                Saved Locations
              </CyberButton>
              <CyberButton 
                variant="outline" 
                size="sm" 
                className="w-full justify-start"
                onClick={() => navigate("/recommendations")}
              >
                <Zap className="w-4 h-4 mr-2" />
                Find More Stores
              </CyberButton>
            </div>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default Navigator;