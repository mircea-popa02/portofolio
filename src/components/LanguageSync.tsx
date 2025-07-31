import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

export function LanguageSync() {
  const { i18n } = useTranslation();

  useEffect(() => {
    // Update HTML lang attribute when language changes
    document.documentElement.lang = i18n.language;
  }, [i18n.language]);

  // Set initial language on mount
  useEffect(() => {
    document.documentElement.lang = i18n.language;
  }, [i18n.language]);

  return null; // This component doesn't render anything visible
}
