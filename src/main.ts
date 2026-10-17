import {Plugin} from 'obsidian';
import {triggerAlfred} from './commands/trigger-alfred';
import {
	AlfredTriggerPluginSettings,
	AlfredTriggerSettingTab,
	DEFAULT_SETTINGS,
} from './settings';

export default class AlfredTriggerPlugin extends Plugin {
    settings!: AlfredTriggerPluginSettings;

    async onload() {
        await this.loadSettings();

        this.addCommand({
            id: 'trigger-alfred',
            name: 'Trigger Alfred',
            callback: () => triggerAlfred(this.app, this.settings),
        });
        this.addSettingTab(new AlfredTriggerSettingTab(this.app, this));
    }

    onunload() {}

    async loadSettings() {
        this.settings = Object.assign(
            {},
            DEFAULT_SETTINGS,
            (await this.loadData()) as Partial<AlfredTriggerPluginSettings>,
        );
    }

    async saveSettings() {
        await this.saveData(this.settings);
    }
}
