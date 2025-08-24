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
import { useTranslation } from 'react-i18next';

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

export function ProjectCard({ project }: ProjectCardProps) {
  const { t } = useTranslation();

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <div className="group cursor-pointer">
          <div className="bg-opacity-60 bg-secondary/30 border border-border rounded-xl overflow-hidden shadow-2xl hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
            <div className="aspect-video overflow-hidden">
              {project.image ? (
                <img
                  src={project.image}
                  alt={project.title}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              ) : (
                <div className="w-full h-full bg-muted flex items-center justify-center text-muted-foreground text-sm">
                  {t('projects.noPreview', 'No preview')}
                </div>
              )}
            </div>
            <div className="p-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                {project.featured && (
                  <Badge variant="secondary" className="text-xs">
                    {t('projects.featured')}
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
                    +{project.technologies.length - 3} {t('projects.more')}
                  </Badge>
                )}
              </div>
              <div className="flex items-center text-primary text-sm font-medium group-hover:text-primary/80 transition-colors">
                {t('projects.viewProject')}
                <ChevronRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>
        </div>
      </DrawerTrigger>

      <DrawerContent className="md:max-h-[90vh] max-w-5xl mx-auto">
        <div className="mx-auto w-full flex flex-col h-full overflow-hidden">
          <DrawerHeader className="relative flex-shrink-0">
            <DrawerClose asChild>
              <Button variant="ghost" size="icon" className="absolute right-4 top-4">
                <X className="h-4 w-4" />
                <span className="sr-only">{t('projects.close')}</span>
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
            {/* Masonry gallery */}
            <div className="columns-2 md:columns-3 gap-3 mb-6 [column-fill:_balance]">
              {/* Main image */}
              {project.image && (
                <div className="mb-3 break-inside-avoid">
                  <img
                    src={project.image}
                    alt={project.title}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-auto rounded-lg object-cover"
                  />
                  <p className="text-xs text-muted-foreground text-center mt-2">{t('projects.gallery.main')}</p>
                </div>
              )}
              {/* Additional images */}
              {project.images.map((image, index) => {
                const src = typeof image === 'string' ? image : image.src
                const description = typeof image === 'string' ? t('projects.gallery.screenshot', { index: index + 1 }) : image.description
                if (!src) return null
                return (
                  <div key={index} className="mb-3 break-inside-avoid">
                    <img
                      src={src}
                      alt={description}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-auto rounded-lg object-cover"
                    />
                    <p className="text-xs text-muted-foreground text-center mt-2">{description}</p>
                  </div>
                );
              })}
            </div>

            <div className="space-y-6">
              <div>
                <h4 className="text-lg font-semibold mb-3">{t('projects.about')}</h4>
                <p className="text-muted-foreground leading-relaxed">
                  {project.longDescription}
                </p>
              </div>

              <div>
                <h4 className="text-lg font-semibold mb-3">{t('projects.technologiesUsed')}</h4>
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
                <Button
                className="flex-1 shadow-lg"
                onClick={() =>
                  window.open(project.liveUrl, '_blank', 'noopener,noreferrer')
                }
                >
                <ExternalLink className="mr-2 h-4 w-4" />
                {t('projects.viewLiveDemo')}
                </Button>
              <DrawerClose asChild>
                <Button variant="outline" className="flex-1">
                  {t('projects.close')}
                </Button>
              </DrawerClose>
            </div>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
