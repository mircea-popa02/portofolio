import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Menu, X } from 'lucide-react';
import { ModeToggle } from './ui/mode-toggle';
import { LanguageSwitcher } from './LanguageSwitcher';

interface NavigationProps {
  scrollTo: (selector: string) => void;
  currentSection: string;
}

export function Navigation({ scrollTo, currentSection }: NavigationProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { t } = useTranslation();
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target as Node) && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMobileMenuOpen]);

  const navItems = [
    { href: '#home', label: t('navigation.home'), id: 'home' },
    { href: '#about', label: t('navigation.about'), id: 'about' },
    { href: '#technologies', label: t('navigation.technologies'), id: 'technologies' },
    { href: '#projects', label: t('navigation.projects'), id: 'projects' },
    { href: '#contact', label: t('navigation.contact'), id: 'contact' },
  ];

  return (
    <>
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
              whileHover={{ scale: 1.00 }}
              whileTap={{ scale: 1.00 }}
            >
              proiecte<strong className='text-foreground'>software.ro</strong>
            </motion.a>

            <div className="flex items-center gap-8">
              <div className="hidden md:flex items-center gap-2">
                {navItems.map((item) => (
                  <motion.a
                    key={item.href}
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollTo(item.href);
                    }}
                    className={`relative text-sm font-medium transition-colors cursor-pointer px-3 py-2 ${
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
                        transition={{ 
                          type: "tween", 
                          duration: 0.2,
                          ease: "easeInOut"
                        }}
                      />
                    )}
                  </motion.a>
                ))}
              </div>
              
              <div className="hidden md:flex items-center gap-4">
                <LanguageSwitcher />
                <span aria-hidden className="h-6 w-px bg-border" />
                <ModeToggle />
              </div>

              <div className="flex md:hidden items-center gap-4">
                <motion.button
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="p-2 text-foreground hover:text-primary transition-colors"
                  whileTap={{ scale: 0.95 }}
                  aria-label={isMobileMenuOpen ? t('navigation.closeMenu') : t('navigation.openMenu')}
                >
                  {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </motion.button>
              </div>
            </div>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            ref={mobileMenuRef}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed top-16 left-0 right-0 z-40 bg-background/50 backdrop-blur-md border-b border-border md:hidden shadow-lg"
          >
            <div className="container mx-auto px-4 py-4">
              <div className="flex flex-col gap-4">
                {navItems.map((item) => (
                  <motion.a
                    key={item.href}
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollTo(item.href);
                      setIsMobileMenuOpen(false);
                    }}
                    className={`text-sm font-medium transition-colors cursor-pointer px-3 py-2 ${
                      currentSection === item.id ? 'text-primary' : 'text-muted-foreground hover:text-primary'
                    }`}
                    whileTap={{ scale: 0.95 }}
                  >
                    {item.label}
                  </motion.a>
                ))}
                
                {/* Mobile Settings */}
                <div className="border-t border-border pt-4 mt-2">
                  <div className="flex items-center justify-between px-3 py-2">
                    <span className="text-sm font-medium text-muted-foreground">{t('navigation.language')}</span>
                    <LanguageSwitcher />
                  </div>
                  <div className="flex items-center justify-between px-3 py-2">
                    <span className="text-sm font-medium text-muted-foreground">{t('navigation.theme')}</span>
                    <ModeToggle />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
