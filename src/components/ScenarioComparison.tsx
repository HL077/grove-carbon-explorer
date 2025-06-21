
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const ScenarioComparison = () => {
  const scenarios = [
    {
      name: "Pre-Development",
      trees: 65,
      grass: 25,
      buildings: 5,
      roads: 5,
      carbonCapture: 3.8
    },
    {
      name: "Higher Density",
      trees: 25,
      grass: 15,
      buildings: 45,
      roads: 15,
      carbonCapture: 1.4
    },
    {
      name: "Lower Density",
      trees: 50,
      grass: 25,
      buildings: 15,
      roads: 10,
      carbonCapture: 2.9
    }
  ];

  return (
    <div className="grid lg:grid-cols-3 gap-6">
      {scenarios.map((scenario, index) => (
        <Card key={scenario.name} className={`bg-white/80 backdrop-blur-sm border-2 ${
          index === 0 ? 'border-green-300' : 
          index === 1 ? 'border-red-300' : 'border-blue-300'
        }`}>
          <CardHeader>
            <CardTitle className={`text-center ${
              index === 0 ? 'text-green-700' : 
              index === 1 ? 'text-red-700' : 'text-blue-700'
            }`}>
              {scenario.name}
            </CardTitle>
            <div className="text-center">
              <div className={`text-2xl font-bold ${
                index === 0 ? 'text-green-600' : 
                index === 1 ? 'text-red-600' : 'text-blue-600'
              }`}>
                {scenario.carbonCapture} tons CO₂/year
              </div>
              <p className="text-sm text-gray-600">Carbon capture potential</p>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={[scenario]}
                  margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" hide />
                  <YAxis domain={[0, 70]} />
                  <Tooltip 
                    formatter={(value) => [`${value}%`, 'Percentage']}
                    contentStyle={{ 
                      backgroundColor: 'rgba(255, 255, 255, 0.95)', 
                      border: '1px solid #ccc',
                      borderRadius: '6px'
                    }}
                  />
                  <Bar dataKey="trees" fill="#16a34a" name="Trees" />
                  <Bar dataKey="grass" fill="#65a30d" name="Grass" />
                  <Bar dataKey="buildings" fill="#6b7280" name="Buildings" />
                  <Bar dataKey="roads" fill="#374151" name="Roads" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 space-y-2">
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-600 rounded"></div>
                  <span className="text-sm">Trees</span>
                </div>
                <span className="font-semibold">{scenario.trees}%</span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-lime-600 rounded"></div>
                  <span className="text-sm">Grass</span>
                </div>
                <span className="font-semibold">{scenario.grass}%</span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-gray-500 rounded"></div>
                  <span className="text-sm">Buildings</span>
                </div>
                <span className="font-semibold">{scenario.buildings}%</span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-gray-800 rounded"></div>
                  <span className="text-sm">Roads</span>
                </div>
                <span className="font-semibold">{scenario.roads}%</span>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ScenarioComparison;
