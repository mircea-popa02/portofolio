import { useTranslation, Trans } from "react-i18next";
import { Mail, Linkedin, Instagram, Facebook, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useForm, ValidationError } from "@formspree/react";
import { useRef, useState, useEffect } from "react";
import { lazy, Suspense } from "react";
const HCaptcha = lazy(() => import("@hcaptcha/react-hcaptcha"));
import { useTheme } from "./theme-provider";
import { toast } from "sonner";

export function ContactSection() {
  const { t, i18n } = useTranslation();
  const { theme } = useTheme();
  const [state, handleSubmit] = useForm("xldllzbj");

  const formRef = useRef<HTMLFormElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const captchaRef = useRef<any>(null);
  const [hcaptchaToken, setHcaptchaToken] = useState<string | null>(null);
  const [showCaptcha, setShowCaptcha] = useState(false);
  const [hcaptchaTheme, setHcaptchaTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const observer = new window.IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setShowCaptcha(true);
        }
      },
      { threshold: 0.2 }
    );
    const formNode = formRef.current;
    if (formNode) {
      observer.observe(formNode);
    }
    return () => {
      if (formNode) {
        observer.unobserve(formNode);
      }
    };
  }, []);

  useEffect(() => {
    const currentTheme =
      theme === "system"
        ? window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light"
        : theme;
    setHcaptchaTheme(currentTheme);
  }, [theme]);

  const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!hcaptchaToken) return;

    handleSubmit(e).then(() => {
      captchaRef.current?.resetCaptcha();
      toast.success(t("contact.form.success"), {
        description: t("contact.form.messageDetails"),
      });
      formRef.current?.reset();
      setHcaptchaToken(null);
    });
  };

  return (
    <section
      id="contact"
      className="py-20 bg-secondary/20 relative overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-br from-primary/20 to-red-500/20 rounded-full blur-3xl opacity-50"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-br from-red-500/30 to-primary/20 rounded-full blur-3xl opacity-50"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-red-500/10 to-red-500/40 rounded-full blur-3xl opacity-30"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {t("contact.title")}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            <Trans
              i18nKey="contact.subtitle"
              components={{ bold: <strong className="text-foreground" /> }}
            />
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-semibold mb-6">
                {t("contact.getInTouch")}
              </h3>
              <p className="text-muted-foreground mb-6">
                <Trans
                  i18nKey="contact.description"
                  components={{ bold: <strong className="text-foreground" /> }}
                />
              </p>

              <div className="space-y-4">
                <a
                  href="mailto:contact@proiectesoftware.ro"
                  className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors"
                >
                  <Mail className="w-5 h-5" />
                  contact@proiectesoftware.ro
                </a>

                <div className="flex gap-4 mt-6">
                  <Button variant="outline" size="sm" asChild>
                    <a
                      href="https://linkedin.com/in/yourusername"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={t("contact.links.linkedin")}
                    >
                      <Linkedin className="w-4 h-4" />
                    </a>
                  </Button>
                  <Button variant="outline" size="sm" asChild>
                    <a
                      href="https://www.instagram.com/proiectesoftware.ro/"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={t("contact.links.instagram")}
                    >
                      <Instagram className="w-4 h-4" />
                    </a>
                  </Button>
                  <Button variant="outline" size="sm" asChild>
                    <a
                      href="https://www.facebook.com/profile.php?id=61578853842662"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={t("contact.links.facebook")}
                    >
                      <Facebook className="w-4 h-4" />
                    </a>
                  </Button>
                  <Button variant="outline" size="sm" asChild>
                    <a
                      href="https://tiktok.com/@yourusername"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={t("contact.links.tiktok")}
                    >
                      <svg
                        className="w-4 h-4"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-.04 0z" />
                      </svg>
                    </a>
                  </Button>
                </div>
              </div>
            </div>

            <div className="bg-card p-6 rounded-xl border border-border shadow-2xl backdrop-blur-sm bg-card/80">
              <h3 className="text-xl font-semibold mb-6">
                {t("contact.quickMessage")}
              </h3>

              <form ref={formRef} onSubmit={onFormSubmit} className="space-y-3">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium mb-2"
                  >
                    {t("contact.form.name")}
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className="w-full px-3 py-2 border border-border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:shadow-lg transition-shadow"
                    placeholder={t("contact.form.namePlaceholder")}
                  />
                  <ValidationError
                    prefix="Name"
                    field="name"
                    errors={state.errors}
                    className="text-red-500 text-sm mt-1 block"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium mb-2"
                  >
                    {t("contact.form.email")}
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full px-3 py-2 border border-border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:shadow-lg transition-shadow"
                    placeholder={t("contact.form.emailPlaceholder")}
                  />
                  <ValidationError
                    prefix="Email"
                    field="email"
                    errors={state.errors}
                    className="text-red-500 text-sm mt-1 block"
                  />
                </div>
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium mb-2"
                  >
                    {t("contact.form.message")}
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={4}
                    className="w-full px-3 py-2 border border-border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary resize-none focus:shadow-lg transition-shadow"
                    placeholder={t("contact.form.messagePlaceholder")}
                  />
                  <ValidationError
                    prefix="Message"
                    field="message"
                    errors={state.errors}
                    className="text-red-500 text-sm mt-1 block"
                  />
                </div>

                <div className="flex flex-col items-center space-y-2">
                  {showCaptcha ? (
                    <Suspense fallback={<div>Loading captcha...</div>}>
                      <HCaptcha
                        sitekey="df1455a8-d312-4064-91b4-ff606282bbd4"
                        onVerify={setHcaptchaToken}
                        ref={captchaRef}
                        theme={hcaptchaTheme}
                        languageOverride={i18n.language}
                      />
                    </Suspense>
                  ) : (
                    <div style={{ height: 78 }} />
                  )}
                </div>

                <Button
                  type="submit"
                  className="w-full p-4"
                  disabled={state.submitting || !hcaptchaToken}
                >
                  {state.submitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      {t("contact.form.sending", "Sending...")}
                    </>
                  ) : (
                    t("contact.form.send")
                  )}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
