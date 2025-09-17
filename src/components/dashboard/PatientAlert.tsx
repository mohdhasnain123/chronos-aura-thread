import { ArrowLeft, AlertTriangle, Phone, Users, Heart, Activity, Clock, MapPin, Thermometer, Droplets, Truck, Video, Mic, Shield, Zap } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

interface PatientAlertProps {
  onBack: () => void;
  onViewSpecialists: () => void;
}

const PatientAlert = ({ onBack, onViewSpecialists }: PatientAlertProps) => {
  // Enhanced patient data for Bob Anderson
  const patientData = {
    name: "Bob Anderson",
    age: 58,
    id: "PA-2024-001",
    condition: "Imminent Cardiac Arrest Risk",
    riskScore: 95,
    timeDetected: "2 minutes ago",
    location: "Home - 1234 Oak Street, Springfield, IL",
    coordinates: "39.7817° N, 89.6501° W",
    insurance: "Medicare + Aetna Supplemental",
    emergencyContact: "Sarah Anderson (Wife) - (555) 123-4567"
  };

  const ambulanceData = {
    status: "En Route",
    eta: "8 minutes",
    crew: "Paramedic Team Alpha-7",
    medications: ["Nitroglycerin 0.4mg", "Aspirin 325mg", "Oxygen 15L/min"],
    procedures: ["12-lead ECG completed", "IV access established", "Cardiac monitoring active"],
    liveFeed: "HD Video Active"
  };

  const blockchainWallet = {
    accessGranted: true,
    timeRemaining: "45 minutes",
    recordsAvailable: 156,
    lastSync: "30 seconds ago",
    securityHash: "0xA7B3...F891"
  };

  const vitals = [
    { label: "Heart Rate", value: "165 BPM", normal: "60-100", status: "critical", trend: "+45%" },
    { label: "Blood Pressure", value: "180/120", normal: "120/80", status: "critical", trend: "+33%" },
    { label: "SpO2", value: "89%", normal: ">95%", status: "critical", trend: "-8%" },
    { label: "Temperature", value: "101.2°F", normal: "98.6°F", status: "elevated", trend: "+2.6°F" },
  ];

  const symptoms = [
    "Severe chest pain radiating to left arm",
    "Difficulty breathing (dyspnea)",
    "Cold sweats and nausea",
    "Dizziness and lightheadedness",
    "Irregular heart rhythm detected"
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "critical": return "bg-destructive text-destructive-foreground";
      case "elevated": return "bg-warning text-warning-foreground";
      default: return "bg-success text-success-foreground";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" onClick={onBack} className="p-2">
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-foreground flex items-center space-x-2">
              <AlertTriangle className="h-6 w-6 text-destructive animate-pulse" />
              <span>Critical Patient Alert</span>
            </h1>
            <p className="text-muted-foreground">AI-detected emergency • Blockchain records accessed</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Badge className="bg-destructive text-destructive-foreground animate-pulse">
            CRITICAL
          </Badge>
          <Badge className="bg-warning text-warning-foreground">
            Risk: {patientData.riskScore}%
          </Badge>
          <Badge className="bg-success text-white">
            Payer: Pre-Approved
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Patient Information */}
        <Card className="bg-gradient-card border-destructive/20 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <AlertTriangle className="h-5 w-5 text-destructive" />
              <span>Patient Information</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h2 className="text-xl font-semibold text-foreground mb-2">{patientData.name}</h2>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Age:</span>
                    <span className="font-medium text-foreground">{patientData.age} years</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Patient ID:</span>
                    <span className="font-medium text-foreground">{patientData.id}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Insurance:</span>
                    <span className="font-medium text-foreground text-sm">{patientData.insurance}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Location:</span>
                    <div className="text-right">
                      <div className="flex items-center space-x-1">
                        <MapPin className="h-4 w-4 text-primary" />
                        <span className="font-medium text-foreground text-sm">{patientData.location}</span>
                      </div>
                      <div className="text-xs text-muted-foreground">{patientData.coordinates}</div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <Button className="w-full bg-destructive hover:bg-destructive/90 text-destructive-foreground">
                  <Phone className="h-4 w-4 mr-2" />
                  Emergency Call
                </Button>
                <Button variant="outline" className="w-full border-warning text-warning hover:bg-warning hover:text-white">
                  <Users className="h-4 w-4 mr-2" />
                  Alert Medical Team
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Live Wearable Feed */}
        <Card className="bg-gradient-card border-border shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Activity className="h-5 w-5 text-success animate-pulse" />
              <span>Live Wearable Data</span>
              <Badge className="bg-success text-white text-xs">LIVE</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {vitals.map((vital, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-background rounded-lg border border-border">
                  <div>
                    <p className="font-medium text-foreground">{vital.label}</p>
                    <p className="text-sm text-muted-foreground">Normal: {vital.normal}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-lg text-foreground">{vital.value}</p>
                    <Badge className={`${getStatusColor(vital.status)} text-xs`}>
                      {vital.trend}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Blockchain Wallet Access */}
        <Card className="bg-gradient-card border-border shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Shield className="h-5 w-5 text-primary" />
              <span>Medical Records</span>
              <Badge className="bg-primary text-white text-xs">BLOCKCHAIN SECURED</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-3 bg-success/10 rounded border border-success/20">
                <div className="flex items-center space-x-2 mb-2">
                  <Shield className="h-4 w-4 text-success" />
                  <span className="font-medium text-success">Access Granted</span>
                </div>
                <div className="text-sm space-y-1">
                  <div>Time Remaining: <span className="font-medium">{blockchainWallet.timeRemaining}</span></div>
                  <div>Records: <span className="font-medium">{blockchainWallet.recordsAvailable}</span></div>
                  <div>Hash: <span className="font-mono text-xs">{blockchainWallet.securityHash}</span></div>
                </div>
              </div>
              
              <Button variant="outline" className="w-full" onClick={onViewSpecialists}>
                <Heart className="h-4 w-4 mr-2" />
                View Cardiac Specialists
              </Button>
              <Button variant="outline" className="w-full">
                <Video className="h-4 w-4 mr-2" />
                Video Consultation
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Ambulance Treatment Plan */}
      <Card className="bg-gradient-card border-border shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Truck className="h-5 w-5 text-warning" />
            <span>Ambulance Treatment Plan</span>
            <Badge className="bg-warning text-white">{ambulanceData.status}</Badge>
            <Badge className="bg-success text-white">ETA: {ambulanceData.eta}</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h4 className="font-semibold text-foreground mb-2">Crew Information</h4>
              <p className="text-sm text-muted-foreground">{ambulanceData.crew}</p>
              <div className="mt-2 p-2 bg-success/10 rounded border border-success/20">
                <div className="flex items-center space-x-2">
                  <Video className="h-4 w-4 text-success" />
                  <span className="text-sm font-medium text-success">{ambulanceData.liveFeed}</span>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold text-foreground mb-2">Medications Administered</h4>
              <ul className="space-y-1">
                {ambulanceData.medications.map((med, index) => (
                  <li key={index} className="text-sm text-muted-foreground flex items-center space-x-2">
                    <Zap className="h-3 w-3 text-success" />
                    <span>{med}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-foreground mb-2">Procedures Completed</h4>
              <ul className="space-y-1">
                {ambulanceData.procedures.map((procedure, index) => (
                  <li key={index} className="text-sm text-muted-foreground flex items-center space-x-2">
                    <Activity className="h-3 w-3 text-primary" />
                    <span>{procedure}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PatientAlert;