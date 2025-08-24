import { useTranslation, Trans } from "react-i18next";
import { Handshake, Lightbulb, Blocks, Hourglass, Search } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import type { ReactNode } from "react";

export function AboutSection() {
  const { t } = useTranslation();

  const SearchTooltip = ({
    tooltipKey,
    children,
  }: {
    tooltipKey: string;
    children?: ReactNode;
  }) => (
    <Tooltip>
      <TooltipTrigger asChild>
        <div
          className="inline-flex items-center gap-1 underline decoration-dashed decoration-1 cursor-help text-blue-500/80"
        >
          {children}
          <Search className="w-3 h-3" />
        </div>
      </TooltipTrigger>
      <TooltipContent>
        <p className="max-w-sm text-base leading-relaxed">
          <Trans
            i18nKey={`about.tooltips.${tooltipKey}`}
            components={{
              bold: <strong className="text-primary-foreground font-semibold" />,
              code: (
                <code className="bg-primary-foreground/20 relative rounded px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold" />
              ),
            }}
          />
        </p>
      </TooltipContent>
    </Tooltip>
  );

  const personalValues = [
    {
      icon: Lightbulb,
      title: t("about.values.understanding.title"),
      descriptionKey: "about.values.understanding.description",
    },
    {
      icon: Blocks,
      title: t("about.values.clarity.title"),
      descriptionKey: "about.values.clarity.description",
    },
    {
      icon: Hourglass,
      title: t("about.values.longterm.title"),
      descriptionKey: "about.values.longterm.description",
    },
    {
      icon: Handshake,
      title: t("about.values.involvement.title"),
      descriptionKey: "about.values.involvement.description",
    },
  ];

  return (
    <section
      id="about"
      className="py-20 relative overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-1/3 transform -translate-x-1/2 w-[40rem] h-[40rem] bg-gradient-to-br from-blue-500/20 to-primary/10 rounded-full blur-3xl opacity-30"></div>
        <div className="absolute bottom-10 right-1/5 w-[32rem] h-[32rem] bg-gradient-to-br from-primary/10 to-blue-500/10 rounded-full blur-3xl opacity-20"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[44rem] h-[44rem] bg-gradient-to-br from-blue-500/10 to-blue-500/30 rounded-full blur-3xl opacity-25"></div>
      </div>
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold mb-8 text-foreground">
            {t("about.title")}
          </h2>
          <p className="text-2xl text-foreground max-w-4xl mx-auto leading-relaxed">
            <Trans
              i18nKey="about.subtitle"
              components={{
                bold: <strong className="text-primary" />,
                code: (
                  <code className="bg-muted relative rounded px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold" />
                ),
                solutions: <SearchTooltip tooltipKey="solutions" />,
              }}
            />
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          <div className="space-y-8">
            <div>
              <h3 className="text-3xl font-semibold mb-6 text-primary">
                {t("about.philosophy.title")}
              </h3>
              <p className="text-lg leading-relaxed mb-6">
                <Trans
                  i18nKey="about.philosophy.paragraph1"
                  components={{
                    code: (
                      <code className="bg-muted relative rounded px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold" />
                    ),
                    bold: <strong className="text-foreground" />,
                    optimize: <SearchTooltip tooltipKey="optimize" />,
                    efficiency: <SearchTooltip tooltipKey="efficiency" />,
                    transformation: <SearchTooltip tooltipKey="transformation" />,
                  }}
                />
              </p>
              <p className="text-lg leading-relaxed mb-6">
                <Trans
                  i18nKey="about.philosophy.paragraph2"
                  values={{ newYear: new Date().getFullYear() }}
                  components={{
                    bold: <strong className="text-foreground" />,
                    code: (
                      <code className="bg-muted relative rounded px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold" />
                    ),
                    clarity: <SearchTooltip tooltipKey="clarity" />,
                    quality: <SearchTooltip tooltipKey="quality" />,
                    humanCentric: <SearchTooltip tooltipKey="humanCentric" />,
                  }}
                />
              </p>
            </div>
          </div>
          <div className="space-y-8">
            <div>
              <h3 className="text-3xl font-semibold mb-6 text-primary">
                {t("about.story.title")}
              </h3>
              <p className="text-lg leading-relaxed mb-6">
                <Trans
                  i18nKey="about.story.paragraph1"
                  components={{
                    bold: <strong className="text-foreground" />,
                    code: (
                      <code className="bg-muted relative rounded px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold" />
                    ),
                    needs: <SearchTooltip tooltipKey="needs" />,
                  }}
                />
              </p>
              <p className="text-lg leading-relaxed mb-6">
                <Trans
                  i18nKey="about.story.paragraph2"
                  components={{
                    bold: <strong className="text-foreground" />,
                    code: (
                      <code className="bg-muted relative rounded px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold" />
                    ),
                    rushed: <SearchTooltip tooltipKey="rushed" />,
                    rigid: <SearchTooltip tooltipKey="rigid" />,
                    technicalVision: <SearchTooltip tooltipKey="technicalVision" />,
                  }}
                />
              </p>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-4xl font-semibold text-center mb-16">
            {t("about.valuesTitle")}
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 ">
            {personalValues.map((value) => (
              <div
                key={value.title}
                className="group text-center"
              >
                <div className="border border-border rounded-xl p-6 h-full hover:shadow-lg hover:shadow-primary/10 transition-all duration-300 hover:border-primary/30 relative overflow-hidden bg-opacity-60 bg-secondary/30">
                  <div className="relative z-10">
                    <value.icon className="w-12 h-12 text-primary mb-4 mx-auto group-hover:scale-110 transition-transform duration-300" />
                    <h4 className="text-xl font-semibold mb-4">
                      {value.title}
                    </h4>
                    <p className="text-muted-foreground text-base leading-relaxed">
                      <Trans
                        i18nKey={value.descriptionKey}
                        components={{
                          bold: <strong className="text-foreground" />,
                          code: (
                            <code className="bg-muted relative rounded px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold" />
                          ),
                          understanding: <SearchTooltip tooltipKey="understanding" />,
                          clarity: <SearchTooltip tooltipKey="clarity" />,
                          longterm: <SearchTooltip tooltipKey="longterm" />,
                          involvement: <SearchTooltip tooltipKey="involvement" />,
                        }}
                      />
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
