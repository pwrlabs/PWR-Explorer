'use client';

// import WOMLogo from 'data-base64:src/assets/logo/WOM-Logo.svg';
import { useContext, useEffect, useState } from 'react';

import ThemeSvcContext from 'src/shared/services/theme/theme.context';
import ThemeService from 'src/shared/services/theme/theme.service';

function LoadingComponent() {
	return (
		<div className="h-full w-full grid place-items-center">
			{/* // <img className="w-20 h-20 " src={WOMLogo} /> */}
		</div>
	);
}

type AppInitProps = {
	children: React.ReactNode;
};

export default function AppInit({ children }: AppInitProps) {
	// *~~*~~*~~ Auth svc ~~*~~*~~* //
	const themeSvc = useContext<ThemeService>(ThemeSvcContext);

	// *~~*~~*~~ state ~~*~~*~~* //
	const [appLoaded, setAppLoaded] = useState<boolean>(false);

	// set up storage api
	useEffect(() => {
		(async () => {
			// *~~*~~*~~ LOAD THEME ~~*~~*~~* //

			if (typeof window === 'undefined' || !document.querySelector('html')) return;

			document.querySelector('html')!.classList.add('light');

			await themeSvc.loadTheme();

			setAppLoaded(true);

			// // 4. restore wallet
			// const wallet = await walletSvc.generate(privateKeyExists);

			// setAppLoaded(true);
		})();

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	// TODO: add loading screen
	if (!appLoaded) return <LoadingComponent />;

	return children;
}
