import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const studyAreas = [
  {
    id: 1,
    title: "Programming Lab",
    description: "Modern computer lab with Java development environment",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600&h=400&fit=crop",
    tags: ["Programming", "Java", "Lab"]
  },
  {
    id: 2,
    title: "Web Development Studio",
    description: "Collaborative space for web coding and design",
    image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=600&h=400&fit=crop",
    tags: ["Web Dev", "Coding", "Design"]
  },
  {
    id: 3,
    title: "Individual Study Space",
    description: "Quiet workspace with MacBook setup for focused coding",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&h=400&fit=crop",
    tags: ["Individual", "Quiet", "MacBook"]
  },
  {
    id: 4,
    title: "Modern Workstation",
    description: "Clean workspace with iMac and professional setup",
    image: "https://images.unsplash.com/photo-1483058712412-4245e9b90334?w=600&h=400&fit=crop",
    tags: ["iMac", "Professional", "Clean"]
  },
  {
    id: 5,
    title: "Collaborative Learning",
    description: "Group study area with multiple laptop workstations",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=600&h=400&fit=crop",
    tags: ["Group", "Collaborative", "Multiple Laptops"]
  }
];

const GallerySection = () => {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-green-800 mb-4">
          Study Areas Gallery
        </h2>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Explore our diverse collection of study spaces designed for different learning styles and technical requirements
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {studyAreas.map((area) => (
          <Card key={area.id} className="bg-white/80 backdrop-blur-sm border-green-200 hover:shadow-lg transition-shadow duration-300">
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
        ))}
      </div>
    </div>
  );
};

export default GallerySection;