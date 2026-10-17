import {App, PluginSettingTab, Setting} from 'obsidian';
import AlfredTriggerPlugin from './main';

export interface AlfredTriggerPluginSettings {
    bundleId: string,
    externalId: string;
}

export const DEFAULT_SETTINGS: AlfredTriggerPluginSettings = {
    bundleId: 'nl.ulso.curator',
    externalId: 'obsidian',
};

export class AlfredTriggerSettingTab extends PluginSettingTab {
    plugin: AlfredTriggerPlugin;

    constructor(app: App, plugin: AlfredTriggerPlugin) {
        super(app, plugin);
        this.plugin = plugin;
    }

    display(): void {
        const { containerEl } = this;

        containerEl.empty();

        new Setting(containerEl)
            .setName('Alfred bundle ID')
            .addText((text) =>
                text
                    .setPlaceholder('Enter bundle ID')
                    .setValue(this.plugin.settings.bundleId)
                    .onChange(async (value) => {
                        this.plugin.settings.bundleId = value;
                        await this.plugin.saveSettings();
                    }),
            );

        new Setting(containerEl)
            .setName('Alfred external ID')
            .addText((text) =>
                text
                    .setPlaceholder('Enter external ID')
                    .setValue(this.plugin.settings.externalId)
                    .onChange(async (value) => {
                        this.plugin.settings.externalId = value;
                        await this.plugin.saveSettings();
                    }),
            );
    }
}
