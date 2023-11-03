export function copyToClipboard(text: string) {
	navigator.clipboard.writeText(text);
}

export function isAddress(text: string) {
	return text.length === 42 && text.startsWith('0x');
}
