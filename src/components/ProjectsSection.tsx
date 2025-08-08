import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { ProjectCard, type Project } from './ProjectCard';

// Projects data moved from the separate file
const getProjects = (t: (key: string) => string): Project[] => [
  {
    id: 1,
    title: t('projects.items.ecommerce.title'),
    description: t('projects.items.ecommerce.description'),
    longDescription: t('projects.items.ecommerce.longDescription'),
    technologies: ["WordPress", "WooCommerce", "PHP", "Custom Plugins", "MySQL", "SEO", "Analytics"],
    image: "/florarie-braila.png",
    images: [
      { src: "/florariebraila-product.png", description: t('projects.items.ecommerce.images.product') },
      { src: "/florariebraila-products.png", description: t('projects.items.ecommerce.images.products') },
      { src: "/florariebraila-filters.png", description: t('projects.items.ecommerce.images.filters') }
    ],
    liveUrl: "https://florariebraila.ro",
    featured: true
  },
  {
    id: 2,
    title: t('projects.items.presentation.title'),
    description: t('projects.items.presentation.description'),
    longDescription: t('projects.items.presentation.longDescription'),
    technologies: ["React", "TypeScript", "Google Maps API", "Contact Form", "Custom Design", "SEO Optimization"],
    image: "/noblesse-braila.png",
    images: [
      { src: "", description: "" }
    ],
    liveUrl: "https://noblessebraila.ro",
    featured: true
  },
  {
    id: 3,
    title: t('projects.items.crm.title'),
    description: t('projects.items.crm.description'),
    longDescription: t('projects.items.crm.longDescription'),
    technologies: ["React", "TypeScript", "Node.js", "Express", "MySQL"],
    image: "",
    images: [
      { src: "", description: "" }
    ],
    liveUrl: "https://crm-demo.com",
    featured: true
  },
  {
    id: 4,
    title: t('projects.items.weather.title'),
    description: t('projects.items.weather.description'),
    longDescription: t('projects.items.weather.longDescription'),
    technologies: ["React", "Chart.js", "OpenWeather API", "CSS Grid"],
    image: "",
    images: [
      { src: "", description: "" }
    ],
    liveUrl: "https://weather-demo.com",
    featured: false
  },
  {
    id: 5,
    title: t('projects.items.portfolio.title'),
    description: t('projects.items.portfolio.description'),
    longDescription: t('projects.items.portfolio.longDescription'),
    technologies: ["React", "Three.js", "Framer Motion", "Tailwind CSS"],
    image: "",
    images: [
      { src: "", description: "" }
    ],
    liveUrl: "https://yourportfolio.com",
    featured: false
  }
];

export function ProjectsSection() {
  const { t } = useTranslation();
  const projects = getProjects(t);
  const featuredProjects = projects.filter(project => project.featured);
  const otherProjects = projects.filter(project => !project.featured);

  return (
    <section id="projects" className="py-20 relative">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(120,119,198,0.15),rgba(255,255,255,0))]"></div>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold mb-6 text-foreground">{t('projects.featuredTitle')}</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t('projects.featuredDescription')}
          </p>
        </motion.div>

        {/* Featured Projects */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {featuredProjects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>

        {/* Other Projects */}
        {otherProjects.length > 0 && (
          <>
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-2xl font-semibold mb-8 text-center"
            >
              {t('projects.otherTitle')}
            </motion.h3>
            <div className="grid md:grid-cols-2 gap-6">
              {otherProjects.map((project, index) => (
                <ProjectCard key={project.id} project={project} index={index + featuredProjects.length} />
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
