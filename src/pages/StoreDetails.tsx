import { useParams, useNavigate } from "react-router-dom";
import { MainLayout } from "@/components/MainLayout";
import { CyberButton } from "@/components/ui/cyber-button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, MapPin, Eye, ShoppingBag, Clock, Zap, ArrowLeft } from "lucide-react";
import storesData from "@/data/stores.json";

const StoreDetails = () => {
  const { storeId } = useParams();
  const navigate = useNavigate();
  
  const store = storesData.find(s => s.id === storeId);

  if (!store) {
    return (
      <MainLayout>
        <div className="flex items-center justify-center h-full">
          <Card className="p-8 text-center hologram">
            <h2 className="text-2xl font-orbitron font-bold mb-4 kinetic-text">
              Store Not Found
            </h2>
            <p className="text-muted-foreground mb-4">
              The requested store could not be located in the AuraThread database.
            </p>
            <CyberButton variant="cyber" onClick={() => navigate("/recommendations")}>
              Browse All Stores
            </CyberButton>
          </Card>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="space-y-6 h-full">
        {/* Header */}
        <div className="flex items-center gap-4">
          <CyberButton 
            variant="outline" 
            size="icon"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="w-4 h-4" />
          </CyberButton>
          <div className="flex-1">
            <h1 className="text-4xl font-orbitron font-bold kinetic-text">
              {store.name}
            </h1>
            <p className="text-xl text-muted-foreground">{store.tagline}</p>
          </div>
          {store.trending && (
            <Badge variant="secondary" className="bg-accent/20 text-accent border-accent/30">
              <Zap className="w-3 h-3 mr-1" />
              Trending
            </Badge>
          )}
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="xl:col-span-2 space-y-6">
            {/* Store Overview */}
            <Card className="p-6 hologram">
              <div className="flex items-center gap-6 mb-6">
                <div className="w-24 h-24 rounded-xl bg-gradient-to-br from-primary to-accent p-1">
                  <div className="w-full h-full rounded-xl bg-card flex items-center justify-center">
                    <Zap className="w-12 h-12 text-primary" />
                  </div>
                </div>
                
                <div className="flex-1">
                  <h2 className="text-2xl font-orbitron font-bold kinetic-text mb-2">
                    Store Overview
                  </h2>
                  <p className="text-muted-foreground mb-4">{store.description}</p>
                  
                  <div className="flex gap-4">
                    <div className="text-center">
                      <div className="text-3xl font-orbitron font-bold text-accent">
                        {store.auraScore}
                      </div>
                      <div className="text-sm text-muted-foreground">AuraScore</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-orbitron font-bold text-primary">
                        {store.matchScore}%
                      </div>
                      <div className="text-sm text-muted-foreground">Match</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-orbitron font-bold text-secondary">
                        {store.featuredItems.length}
                      </div>
                      <div className="text-sm text-muted-foreground">Items</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Specialties */}
              <div className="mb-6">
                <h3 className="text-lg font-orbitron font-semibold mb-3 kinetic-text">
                  Specialties
                </h3>
                <div className="flex flex-wrap gap-2">
                  {store.specialties.map((specialty, index) => (
                    <Badge 
                      key={index}
                      variant="outline" 
                      className="border-primary/30 hover:border-primary/50 data-stream"
                    >
                      {specialty}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <CyberButton 
                  variant="cyber" 
                  onClick={() => navigate(`/navigator?storeId=${store.id}`)}
                >
                  <MapPin className="w-4 h-4 mr-2" />
                  Navigate to Store
                </CyberButton>
                <CyberButton variant="hologram">
                  <Eye className="w-4 h-4 mr-2" />
                  Virtual Tour
                </CyberButton>
                <CyberButton variant="outline">
                  <ShoppingBag className="w-4 h-4 mr-2" />
                  Browse Catalog
                </CyberButton>
              </div>
            </Card>

            {/* Featured Items */}
            <Card className="p-6 hologram">
              <h3 className="text-xl font-orbitron font-semibold mb-4 kinetic-text">
                Featured Collection
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {store.featuredItems.map((item) => (
                  <div key={item.id} className="p-4 rounded-lg bg-surface/30 hover:bg-surface/50 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                        <Star className="w-8 h-8 text-accent" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-orbitron font-semibold">{item.name}</h4>
                        <p className="text-2xl font-orbitron font-bold text-primary">{item.price}¤</p>
                        <Badge variant={item.inStock ? "secondary" : "destructive"} className="mt-1">
                          {item.inStock ? "In Stock" : "Out of Stock"}
                        </Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Reviews */}
            <Card className="p-6 hologram">
              <h3 className="text-xl font-orbitron font-semibold mb-4 kinetic-text">
                Community Reviews
              </h3>
              <div className="space-y-4">
                {store.reviews.map((review, index) => (
                  <div key={index} className="p-4 rounded-lg bg-surface/30">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-secondary to-accent flex items-center justify-center">
                        <span className="text-sm font-orbitron font-bold">
                          {review.user[0]}
                        </span>
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">{review.user}</p>
                        <div className="flex items-center gap-1">
                          {[...Array(review.rating)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 text-accent fill-accent" />
                          ))}
                        </div>
                      </div>
                    </div>
                    <p className="text-muted-foreground">{review.text}</p>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Store Info */}
            <Card className="p-4 hologram">
              <h3 className="font-medium mb-3 kinetic-text">Store Information</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Category</span>
                  <Badge variant="outline" className="capitalize">
                    {store.category}
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Location</span>
                  <span className="font-orbitron text-primary">
                    {store.locationCoords.x.toFixed(2)}, {store.locationCoords.y.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Altitude</span>
                  <span className="font-orbitron text-accent">
                    {store.locationCoords.z}m
                  </span>
                </div>
              </div>
            </Card>

            {/* Promotions */}
            {store.promotions.length > 0 && (
              <Card className="p-4 hologram">
                <h3 className="font-medium mb-3 kinetic-text flex items-center gap-2">
                  <Clock className="w-4 h-4 text-accent" />
                  Active Promotions
                </h3>
                <div className="space-y-2">
                  {store.promotions.map((promotion, index) => (
                    <div key={index} className="p-3 rounded-lg bg-accent/10 border border-accent/30">
                      <p className="text-sm text-accent">{promotion}</p>
                    </div>
                  ))}
                </div>
              </Card>
            )}

            {/* Quick Actions */}
            <Card className="p-4 hologram">
              <h3 className="font-medium mb-3 kinetic-text">Quick Actions</h3>
              <div className="space-y-2">
                <CyberButton variant="neural" size="sm" className="w-full justify-start">
                  <Star className="w-4 h-4 mr-2" />
                  Add to Favorites
                </CyberButton>
                <CyberButton variant="outline" size="sm" className="w-full justify-start">
                  <Clock className="w-4 h-4 mr-2" />
                  Schedule Visit
                </CyberButton>
                <CyberButton variant="outline" size="sm" className="w-full justify-start">
                  <ShoppingBag className="w-4 h-4 mr-2" />
                  Create Wishlist
                </CyberButton>
              </div>
            </Card>

            {/* Related Stores */}
            <Card className="p-4 hologram">
              <h3 className="font-medium mb-3 kinetic-text">Similar Stores</h3>
              <div className="space-y-2">
                {storesData
                  .filter(s => s.id !== store.id && s.category === store.category)
                  .slice(0, 3)
                  .map((similarStore) => (
                    <div 
                      key={similarStore.id}
                      className="p-2 rounded-lg bg-surface/30 hover:bg-surface/50 transition-colors cursor-pointer"
                      onClick={() => navigate(`/store/${similarStore.id}`)}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                          <Zap className="w-4 h-4 text-primary" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium">{similarStore.name}</p>
                          <p className="text-xs text-muted-foreground">{similarStore.auraScore} AuraScore</p>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default StoreDetails;