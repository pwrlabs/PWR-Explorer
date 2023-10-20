import HeaderComponent from 'src/layout/header/header.component';
import FooterComponent from 'src/layout/footer/footer.component';

export default function HeaderFooterLayout({ children }: { children: React.ReactNode }) {
	return (
		<>
			{/* *~~*~~*~~ LAYOUT ~~*~~*~~* */}
			<HeaderComponent />

			<div className="dark:bg-abrandc-dark-blackish py-[80px]">{children}</div>

			<FooterComponent />
		</>
	);
}
