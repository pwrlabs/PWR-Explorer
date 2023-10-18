import STORAGE_KEYS from '@/static/storage.keys';

import { type Theme } from './theme.type';

export default class ThemeService {
	private _theme: Theme = 'light';

	constructor() {}

	async loadTheme() {
		const theme = (await localStorage.getItem(STORAGE_KEYS.theme)) as Theme;
		this._switchTheme(theme);
	}

	async toggleTheme() {
		const theme = localStorage.getItem(STORAGE_KEYS.theme) === 'light' ? 'dark' : 'light';
		localStorage.setItem(STORAGE_KEYS.theme, theme);
		this._switchTheme(theme);
	}

	private _switchTheme(newTheme: Theme) {
		if (typeof window === 'undefined') return;

		const html = document.querySelector('html') as HTMLElement;

		html.classList.replace(this._theme, newTheme);
		this._theme = newTheme;
	}

	get theme() {
		return this._theme;
	}
}
