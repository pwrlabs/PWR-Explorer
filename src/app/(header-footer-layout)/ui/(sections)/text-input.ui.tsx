export default function TextInputSec() {
	return (
		<div className="space-y-4">
			<div className="space-y-2">
				<h2 className="text-agrey-900 dark:text-white">Normal</h2>

				<div className="w-[300px]">
					<input className="text-field" type="text" placeholder="text..." />
				</div>
			</div>
			<div className="space-y-2">
				<h2 className="text-agrey-900 dark:text-white">Typed</h2>

				<div className="w-[300px]">
					<input className="text-field" type="text" value="Value" />
				</div>
			</div>
			<div className="space-y-2">
				<h2 className="text-agrey-900 dark:text-white">Disabled</h2>

				<div className="w-[300px]">
					<input className="text-field" type="text" value="Value" disabled />
				</div>
			</div>
			<div className="space-y-2">
				<h2 className="text-agrey-900 dark:text-white">Invalid</h2>

				<div className="w-[300px]">
					<input className="text-field invalid" type="text" value="Value" />
				</div>
			</div>
		</div>
	);
}
