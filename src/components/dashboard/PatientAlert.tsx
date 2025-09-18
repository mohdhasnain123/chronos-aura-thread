import { ArrowLeft, AlertTriangle, Phone, Users, Heart, Activity, Clock, MapPin, Thermometer, Droplets, Truck, Video, Mic, Shield, Zap, X } from "lucide-react";
import { useState, useEffect } from "react";
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
    condition: "Severe Knee Injury with Compartment Syndrome Risk",
    riskScore: 89,
    timeDetected: "4 minutes ago",
    location: "Downtown Fitness Center - 456 Main Street, Springfield, IL",
    coordinates: "39.7817° N, 89.6501° W",
    insurance: "Medicare + Aetna Supplemental",
    emergencyContact: "Sarah Anderson (Wife) - (555) 123-4567"
  };

  const ambulanceData = {
    status: "En Route",
    eta: "6 minutes",
    crew: "Paramedic Team Bravo-3",
    medications: ["Morphine 5mg IV", "Ketorolac 30mg IM", "Saline 500ml IV"],
    procedures: ["Knee immobilization completed", "Pain assessment (8/10)", "Circulation check - normal"],
    liveFeed: "HD Video Active",
    feedImage: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=400&h=250&fit=crop"
  };

  const blockchainWallet = {
    accessGranted: true,
    timeRemaining: "45 minutes",
    recordsAvailable: 156,
    lastSync: "30 seconds ago",
    securityHash: "0xA7B3...F891"
  };

  const [vitals, setVitals] = useState([
    { label: "Heart Rate", value: "118 BPM", normal: "60-100", status: "elevated", trend: "+18%" },
    { label: "Blood Pressure", value: "145/88", normal: "120/80", status: "elevated", trend: "+15%" },
    { label: "SpO2", value: "96%", normal: ">95%", status: "normal", trend: "stable" },
    { label: "Pain Level", value: "8/10", normal: "0/10", status: "critical", trend: "+6 pts" },
  ]);

  const [showVideoCall, setShowVideoCall] = useState(false);

  const symptoms = [
    "Severe knee pain and swelling",
    "Unable to bear weight on affected leg",
    "Visible deformity of knee joint",
    "Limited range of motion",
    "Numbness in lower leg (compartment syndrome risk)"
  ];

  const diagnosticProtocols = [
    "X-ray imaging (AP and lateral views)",
    "MRI for soft tissue assessment", 
    "Compartment pressure measurement",
    "Vascular assessment (pulse, capillary refill)",
    "Neurological function test"
  ];

  const treatmentPlan = [
    "Immediate pain management with opioids",
    "Knee immobilization and elevation", 
    "Ice therapy for swelling reduction",
    "Urgent orthopedic consultation",
    "Possible surgical intervention within 6-8 hours"
  ];

  const monitoringProtocols = [
    "Pain level assessment every 15 minutes",
    "Circulation checks every 30 minutes",
    "Compartment syndrome surveillance", 
    "Range of motion evaluation",
    "Post-treatment imaging follow-up"
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
              <span>Orthopedic Emergency Alert</span>
            </h1>
            <p className="text-muted-foreground">AI-detected knee injury • Compartment syndrome risk • Blockchain accessed</p>
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
                View Orthopedic Specialists
              </Button>
              <Button variant="outline" className="w-full" onClick={() => setShowVideoCall(true)}>
                <Video className="h-4 w-4 mr-2" />
                Video Consultation with Orthopedic
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
                <div className="flex items-center space-x-2 mb-2">
                  <Video className="h-4 w-4 text-success" />
                  <span className="text-sm font-medium text-success">{ambulanceData.liveFeed}</span>
                </div>
                <img 
                  src={ambulanceData.feedImage} 
                  alt="Live ambulance feed" 
                  className="w-full h-24 object-cover rounded border border-success/30"
                />
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

      {/* Diagnostic & Treatment Protocols */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gradient-card border-border shadow-lg">
          <CardHeader>
            <CardTitle className="text-sm font-semibold text-warning">Immediate Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {treatmentPlan.slice(0, 3).map((action, index) => (
                <li key={index} className="text-xs text-muted-foreground flex items-start space-x-2">
                  <Zap className="h-3 w-3 text-warning mt-0.5 flex-shrink-0" />
                  <span>{action}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card border-border shadow-lg">
          <CardHeader>
            <CardTitle className="text-sm font-semibold text-primary">Diagnostic Protocols</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {diagnosticProtocols.slice(0, 3).map((protocol, index) => (
                <li key={index} className="text-xs text-muted-foreground flex items-start space-x-2">
                  <Activity className="h-3 w-3 text-primary mt-0.5 flex-shrink-0" />
                  <span>{protocol}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card border-border shadow-lg">
          <CardHeader>
            <CardTitle className="text-sm font-semibold text-success">Treatment Plan</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {treatmentPlan.slice(3).map((treatment, index) => (
                <li key={index} className="text-xs text-muted-foreground flex items-start space-x-2">
                  <Heart className="h-3 w-3 text-success mt-0.5 flex-shrink-0" />
                  <span>{treatment}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card border-border shadow-lg">
          <CardHeader>
            <CardTitle className="text-sm font-semibold text-cyan-400">Monitoring Protocols</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {monitoringProtocols.slice(0, 3).map((protocol, index) => (
                <li key={index} className="text-xs text-muted-foreground flex items-start space-x-2">
                  <Clock className="h-3 w-3 text-cyan-400 mt-0.5 flex-shrink-0" />
                  <span>{protocol}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Video Call Modal */}
      {showVideoCall && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
          <Card className="w-[90vw] h-[80vh] bg-gradient-card border-border shadow-2xl">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center space-x-2">
                <Video className="h-5 w-5 text-success" />
                <span>Dr. Sarah Chen - Orthopedic Surgeon</span>
                <Badge className="bg-success text-white text-xs">LIVE</Badge>
              </CardTitle>
              <Button variant="ghost" onClick={() => setShowVideoCall(false)} className="p-2">
                <X className="h-5 w-5" />
              </Button>
            </CardHeader>
            <CardContent className="flex-1 p-0">
              <div className="relative h-full bg-black rounded-lg overflow-hidden">
                <video 
                  src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
                  className="w-full h-full object-cover"
                  autoPlay
                  muted
                  loop
                />
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <Button size="sm" className="bg-destructive hover:bg-destructive/90">
                      <Mic className="h-4 w-4" />
                    </Button>
                    <Button size="sm" className="bg-success hover:bg-success/90">
                      <Video className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="text-white text-sm bg-black/50 px-3 py-1 rounded">
                    Discussing treatment options for knee injury...
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );

  // Live data simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setVitals(prev => prev.map(vital => {
        if (vital.label === "Heart Rate") {
          const newValue = 118 + Math.floor(Math.random() * 8 - 4);
          return { ...vital, value: `${newValue} BPM` };
        }
        if (vital.label === "Blood Pressure") {
          const systolic = 145 + Math.floor(Math.random() * 6 - 3);
          const diastolic = 88 + Math.floor(Math.random() * 4 - 2);
          return { ...vital, value: `${systolic}/${diastolic}` };
        }
        if (vital.label === "SpO2") {
          const newValue = 96 + Math.floor(Math.random() * 3 - 1);
          return { ...vital, value: `${newValue}%` };
        }
        return vital;
      }));
    }, 2000);

    return () => clearInterval(interval);
  }, []);
};

export default PatientAlert;