import { useState } from "react";
import { CyberButton } from "@/components/ui/cyber-button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Star, MapPin, TrendingUp, Zap } from "lucide-react";

interface Store {
  id: string;
  name: string;
  tagline: string;
  logoUrl: string;
  auraScore: number;
  matchScore: number;
  specialties: string[];
  trending: boolean;
  category: string;
  featuredItems: Array<{
    name: string;
    price: number;
    thumbnail: string;
    inStock: boolean;
  }>;
  promotions: string[];
}

interface StoreCardProps {
  store: Store;
  onNavigate: (storeId: string) => void;
  onViewDetails: (storeId: string) => void;
}

export const StoreCard = ({ store, onNavigate, onViewDetails }: StoreCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Card 
      className="group relative w-80 h-96 hologram hover-hologram transition-all duration-500 cursor-pointer overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onViewDetails(store.id)}
    >
      {/* Holographic scan line */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-2000" />
      
      {/* Header */}
      <div className="p-4 border-b border-primary/20">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary to-accent p-0.5">
              <div className="w-full h-full rounded-lg bg-card flex items-center justify-center">
                <Zap className="w-6 h-6 text-primary" />
              </div>
            </div>
            <div>
              <h3 className="font-orbitron font-semibold text-lg kinetic-text">{store.name}</h3>
              <p className="text-sm text-muted-foreground">{store.tagline}</p>
            </div>
          </div>
          {store.trending && (
            <Badge variant="secondary" className="bg-accent/20 text-accent border-accent/30">
              <TrendingUp className="w-3 h-3 mr-1" />
              Trending
            </Badge>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-4">
        {/* Scores */}
        <div className="flex justify-between items-center">
          <div className="text-center">
            <div className="text-2xl font-orbitron font-bold text-primary neural-pulse">
              {store.matchScore}%
            </div>
            <div className="text-xs text-muted-foreground">Match</div>
          </div>
          <div className="text-center">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 text-accent fill-accent" />
              <span className="text-lg font-orbitron font-semibold text-accent">
                {store.auraScore}
              </span>
            </div>
            <div className="text-xs text-muted-foreground">AuraScore</div>
          </div>
        </div>

        {/* Specialties */}
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-foreground">Specialties</h4>
          <div className="flex flex-wrap gap-1">
            {store.specialties.slice(0, 3).map((specialty, index) => (
              <Badge 
                key={index}
                variant="outline" 
                className="text-xs border-primary/30 hover:border-primary/50 data-stream"
              >
                {specialty}
              </Badge>
            ))}
          </div>
        </div>

        {/* Promotions */}
        {store.promotions.length > 0 && (
          <div className="space-y-1">
            <h4 className="text-sm font-medium text-accent">Active Promotions</h4>
            <p className="text-xs text-muted-foreground line-clamp-2">
              {store.promotions[0]}
            </p>
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="absolute bottom-4 left-4 right-4 flex gap-2">
        <CyberButton 
          variant="cyber" 
          size="sm" 
          className="flex-1"
          onClick={(e) => {
            e.stopPropagation();
            onNavigate(store.id);
          }}
        >
          <MapPin className="w-4 h-4 mr-1" />
          Navigate
        </CyberButton>
        <CyberButton 
          variant="hologram" 
          size="sm"
          onClick={(e) => {
            e.stopPropagation();
            onViewDetails(store.id);
          }}
        >
          View Details
        </CyberButton>
      </div>

      {/* Animated corner accents */}
      <div className="absolute top-0 left-0 w-6 h-6 border-l-2 border-t-2 border-primary opacity-30 group-hover:opacity-100 transition-opacity" />
      <div className="absolute top-0 right-0 w-6 h-6 border-r-2 border-t-2 border-primary opacity-30 group-hover:opacity-100 transition-opacity" />
      <div className="absolute bottom-0 left-0 w-6 h-6 border-l-2 border-b-2 border-primary opacity-30 group-hover:opacity-100 transition-opacity" />
      <div className="absolute bottom-0 right-0 w-6 h-6 border-r-2 border-b-2 border-primary opacity-30 group-hover:opacity-100 transition-opacity" />
    </Card>
  );
};