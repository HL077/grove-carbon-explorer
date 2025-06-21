
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowDown, ArrowRight, TreePine, Leaf, Building, Wind } from "lucide-react";

interface LandingSectionProps {
  onNavigate: (section: string) => void;
}

const LandingSection = ({ onNavigate }: LandingSectionProps) => {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center mb-16 animate-fade-in">
        <h1 className="text-5xl font-bold text-green-800 mb-6">
          Carbon Capture Through
          <span className="text-green-600 block">Urban Forest Management</span>
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
          Explore how strategic tree cover and sustainable development can significantly reduce carbon emissions 
          and create healthier urban environments for future generations.
        </p>
        <Button 
          onClick={() => onNavigate("dashboard")} 
          size="lg" 
          className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 text-lg"
        >
          Explore Impact Data
          <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-16">
        <Card className="bg-white/70 backdrop-blur-sm border-green-200 hover:shadow-lg transition-all duration-300">
          <CardHeader>
            <div className="flex items-center space-x-3">
              <div className="bg-green-100 p-3 rounded-full">
                <TreePine className="h-6 w-6 text-green-600" />
              </div>
              <CardTitle className="text-green-800">Carbon Sequestration Impact</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <CardDescription className="text-gray-700 text-base leading-relaxed">
              Our site analysis reveals that current tree coverage captures approximately 
              <span className="font-semibold text-green-700"> 2.3 tons of CO₂ annually</span>. 
              Each mature tree can absorb 48 pounds of CO₂ per year, making forest preservation 
              a critical component of climate change mitigation strategies.
            </CardDescription>
          </CardContent>
        </Card>

        <Card className="bg-white/70 backdrop-blur-sm border-green-200 hover:shadow-lg transition-all duration-300">
          <CardHeader>
            <div className="flex items-center space-x-3">
              <div className="bg-blue-100 p-3 rounded-full">
                <Leaf className="h-6 w-6 text-blue-600" />
              </div>
              <CardTitle className="text-green-800">Tree Cover Benefits</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <CardDescription className="text-gray-700 text-base leading-relaxed">
              Beyond carbon capture, our tree canopy provides 
              <span className="font-semibold text-green-700"> 35% temperature reduction</span> 
              through natural cooling, improves air quality by filtering pollutants, 
              and supports local biodiversity while enhancing property values.
            </CardDescription>
          </CardContent>
        </Card>
      </div>

      <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-2xl p-8 text-white mb-16">
        <div className="grid md:grid-cols-3 gap-8 text-center">
          <div className="flex flex-col items-center">
            <Building className="h-12 w-12 mb-4 opacity-90" />
            <h3 className="text-2xl font-bold mb-2">Development Impact</h3>
            <p className="opacity-90">Compare how different development densities affect carbon capture potential</p>
          </div>
          <div className="flex flex-col items-center">
            <TreePine className="h-12 w-12 mb-4 opacity-90" />
            <h3 className="text-2xl font-bold mb-2">Forest Preservation</h3>
            <p className="opacity-90">Maintain maximum tree coverage for optimal environmental benefits</p>
          </div>
          <div className="flex flex-col items-center">
            <Wind className="h-12 w-12 mb-4 opacity-90" />
            <h3 className="text-2xl font-bold mb-2">Sustainable Future</h3>
            <p className="opacity-90">Balance development needs with environmental responsibility</p>
          </div>
        </div>
      </div>

      <div className="text-center">
        <Button 
          onClick={() => onNavigate("dashboard")} 
          variant="outline" 
          size="lg"
          className="border-green-600 text-green-600 hover:bg-green-50"
        >
          <ArrowDown className="mr-2 h-5 w-5" />
          View Detailed Analysis
        </Button>
      </div>
    </div>
  );
};

export default LandingSection;
