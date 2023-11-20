import Button from 'src/components/internal/button/button.component';
import Tooltip from 'src/components/internal/tooltip/tooltip.component';

export default function TooltipSec() {
	return (
		<div className="space-y-4">
			<div className="space-y-2">
				<h2 className="text-agrey-900 dark:text-white">Normal</h2>

				<Tooltip text="Lorep ipsum dolor sit amet" position="up">
					<Button className="blue">up</Button>
				</Tooltip>
			</div>
		</div>
	);
}
