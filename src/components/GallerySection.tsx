import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { Plus } from "lucide-react";

interface StudyArea {
  id: number;
  title: string;
  description: string;
  image: string;
  tags: string[];
  csvData?: string;
  isCustom?: boolean;
}

const defaultStudyAreas: StudyArea[] = [
  {
    id: 1,
    title: "Old Growth Forest",
    description: "Mature forest ecosystem with diverse canopy layers and high carbon storage capacity",
    image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600&h=400&fit=crop",
    tags: ["Old Growth", "Carbon Storage", "Biodiversity"]
  },
  {
    id: 2,
    title: "Urban Forest Canopy",
    description: "City forest management area showing tree density and urban integration",
    image: "https://images.unsplash.com/photo-1574263867128-b8b7c28a4b53?w=600&h=400&fit=crop",
    tags: ["Urban", "Canopy", "City Planning"]
  },
  {
    id: 3,
    title: "Mixed Deciduous Forest",
    description: "Seasonal forest study site with oak, maple, and birch species",
    image: "https://images.unsplash.com/photo-1476231682828-37e571bc172f?w=600&h=400&fit=crop",
    tags: ["Deciduous", "Seasonal", "Mixed Species"]
  },
  {
    id: 4,
    title: "Coniferous Research Area",
    description: "Pine and spruce forest zone ideal for year-round carbon capture studies",
    image: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=600&h=400&fit=crop",
    tags: ["Coniferous", "Year-round", "Research"]
  },
  {
    id: 5,
    title: "Forest Edge Habitat",
    description: "Transition zone between forest and grassland showing ecological diversity",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop",
    tags: ["Edge Habitat", "Transition", "Diversity"]
  }
];

const GallerySection = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [studyAreas, setStudyAreas] = useState<StudyArea[]>(() => {
    const saved = localStorage.getItem('customStudyAreas');
    return saved ? [...defaultStudyAreas, ...JSON.parse(saved)] : defaultStudyAreas;
  });
  
  const [isAdminDialogOpen, setIsAdminDialogOpen] = useState(false);
  const [isAdmin] = useState(true); // For demo - in real app, check user auth
  const [newStudyArea, setNewStudyArea] = useState({
    title: '',
    description: '',
    csvFile: null as File | null
  });

  const handleStudyAreaClick = (id: number) => {
    navigate(`/study-area/${id}`);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type === 'text/csv') {
      setNewStudyArea(prev => ({ ...prev, csvFile: file }));
    } else {
      toast({
        title: "Invalid file",
        description: "Please select a CSV file",
        variant: "destructive"
      });
    }
  };

  const handleCreateStudyArea = async () => {
    if (!newStudyArea.title || !newStudyArea.description || !newStudyArea.csvFile) {
      toast({
        title: "Missing information",
        description: "Please fill in all fields and select a CSV file",
        variant: "destructive"
      });
      return;
    }

    try {
      const csvText = await newStudyArea.csvFile.text();
      const newId = Math.max(...studyAreas.map(area => area.id)) + 1;
      
      const customStudyArea: StudyArea = {
        id: newId,
        title: newStudyArea.title,
        description: newStudyArea.description,
        image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600&h=400&fit=crop",
        tags: ["Custom", "CSV Data", "Admin Created"],
        csvData: csvText,
        isCustom: true
      };

      const updatedStudyAreas = [...studyAreas, customStudyArea];
      setStudyAreas(updatedStudyAreas);
      
      // Save custom areas to localStorage
      const customAreas = updatedStudyAreas.filter(area => area.isCustom);
      localStorage.setItem('customStudyAreas', JSON.stringify(customAreas));
      
      setIsAdminDialogOpen(false);
      setNewStudyArea({ title: '', description: '', csvFile: null });
      
      toast({
        title: "Success",
        description: "New study area created successfully"
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to process CSV file",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <div className="flex justify-between items-center mb-4">
          <div className="flex-1">
            <h2 className="text-4xl font-bold text-green-800">
              Forest Study Areas [Title TBD]
            </h2>
          </div>
          {isAdmin && (
            <Button 
              onClick={() => setIsAdminDialogOpen(true)}
              className="bg-green-600 hover:bg-green-700 text-white"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Study Area
            </Button>
          )}
        </div>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Explore diverse forest ecosystems and their role in carbon capture and environmental sustainability
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {studyAreas.map((area) => (
          <div 
            key={area.id} 
            onClick={() => handleStudyAreaClick(area.id)}
            className="block cursor-pointer"
          >
            <Card className="bg-white/80 backdrop-blur-sm border-green-200 hover:shadow-lg transition-shadow duration-300 hover:scale-105 transform transition-transform">
              <div className="aspect-video overflow-hidden rounded-t-lg">
                <img 
                  src={area.image} 
                  alt={area.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {area.title}
                </h3>
                <p className="text-gray-600 mb-4">
                  {area.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {area.tags.map((tag, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>

      <Dialog open={isAdminDialogOpen} onOpenChange={setIsAdminDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Add New Study Area</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={newStudyArea.title}
                onChange={(e) => setNewStudyArea(prev => ({ ...prev, title: e.target.value }))}
                placeholder="Enter study area title"
              />
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={newStudyArea.description}
                onChange={(e) => setNewStudyArea(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Enter study area description"
                rows={3}
              />
            </div>
            <div>
              <Label htmlFor="csvFile">CSV File</Label>
              <Input
                id="csvFile"
                type="file"
                accept=".csv"
                onChange={handleFileChange}
              />
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsAdminDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreateStudyArea}>
                Create Study Area
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default GallerySection;
