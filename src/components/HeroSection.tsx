import { motion } from 'framer-motion';
import { useTranslation, Trans } from 'react-i18next';
import { Button } from './ui/button';
import { ArrowDown } from 'lucide-react';
import { HeroBackground } from './HeroBackground';

interface HeroSectionProps {
  scrollTo: (selector: string) => void;
}

export function HeroSection({ scrollTo }: HeroSectionProps) {
  const { t } = useTranslation();
  
  return (
    <section className="h-screen flex items-center justify-center relative overflow-hidden">
      <HeroBackground />
      <div className="flex flex-col items-center justify-center px-4 text-center z-10 w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl md:text-6xl font-bold mb-4 text-center"
          >
            <Trans 
              i18nKey="hero.title"
              components={{ bold: <strong className="text-primary" /> }}
            />
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg md:text-xl text-muted-foreground mb-8 text-center max-w-2xl"
          >
            <Trans 
              i18nKey="hero.subtitle"
              components={{ bold: <strong className="text-foreground" /> }}
            />
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex gap-4 justify-center"
          >
            <Button size="lg" onClick={() => scrollTo('#projects')}>{t('hero.viewWork')}</Button>
            <Button size="lg" variant="outline" onClick={() => scrollTo('#contact')}>{t('hero.getInTouch')}</Button>
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
