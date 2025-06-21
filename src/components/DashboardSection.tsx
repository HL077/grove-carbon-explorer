
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import LandUseChart from "@/components/LandUseChart";
import ScenarioComparison from "@/components/ScenarioComparison";
import { TreePine, BarChart3, TrendingUp } from "lucide-react";

const DashboardSection = () => {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-green-800 mb-4">
          Environmental Impact Dashboard
        </h2>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Comprehensive analysis of land use patterns and their carbon capture implications
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8 mb-12">
        <Card className="bg-white/80 backdrop-blur-sm border-green-200">
          <CardHeader className="text-center">
            <div className="mx-auto bg-green-100 p-3 rounded-full w-fit mb-3">
              <TreePine className="h-8 w-8 text-green-600" />
            </div>
            <CardTitle className="text-green-800">Current Carbon Capture</CardTitle>
            <CardDescription>Annual CO₂ absorption rate</CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">2.3 tons</div>
            <p className="text-sm text-gray-600">Equivalent to taking 0.5 cars off the road</p>
          </CardContent>
        </Card>

        <Card className="bg-white/80 backdrop-blur-sm border-blue-200">
          <CardHeader className="text-center">
            <div className="mx-auto bg-blue-100 p-3 rounded-full w-fit mb-3">
              <BarChart3 className="h-8 w-8 text-blue-600" />
            </div>
            <CardTitle className="text-blue-800">Tree Coverage</CardTitle>
            <CardDescription>Current forest canopy</CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">42%</div>
            <p className="text-sm text-gray-600">Of total site area</p>
          </CardContent>
        </Card>

        <Card className="bg-white/80 backdrop-blur-sm border-amber-200">
          <CardHeader className="text-center">
            <div className="mx-auto bg-amber-100 p-3 rounded-full w-fit mb-3">
              <TrendingUp className="h-8 w-8 text-amber-600" />
            </div>
            <CardTitle className="text-amber-800">Improvement Potential</CardTitle>
            <CardDescription>With lower density development</CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <div className="text-3xl font-bold text-amber-600 mb-2">+67%</div>
            <p className="text-sm text-gray-600">Additional carbon capture</p>
          </CardContent>
        </Card>
      </div>

      <div className="mb-12">
        <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Current Land Use Distribution
        </h3>
        <LandUseChart />
      </div>

      <div>
        <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Development Scenario Comparison
        </h3>
        <ScenarioComparison />
      </div>
    </div>
  );
};

export default DashboardSection;
