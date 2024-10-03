import FooterComponent from 'src/layout/footer/footer.component';
import SearchBarHeaderComponent from 'src/layout/header/searchbar-header.component';

export default function HeaderFooterLayout({ children }: { children: React.ReactNode }) {
	return (
		<>
			{/* *~~*~~*~~ LAYOUT ~~*~~*~~* */}
			<SearchBarHeaderComponent />

			<div className="dark:bg-abrandc-dark-blackish bg-white min-h-screen-2 pt-8">
				{children}
			</div>

			<FooterComponent />
		</>
	);
}
