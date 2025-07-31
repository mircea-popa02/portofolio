import { motion } from 'framer-motion';
import { useTranslation, Trans } from 'react-i18next';
import { Mail, Linkedin, Instagram, Facebook } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useForm, ValidationError } from '@formspree/react';
import { Turnstile } from '@marsidev/react-turnstile';
import { useState, useEffect } from 'react';

export function ContactSection() {
  const { t, i18n } = useTranslation();
  const [state, handleSubmit] = useForm("xldllzbj");
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);

  // Reset Turnstile token when form is successfully submitted
  useEffect(() => {
    if (state.succeeded) {
      setTurnstileToken(null);
    }
  }, [state.succeeded]);

  const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!turnstileToken) {
      return; // Don't submit if Turnstile hasn't been completed
    }

    // Create FormData and append the turnstile token
    const formData = new FormData(e.currentTarget);
    formData.append('cf-turnstile-response', turnstileToken);
    
    handleSubmit(formData);
  };
  
  return (
    <section id="contact" className="py-20 bg-secondary/20 relative overflow-hidden">
      {/* Background gradients */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-br from-primary/20 to-purple-500/20 rounded-full blur-3xl opacity-50"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-br from-blue-500/20 to-primary/20 rounded-full blur-3xl opacity-50"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-purple-500/10 to-blue-500/10 rounded-full blur-3xl opacity-30"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('contact.title')}</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            <Trans 
              i18nKey="contact.subtitle"
              components={{ bold: <strong className="text-foreground" /> }}
            />
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-semibold mb-6">{t('contact.getInTouch')}</h3>
              <p className="text-muted-foreground mb-6">
                <Trans 
                  i18nKey="contact.description"
                  components={{ bold: <strong className="text-foreground" /> }}
                />
              </p>
              
              <div className="space-y-4">
                <a
                  href="mailto:hello@mirceapopa.dev"
                  className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors"
                >
                  <Mail className="w-5 h-5" />
                  hello@mirceapopa.dev
                </a>
                
                <div className="flex gap-4 mt-6">
                  <Button variant="outline" size="sm" asChild>
                    <a href="https://linkedin.com/in/yourusername" target="_blank" rel="noopener noreferrer">
                      <Linkedin className="w-4 h-4" />
                    </a>
                  </Button>
                  <Button variant="outline" size="sm" asChild>
                    <a href="https://instagram.com/yourusername" target="_blank" rel="noopener noreferrer">
                      <Instagram className="w-4 h-4" />
                    </a>
                  </Button>
                  <Button variant="outline" size="sm" asChild>
                    <a href="https://facebook.com/yourusername" target="_blank" rel="noopener noreferrer">
                      <Facebook className="w-4 h-4" />
                    </a>
                  </Button>
                  <Button variant="outline" size="sm" asChild>
                    <a href="https://tiktok.com/@yourusername" target="_blank" rel="noopener noreferrer">
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-.04 0z"/>
                      </svg>
                    </a>
                  </Button>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-card p-6 rounded-xl border border-border shadow-2xl backdrop-blur-sm bg-card/80"
            >
              <h3 className="text-xl font-semibold mb-4">{t('contact.quickMessage')}</h3>
              
              {state.succeeded && (
                <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded-md">
                  {t('contact.form.success', 'Thank you! Your message has been sent successfully.')}
                </div>
              )}
              
              <form onSubmit={onFormSubmit} className="space-y-3">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2">
                    {t('contact.form.name')}
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className="w-full px-3 py-2 border border-border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary shadow-md focus:shadow-lg transition-shadow"
                    placeholder={t('contact.form.namePlaceholder')}
                  />
                  <ValidationError 
                    prefix="Name" 
                    field="name"
                    errors={state.errors}
                    className="text-red-500 text-sm mt-1 block"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">
                    {t('contact.form.email')}
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full px-3 py-2 border border-border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary shadow-md focus:shadow-lg transition-shadow"
                    placeholder={t('contact.form.emailPlaceholder')}
                  />
                  <ValidationError 
                    prefix="Email" 
                    field="email"
                    errors={state.errors}
                    className="text-red-500 text-sm mt-1 block"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2">
                    {t('contact.form.message')}
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={4}
                    className="w-full px-3 py-2 border border-border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary resize-none shadow-md focus:shadow-lg transition-shadow"
                    placeholder={t('contact.form.messagePlaceholder')}
                  />
                  <ValidationError 
                    prefix="Message" 
                    field="message"
                    errors={state.errors}
                    className="text-red-500 text-sm mt-1 block"
                  />
                </div>
                
                <div className="flex flex-col items-center space-y-2">
                  <Turnstile
                    siteKey="0x4AAAAAABne4Dsmb-p-Hbb2"
                    onSuccess={(token) => setTurnstileToken(token)}
                    onError={() => setTurnstileToken(null)}
                    onExpire={() => setTurnstileToken(null)}
                    options={{
                      theme: 'auto',
                      size: 'normal',
                      language: i18n.language === 'ro' ? 'ro' : 'en',
                    }}
                  />
                  {!turnstileToken && (
                    <p className="text-xs text-muted-foreground text-center">
                      {t('contact.form.captchaRequired', 'Please complete the CAPTCHA verification.')}
                    </p>
                  )}
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full" 
                  disabled={state.submitting || !turnstileToken}
                >
                  {state.submitting ? t('contact.form.sending', 'Sending...') : t('contact.form.send')}
                </Button>
              </form>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
