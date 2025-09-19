import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { useState, useEffect } from "react";

const DoctorAvailabilityAnalytics = () => {
  const [specialtyData, setSpecialtyData] = useState([
    { specialty: "Cardiology", available: 4, busy: 1, offline: 0 },
    { specialty: "Neurology", available: 2, busy: 2, offline: 1 },
    { specialty: "Pediatrics", available: 3, busy: 2, offline: 0 },
    { specialty: "Orthopedics", available: 2, busy: 1, offline: 0 },
    { specialty: "Dermatology", available: 2, busy: 0, offline: 1 },
    { specialty: "Psychiatry", available: 1, busy: 1, offline: 1 },
    { specialty: "Emergency", available: 5, busy: 1, offline: 1 },
  ]);

  const [overallStatusData, setOverallStatusData] = useState([
    { name: "Available", value: 14, percentage: 56.0, color: "hsl(var(--chart-1))" },
    { name: "Busy", value: 7, percentage: 28.0, color: "hsl(var(--chart-2))" },
    { name: "Offline", value: 4, percentage: 16.0, color: "hsl(var(--chart-3))" },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setSpecialtyData(prev => prev.map(spec => ({
        ...spec,
        available: Math.max(1, spec.available + Math.floor(Math.random() * 3) - 1),
        busy: Math.max(1, spec.busy + Math.floor(Math.random() * 3) - 1),
        offline: Math.max(1, spec.offline + Math.floor(Math.random() * 2) - 1)
      })));
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const totalAvailable = specialtyData.reduce((sum, spec) => sum + spec.available, 0);
    const totalBusy = specialtyData.reduce((sum, spec) => sum + spec.busy, 0);
    const totalOffline = specialtyData.reduce((sum, spec) => sum + spec.offline, 0);
    const total = totalAvailable + totalBusy + totalOffline;

    if (total > 0) {
      setOverallStatusData([
        { 
          name: "Available", 
          value: totalAvailable, 
          percentage: +((totalAvailable / total) * 100).toFixed(1), 
          color: "hsl(var(--chart-1))" 
        },
        { 
          name: "Busy", 
          value: totalBusy, 
          percentage: +((totalBusy / total) * 100).toFixed(1), 
          color: "hsl(var(--chart-2))" 
        },
        { 
          name: "Offline", 
          value: totalOffline, 
          percentage: +((totalOffline / total) * 100).toFixed(1), 
          color: "hsl(var(--chart-3))" 
        },
      ]);
    }
  }, [specialtyData]);

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

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
      <Card className="bg-card/50 backdrop-blur-sm border-border/50">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-foreground">
            Doctors by Specialty
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={specialtyData} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
                <XAxis 
                  dataKey="specialty" 
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
            Overall Availability Status
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={overallStatusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  dataKey="value"
                >
                  {overallStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <ChartTooltip content={<ChartTooltipContent />} />
              </PieChart>
            </ResponsiveContainer>
          </ChartContainer>
          <div className="space-y-3 mt-4">
            {overallStatusData.map((item) => (
              <div key={item.name} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                <div className="flex items-center gap-3">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: item.color }}
                  ></div>
                  <span className="text-sm font-medium text-foreground">{item.name}</span>
                </div>
                <div className="text-right">
                  {/* <div className="text-lg font-bold text-foreground">{item.value}</div> */}
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

export default DoctorAvailabilityAnalytics;