import { BarChart3, Brain, Network, DollarSign, TrendingUp } from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

const items = [
  { title: "Payer Mix Analytics", url: "/payer-mix", icon: DollarSign },
  { title: "Recovery Rate Analysis", url: "/recovery-rate", icon: TrendingUp },
  { title: "IoMT Device Network", url: "/iomt-network", icon: Network },
  { title: "AI Agent Matrix", url: "/ai-agent-matrix", icon: Brain },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;

  const isActive = (path: string) => currentPath === path;
  const isExpanded = items.some((i) => isActive(i.url));

  return (
    <Sidebar className={state === "collapsed" ? "w-14" : "w-60"} collapsible="offcanvas">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Analytics</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                     <NavLink 
                      to={item.url} 
                      className={({ isActive }) => 
                        isActive 
                          ? "bg-gradient-primary text-white font-medium border-r-2 border-white shadow-glow" 
                          : "hover:bg-gradient-card/50 text-muted-foreground hover:text-foreground transition-all duration-300"
                      }
                    >
                      <item.icon className="h-4 w-4" />
                      {state !== "collapsed" && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}