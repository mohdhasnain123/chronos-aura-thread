import { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { User, Settings, Search, Bell, Menu } from "lucide-react";
import { CyberButton } from "@/components/ui/cyber-button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface MainLayoutProps {
  children: ReactNode;
}

export const MainLayout = ({ children }: MainLayoutProps) => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-background neural-grid">
      {/* Neural Header */}
      <header className="h-16 border-b border-primary/20 backdrop-blur-md bg-background/80 sticky top-0 z-50">
        <div className="h-full px-6 flex items-center justify-between">
          {/* Logo & Brand */}
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-accent p-0.5">
              <div className="w-full h-full rounded-lg bg-background flex items-center justify-center">
                <span className="font-orbitron font-bold text-lg kinetic-text">A</span>
              </div>
            </div>
            <div>
              <h1 className="font-orbitron font-bold text-xl kinetic-text">AuraThread</h1>
              <p className="text-xs text-muted-foreground">Chronos Apparel Navigator</p>
            </div>
          </div>

          {/* Central Navigation */}
          <nav className="hidden lg:flex items-center gap-6">
            <CyberButton variant="ghost" size="sm" onClick={() => navigate("/recommendations")}>
              Recommendations
            </CyberButton>
            <CyberButton variant="ghost" size="sm" onClick={() => navigate("/navigator")}>
              Navigator
            </CyberButton>
            <CyberButton variant="ghost" size="sm" onClick={() => navigate("/archive")}>
              Archive
            </CyberButton>
            <CyberButton variant="ghost" size="sm" onClick={() => navigate("/trends")}>
              Trends
            </CyberButton>
          </nav>

          {/* User Actions */}
          <div className="flex items-center gap-3">
            <div className="relative">
              <CyberButton variant="ghost" size="icon">
                <Bell className="w-4 h-4" />
              </CyberButton>
              <Badge className="absolute -top-1 -right-1 w-5 h-5 p-0 flex items-center justify-center bg-accent text-accent-foreground text-xs">
                3
              </Badge>
            </div>
            <CyberButton variant="ghost" size="icon">
              <Search className="w-4 h-4" />
            </CyberButton>
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-secondary to-accent p-0.5">
              <div className="w-full h-full rounded-full bg-background flex items-center justify-center">
                <User className="w-4 h-4 text-secondary" />
              </div>
            </div>
            <CyberButton variant="ghost" size="icon" className="lg:hidden">
              <Menu className="w-4 h-4" />
            </CyberButton>
          </div>
        </div>
      </header>

      {/* Main Content Area - Ultra-wide layout */}
      <main className="flex-1 p-6">
        <div className="max-w-[95vw] mx-auto">
          {/* Wide Grid Layout for 3.88:1 aspect ratio */}
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 h-[calc(100vh-8rem)]">
            {/* Left Sidebar - User Info & Quick Actions */}
            <div className="xl:col-span-2 space-y-4">
              <Card className="p-4 hologram">
                <div className="text-center space-y-3">
                  <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-primary to-secondary p-0.5">
                    <div className="w-full h-full rounded-full bg-background flex items-center justify-center">
                      <User className="w-8 h-8 text-primary" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-orbitron font-semibold kinetic-text">Alex Chen</h3>
                    <p className="text-sm text-muted-foreground">Neural ID: AX-2035-789</p>
                  </div>
                  <Badge variant="secondary" className="bg-accent/20 text-accent border-accent/30">
                    Premium Member
                  </Badge>
                </div>
                
                <div className="mt-4 pt-4 border-t border-muted/30 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">AuraThread Level</span>
                    <span className="font-orbitron text-accent">7</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Total Purchases</span>
                    <span className="font-orbitron text-primary">47</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Credits</span>
                    <span className="font-orbitron text-secondary">2,450</span>
                  </div>
                </div>
              </Card>

              {/* Quick Actions */}
              <Card className="p-4 hologram">
                <h3 className="font-medium mb-3 kinetic-text">Quick Actions</h3>
                <div className="space-y-2">
                  <CyberButton variant="outline" size="sm" className="w-full justify-start">
                    Virtual Fitting
                  </CyberButton>
                  <CyberButton variant="outline" size="sm" className="w-full justify-start">
                    Style Analyzer
                  </CyberButton>
                  <CyberButton variant="outline" size="sm" className="w-full justify-start">
                    Trend Forecast
                  </CyberButton>
                </div>
              </Card>
            </div>

            {/* Central Content Area */}
            <div className="xl:col-span-8">
              {children}
            </div>

            {/* Right Sidebar - Contextual Data */}
            <div className="xl:col-span-2 space-y-4">
              {/* Neural Activity Monitor */}
              <Card className="p-4 hologram">
                <h3 className="font-medium mb-3 kinetic-text flex items-center gap-2">
                  <div className="w-2 h-2 bg-accent rounded-full animate-pulse" />
                  Neural Activity
                </h3>
                <div className="space-y-3">
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Style Preference</span>
                      <span className="text-accent">94%</span>
                    </div>
                    <div className="w-full bg-muted/30 rounded-full h-2">
                      <div className="w-[94%] h-full bg-accent rounded-full neural-pulse" />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Trend Alignment</span>
                      <span className="text-primary">87%</span>
                    </div>
                    <div className="w-full bg-muted/30 rounded-full h-2">
                      <div className="w-[87%] h-full bg-primary rounded-full" />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Budget Optimization</span>
                      <span className="text-secondary">91%</span>
                    </div>
                    <div className="w-full bg-muted/30 rounded-full h-2">
                      <div className="w-[91%] h-full bg-secondary rounded-full" />
                    </div>
                  </div>
                </div>
              </Card>

              {/* Recent Activity */}
              <Card className="p-4 hologram flex-1">
                <h3 className="font-medium mb-3 kinetic-text">Recent Activity</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-accent rounded-full" />
                    <div className="flex-1">
                      <p className="text-foreground">Visited NeuraFit</p>
                      <p className="text-muted-foreground text-xs">2 minutes ago</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full" />
                    <div className="flex-1">
                      <p className="text-foreground">Purchase completed</p>
                      <p className="text-muted-foreground text-xs">1 hour ago</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-secondary rounded-full" />
                    <div className="flex-1">
                      <p className="text-foreground">Style analysis updated</p>
                      <p className="text-muted-foreground text-xs">3 hours ago</p>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};