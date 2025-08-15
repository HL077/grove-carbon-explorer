
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowDown, ArrowRight, TreePine, BarChart3, MapPin } from "lucide-react";
import LandingSection from "@/components/LandingSection";
import DashboardSection from "@/components/DashboardSection";
import GallerySection from "@/components/GallerySection";
import UploadSection from "@/components/UploadSection";
import MapSection from "@/components/MapSection";
import Navigation from "@/components/Navigation";

const Index = () => {
  const [activeSection, setActiveSection] = useState("landing");

  const handleSectionChange = (sectionId: string) => {
    setActiveSection(sectionId);
  };

  const renderActiveSection = () => {
    switch (activeSection) {
      case "landing":
        return <LandingSection onNavigate={handleSectionChange} />;
      case "dashboard":
        return <DashboardSection />;
      case "gallery":
        return <GallerySection />;
      case "upload":
        return <UploadSection />;
      case "map":
        return <MapSection />;
      default:
        return <LandingSection onNavigate={handleSectionChange} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <Navigation activeSection={activeSection} onSectionChange={handleSectionChange} />
      
      <main className="pt-16 min-h-screen">
        {renderActiveSection()}
      </main>
    </div>
  );
};

export default Index;
