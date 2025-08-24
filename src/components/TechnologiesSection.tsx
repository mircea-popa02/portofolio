import { ShoppingCart, Code, Box, CreditCard, Database, Shield, Paintbrush, Globe } from 'lucide-react';
import { useTranslation, Trans } from 'react-i18next';

import AngularIcon from '../assets/angular.svg';
import CssIcon from '../assets/css.svg';
import Html5Icon from '../assets/html5.svg';
import JavascriptIcon from '../assets/javascript.svg';
import ReactIcon from '../assets/react.svg';
import ShopifyIcon from '../assets/shopify.svg';
import WoocommerceIcon from '../assets/woocommerce.svg';
import WordpressIcon from '../assets/wordpress.svg';
import ApplePayIcon from '../assets/applepay.svg';
import DockerIcon from '../assets/docker.svg';
import GooglePayIcon from '../assets/googlepay.svg';
import MongoDBIcon from '../assets/mongodb.svg';
import PhpIcon from '../assets/php.svg';
import PostgresqlIcon from '../assets/postgresql.svg';
import StripeIcon from '../assets/stripe.svg';
import PayPalIcon from '../assets/paypal.svg';
import WixIcon from '../assets/wix.svg';
import FigmaIcon from '../assets/figma.svg';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

export function TechnologiesSection() {
	const { t } = useTranslation();
	const techIcons = [
		{ src: ReactIcon, alt: 'React', name: 'React' },
		{ src: AngularIcon, alt: 'Angular', name: 'Angular' },
		{ src: JavascriptIcon, alt: 'JavaScript', name: 'JavaScript' },
		{ src: Html5Icon, alt: 'HTML5', name: 'HTML5' },
		{ src: CssIcon, alt: 'CSS', name: 'CSS' },
		{ src: ShopifyIcon, alt: 'Shopify', name: 'Shopify' },
		{ src: WoocommerceIcon, alt: 'WooCommerce', name: 'WooCommerce' },
		{ src: WordpressIcon, alt: 'WordPress', name: 'WordPress' },
		{ src: ApplePayIcon, alt: 'Apple Pay', name: 'Apple Pay' },
		{ src: GooglePayIcon, alt: 'Google Pay', name: 'Google Pay' },
		{ src: StripeIcon, alt: 'Stripe', name: 'Stripe' },
		{ src: PayPalIcon, alt: 'PayPal', name: 'PayPal' },
		{ src: PhpIcon, alt: 'PHP', name: 'PHP' },
		{ src: PostgresqlIcon, alt: 'PostgreSQL', name: 'PostgreSQL' },
		{ src: MongoDBIcon, alt: 'MongoDB', name: 'MongoDB' },
		{ src: DockerIcon, alt: 'Docker', name: 'Docker' },
		{ src: WixIcon, alt: 'Wix', name: 'Wix' },
		{ src: FigmaIcon, alt: 'Figma', name: 'Figma' },
	];

	const expertise = [
		{
			icon: ShoppingCart,
			key: 'ecommerce',
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
			className="py-20 relative"
		>
			<div className="pointer-events-none w-full h-full absolute inset-0">
				<div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-2/3 h-2/3 bg-gradient-to-br from-yellow-500/10 to-primary/5 rounded-full blur-3xl opacity-30"></div>
				<div className="absolute bottom-0 right-1/4 w-1/2 h-1/2 bg-gradient-to-br from-primary/10 to-yellow-500/10 rounded-full blur-3xl opacity-10"></div>
				<div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-gradient-to-br from-yellow-500/10 to-yellow-500/25 rounded-full blur-3xl opacity-15"></div>
			</div>


			<div className="container mx-auto px-4">
				<div className="text-center mb-8 md:mb-12">
					<h2 className="text-5xl font-bold mb-6 text-foreground">
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
				</div>
				<div className="py-6 md:py-12 mt-4 md:mt-8 mb-4 md:mb-8">
					<div className="flex justify-center flex-wrap gap-4 md:gap-8 ">
						{techIcons.map((tech) => (
							<TooltipProvider key={tech.name}>
								<Tooltip>
									<TooltipTrigger asChild>
										<span
											className="flex flex-col items-center group"
											style={{ width: '80px' }}
										>
											<div className="relative">
												<div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary/30 to-secondary/30 blur-md opacity-0 group-hover:opacity-100 transition-all duration-500 scale-110 hidden md:block"></div>

												<div className="relative w-12 h-12 md:w-20 md:h-20 bg-gradient-to-br from-card via-card to-muted/50 border border-primary/20 md:border-2 rounded-full p-2 md:p-4 group-hover:border-primary/60 transition-all duration-300 md:duration-500 group-hover:scale-105 md:group-hover:scale-110 md:group-hover:rotate-3 shadow-md md:shadow-lg hover:shadow-lg md:hover:shadow-xl hover:shadow-primary/10 md:hover:shadow-primary/20">
													<img
														src={tech.src}
														alt={tech.alt}
														loading="lazy"
														decoding="async"
														className="w-full h-full object-contain transition-all duration-300 md:duration-500 group-hover:scale-105 md:group-hover:scale-110 dark:invert dark:brightness-0"
													/>
												</div>
											</div>
										</span>
									</TooltipTrigger>
									<TooltipContent>
										<p>{tech.name}</p>
									</TooltipContent>
								</Tooltip>
							</TooltipProvider>
						))}
					</div>
				</div>
				<div>
					<h3 className="text-3xl font-semibold text-center mb-12">
						{t('expertise.areasTitle')}
					</h3>
					<div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
						{expertise.map((area) => (
							<div
								key={area.title}
								className="group"
							>
								<div className="bg-opacity-60 bg-secondary/30 border border-border rounded-xl p-6 h-full hover:shadow-lg hover:shadow-primary/10 transition-all duration-300 hover:border-primary/30">
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
							</div>
						))}
					</div>


				</div>
			</div>
		</section>
	);
}
