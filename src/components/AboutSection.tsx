import { motion } from 'framer-motion';
import { useTranslation, Trans } from 'react-i18next';
import { User, Heart, Coffee, Globe2 } from 'lucide-react';

export function AboutSection() {
	const { t } = useTranslation();

	const personalValues = [
		{
			icon: User,
			title: t('about.values.craftsmanship.title'),
			description: t('about.values.craftsmanship.description'),
		},
		{
			icon: Heart,
			title: t('about.values.passion.title'),
			description: t('about.values.passion.description'),
		},
		{
			icon: Coffee,
			title: t('about.values.collaboration.title'),
			description: t('about.values.collaboration.description'),
		},
		{
			icon: Globe2,
			title: t('about.values.innovation.title'),
			description: t('about.values.innovation.description'),
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
					<h2 className="text-4xl font-bold mb-6 text-foreground">
						{t('about.title')}
					</h2>
					<p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
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
							<h3 className="text-2xl font-semibold mb-4 text-primary">
								{t('about.story.title')}
							</h3>
							<p className="text-muted-foreground text-base leading-relaxed mb-4">
								<Trans 
									i18nKey="about.story.paragraph1"
									components={{ bold: <strong className="text-foreground" /> }}
								/>
							</p>
							<p className="text-muted-foreground text-base leading-relaxed">
								<Trans 
									i18nKey="about.story.paragraph2"
									components={{ bold: <strong className="text-foreground" /> }}
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
							<h3 className="text-2xl font-semibold mb-4 text-primary">
								{t('about.philosophy.title')}
							</h3>
							<p className="text-muted-foreground text-base leading-relaxed mb-4">
								<Trans 
									i18nKey="about.philosophy.paragraph1"
									components={{ bold: <strong className="text-foreground" /> }}
								/>
							</p>
							<p className="text-muted-foreground text-base leading-relaxed">
								<Trans 
									i18nKey="about.philosophy.paragraph2"
									components={{ bold: <strong className="text-foreground" /> }}
								/>
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
					<h3 className="text-3xl font-semibold text-center mb-12">
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
								<div className="bg-card border border-border rounded-xl p-6 h-full hover:shadow-lg hover:shadow-primary/10 transition-all duration-300 hover:border-primary/30">
									<value.icon className="w-12 h-12 text-primary mb-4 mx-auto group-hover:scale-110 transition-transform duration-300" />
									<h4 className="text-lg font-semibold mb-3">{value.title}</h4>
									<p className="text-muted-foreground text-sm leading-relaxed">
										{value.description}
									</p>
								</div>
							</motion.div>
						))}
					</div>
				</motion.div>
			</div>
		</section>
	);
}
