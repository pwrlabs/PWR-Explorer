import { createContext } from 'react';

import ThemeService from './theme.service';

const ThemeSvcContext = createContext<ThemeService | null>(null);

export default ThemeSvcContext;
