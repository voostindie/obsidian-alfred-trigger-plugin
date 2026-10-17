import {App, FileSystemAdapter, FileView, Notice} from 'obsidian';
import type {AlfredTriggerPluginSettings} from '../settings';

export function triggerAlfred(
	app: App,
	settings: AlfredTriggerPluginSettings,
): void {
	const view = app.workspace.getActiveViewOfType(FileView);
	const file = view?.file;
	if (!view || !file) {
		new Notice('Open a document before running this command.');
		return;
	}

	const adapter = app.vault.adapter;
	if (!(adapter instanceof FileSystemAdapter)) {
		new Notice('Alfred requires a local desktop vault.');
		return;
	}

	try {
		const context = {
			name: view.getDisplayText(),
			path: adapter.getFullPath(file.path),
			properties: app.metadataCache.getFileCache(file)?.frontmatter,
		};
		const bytes = new TextEncoder().encode(JSON.stringify(context));
		const argument = btoa(
			Array.from(bytes, (byte) => String.fromCharCode(byte)).join(''),
		);
		const url = new URL(
			`alfred://runtrigger/${encodeURIComponent(settings.bundleId)}/${encodeURIComponent(settings.externalId)}`,
		);
		url.searchParams.set('argument', argument);
		window.open(url.toString());
	} catch (error) {
		console.error('Failed to trigger Alfred', error);
		new Notice('Could not run the trigger. Check the console for details.');
	}
}
