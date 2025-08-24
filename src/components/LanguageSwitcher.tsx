import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

export function LanguageSwitcher() {
  const { i18n, t } = useTranslation();

  const options = [
    { code: 'en', label: 'EN', name: t('language.english'), flag: '🇺🇸' },
    { code: 'ro', label: 'RO', name: t('language.romanian'), flag: '🇷🇴' },
  ] as const;

  const baseLang = (i18n.language || 'en').split('-')[0] as 'en' | 'ro';

  return (
    <div
      className={cn(
        'relative isolate flex h-8 rounded-full bg-background p-1 ring-1 ring-border scale-125'
      )}
      role="group"
      aria-label={t('language.select', 'Select Language')}
    >
      {options.map(({ code, label, name }) => {
        const isActive = baseLang === code;
        return (
          <button
            key={code}
            type="button"
            onClick={() => i18n.changeLanguage(code)}
            className="relative h-6 min-w-10 rounded-full px-2 text-xs font-medium"
            aria-label={name}
            aria-pressed={isActive}
          >
            {isActive && (
              <motion.div
                className="absolute inset-0 rounded-full bg-secondary"
                layoutId="activeLanguage"
                transition={{ type: 'spring', duration: 0.5 }}
              />
            )}
            <span className="relative z-10">
              {label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
