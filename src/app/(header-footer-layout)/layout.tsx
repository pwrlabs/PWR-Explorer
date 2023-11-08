import HeaderComponent from 'src/layout/header/header.component';
import FooterComponent from 'src/layout/footer/footer.component';

export default function HeaderFooterLayout({ children }: { children: React.ReactNode }) {
	return (
		<>
			{/* *~~*~~*~~ LAYOUT ~~*~~*~~* */}
			<HeaderComponent />

			<div className="dark:bg-abrandc-dark-blackish bg-white min-h-screen-2 py-header">
				{children}
			</div>

			<FooterComponent />
		</>
	);
}
