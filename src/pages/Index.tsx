import { useState, useEffect } from "react";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import QuickStats from "@/components/dashboard/QuickStats";
import PatientAlert from "@/components/dashboard/PatientAlert";
import CardiacSpecialists from "@/components/dashboard/CardiacSpecialists";
import CriticalPatientsList from "@/components/dashboard/CriticalPatientsList";
import PatientOverview from "@/components/dashboard/PatientOverview";
import AIProviderAssistant from "@/components/dashboard/AIProviderAssistant";
import DoctorStatusMatrix from "@/components/dashboard/DoctorStatusMatrix";

const Index = () => {
  const [currentView, setCurrentView] = useState<'dashboard' | 'criticalPatients' | 'patientAlert' | 'specialists' | 'aiAgent' | 'doctorStatus' | 'appointments' | 'treatments' | 'beds' | 'staff'>('dashboard');
  const [selectedPatientId, setSelectedPatientId] = useState<string>('');

  // Listen for the custom events from QuickStats
  useEffect(() => {
    const handleShowCriticalPatients = () => setCurrentView('criticalPatients');
    const handleShowAIAgent = () => setCurrentView('aiAgent');
    const handleShowDoctorStatus = () => setCurrentView('doctorStatus');
    const handleShowAppointments = () => setCurrentView('appointments');
    const handleShowTreatments = () => setCurrentView('treatments');
    const handleShowBedUtilization = () => setCurrentView('beds');
    const handleShowStaffOptimization = () => setCurrentView('staff');

    window.addEventListener('showCriticalPatients', handleShowCriticalPatients);
    window.addEventListener('showAIAgent', handleShowAIAgent);
    window.addEventListener('showAppointments', handleShowAppointments);
    window.addEventListener('showTreatments', handleShowTreatments);
    window.addEventListener('showBedUtilization', handleShowBedUtilization);
    window.addEventListener('showStaffOptimization', handleShowStaffOptimization);

    return () => {
      window.removeEventListener('showCriticalPatients', handleShowCriticalPatients);
      window.removeEventListener('showAIAgent', handleShowAIAgent);
      window.removeEventListener('showAppointments', handleShowAppointments);
      window.removeEventListener('showTreatments', handleShowTreatments);
      window.removeEventListener('showBedUtilization', handleShowBedUtilization);
      window.removeEventListener('showStaffOptimization', handleShowStaffOptimization);
    };
  }, []);

  const renderContent = () => {
    switch (currentView) {
      case 'criticalPatients':
        return (
          <CriticalPatientsList 
            onBack={() => setCurrentView('dashboard')}
            onSelectPatient={(patientId) => {
              setSelectedPatientId(patientId);
              setCurrentView('patientAlert');
            }}
          />
        );
      case 'patientAlert':
        return (
          <PatientAlert 
            onBack={() => setCurrentView('criticalPatients')}
            onViewSpecialists={() => setCurrentView('specialists')}
          />
        );
      case 'specialists':
        return (
          <CardiacSpecialists 
            onBack={() => setCurrentView('patientAlert')}
          />
        );
      case 'aiAgent':
        return (
          <AIProviderAssistant 
            onBack={() => setCurrentView('dashboard')}
          />
        );
      case 'doctorStatus':
        return (
          <DoctorStatusMatrix 
            onBack={() => setCurrentView('dashboard')}
          />
        );
      case 'appointments':
      case 'treatments':
      case 'beds':
      case 'staff':
        return (
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              {currentView.charAt(0).toUpperCase() + currentView.slice(1)} Management
            </h2>
            <p className="text-muted-foreground mb-6">This section is under development</p>
            <button 
              onClick={() => setCurrentView('dashboard')}
              className="bg-primary text-primary-foreground px-4 py-2 rounded hover:bg-primary/90"
            >
              Back to Dashboard
            </button>
          </div>
        );
      default:
        return (
          <>
            <QuickStats />
            <PatientOverview />
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-bg">
      <DashboardHeader />
      
      <main className="container mx-auto px-6 py-8">
        {renderContent()}
      </main>
    </div>
  );
};

export default Index;
