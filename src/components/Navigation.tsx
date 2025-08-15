
import { Button } from "@/components/ui/button";
import { TreePine, BarChart3, MapPin, ImageIcon, Upload } from "lucide-react";

interface NavigationProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const Navigation = ({ activeSection, onSectionChange }: NavigationProps) => {
  const navItems = [
    { id: "landing", label: "Home", icon: TreePine },
    { id: "dashboard", label: "Dashboard", icon: BarChart3 },
    { id: "gallery", label: "Gallery", icon: ImageIcon },
    { id: "upload", label: "Upload", icon: Upload },
    { id: "map", label: "Location", icon: MapPin },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-green-200 shadow-sm">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <TreePine className="h-8 w-8 text-green-600" />
            <span className="text-xl font-bold text-green-800">Carbon Capture Analytics</span>
          </div>
          
          <div className="flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Button
                  key={item.id}
                  variant={activeSection === item.id ? "default" : "ghost"}
                  onClick={() => onSectionChange(item.id)}
                  className="flex items-center space-x-2 transition-all duration-200"
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </Button>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
