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
      
      {/* Animated gradient blobs - Desktop only */}
      <div className="hidden md:block absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-1/4 left-1/4 w-[50rem] h-[50rem] bg-gradient-to-br from-primary/8 to-purple-500/15 rounded-full blur-3xl opacity-60 will-change-transform"
          animate={{
            x: [0, 75, -50, 0],
            y: [0, -60, 50, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
            repeatType: "loop"
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-[40vw] h-[30vw] bg-gradient-to-br from-blue-500/20 to-primary/20 rounded-full blur-3xl opacity-60 will-change-transform"
          animate={{
            x: [0, -75, 60, 0],
            y: [0, 65, -40, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
            repeatType: "loop"
          }}
        />
        <motion.div
          className="absolute top-1/2 right-1/3 w-[45vw] h-[35vw] bg-gradient-to-tr from-orange-500/15 to-amber-400/20 rounded-full blur-3xl opacity-20 will-change-transform"
          animate={{
            x: [0, 60, -40, 0],
            y: [0, -50, 75, 0],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear",
            repeatType: "loop"
          }}
        />
      </div>

      <div className="flex flex-col items-center justify-center p-12 text-center z-10 w-full max-w-2xl mx-auto">
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
