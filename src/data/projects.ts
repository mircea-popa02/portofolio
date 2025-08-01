export interface Project {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  image: string;
  liveUrl?: string;
  featured: boolean;
}

export const getProjects = (t: (key: string) => string): Project[] => [
  {
    id: 1,
    title: t('projects.items.ecommerce.title'),
    description: t('projects.items.ecommerce.description'),
    technologies: ["React", "Node.js", "PostgreSQL", "Stripe", "Tailwind CSS"],
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop&crop=center",
    liveUrl: "https://ecommerce-demo.com",
    featured: true
  },
  {
    id: 2,
    title: t('projects.items.taskmanager.title'),
    description: t('projects.items.taskmanager.description'),
    technologies: ["React", "TypeScript", "Socket.io", "Express", "MongoDB"],
    image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=600&h=400&fit=crop&crop=center",
    liveUrl: "https://taskmanager-demo.com",
    featured: true
  },
  {
    id: 3,
    title: t('projects.items.crm.title'),
    description: t('projects.items.crm.description'),
    technologies: ["React", "TypeScript", "Node.js", "Express", "MySQL"],
    image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=600&h=400&fit=crop&crop=center",
    liveUrl: "https://crm-demo.com",
    featured: true
  },
  {
    id: 4,
    title: t('projects.items.weather.title'),
    description: t('projects.items.weather.description'),
    technologies: ["React", "Chart.js", "OpenWeather API", "CSS Grid"],
    image: "https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=600&h=400&fit=crop&crop=center",
    liveUrl: "https://weather-demo.com",
    featured: false
  },
  {
    id: 5,
    title: t('projects.items.portfolio.title'),
    description: t('projects.items.portfolio.description'),
    technologies: ["React", "Three.js", "Framer Motion", "Tailwind CSS"],
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop&crop=center",
    liveUrl: "https://yourportfolio.com",
    featured: false
  }
];
