import { motion } from "framer-motion";
import { useTranslation, Trans } from "react-i18next";
import { Button } from "./ui/button";
import { ArrowDown } from "lucide-react";
import { HeroBackground } from "./HeroBackground";
import { useState, useEffect } from "react";

const TypewriterWithBold = ({
  words,
  typeSpeed = 30,
  deleteSpeed = 30,
  delaySpeed = 3500,
}: {
  words: string[];
  typeSpeed?: number;
  deleteSpeed?: number;
  delaySpeed?: number;
}) => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    const word = words[currentWordIndex];
    const plainText = word.replace(/<\/?bold>/g, "");

    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          if (currentText.length < plainText.length) {
            setCurrentText(plainText.slice(0, currentText.length + 1));
          } else {
            setTimeout(() => setIsDeleting(true), delaySpeed);
          }
        } else {
          if (currentText.length > 0) {
            setCurrentText(plainText.slice(0, currentText.length - 1));
          } else {
            setIsDeleting(false);
            setCurrentWordIndex((prev) => (prev + 1) % words.length);
          }
        }
      },
      isDeleting ? deleteSpeed : typeSpeed
    );

    return () => clearTimeout(timeout);
  }, [
    currentText,
    isDeleting,
    currentWordIndex,
    words,
    typeSpeed,
    deleteSpeed,
    delaySpeed,
  ]);

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 500);
    return () => clearInterval(cursorInterval);
  }, []);

  const renderTextWithBold = () => {
    const word = words[currentWordIndex];
    if (!word) return currentText;

    const plainText = word.replace(/<\/?bold>/g, "");
    const typedLength = currentText.length;

    if (typedLength === 0) return "";

    const boldRegex = /<bold>(.*?)<\/bold>/g;
    let match;
    const boldSections: Array<{ start: number; end: number }> = [];
    let adjustedWord = word;
    let offset = 0;

    while ((match = boldRegex.exec(word)) !== null) {
      const originalStart = match.index - offset;
      const originalEnd = originalStart + match[1].length;
      boldSections.push({ start: originalStart, end: originalEnd });
      adjustedWord = adjustedWord.replace(match[0], match[1]);
      offset += 13;
    }

    const result = [];
    let lastIndex = 0;

    for (const section of boldSections) {
      if (section.start > lastIndex && lastIndex < typedLength) {
        const endIndex = Math.min(section.start, typedLength);
        if (endIndex > lastIndex) {
          result.push(
            <span key={`normal-${lastIndex}`}>
              {plainText.slice(lastIndex, endIndex)}
            </span>
          );
        }
      }

      if (typedLength > section.start) {
        const boldEnd = Math.min(section.end, typedLength);
        if (boldEnd > section.start) {
          result.push(
            <strong key={`bold-${section.start}`} className="text-primary">
              {plainText.slice(section.start, boldEnd)}
            </strong>
          );
        }
      }

      lastIndex = section.end;
    }

    if (lastIndex < typedLength) {
      result.push(
        <span key={`final-${lastIndex}`}>
          {plainText.slice(lastIndex, typedLength)}
        </span>
      );
    }

    return result.length > 0 ? result : currentText;
  };

  return (
    <span>
      {renderTextWithBold()}
      <span
        className={`${
          showCursor ? "opacity-100" : "opacity-0"
        } transition-opacity`}
      >
        |
      </span>
    </span>
  );
};

interface HeroSectionProps {
  scrollTo: (selector: string) => void;
}

export function HeroSection({ scrollTo }: HeroSectionProps) {
  const { t, i18n } = useTranslation();

  return (
    <section className="h-screen flex items-center justify-center relative overflow-hidden">
      <HeroBackground />

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
            repeatType: "loop",
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
            repeatType: "loop",
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
            repeatType: "loop",
          }}
        />
      </div>

      <div className="flex flex-col items-center justify-center p-6 text-center z-10 w-full max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl md:text-6xl font-bold mb-3 text-center"
          >
            <span className="text-primary">
              <TypewriterWithBold
                words={
                  Array.isArray(
                    i18n.getResource(
                      i18n.language,
                      "translation",
                      "hero.titles"
                    )
                  )
                    ? i18n.getResource(
                        i18n.language,
                        "translation",
                        "hero.titles"
                      )
                    : [t("hero.title")]
                }
                typeSpeed={30}
                deleteSpeed={30}
                delaySpeed={3500}
              />
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg md:text-2xl mb-8 text-center max-w-2xl"
          >
            <Trans
              i18nKey="hero.subtitle"
              components={{
                bold: <strong className="text-foreground font-bold" />,
                code: (
                  <code className="bg-muted relative rounded px-[0.3rem] py-[0.2rem] font-bold" />
                ),
              }}
            />
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-wrap gap-4 justify-center"
          >
            <Button size="lg" onClick={() => scrollTo("#projects")}>
              {t("hero.viewWork")}
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => scrollTo("#contact")}
            >
              {t("hero.getInTouch")}
            </Button>
          </motion.div>
        </motion.div>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.8 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <button onClick={() => scrollTo("#about")} className="animate-bounce">
          <ArrowDown className="h-6 w-6 text-muted-foreground" />
        </button>
      </motion.div>
    </section>
  );
}
