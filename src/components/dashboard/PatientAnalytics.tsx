import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { useState, useEffect } from "react";

const PatientAnalytics = () => {
  const [patientData, setPatientData] = useState([
    { category: "ICU", inhouse: 12, opd: 0 },
    { category: "Emergency", inhouse: 8, opd: 15 },
    { category: "Cardiology", inhouse: 6, opd: 25 },
    { category: "Neurology", inhouse: 4, opd: 18 },
    { category: "Pediatrics", inhouse: 5, opd: 22 },
    { category: "Orthopedics", inhouse: 3, opd: 20 },
  ]);

  const [overallPatientStatus, setOverallPatientStatus] = useState([
    { name: "In-house", value: 38, percentage: 32.2, color: "hsl(var(--chart-1))" },
    { name: "OPD", value: 80, percentage: 67.8, color: "hsl(var(--chart-2))" },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setPatientData(prev => prev.map(dept => ({
        ...dept,
        inhouse: Math.max(1, dept.inhouse + Math.floor(Math.random() * 4) - 2),
        opd: Math.max(1, dept.opd + Math.floor(Math.random() * 6) - 3)
      })));
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const totalInhouse = patientData.reduce((sum, dept) => sum + dept.inhouse, 0);
    const totalOpd = patientData.reduce((sum, dept) => sum + dept.opd, 0);
    const total = totalInhouse + totalOpd;

    if (total > 0) {
      setOverallPatientStatus([
        { 
          name: "In-house", 
          value: totalInhouse, 
          percentage: +((totalInhouse / total) * 100).toFixed(1), 
          color: "hsl(var(--chart-1))" 
        },
        { 
          name: "OPD", 
          value: totalOpd, 
          percentage: +((totalOpd / total) * 100).toFixed(1), 
          color: "hsl(var(--chart-2))" 
        },
      ]);
    }
  }, [patientData]);

const handleChartClick = (data: any, category?: string) => {
  console.log("Patient chart clicked:", data, category);
  // Here you can add navigation or modal logic
};

const chartConfig = {
  inhouse: {
    label: "In-house",
    color: "hsl(var(--chart-1))"
  },
  opd: {
    label: "OPD", 
    color: "hsl(var(--chart-2))"
  }
};

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
      <Card className="bg-card/50 backdrop-blur-sm border-border/50 shadow-glow">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-foreground">
            Active Patients by Department
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart 
                data={patientData} 
                margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
                onClick={(data) => handleChartClick(data, "patients")}
              >
                <XAxis 
                  dataKey="category" 
                  angle={-45}
                  textAnchor="end"
                  height={60}
                  fontSize={12}
                  stroke="hsl(var(--muted-foreground))"
                />
                <YAxis fontSize={12} stroke="hsl(var(--muted-foreground))" />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar 
                  dataKey="inhouse" 
                  fill="hsl(var(--chart-1))" 
                  className="chart-interactive"
                  onClick={(data) => handleChartClick(data, "inhouse")}
                />
                <Bar 
                  dataKey="opd" 
                  fill="hsl(var(--chart-2))" 
                  className="chart-interactive"
                  onClick={(data) => handleChartClick(data, "opd")}
                />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
          <div className="flex justify-center gap-6 mt-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded bg-chart-1"></div>
              <span className="text-sm text-muted-foreground">In-house</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded bg-chart-2"></div>
              <span className="text-sm text-muted-foreground">OPD</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-card/50 backdrop-blur-sm border-border/50 shadow-glow">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-foreground">
            Patient Distribution
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-64">
            <ResponsiveContainer width="80%" height="80%">
              <PieChart onClick={(data) => handleChartClick(data, "patient-distribution")}>
                <Pie
                  data={overallPatientStatus}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  dataKey="value"
                  className="chart-interactive"
                  onClick={(data) => handleChartClick(data, "pie-slice")}
                >
                  {overallPatientStatus.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={entry.color}
                      className="chart-interactive"
                      stroke="hsl(var(--background))"
                      strokeWidth={2}
                    />
                  ))}
                </Pie>
                <ChartTooltip content={<ChartTooltipContent />} />
              </PieChart>
            </ResponsiveContainer>
          </ChartContainer>
          <div className="space-y-2 mt-2">
            {overallPatientStatus.map((item) => (
              <div key={item.name} className="flex items-center justify-between p-2 bg-muted/30 rounded-lg">
                <div className="flex items-center gap-2">
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

export default PatientAnalytics;