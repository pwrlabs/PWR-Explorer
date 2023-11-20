import Button from 'src/components/internal/button/button.component';

export default function ButtonsSec() {
	return (
		<div className="space-y-4">
			<div className="space-y-2">
				<h2 className="text-agrey-900 dark:text-white">Blue</h2>

				<div className="flex gap-x-4">
					<Button className="blue">Normal</Button>
					<Button className="blue" disabled>
						Disabled
					</Button>
					<Button className="blue loading">Loading</Button>
				</div>
			</div>

			<div className="space-y-2">
				<h2 className="text-agrey-900 dark:text-white">Small</h2>

				<div className="flex gap-x-4">
					<Button className="blue small">Small</Button>
					<Button className="blue small" disabled>
						Small
					</Button>
					<Button className="blue small loading">Loading</Button>
				</div>
			</div>

			<div className="space-y-2">
				<h2 className="text-agrey-900 dark:text-white">Ghost gray</h2>

				<div className="flex gap-x-4">
					<Button className="ghostgray">Normal</Button>
					<Button className="ghostgray" disabled>
						Disabled
					</Button>
					<Button className="ghostgray loading">Loading</Button>
				</div>
			</div>

			<div className="space-y-2">
				<h2 className="text-agrey-900 dark:text-white">Small</h2>

				<div className="flex gap-x-4">
					<Button className="ghostgray small">Normal</Button>
					<Button className="ghostgray small" disabled>
						Disabled
					</Button>
					<Button className="ghostgray small loading">Loading</Button>
				</div>
			</div>
		</div>
	);
}
