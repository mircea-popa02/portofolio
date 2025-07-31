import { ShoppingCart, Code, Box, CreditCard, Database, Shield, Paintbrush, Globe } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTranslation, Trans } from 'react-i18next';

export function TechnologiesSection() {
	const { t } = useTranslation();
	
	const expertise = [
		{
			icon: ShoppingCart,
			title: t('expertise.ecommerce.title'),
			items: [
				'expertise.ecommerce.woocommerce',
				'expertise.ecommerce.wordpress',
				'expertise.ecommerce.opencart',
				'expertise.ecommerce.shopify',
				'expertise.ecommerce.plugins',
			],
		},
		{
			icon: CreditCard,
			title: t('expertise.payments.title'),
			items: [
				'expertise.payments.gateways',
				'expertise.payments.stripe',
				'expertise.payments.paypal',
				'expertise.payments.custom',
			],
		},
		{
			icon: Code,
			title: t('expertise.development.title'),
			items: [
				'expertise.development.react',
				'expertise.development.nodejs',
				'expertise.development.php',
				'expertise.development.apis',
			],
		},
		{
			icon: Paintbrush,
			title: t('expertise.design.title'),
			items: [
				'expertise.design.bespoke',
				'expertise.design.responsive',
				'expertise.design.brand',
				'expertise.design.conversion',
			],
		},
		{
			icon: Globe,
			title: t('expertise.solutions.title'),
			items: [
				'expertise.solutions.custom',
				'expertise.solutions.headless',
				'expertise.solutions.performance',
				'expertise.solutions.scalable',
			],
		},
		{
			icon: Database,
			title: t('expertise.integrations.title'),
			items: [
				'expertise.integrations.maps',
				'expertise.integrations.captchas',
				'expertise.integrations.databases',
				'expertise.integrations.apis',
			],
		},
		{
			icon: Box,
			title: t('expertise.interactive.title'),
			items: [
				'expertise.interactive.threejs',
				'expertise.interactive.webgl',
				'expertise.interactive.animations',
				'expertise.interactive.experiences',
			],
		},
		{
			icon: Shield,
			title: t('expertise.security.title'),
			items: [
				'expertise.security.ssl',
				'expertise.security.authentication',
				'expertise.security.data',
				'expertise.security.compliance',
			],
		},
	];

	return (
		<section
			id="technologies"
			className="py-20 bg-gradient-to-b from-background to-secondary/10 relative"
		>
			<div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div>
			<div className="container mx-auto px-4">
				<motion.div
					initial={{ opacity: 0, y: 30 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8 }}
					viewport={{ once: true }}
					className="text-center mb-16"
				>
					<h2 className="text-4xl font-bold mb-6 text-foreground">
						{t('expertise.title')}
					</h2>
					<p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
						<Trans 
							i18nKey="expertise.description"
							components={{ 
								bold: <strong className="text-foreground" />,
								code: <code className="bg-muted relative rounded px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold" />
							}}
						/>
					</p>
				</motion.div>

				<motion.div
					initial={{ opacity: 0, y: 30 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8 }}
					viewport={{ once: true }}
				>
					<h3 className="text-3xl font-semibold text-center mb-12">
						{t('expertise.areasTitle')}
					</h3>
					<div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
						{expertise.map((area, index) => (
							<motion.div
								key={area.title}
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.6, delay: index * 0.1 }}
								viewport={{ once: true }}
								className="group"
							>
								<div className="bg-card border border-border rounded-xl p-6 h-full hover:shadow-lg hover:shadow-primary/10 transition-all duration-300 hover:border-primary/30">
									<area.icon className="w-12 h-12 text-primary mb-4 group-hover:scale-110 transition-transform duration-300" />
									<h4 className="text-lg font-semibold mb-4">{area.title}</h4>
									<ul className="space-y-2">
										{area.items.map((itemKey) => (
											<li
												key={itemKey}
												className="text-muted-foreground text-sm flex items-center"
											>
												<div className="w-1.5 h-1.5 bg-primary rounded-full mr-2 flex-shrink-0" />
												<Trans 
													i18nKey={itemKey}
													components={{ 
														code: <code className="bg-muted relative rounded px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold" />
													}}
												/>
											</li>
										))}
									</ul>
								</div>
							</motion.div>
						))}
					</div>
				</motion.div>
			</div>
		</section>
	);
}
