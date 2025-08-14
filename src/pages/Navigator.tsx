import { useState, useEffect, useRef } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { MainLayout } from "@/components/MainLayout";
import { CyberButton } from "@/components/ui/cyber-button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Navigation, Eye, Clock, Zap, Star } from "lucide-react";
import storesData from "@/data/stores.json";
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

const Navigator = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [selectedStoreId, setSelectedStoreId] = useState<string | null>(
    searchParams.get('storeId')
  );
  const [isNavigating, setIsNavigating] = useState(false);
  const [mapboxToken, setMapboxToken] = useState("");

  // Find selected store
  const selectedStore = selectedStoreId 
    ? storesData.find(store => store.id === selectedStoreId)
    : null;

  useEffect(() => {
    if (!mapContainer.current || !mapboxToken) return;

    // Initialize map
    mapboxgl.accessToken = mapboxToken;
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/dark-v11',
      center: [-71.0589, 42.3601], // Boston coordinates
      zoom: 12,
      pitch: 45,
    });

    // Add navigation controls
    map.current.addControl(
      new mapboxgl.NavigationControl({
        visualizePitch: true,
      }),
      'top-right'
    );

    // Add store markers
    storesData.forEach((store) => {
      const el = document.createElement('div');
      el.className = 'w-8 h-8 bg-primary rounded-full border-2 border-accent cursor-pointer flex items-center justify-center';
      el.innerHTML = '<div class="w-4 h-4 bg-accent rounded-full animate-pulse"></div>';
      
      el.addEventListener('click', () => {
        setSelectedStoreId(store.id);
      });

      new mapboxgl.Marker(el)
        .setLngLat([store.locationCoords.y, store.locationCoords.x])
        .addTo(map.current!);

      // Add popup for store info
      const popup = new mapboxgl.Popup({ offset: 25 })
        .setHTML(`
          <div class="p-2 bg-background rounded-lg border border-primary/30">
            <h3 class="font-orbitron font-semibold text-primary">${store.name}</h3>
            <p class="text-sm text-muted-foreground">${store.tagline}</p>
            <div class="flex items-center gap-1 mt-1">
              <span class="text-xs text-accent">AuraScore: ${store.auraScore}</span>
            </div>
          </div>
        `);

      new mapboxgl.Marker(el)
        .setLngLat([store.locationCoords.y, store.locationCoords.x])
        .setPopup(popup)
        .addTo(map.current!);
    });

    // Cleanup
    return () => {
      map.current?.remove();
    };
  }, [mapboxToken]);

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

  if (!mapboxToken) {
    return (
      <MainLayout>
        <div className="flex items-center justify-center h-full">
          <Card className="p-8 max-w-md hologram text-center">
            <h2 className="text-2xl font-orbitron font-bold mb-4 kinetic-text">
              AuraGrid Navigator
            </h2>
            <p className="text-muted-foreground mb-4">
              Enter your Mapbox public token to access the neural navigation system
            </p>
            <input
              type="text"
              placeholder="pk.eyJ1IjoieW91cnVzZXJuYW1lIiwi..."
              className="w-full p-3 bg-surface/50 border border-primary/30 rounded-md mb-4 text-sm"
              onChange={(e) => setMapboxToken(e.target.value)}
            />
            <p className="text-xs text-muted-foreground">
              Get your token from{" "}
              <a 
                href="https://mapbox.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-accent hover:underline"
              >
                mapbox.com
              </a>
            </p>
          </Card>
        </div>
      </MainLayout>
    );
  }

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
            <div ref={mapContainer} className="h-[calc(100%-4rem)]" />
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
              <CyberButton variant="neural" size="sm" className="w-full justify-start">
                <Clock className="w-4 h-4 mr-2" />
                Recent Routes
              </CyberButton>
              <CyberButton variant="outline" size="sm" className="w-full justify-start">
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