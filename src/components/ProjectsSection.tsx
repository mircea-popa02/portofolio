import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { ProjectCard, type Project } from './ProjectCard';

// Projects data moved from the separate file
const getProjects = (t: (key: string) => string): Project[] => [
  {
    id: 1,
    title: t('projects.items.ecommerce.title'),
    description: t('projects.items.ecommerce.description'),
    longDescription: "This comprehensive e-commerce solution was built using WordPress and WooCommerce, featuring custom plugins for enhanced functionality. The website includes advanced product management, custom payment integrations, and an optimized user experience designed to maximize conversions. Special attention was paid to SEO optimization and performance to ensure excellent search engine visibility and fast loading times.",
    technologies: ["WordPress", "WooCommerce", "PHP", "Custom Plugins", "MySQL", "SEO", "Analytics"],
    image: "/florarie-braila.png",
    images: [
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&h=400&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop&crop=center"
    ],
    liveUrl: "https://florariebraila.ro",
    featured: true
  },
  {
    id: 2,
    title: t('projects.items.presentation.title'),
    description: t('projects.items.presentation.description'),
    longDescription: "A modern presentation website built with React and TypeScript, featuring Google Maps integration and custom contact forms. The design is fully responsive and optimized for all devices. Special focus was placed on SEO optimization and performance to ensure excellent search engine visibility.",
    technologies: ["React", "TypeScript", "Google Maps API", "Contact Form", "Custom Design", "SEO Optimization"],
    image: "/noblesse-braila.png",
    images: [
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop&crop=center"
    ],
    liveUrl: "https://noblessebraila.ro",
    featured: true
  },
  {
    id: 3,
    title: t('projects.items.crm.title'),
    description: t('projects.items.crm.description'),
    longDescription: "A comprehensive CRM platform built with React, TypeScript, and Node.js. Features include customer relationship management, sales pipeline tracking, automated workflows, and detailed analytics. The system is designed to scale with growing businesses and includes role-based access control and customizable dashboards.",
    technologies: ["React", "TypeScript", "Node.js", "Express", "MySQL"],
    image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=600&h=400&fit=crop&crop=center",
    images: [
      "https://images.unsplash.com/photo-1551434678-e076c223a692?w=600&h=400&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop&crop=center"
    ],
    liveUrl: "https://crm-demo.com",
    featured: true
  },
  {
    id: 4,
    title: t('projects.items.weather.title'),
    description: t('projects.items.weather.description'),
    longDescription: "An interactive weather dashboard featuring real-time data visualization, forecasting capabilities, and location-based services. Built with React and Chart.js, the application provides beautiful charts and graphs to display weather patterns and trends. The responsive design ensures optimal viewing on all devices.",
    technologies: ["React", "Chart.js", "OpenWeather API", "CSS Grid"],
    image: "https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=600&h=400&fit=crop&crop=center",
    images: [
      "https://images.unsplash.com/photo-1592210454359-9043f067919b?w=600&h=400&fit=crop&crop=center"
    ],
    liveUrl: "https://weather-demo.com",
    featured: false
  },
  {
    id: 5,
    title: t('projects.items.portfolio.title'),
    description: t('projects.items.portfolio.description'),
    longDescription: "A modern portfolio website showcasing creative work with 3D animations, smooth transitions, and interactive elements. Built using React, Three.js, and Framer Motion, this project demonstrates advanced web technologies and modern design principles. The site features immersive 3D experiences and fluid animations that engage users.",
    technologies: ["React", "Three.js", "Framer Motion", "Tailwind CSS"],
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop&crop=center",
    images: [
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=400&fit=crop&crop=center"
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
