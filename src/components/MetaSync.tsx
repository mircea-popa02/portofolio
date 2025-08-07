import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

export function MetaSync() {
  const { t, i18n } = useTranslation();

  useEffect(() => {
    // Update document title
    document.title = t('meta.title');

    // Update meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', t('meta.description'));

    // Update meta keywords
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
      metaKeywords = document.createElement('meta');
      metaKeywords.setAttribute('name', 'keywords');
      document.head.appendChild(metaKeywords);
    }
    metaKeywords.setAttribute('content', t('meta.keywords'));

    // Update Open Graph meta tags for social sharing
    const updateOrCreateMetaTag = (property: string, content: string) => {
      let metaTag = document.querySelector(`meta[property="${property}"]`);
      if (!metaTag) {
        metaTag = document.createElement('meta');
        metaTag.setAttribute('property', property);
        document.head.appendChild(metaTag);
      }
      metaTag.setAttribute('content', content);
    };

    updateOrCreateMetaTag('og:title', t('meta.title'));
    updateOrCreateMetaTag('og:description', t('meta.description'));
    updateOrCreateMetaTag('og:type', 'website');
    updateOrCreateMetaTag('og:locale', i18n.language === 'ro' ? 'ro_RO' : 'en_US');

  }, [t, i18n.language]);

  return null;
}
