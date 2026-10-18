import type {App, FileView, TFile} from 'obsidian';
import {MarkdownView, parseLinktext} from 'obsidian';

export function resolveLinkedNote(app: App, view: FileView): TFile | null {
	if (!(view instanceof MarkdownView) || view.getMode() !== 'source' || !view.file) {
		return null;
	}

	const editor = view.editor;
	const from = editor.getCursor('from');
	const to = editor.getCursor('to');
	if (from.line !== to.line) {
		return null;
	}

	const line = editor.getLine(from.line);
	const wikilinks = /\[\[([^[\]\r\n]+)]]/g;
	for (const match of line.matchAll(wikilinks)) {
		const start = match.index;
		const end = start + match[0].length;
		// A selection must stay within one link; a cursor after it is outside.
		if (from.ch < start || from.ch >= end || to.ch > end) {
			continue;
		}

		const target = match[1]?.split('|')[0]?.trim();
		if (!target) {
			return null;
		}

		const {path} = parseLinktext(target);
		if (!path) {
			return null;
		}

		const file = app.metadataCache.getFirstLinkpathDest(path, view.file.path);
		return file?.extension === 'md' ? file : null;
	}

	return null;
}
