import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, TreePine, Leaf, BarChart3, TrendingUp } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";

const studyAreaData = {
  1: {
    title: "Old Growth Forest",
    description: "Mature forest ecosystem with diverse canopy layers and high carbon storage capacity",
    image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600&h=400&fit=crop",
    tags: ["Old Growth", "Carbon Storage", "Biodiversity"],
    carbonData: {
      totalCarbon: 245,
      carbonPerHectare: 180,
      annualSequestration: 12.5,
      soilCarbon: 145,
      biomassCarbon: 100,
      monthlyData: [
        { month: "Jan", sequestration: 8.2 },
        { month: "Feb", sequestration: 9.1 },
        { month: "Mar", sequestration: 11.5 },
        { month: "Apr", sequestration: 14.2 },
        { month: "May", sequestration: 16.8 },
        { month: "Jun", sequestration: 18.3 },
        { month: "Jul", sequestration: 19.1 },
        { month: "Aug", sequestration: 17.9 },
        { month: "Sep", sequestration: 15.6 },
        { month: "Oct", sequestration: 13.2 },
        { month: "Nov", sequestration: 10.8 },
        { month: "Dec", sequestration: 8.9 }
      ],
      carbonDistribution: [
        { type: "Soil Carbon", value: 145, fill: "#8B4513" },
        { type: "Above-ground Biomass", value: 60, fill: "#228B22" },
        { type: "Below-ground Biomass", value: 40, fill: "#556B2F" }
      ]
    }
  },
  2: {
    title: "Urban Forest Canopy",
    description: "City forest management area showing tree density and urban integration",
    image: "https://images.unsplash.com/photo-1574263867128-b8b7c28a4b53?w=600&h=400&fit=crop",
    tags: ["Urban", "Canopy", "City Planning"],
    carbonData: {
      totalCarbon: 125,
      carbonPerHectare: 95,
      annualSequestration: 8.2,
      soilCarbon: 70,
      biomassCarbon: 55,
      monthlyData: [
        { month: "Jan", sequestration: 5.1 },
        { month: "Feb", sequestration: 5.8 },
        { month: "Mar", sequestration: 7.2 },
        { month: "Apr", sequestration: 9.1 },
        { month: "May", sequestration: 11.3 },
        { month: "Jun", sequestration: 12.8 },
        { month: "Jul", sequestration: 13.2 },
        { month: "Aug", sequestration: 12.1 },
        { month: "Sep", sequestration: 10.4 },
        { month: "Oct", sequestration: 8.7 },
        { month: "Nov", sequestration: 6.9 },
        { month: "Dec", sequestration: 5.6 }
      ],
      carbonDistribution: [
        { type: "Soil Carbon", value: 70, fill: "#8B4513" },
        { type: "Above-ground Biomass", value: 35, fill: "#228B22" },
        { type: "Below-ground Biomass", value: 20, fill: "#556B2F" }
      ]
    }
  },
  3: {
    title: "Mixed Deciduous Forest",
    description: "Seasonal forest study site with oak, maple, and birch species",
    image: "https://images.unsplash.com/photo-1476231682828-37e571bc172f?w=600&h=400&fit=crop",
    tags: ["Deciduous", "Seasonal", "Mixed Species"],
    carbonData: {
      totalCarbon: 189,
      carbonPerHectare: 142,
      annualSequestration: 10.8,
      soilCarbon: 115,
      biomassCarbon: 74,
      monthlyData: [
        { month: "Jan", sequestration: 6.2 },
        { month: "Feb", sequestration: 7.1 },
        { month: "Mar", sequestration: 9.8 },
        { month: "Apr", sequestration: 13.5 },
        { month: "May", sequestration: 16.2 },
        { month: "Jun", sequestration: 17.8 },
        { month: "Jul", sequestration: 18.1 },
        { month: "Aug", sequestration: 16.9 },
        { month: "Sep", sequestration: 14.2 },
        { month: "Oct", sequestration: 11.8 },
        { month: "Nov", sequestration: 8.9 },
        { month: "Dec", sequestration: 6.8 }
      ],
      carbonDistribution: [
        { type: "Soil Carbon", value: 115, fill: "#8B4513" },
        { type: "Above-ground Biomass", value: 46, fill: "#228B22" },
        { type: "Below-ground Biomass", value: 28, fill: "#556B2F" }
      ]
    }
  },
  4: {
    title: "Coniferous Research Area",
    description: "Pine and spruce forest zone ideal for year-round carbon capture studies",
    image: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=600&h=400&fit=crop",
    tags: ["Coniferous", "Year-round", "Research"],
    carbonData: {
      totalCarbon: 298,
      carbonPerHectare: 225,
      annualSequestration: 15.3,
      soilCarbon: 185,
      biomassCarbon: 113,
      monthlyData: [
        { month: "Jan", sequestration: 11.2 },
        { month: "Feb", sequestration: 12.1 },
        { month: "Mar", sequestration: 14.8 },
        { month: "Apr", sequestration: 17.2 },
        { month: "May", sequestration: 19.5 },
        { month: "Jun", sequestration: 21.2 },
        { month: "Jul", sequestration: 22.1 },
        { month: "Aug", sequestration: 20.8 },
        { month: "Sep", sequestration: 18.6 },
        { month: "Oct", sequestration: 16.1 },
        { month: "Nov", sequestration: 13.8 },
        { month: "Dec", sequestration: 11.9 }
      ],
      carbonDistribution: [
        { type: "Soil Carbon", value: 185, fill: "#8B4513" },
        { type: "Above-ground Biomass", value: 70, fill: "#228B22" },
        { type: "Below-ground Biomass", value: 43, fill: "#556B2F" }
      ]
    }
  },
  5: {
    title: "Forest Edge Habitat",
    description: "Transition zone between forest and grassland showing ecological diversity",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop",
    tags: ["Edge Habitat", "Transition", "Diversity"],
    carbonData: {
      totalCarbon: 156,
      carbonPerHectare: 118,
      annualSequestration: 9.4,
      soilCarbon: 95,
      biomassCarbon: 61,
      monthlyData: [
        { month: "Jan", sequestration: 6.8 },
        { month: "Feb", sequestration: 7.5 },
        { month: "Mar", sequestration: 9.2 },
        { month: "Apr", sequestration: 11.8 },
        { month: "May", sequestration: 13.9 },
        { month: "Jun", sequestration: 15.2 },
        { month: "Jul", sequestration: 15.8 },
        { month: "Aug", sequestration: 14.6 },
        { month: "Sep", sequestration: 12.9 },
        { month: "Oct", sequestration: 10.7 },
        { month: "Nov", sequestration: 8.8 },
        { month: "Dec", sequestration: 7.2 }
      ],
      carbonDistribution: [
        { type: "Soil Carbon", value: 95, fill: "#8B4513" },
        { type: "Above-ground Biomass", value: 38, fill: "#228B22" },
        { type: "Below-ground Biomass", value: 23, fill: "#556B2F" }
      ]
    }
  }
};

