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

export const projects: Project[] = [
  {
    id: 1,
    title: "E-Commerce Platform",
    description: "A full-stack e-commerce solution built with React, Node.js, and PostgreSQL. Features include user authentication, payment processing, and admin dashboard.",
    technologies: ["React", "Node.js", "PostgreSQL", "Stripe", "Tailwind CSS"],
    image: "/api/placeholder/600/400",
    githubUrl: "https://github.com/yourusername/ecommerce",
    liveUrl: "https://ecommerce-demo.com",
    featured: true
  },
  {
    id: 2,
    title: "Task Management App",
    description: "A collaborative task management application with real-time updates, drag-and-drop functionality, and team collaboration features.",
    technologies: ["React", "TypeScript", "Socket.io", "Express", "MongoDB"],
    image: "/api/placeholder/600/400",
    githubUrl: "https://github.com/yourusername/taskmanager",
    liveUrl: "https://taskmanager-demo.com",
    featured: true
  },
  {
    id: 3,
    title: "Weather Dashboard",
    description: "A responsive weather dashboard that displays current conditions and forecasts using external weather APIs with beautiful data visualizations.",
    technologies: ["React", "Chart.js", "OpenWeather API", "CSS Grid"],
    image: "/api/placeholder/600/400",
    githubUrl: "https://github.com/yourusername/weather",
    liveUrl: "https://weather-demo.com",
    featured: false
  },
  {
    id: 4,
    title: "Portfolio Website",
    description: "A modern portfolio website built with React, Three.js, and Framer Motion featuring 3D animations and smooth scroll effects.",
    technologies: ["React", "Three.js", "Framer Motion", "Tailwind CSS"],
    image: "/api/placeholder/600/400",
    githubUrl: "https://github.com/yourusername/portfolio",
    liveUrl: "https://yourportfolio.com",
    featured: true
  }
];
