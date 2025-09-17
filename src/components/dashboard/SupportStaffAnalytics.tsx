import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

const staffData = [
  { category: "ICU Nurses", available: 8, busy: 4, offline: 2 },
  { category: "General Nurses", available: 12, busy: 6, offline: 3 },
  { category: "Technicians", available: 6, busy: 2, offline: 1 },
  { category: "Pharmacists", available: 3, busy: 1, offline: 0 },
  { category: "Lab Staff", available: 5, busy: 3, offline: 1 },
  { category: "Admin Staff", available: 4, busy: 2, offline: 1 },
];

const overallStaffStatus = [
  { name: "Available", value: 38, percentage: 61.3, color: "hsl(var(--chart-1))" },
  { name: "Busy", value: 18, percentage: 29.0, color: "hsl(var(--chart-2))" },
  { name: "Offline", value: 6, percentage: 9.7, color: "hsl(var(--chart-3))" },
];

const chartConfig = {
  available: {
    label: "Available",
    color: "hsl(var(--chart-1))"
  },
  busy: {
    label: "Busy", 
    color: "hsl(var(--chart-2))"
  },
  offline: {
    label: "Offline",
    color: "hsl(var(--chart-3))"
  }
};

const SupportStaffAnalytics = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
      <Card className="bg-card/50 backdrop-blur-sm border-border/50">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-foreground">
            Support Staff by Category
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={staffData} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
                <XAxis 
                  dataKey="category" 
                  angle={-45}
                  textAnchor="end"
                  height={60}
                  fontSize={12}
                />
                <YAxis fontSize={12} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="available" stackId="a" fill="hsl(var(--chart-1))" />
                <Bar dataKey="busy" stackId="a" fill="hsl(var(--chart-2))" />
                <Bar dataKey="offline" stackId="a" fill="hsl(var(--chart-3))" />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
          <div className="flex justify-center gap-6 mt-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded bg-chart-1"></div>
              <span className="text-sm text-muted-foreground">Available</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded bg-chart-2"></div>
              <span className="text-sm text-muted-foreground">Busy</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded bg-chart-3"></div>
              <span className="text-sm text-muted-foreground">Offline</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-card/50 backdrop-blur-sm border-border/50">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-foreground">
            Staff Availability Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={overallStaffStatus}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  dataKey="value"
                >
                  {overallStaffStatus.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <ChartTooltip content={<ChartTooltipContent />} />
              </PieChart>
            </ResponsiveContainer>
          </ChartContainer>
          <div className="space-y-3 mt-4">
            {overallStaffStatus.map((item) => (
              <div key={item.name} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                <div className="flex items-center gap-3">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: item.color }}
                  ></div>
                  <span className="text-sm font-medium text-foreground">{item.name}</span>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-foreground">{item.value}</div>
                  <div className="text-xs text-muted-foreground">{item.percentage}%</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SupportStaffAnalytics;