const StudyAreaDashboard = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const studyArea = id ? studyAreaData[parseInt(id) as keyof typeof studyAreaData] : undefined;

  if (!studyArea) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Study Area Not Found</h2>
        <Button onClick={() => navigate("/")}>Return Home</Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Button 
          variant="ghost" 
          onClick={() => navigate("/")}
          className="mb-4"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Gallery
        </Button>
        
        <div className="bg-white/80 backdrop-blur-sm rounded-lg p-6 mb-8">
          <div className="grid md:grid-cols-2 gap-6 items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-4">
                {studyArea.title}
              </h1>
              <p className="text-gray-600 mb-4">
                {studyArea.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {studyArea.tags.map((tag, index) => (
                  <Badge key={index} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
            <div className="aspect-video overflow-hidden rounded-lg">
              <img 
                src={studyArea.image} 
                alt={studyArea.title}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Carbon Metrics Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Carbon Storage</CardTitle>
            <TreePine className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{studyArea.carbonData.totalCarbon} tons</div>
            <p className="text-xs text-muted-foreground">Carbon stored in ecosystem</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Carbon per Hectare</CardTitle>
            <Leaf className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{studyArea.carbonData.carbonPerHectare} tons/ha</div>
            <p className="text-xs text-muted-foreground">Density of carbon storage</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Annual Sequestration</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{studyArea.carbonData.annualSequestration} tons/year</div>
            <p className="text-xs text-muted-foreground">Carbon captured annually</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Soil vs Biomass</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{studyArea.carbonData.soilCarbon}:{studyArea.carbonData.biomassCarbon}</div>
            <p className="text-xs text-muted-foreground">Soil to biomass ratio (tons)</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid lg:grid-cols-2 gap-8 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Monthly Carbon Sequestration</CardTitle>
            <CardDescription>
              Carbon capture rates throughout the year (tons CO₂/month)
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={studyArea.carbonData.monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => [`${value} tons`, "Sequestration"]} />
                <Line 
                  type="monotone" 
                  dataKey="sequestration" 
                  stroke="#22c55e" 
                  strokeWidth={2}
                  dot={{ fill: "#22c55e", strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Carbon Distribution</CardTitle>
            <CardDescription>
              Distribution of carbon storage across different ecosystem components
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={studyArea.carbonData.carbonDistribution}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="type" />
                <YAxis />
                <Tooltip formatter={(value) => [`${value} tons`, "Carbon"]} />
                <Bar dataKey="value" fill="#22c55e" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StudyAreaDashboard;