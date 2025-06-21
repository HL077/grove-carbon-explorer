
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowDown, ArrowRight, TreePine, BarChart3, MapPin } from "lucide-react";
import LandingSection from "@/components/LandingSection";
import DashboardSection from "@/components/DashboardSection";
import MapSection from "@/components/MapSection";
import Navigation from "@/components/Navigation";

const Index = () => {
  const [activeSection, setActiveSection] = useState("landing");

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(sectionId);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <Navigation activeSection={activeSection} onSectionChange={scrollToSection} />
      
      <main className="pt-16">
        <section id="landing" className="min-h-screen">
          <LandingSection onNavigate={scrollToSection} />
        </section>
        
        <section id="dashboard" className="min-h-screen">
          <DashboardSection />
        </section>
        
        <section id="map" className="min-h-screen">
          <MapSection />
        </section>
      </main>
    </div>
  );
};

export default Index;
