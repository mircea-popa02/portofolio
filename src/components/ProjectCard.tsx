import { motion } from 'framer-motion';
import { ExternalLink, ChevronRight, X } from 'lucide-react';
import { Button } from './ui/button';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from './ui/drawer';
import { Badge } from './ui/badge';

export interface Project {
  id: number;
  title: string;
  description: string;
  longDescription: string;
  technologies: string[];
  image: string;
  images: string[];
  liveUrl: string;
  featured: boolean;
}

interface ProjectCardProps {
  project: Project;
  index: number;
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: index * 0.1 }}
          viewport={{ once: true }}
          className="group cursor-pointer"
        >
          <div className="bg-card border border-border rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
            <div className="aspect-video overflow-hidden">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="p-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                {project.featured && (
                  <Badge variant="secondary" className="text-xs">
                    Featured
                  </Badge>
                )}
              </div>
              <p className="text-muted-foreground mb-4 line-clamp-2">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                {project.technologies.slice(0, 3).map((tech) => (
                  <Badge key={tech} variant="outline" className="text-xs">
                    {tech}
                  </Badge>
                ))}
                {project.technologies.length > 3 && (
                  <Badge variant="outline" className="text-xs">
                    +{project.technologies.length - 3} more
                  </Badge>
                )}
              </div>
              <div className="flex items-center text-primary text-sm font-medium group-hover:text-primary/80 transition-colors">
                Click to view details
                <ChevronRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>
        </motion.div>
      </DrawerTrigger>
      
      <DrawerContent className="max-h-[90vh]">
        <div className="mx-auto w-full max-w-4xl">
          <DrawerHeader className="relative">
            <DrawerClose asChild>
              <Button variant="ghost" size="icon" className="absolute right-4 top-4">
                <X className="h-4 w-4" />
                <span className="sr-only">Close</span>
              </Button>
            </DrawerClose>
            <DrawerTitle className="text-2xl font-bold pr-12">
              {project.title}
            </DrawerTitle>
            <DrawerDescription className="text-base">
              {project.description}
            </DrawerDescription>
          </DrawerHeader>
          
          <div className="p-6 overflow-y-auto max-h-[60vh]">
            {/* Image Gallery */}
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div className="aspect-video overflow-hidden rounded-lg">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
              </div>
              {project.images.length > 0 && (
                <div className="grid gap-2">
                  {project.images.slice(0, 2).map((image, index) => (
                    <div key={index} className="aspect-video overflow-hidden rounded-lg">
                      <img
                        src={image}
                        alt={`${project.title} screenshot ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Project Details */}
            <div className="space-y-6">
              <div>
                <h4 className="text-lg font-semibold mb-3">About This Project</h4>
                <p className="text-muted-foreground leading-relaxed">
                  {project.longDescription}
                </p>
              </div>

              <div>
                <h4 className="text-lg font-semibold mb-3">Technologies Used</h4>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <Badge key={tech} variant="secondary">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>

              {project.images.length > 2 && (
                <div>
                  <h4 className="text-lg font-semibold mb-3">More Screenshots</h4>
                  <div className="grid md:grid-cols-3 gap-4">
                    {project.images.slice(2).map((image, index) => (
                      <div key={index} className="aspect-video overflow-hidden rounded-lg">
                        <img
                          src={image}
                          alt={`${project.title} screenshot ${index + 3}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
          
          <DrawerFooter>
            <div className="flex gap-4">
              <Button asChild className="flex-1">
                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="mr-2 h-4 w-4" />
                  View Live Demo
                </a>
              </Button>
              <DrawerClose asChild>
                <Button variant="outline" className="flex-1">
                  Close
                </Button>
              </DrawerClose>
            </div>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
