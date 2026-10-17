import {PluginSettingTab, type SettingDefinitionItem} from 'obsidian';

export interface AlfredTriggerPluginSettings {
    bundleId: string,
    externalId: string;
}

export const DEFAULT_SETTINGS: AlfredTriggerPluginSettings = {
    bundleId: 'nl.ulso.curator',
    externalId: 'obsidian',
};

export class AlfredTriggerSettingTab extends PluginSettingTab {
    getSettingDefinitions(): SettingDefinitionItem<keyof AlfredTriggerPluginSettings>[] {
        return [
            {
                type: 'group',
                heading: 'Alfred URL',
                items: [
                    {
                        name: 'Alfred bundle ID',
                        control: {
                            type: 'text',
                            key: 'bundleId',
                            placeholder: 'Enter bundle ID',
                        },
                    },
                    {
                        name: 'Alfred external ID',
                        control: {
                            type: 'text',
                            key: 'externalId',
                            placeholder: 'Enter external ID',
                        },
                    },
                ],
            },
        ];
    }
}
