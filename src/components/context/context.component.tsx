'use client';

import ThemeService from 'src/shared/services/theme/theme.service';
import ThemeSvcContext from 'src/shared/services/theme/theme.context';
import { ReactNode } from 'react';

const themeSvc = new ThemeService();

type ContextComponentProps = {
	children: ReactNode;
};

export default function ContextComponent({ children }: ContextComponentProps) {
	return <ThemeSvcContext.Provider value={themeSvc}>{children}</ThemeSvcContext.Provider>;
}
