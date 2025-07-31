export interface Project {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  image: string;
  githubUrl?: string;
  liveUrl?: string;
  featured: boolean;
}

export const getProjects = (t: (key: string) => string): Project[] => [
  {
    id: 1,
    title: t('projects.items.ecommerce.title'),
    description: t('projects.items.ecommerce.description'),
    technologies: ["React", "Node.js", "PostgreSQL", "Stripe", "Tailwind CSS"],
    image: "/api/placeholder/600/400",
    githubUrl: "https://github.com/yourusername/ecommerce",
    liveUrl: "https://ecommerce-demo.com",
    featured: true
  },
  {
    id: 2,
    title: t('projects.items.taskmanager.title'),
    description: t('projects.items.taskmanager.description'),
    technologies: ["React", "TypeScript", "Socket.io", "Express", "MongoDB"],
    image: "/api/placeholder/600/400",
    githubUrl: "https://github.com/yourusername/taskmanager",
    liveUrl: "https://taskmanager-demo.com",
    featured: true
  },
  {
    id: 3,
    title: t('projects.items.weather.title'),
    description: t('projects.items.weather.description'),
    technologies: ["React", "Chart.js", "OpenWeather API", "CSS Grid"],
    image: "/api/placeholder/600/400",
    githubUrl: "https://github.com/yourusername/weather",
    liveUrl: "https://weather-demo.com",
    featured: false
  },
  {
    id: 4,
    title: t('projects.items.portfolio.title'),
    description: t('projects.items.portfolio.description'),
    technologies: ["React", "Three.js", "Framer Motion", "Tailwind CSS"],
    image: "/api/placeholder/600/400",
    githubUrl: "https://github.com/yourusername/portfolio",
    liveUrl: "https://yourportfolio.com",
    featured: false
  }
];
