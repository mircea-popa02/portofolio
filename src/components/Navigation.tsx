import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ModeToggle } from './ui/mode-toggle';

interface NavigationProps {
  scrollTo: (selector: string) => void;
  currentSection: string;
}

export function Navigation({ scrollTo, currentSection }: NavigationProps) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { href: '#about', label: 'About', id: 'about' },
    { href: '#projects', label: 'Projects', id: 'projects' },
    { href: '#contact', label: 'Contact', id: 'contact' },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-background/80 backdrop-blur-md border-b border-border' 
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <motion.a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              scrollTo('#home');
            }}
            className="text-xl font-bold cursor-pointer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            MP
          </motion.a>

          <div className="flex items-center gap-8">
            <div className="hidden md:flex items-center gap-6">
              {navItems.map((item) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollTo(item.href);
                  }}
                  className={`relative text-sm font-medium transition-colors cursor-pointer ${
                    currentSection === item.id ? 'text-primary' : 'text-muted-foreground hover:text-primary'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {item.label}
                  {currentSection === item.id && (
                    <motion.div
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary"
                      layoutId="underline"
                    />
                  )}
                </motion.a>
              ))}
            </div>
            <ModeToggle />
          </div>
        </div>
      </div>
    </motion.nav>
  );
}
