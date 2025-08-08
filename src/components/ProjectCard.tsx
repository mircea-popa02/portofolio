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
  images: Array<string | { src: string; description: string }>;
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

      <DrawerContent className="max-h-[90vh] md:max-h-[90vh] max-w-5xl mx-auto">
        <div className="mx-auto w-full flex flex-col h-full overflow-hidden">
          <DrawerHeader className="relative flex-shrink-0">
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
          
          <div className="flex-1 overflow-y-auto overscroll-contain p-6 pb-24 min-h-0">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6">
              <div className="space-y-2">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full aspect-video rounded-lg object-cover"
                />
                <p className="text-xs text-muted-foreground text-center">Main Screenshot</p>
              </div>
              {project.images.map((image, index) => {
                if (typeof image === 'string') {
                  return (
                    <div key={index} className="space-y-2">
                      <img
                        src={image}
                        alt={`${project.title} screenshot ${index + 1}`}
                        className="w-full aspect-video rounded-lg object-cover"
                      />
                      <p className="text-xs text-muted-foreground text-center">Screenshot {index + 1}</p>
                    </div>
                  );
                } else {
                  return (
                    <div key={index} className="space-y-2">
                      <img
                        src={image.src}
                        alt={image.description}
                        className="w-full aspect-video rounded-lg object-cover"
                      />
                      <p className="text-xs text-muted-foreground text-center">{image.description}</p>
                    </div>
                  );
                }
              })}
            </div>

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
            </div>
          </div>

          <DrawerFooter className="absolute bottom-0 left-0 right-0 border-t bg-background/95 backdrop-blur-sm rounded-b-2xl">
            <div className="flex gap-4 px-2">
              <Button asChild className="flex-1 shadow-lg">
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
