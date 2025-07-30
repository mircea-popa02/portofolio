import { motion } from 'framer-motion';
import { Button } from './ui/button';
import { ArrowDown } from 'lucide-react';
import { HeroBackground } from './HeroBackground';

interface HeroSectionProps {
  scrollTo: (selector: string) => void;
}

export function HeroSection({ scrollTo }: HeroSectionProps) {
  return (
    <section className="h-screen flex items-center justify-center relative overflow-hidden">
      <HeroBackground />
      <div className="container mx-auto px-4 text-center z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl md:text-6xl font-bold mb-4 text-center bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent"
          >
            Mircea Popa
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg md:text-xl text-muted-foreground mb-8 text-center max-w-2xl"
          >
            Creative Developer & 3D Artist crafting immersive digital experiences.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex gap-4"
          >
            <Button size="lg" onClick={() => scrollTo('#projects')}>View My Work</Button>
            <Button size="lg" variant="outline" onClick={() => scrollTo('#contact')}>Get In Touch</Button>
          </motion.div>
        </motion.div>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.8 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <button onClick={() => scrollTo('#about')} className="animate-bounce">
          <ArrowDown className="h-6 w-6 text-muted-foreground" />
        </button>
      </motion.div>
    </section>
  );
}
