
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Navigation, Ruler, TreePine } from "lucide-react";

const MapSection = () => {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-green-800 mb-4">
          Site Location & Context
        </h2>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Strategic location analysis for optimal carbon capture and sustainable development
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8 mb-12">
        <Card className="bg-white/80 backdrop-blur-sm border-green-200">
          <CardHeader className="text-center">
            <div className="mx-auto bg-green-100 p-3 rounded-full w-fit mb-3">
              <MapPin className="h-8 w-8 text-green-600" />
            </div>
            <CardTitle className="text-green-800">Location</CardTitle>
            <CardDescription>Primary development site</CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <div className="text-lg font-semibold text-gray-800 mb-2">Downtown District</div>
            <p className="text-sm text-gray-600">Coordinates: 40.7128° N, 74.0060° W</p>
          </CardContent>
        </Card>

        <Card className="bg-white/80 backdrop-blur-sm border-blue-200">
          <CardHeader className="text-center">
            <div className="mx-auto bg-blue-100 p-3 rounded-full w-fit mb-3">
              <Ruler className="h-8 w-8 text-blue-600" />
            </div>
            <CardTitle className="text-blue-800">Site Area</CardTitle>
            <CardDescription>Total development area</CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <div className="text-lg font-semibold text-gray-800 mb-2">15.2 acres</div>
            <p className="text-sm text-gray-600">Approximately 662,000 sq ft</p>
          </CardContent>
        </Card>

        <Card className="bg-white/80 backdrop-blur-sm border-amber-200">
          <CardHeader className="text-center">
            <div className="mx-auto bg-amber-100 p-3 rounded-full w-fit mb-3">
              <TreePine className="h-8 w-8 text-amber-600" />
            </div>
            <CardTitle className="text-amber-800">Elevation</CardTitle>
            <CardDescription>Above sea level</CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <div className="text-lg font-semibold text-gray-800 mb-2">125 feet</div>
            <p className="text-sm text-gray-600">Optimal for tree growth</p>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-white/80 backdrop-blur-sm border-green-200 mb-8">
        <CardHeader>
          <CardTitle className="text-center text-green-800">Interactive Site Map</CardTitle>
          <CardDescription className="text-center">
            Satellite view showing current tree coverage and proposed development areas
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative h-96 bg-gradient-to-br from-green-100 to-green-200 rounded-lg overflow-hidden">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80')] bg-cover bg-center opacity-70"></div>
            <div className="absolute inset-0 bg-green-900/20"></div>
            <div className="relative z-10 h-full flex items-center justify-center">
              <div className="text-center text-white">
                <MapPin className="h-16 w-16 mx-auto mb-4 text-white drop-shadow-lg" />
                <div className="bg-black/50 backdrop-blur-sm rounded-lg p-4">
                  <h3 className="text-xl font-bold mb-2">Development Site</h3>
                  <p className="text-sm">15.2 acres of mixed-use land</p>
                  <p className="text-sm">Current tree coverage: 42%</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 gap-8">
        <Card className="bg-white/80 backdrop-blur-sm border-green-200">
          <CardHeader>
            <CardTitle className="text-green-800">Environmental Factors</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-700">Annual Rainfall</span>
              <span className="font-semibold text-green-600">42 inches</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-700">Average Temperature</span>
              <span className="font-semibold text-green-600">55°F</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-700">Soil Type</span>
              <span className="font-semibold text-green-600">Loamy Clay</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-700">Drainage</span>
              <span className="font-semibold text-green-600">Well-drained</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/80 backdrop-blur-sm border-blue-200">
          <CardHeader>
            <CardTitle className="text-blue-800">Accessibility</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-700">Public Transit</span>
              <span className="font-semibold text-blue-600">0.3 miles</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-700">Highway Access</span>
              <span className="font-semibold text-blue-600">1.2 miles</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-700">Bike Paths</span>
              <span className="font-semibold text-blue-600">Adjacent</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-700">Walkability Score</span>
              <span className="font-semibold text-blue-600">85/100</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MapSection;
