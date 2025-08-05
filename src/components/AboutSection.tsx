import { motion } from 'framer-motion';
import { useTranslation, Trans } from 'react-i18next';
import { User, Heart, Handshake, Blocks, Search } from 'lucide-react';
import React from 'react';
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from '@/components/ui/tooltip';

export function AboutSection() {
	const { t } = useTranslation();

	// Custom component for search tooltips
	const SearchTooltip = ({ tooltipKey, children }: { tooltipKey: string; children: React.ReactNode }) => (
		<TooltipProvider>
			<Tooltip>
				<TooltipTrigger asChild>
					<span className="search-tooltip">
						{children}
						<Search className="w-3 h-3 search-icon" />
					</span>
				</TooltipTrigger>
				<TooltipContent>
					<p className="max-w-sm text-base leading-relaxed">{t(`about.philosophy.tooltips.${tooltipKey}`)}</p>
				</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	);

	const personalValues = [
		{
			icon: Blocks,
			title: t('about.values.innovation.title'),
			descriptionKey: 'about.values.innovation.description',
		},
		{
			icon: Heart,
			title: t('about.values.passion.title'),
			descriptionKey: 'about.values.passion.description',
		},
		{
			icon: Handshake,
			title: t('about.values.collaboration.title'),
			descriptionKey: 'about.values.collaboration.description',
		},
		{
			icon: User,
			title: t('about.values.craftsmanship.title'),
			descriptionKey: 'about.values.craftsmanship.description',
		},
	];

	return (
		<section
			id="about"
			className="py-20 bg-gradient-to-b from-secondary/10 to-background relative"
		>
			<div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.15),rgba(255,255,255,0))]"></div>
			<div className="container mx-auto px-4">
				<motion.div
					initial={{ opacity: 0, y: 30 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8 }}
					viewport={{ once: true }}
					className="text-center mb-16"
				>
					<h2 className="text-5xl font-bold mb-8 text-foreground">
						{t('about.title')}
					</h2>
					<p className="text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
						<Trans
							i18nKey="about.subtitle"
							components={{ bold: <strong className="text-foreground" /> }}
						/>
					</p>
				</motion.div>

				<div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
					<motion.div
						initial={{ opacity: 0, x: -50 }}
						whileInView={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.8 }}
						viewport={{ once: true }}
						className="space-y-8"
					>
						<div>
							<h3 className="text-3xl font-semibold mb-6 text-primary">
								{t('about.story.title')}
							</h3>
							<p className="text-muted-foreground text-lg leading-relaxed mb-6">
								<Trans
									i18nKey="about.story.paragraph1"
									components={{ 
										bold: <strong className="text-foreground" />,
										searchTech: (
											<SearchTooltip tooltipKey="tech">
												<span />
											</SearchTooltip>
										),
									}}
								/>
							</p>
							<p className="text-muted-foreground text-lg leading-relaxed">
								<Trans
									i18nKey="about.story.paragraph2"
									components={{ 
										bold: <strong className="text-foreground" />,
										searchMulti: (
											<SearchTooltip tooltipKey="multi">
												<span />
											</SearchTooltip>
										),
										searchStartupExp: (
											<SearchTooltip tooltipKey="startupExp">
												<span />
											</SearchTooltip>
										),
									}}
								/>
							</p>
						</div>
					</motion.div>

					<motion.div
						initial={{ opacity: 0, x: 50 }}
						whileInView={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.8 }}
						viewport={{ once: true }}
						className="space-y-8"
					>
						<div>
							<h3 className="text-3xl font-semibold mb-6 text-primary">
								{t('about.philosophy.title')}
							</h3>
							<p className="text-muted-foreground text-lg leading-relaxed mb-6">
								<Trans
									i18nKey="about.philosophy.paragraph1"
									components={{
										search57: (
											<SearchTooltip tooltipKey="57percent">
												<span />
											</SearchTooltip>
										),
										search30: (
											<SearchTooltip tooltipKey="30percent">
												<span />
											</SearchTooltip>
										),
										bold: <strong className="text-foreground" />,
									}}
								/>
							</p>
							<p className="text-muted-foreground text-lg leading-relaxed mb-6">
								<Trans
									i18nKey="about.philosophy.paragraph2"
									values={{ newYear: new Date().getFullYear() }}
									components={{
										searchOld: (
											<SearchTooltip tooltipKey="oldMethods">
												<span />
											</SearchTooltip>
										),
										bold: <strong className="text-foreground" />,
									}}
								/>
							</p>
							<p className="text-muted-foreground text-lg leading-relaxed mb-6">
								<Trans
									i18nKey="about.philosophy.paragraph3"
									components={{
										searchTransition: (
											<SearchTooltip tooltipKey="digitalTransition">
												<span />
											</SearchTooltip>
										),
										searchRelevance: (
											<SearchTooltip tooltipKey="loseRelevance">
												<span />
											</SearchTooltip>
										),
										searchClients: (
											<SearchTooltip tooltipKey="fewerClients">
												<span />
											</SearchTooltip>
										),
										bold: <strong className="text-foreground" />,
									}}
								/>
							</p>
							<p className="text-muted-foreground text-lg leading-relaxed mb-6">
								<Trans
									i18nKey="about.philosophy.paragraph4"
									components={{
										searchExpand: (
											<SearchTooltip tooltipKey="expand">
												<span />
											</SearchTooltip>
										),
										searchWebsite: (
											<SearchTooltip tooltipKey="outdatedWebsite">
												<span />
											</SearchTooltip>
										),
										bold: <strong className="text-foreground" />,
									}}
								/>
							</p>
							<p className="text-sm text-muted-foreground/80 italic mt-8 border-t border-border pt-6">
								{t('about.philosophy.citation1')}
							</p>
						</div>
					</motion.div>
				</div>

				<motion.div
					initial={{ opacity: 0, y: 30 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8 }}
					viewport={{ once: true }}
				>
					<h3 className="text-4xl font-semibold text-center mb-16">
						{t('about.valuesTitle')}
					</h3>
					<div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
						{personalValues.map((value, index) => (
							<motion.div
								key={value.title}
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.6, delay: index * 0.1 }}
								viewport={{ once: true }}
								className="group text-center"
							>
								<div className="bg-card border border-border rounded-xl p-6 h-full hover:shadow-lg hover:shadow-primary/10 transition-all duration-300 hover:border-primary/30 relative overflow-hidden">
									<div className="absolute inset-0 bg-gradient-radial from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
									<div className="relative z-10">
										<value.icon className="w-12 h-12 text-primary mb-4 mx-auto group-hover:scale-110 transition-transform duration-300" />
										<h4 className="text-xl font-semibold mb-4">{value.title}</h4>
										<p className="text-muted-foreground text-base leading-relaxed">
											<Trans
												i18nKey={value.descriptionKey}
												components={{
													bold: <strong className="text-foreground" />,
													code: (
														<code className="bg-muted relative rounded px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold" />
													),
													searchErrors: (
														<SearchTooltip tooltipKey="errors">
															<span />
														</SearchTooltip>
													),
													searchPartners: (
														<SearchTooltip tooltipKey="partners">
															<span />
														</SearchTooltip>
													),
													searchCorporate: (
														<SearchTooltip tooltipKey="corporate">
															<span />
														</SearchTooltip>
													),
													searchStartup: (
														<SearchTooltip tooltipKey="startup">
															<span />
														</SearchTooltip>
													),
													searchFreelance: (
														<SearchTooltip tooltipKey="freelance">
															<span />
														</SearchTooltip>
													),
												}}
											/>
										</p>
									</div>
								</div>
							</motion.div>
						))}
					</div>
				</motion.div>
			</div>
		</section>
	);
}
