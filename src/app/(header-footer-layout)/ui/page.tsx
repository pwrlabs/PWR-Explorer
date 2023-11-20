import ButtonsSec from './(sections)/button.ui';
import TextInputSec from './(sections)/text-input.ui';
import TooltipSec from './(sections)/tooltip.ui';

export default function UiKitPage() {
	const secctions = [
		{ name: 'Buttons', comp: ButtonsSec },
		{ name: 'Text input', comp: TextInputSec },
		{ name: 'Tooltips', comp: TooltipSec },
	];

	return (
		<main className="container-2 mx-auto space-y-6">
			{secctions.map((item, index) => (
				<section key={index} className="space-y-4">
					<h1 className="text-2xl font-semibold text-agrey-900 dark:text-white">
						{item.name}
					</h1>

					{item.comp()}

					<hr />
				</section>
			))}
		</main>
	);
}
