import { useState } from "react";
import { MainLayout } from "@/components/MainLayout";
import { StoreCard } from "@/components/StoreCard";
import { CyberButton } from "@/components/ui/cyber-button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search, Filter, SortDesc, Zap } from "lucide-react";
import storesData from "@/data/stores.json";
import { useNavigate } from "react-router-dom";

const Recommendations = () => {
  const [stores, setStores] = useState(storesData);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const navigate = useNavigate();

  const categories = ["all", "premium", "vintage", "streetwear", "luxury"];

  const filteredStores = stores.filter(store => {
    const matchesSearch = store.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         store.specialties.some(spec => spec.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === "all" || store.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleNavigateToStore = (storeId: string) => {
    navigate(`/navigator?storeId=${storeId}`);
  };

  const handleViewStoreDetails = (storeId: string) => {
    navigate(`/store/${storeId}`);
  };

  return (
    <MainLayout>
      <div className="space-y-6 h-full">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-orbitron font-bold kinetic-text">
              Neural Recommendations
            </h1>
            <p className="text-xl text-muted-foreground">
              AI-powered apparel store suggestions tailored to your AuraThread
            </p>
          </div>
          <Badge variant="secondary" className="bg-accent/20 text-accent border-accent/30">
            <Zap className="w-3 h-3 mr-1" />
            {filteredStores.length} Matches Found
          </Badge>
        </div>

        {/* Search and Filters */}
        <Card className="p-6 hologram">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search stores, specialties, or brands..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-surface/50 border-primary/30 focus:border-primary"
              />
            </div>
            
            {/* Category Filter */}
            <div className="flex gap-2">
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
            
            {/* Sort Options */}
            <CyberButton variant="outline" size="sm">
              <SortDesc className="w-4 h-4 mr-1" />
              Sort
            </CyberButton>
            
            <CyberButton variant="outline" size="sm">
              <Filter className="w-4 h-4 mr-1" />
              Filters
            </CyberButton>
          </div>
        </Card>

        {/* Store Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
          {filteredStores.map((store) => (
            <StoreCard
              key={store.id}
              store={store}
              onNavigate={handleNavigateToStore}
              onViewDetails={handleViewStoreDetails}
            />
          ))}
        </div>

        {filteredStores.length === 0 && (
          <Card className="p-12 text-center hologram">
            <h3 className="text-2xl font-orbitron font-semibold mb-2 kinetic-text">
              No Matches Found
            </h3>
            <p className="text-muted-foreground mb-4">
              Try adjusting your search or filters to discover new stores
            </p>
            <CyberButton variant="cyber" onClick={() => {
              setSearchTerm("");
              setSelectedCategory("all");
            }}>
              Reset Filters
            </CyberButton>
          </Card>
        )}
      </div>
    </MainLayout>
  );
};

export default Recommendations;