import {App, FileSystemAdapter, FileView, Notice} from 'obsidian';
import type {AlfredTriggerPluginSettings} from '../settings';
import {resolveLinkedNote} from './resolve-linked-note';

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
		const linkedNote = resolveLinkedNote(app, view);
		const targetFile = linkedNote ?? file;
		const context = {
			name: linkedNote ? linkedNote.basename : view.getDisplayText(),
			path: adapter.getFullPath(targetFile.path),
			properties: app.metadataCache.getFileCache(targetFile)?.frontmatter,
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
