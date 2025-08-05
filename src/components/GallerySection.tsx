import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const studyAreas = [
  {
    id: 1,
    title: "Old Growth Forest",
    description: "Mature forest ecosystem with diverse canopy layers and high carbon storage capacity",
    image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600&h=400&fit=crop",
    tags: ["Old Growth", "Carbon Storage", "Biodiversity"],
    link: "https://www.fs.usda.gov/managing-land/national-forests-grasslands/forest-management"
  },
  {
    id: 2,
    title: "Urban Forest Canopy",
    description: "City forest management area showing tree density and urban integration",
    image: "https://images.unsplash.com/photo-1574263867128-b8b7c28a4b53?w=600&h=400&fit=crop",
    tags: ["Urban", "Canopy", "City Planning"],
    link: "https://greeninfrastructureontario.org/urban-forests/"
  },
  {
    id: 3,
    title: "Mixed Deciduous Forest",
    description: "Seasonal forest study site with oak, maple, and birch species",
    image: "https://images.unsplash.com/photo-1476231682828-37e571bc172f?w=600&h=400&fit=crop",
    tags: ["Deciduous", "Seasonal", "Mixed Species"],
    link: "https://www.nrs.fs.usda.gov/news/releases/forest-research-shows-importance-managing-mixed-species-forests"
  },
  {
    id: 4,
    title: "Coniferous Research Area",
    description: "Pine and spruce forest zone ideal for year-round carbon capture studies",
    image: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=600&h=400&fit=crop",
    tags: ["Coniferous", "Year-round", "Research"],
    link: "https://www.nature.com/subjects/forest-ecology"
  },
  {
    id: 5,
    title: "Forest Edge Habitat",
    description: "Transition zone between forest and grassland showing ecological diversity",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop",
    tags: ["Edge Habitat", "Transition", "Diversity"],
    link: "https://www.sciencedirect.com/topics/agricultural-and-biological-sciences/forest-edge"
  }
];

const GallerySection = () => {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-green-800 mb-4">
          Forest Study Areas [Title TBD]
        </h2>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Explore diverse forest ecosystems and their role in carbon capture and environmental sustainability
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {studyAreas.map((area) => (
          <a key={area.id} href={area.link} target="_blank" rel="noopener noreferrer" className="block">
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
          </a>
        ))}
      </div>
    </div>
  );
};

export default GallerySection;
