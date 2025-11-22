export interface AppSettings {
    fileType: 'xlsx' | 'csv';
    conversionMode: 'direct' | 'updateKey';
    targetKey: string;
    keyNamingConvention: 'snake_case' | 'camelCase' | 'as-is';
}

export const DEFAULT_SETTINGS: AppSettings = {
    fileType: 'xlsx',
    conversionMode: 'updateKey',
    targetKey: 'org_mapper',
    keyNamingConvention: 'snake_case',
};

export const SETTINGS_STORAGE_KEY = 'json-juggler-settings';
