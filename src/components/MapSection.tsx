import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Navigation, Ruler, TreePine } from "lucide-react";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default markers in react-leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Custom tree icon
const treeIcon = new L.Icon({
  iconUrl: 'data:image/svg+xml;base64,' + btoa(`
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#16a34a" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M12 2v20"/>
      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
    </svg>
  `),
  iconSize: [24, 24],
  iconAnchor: [12, 24],
  popupAnchor: [0, -24],
});

// Sample tree locations data
const treeSites = [
  {
    id: 1,
    name: "Main Grove",
    position: [40.7128, -74.0060] as [number, number],
    treeCount: 342,
    species: "Oak & Maple",
    carbonCapture: "12.5 tons/year"
  },
  {
    id: 2,
    name: "East Woodland",
    position: [40.7158, -73.9990] as [number, number],
    treeCount: 218,
    species: "Pine & Cedar",
    carbonCapture: "8.2 tons/year"
  },
  {
    id: 3,
    name: "South Gardens",
    position: [40.7098, -74.0100] as [number, number],
    treeCount: 156,
    species: "Birch & Willow",
    carbonCapture: "5.8 tons/year"
  },
  {
    id: 4,
    name: "West Park",
    position: [40.7140, -74.0120] as [number, number],
    treeCount: 289,
    species: "Elm & Ash",
    carbonCapture: "10.1 tons/year"
  }
];

const MapSection = () => {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-green-800 mb-4">
          Site Location & Tree Coverage
        </h2>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Interactive map showing tree locations and their contribution to carbon capture across different sites
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
          <CardTitle className="text-center text-green-800">Interactive Tree Location Map</CardTitle>
          <CardDescription className="text-center">
            Click on tree markers to view detailed information about each site's carbon capture contribution
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-96 rounded-lg overflow-hidden">
            <MapContainer
              center={[40.7128, -74.0060]}
              zoom={14}
              style={{ height: '100%', width: '100%' }}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              {treeSites.map((site) => (
                <Marker
                  key={site.id}
                  position={site.position}
                  icon={treeIcon}
                >
                  <Popup>
                    <div className="text-center">
                      <h3 className="font-bold text-green-800 mb-2">{site.name}</h3>
                      <div className="space-y-1 text-sm">
                        <p><strong>Trees:</strong> {site.treeCount}</p>
                        <p><strong>Species:</strong> {site.species}</p>
                        <p><strong>Carbon Capture:</strong> {site.carbonCapture}</p>
                      </div>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
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
