import { Calendar, FileText, AlertTriangle, Bed, Users, Activity, Brain, Stethoscope, TrendingUp } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const QuickStats = () => {
  const stats = [
    {
      title: "Upcoming Appointments",
      value: "47",
      change: "Next: Dr. Smith 9:00 AM",
      icon: Calendar,
      color: "bg-gradient-primary",
      isClickable: true,
      action: "appointments"
    },
    {
      title: "Active Treatments",
      value: "156",
      change: "12 critical, 89 stable, 55 recovering",
      icon: FileText,
      color: "bg-gradient-secondary",
      isClickable: true,
      action: "treatments"
    },
    {
      title: "Critical Alerts",
      value: "8",
      change: "AI-detected emergencies",
      icon: AlertTriangle,
      color: "bg-destructive",
      isClickable: true,
      action: "critical"
    },
    {
      title: "Bed Utilization",
      value: "87%",
      change: "234/268 beds • 12 ICU available",
      icon: Bed,
      color: "bg-gradient-accent",
      isClickable: true,
      action: "beds"
    },
    {
      title: "Staff Optimization",
      value: "94%",
      change: "87 active, 12 on-call",
      icon: Users,
      color: "bg-success",
      isClickable: true,
      action: "staff"
    },
    {
      title: "AI Agent Status",
      value: "Online",
      change: "Ready to assist",
      icon: Brain,
      color: "bg-gradient-primary",
      isClickable: true,
      action: "aiAgent"
    },
  ];

  const handleCardClick = (stat: any) => {
    if (stat.isClickable) {
      switch (stat.action) {
        case 'critical':
          const event = new CustomEvent('showCriticalPatients');
          window.dispatchEvent(event);
          break;
        case 'appointments':
          const appointmentsEvent = new CustomEvent('showAppointments');
          window.dispatchEvent(appointmentsEvent);
          break;
        case 'treatments':
          const treatmentsEvent = new CustomEvent('showTreatments');
          window.dispatchEvent(treatmentsEvent);
          break;
        case 'beds':
          const bedsEvent = new CustomEvent('showBedUtilization');
          window.dispatchEvent(bedsEvent);
          break;
        case 'staff':
          const staffEvent = new CustomEvent('showStaffOptimization');
          window.dispatchEvent(staffEvent);
          break;
        case 'aiAgent':
          const aiEvent = new CustomEvent('showAIAgent');
          window.dispatchEvent(aiEvent);
          break;
      }
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
      {stats.map((stat, index) => {
        const IconComponent = stat.icon;
        return (
          <Card 
            key={index} 
            className={`bg-gradient-card border-border shadow-md hover:shadow-lg transition-shadow ${stat.isClickable ? 'cursor-pointer hover:scale-105 transition-transform' : ''}`}
            onClick={() => handleCardClick(stat)}
          >
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-2">
                    {stat.title}
                  </p>
                  <p className="text-3xl font-bold text-foreground mb-1">
                    {stat.value}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {stat.change}
                  </p>
                </div>
                <div className={`${stat.color} p-3 rounded-lg text-white shadow-sm`}>
                  <IconComponent className="h-6 w-6" />
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default QuickStats;