import { useState } from "react";
import { MainLayout } from "@/components/MainLayout";
import { CyberButton } from "@/components/ui/cyber-button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Calendar, Search, Star, ShoppingBag, Clock, Filter } from "lucide-react";
import purchasesData from "@/data/purchases.json";

const Archive = () => {
  const [purchases] = useState(purchasesData);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = ["all", "outerwear", "footwear", "accessories", "tops", "bottoms"];

  const filteredPurchases = purchases.filter(purchase => {
    const matchesSearch = purchase.itemName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         purchase.storeName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || purchase.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const totalSpent = purchases.reduce((sum, purchase) => sum + purchase.price, 0);
  const averageRating = purchases.reduce((sum, purchase) => sum + purchase.rating, 0) / purchases.length;

  return (
    <MainLayout>
      <div className="space-y-6 h-full">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-orbitron font-bold kinetic-text">
              Chronos Archive
            </h1>
            <p className="text-xl text-muted-foreground">
              Your complete purchase history and style evolution timeline
            </p>
          </div>
          <Badge variant="secondary" className="bg-accent/20 text-accent border-accent/30">
            <ShoppingBag className="w-3 h-3 mr-1" />
            {purchases.length} Total Purchases
          </Badge>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="p-4 hologram">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/20">
                <ShoppingBag className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Spent</p>
                <p className="text-2xl font-orbitron font-bold text-primary">{totalSpent}¤</p>
              </div>
            </div>
          </Card>
          
          <Card className="p-4 hologram">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-accent/20">
                <Star className="w-5 h-5 text-accent" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Avg Rating</p>
                <p className="text-2xl font-orbitron font-bold text-accent">{averageRating.toFixed(1)}</p>
              </div>
            </div>
          </Card>
          
          <Card className="p-4 hologram">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-secondary/20">
                <Calendar className="w-5 h-5 text-secondary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">This Year</p>
                <p className="text-2xl font-orbitron font-bold text-secondary">{purchases.length}</p>
              </div>
            </div>
          </Card>
          
          <Card className="p-4 hologram">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-neural-pulse/20">
                <Clock className="w-5 h-5 text-neural-pulse" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Avg per Month</p>
                <p className="text-2xl font-orbitron font-bold text-neural-pulse">{Math.round(purchases.length / 12)}</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Search and Filters */}
        <Card className="p-6 hologram">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search purchases by item or store..."
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
            
            <CyberButton variant="outline" size="sm">
              <Filter className="w-4 h-4 mr-1" />
              Date Range
            </CyberButton>
          </div>
        </Card>

        {/* Purchase Timeline */}
        <Card className="p-6 hologram">
          <h2 className="text-2xl font-orbitron font-semibold mb-6 kinetic-text">
            Purchase Timeline
          </h2>
          
          <div className="space-y-4">
            {filteredPurchases.map((purchase) => (
              <div key={purchase.id} className="flex items-center gap-6 p-4 rounded-lg bg-surface/30 hover:bg-surface/50 transition-colors">
                {/* Date */}
                <div className="text-center min-w-[80px]">
                  <div className="text-lg font-orbitron font-bold text-primary">
                    {new Date(purchase.date).getDate()}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {new Date(purchase.date).toLocaleDateString('en-US', { month: 'short' })}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {new Date(purchase.date).getFullYear()}
                  </div>
                </div>

                {/* Item Image Placeholder */}
                <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                  <ShoppingBag className="w-8 h-8 text-primary" />
                </div>

                {/* Purchase Details */}
                <div className="flex-1">
                  <h3 className="font-orbitron font-semibold text-lg">{purchase.itemName}</h3>
                  <p className="text-muted-foreground">{purchase.storeName}</p>
                  <div className="flex items-center gap-4 mt-2">
                    <Badge variant="outline" className="capitalize">
                      {purchase.category}
                    </Badge>
                    <div className="flex items-center gap-1">
                      {[...Array(purchase.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-accent fill-accent" />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Price */}
                <div className="text-right">
                  <div className="text-2xl font-orbitron font-bold text-accent">
                    {purchase.price}¤
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {new Date(purchase.date).toLocaleDateString()}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col gap-2">
                  <CyberButton variant="outline" size="sm">
                    View Details
                  </CyberButton>
                  <CyberButton variant="ghost" size="sm">
                    Re-order
                  </CyberButton>
                </div>
              </div>
            ))}
          </div>

          {filteredPurchases.length === 0 && (
            <div className="text-center py-12">
              <ShoppingBag className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-xl font-orbitron font-semibold mb-2 kinetic-text">
                No Purchases Found
              </h3>
              <p className="text-muted-foreground mb-4">
                Try adjusting your search or filters to find your purchase history
              </p>
              <CyberButton variant="cyber" onClick={() => {
                setSearchTerm("");
                setSelectedCategory("all");
              }}>
                Reset Filters
              </CyberButton>
            </div>
          )}
        </Card>
      </div>
    </MainLayout>
  );
};

export default Archive;