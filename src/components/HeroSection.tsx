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
      
      {/* Animated gradient blobs */}
      <div className="absolute inset-0 pointer-events-none">
      <motion.div
        className="absolute top-1/4 left-1/4 w-[50rem] h-[50rem] bg-gradient-to-br from-primary/10 to-purple-500/20 rounded-full blur-3xl opacity-60"
        animate={{
        x: [0, 150, -100, 0],
        y: [0, -120, 100, 0],
        }}
        transition={{
        duration: 18,
        repeat: Infinity,
        ease: "easeInOut"
        }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-[40vw] h-[30vw] bg-gradient-to-br from-blue-500/30 to-primary/30 rounded-full blur-3xl opacity-60"
        animate={{
        x: [0, -150, 120, 0],
        y: [0, 130, -80, 0],
        }}
        transition={{
        duration: 22,
        repeat: Infinity,
        ease: "easeInOut",
        delay: 4
        }}
      />
      <motion.div
        className="absolute top-1/2 right-1/3 w-[45vw] h-[35vw] bg-gradient-to-tr from-orange-500/20 to-amber-400/30 rounded-full blur-3xl opacity-20"
        animate={{
        x: [0, 120, -80, 0],
        y: [0, -100, 150, 0],
        }}
        transition={{
        duration: 20,
        repeat: Infinity,
        ease: "easeInOut",
        delay: 2
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
