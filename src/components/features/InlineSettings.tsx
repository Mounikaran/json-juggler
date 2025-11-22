import React from 'react';
import { AppSettings } from '@/types/settings';

interface InlineSettingsProps {
    settings: AppSettings;
    onChange: (settings: AppSettings) => void;
}

export const InlineSettings: React.FC<InlineSettingsProps> = ({ settings, onChange }) => {
    return (
        <div className="bg-white border-b border-gray-200 px-6 py-3">
            <div className="max-w-[1800px] mx-auto flex items-center gap-6 text-sm">
                {/* File Type Toggle */}
                <div className="flex items-center gap-2">
                    <span className="text-gray-600 font-medium">File:</span>
                    <div className="flex bg-gray-100 rounded-lg p-0.5">
                        <button
                            onClick={() => onChange({ ...settings, fileType: 'xlsx' })}
                            className={`px-3 py-1 rounded-md font-medium transition-all ${settings.fileType === 'xlsx'
                                    ? 'bg-white text-indigo-600 shadow-sm'
                                    : 'text-gray-600 hover:text-gray-900'
                                }`}
                        >
                            XLSX
                        </button>
                        <button
                            onClick={() => onChange({ ...settings, fileType: 'csv' })}
                            className={`px-3 py-1 rounded-md font-medium transition-all ${settings.fileType === 'csv'
                                    ? 'bg-white text-indigo-600 shadow-sm'
                                    : 'text-gray-600 hover:text-gray-900'
                                }`}
                        >
                            CSV
                        </button>
                    </div>
                </div>

                {/* Conversion Mode Toggle */}
                <div className="flex items-center gap-2">
                    <span className="text-gray-600 font-medium">Mode:</span>
                    <div className="flex bg-gray-100 rounded-lg p-0.5">
                        <button
                            onClick={() => onChange({ ...settings, conversionMode: 'direct' })}
                            className={`px-3 py-1 rounded-md font-medium transition-all ${settings.conversionMode === 'direct'
                                    ? 'bg-white text-indigo-600 shadow-sm'
                                    : 'text-gray-600 hover:text-gray-900'
                                }`}
                        >
                            Direct
                        </button>
                        <button
                            onClick={() => onChange({ ...settings, conversionMode: 'updateKey' })}
                            className={`px-3 py-1 rounded-md font-medium transition-all ${settings.conversionMode === 'updateKey'
                                    ? 'bg-white text-indigo-600 shadow-sm'
                                    : 'text-gray-600 hover:text-gray-900'
                                }`}
                        >
                            Update Key
                        </button>
                    </div>
                </div>

                {/* Target Key Input (conditional) */}
                {settings.conversionMode === 'updateKey' && (
                    <div className="flex items-center gap-2">
                        <span className="text-gray-600 font-medium">Key:</span>
                        <input
                            type="text"
                            value={settings.targetKey}
                            onChange={(e) => onChange({ ...settings, targetKey: e.target.value })}
                            placeholder="org_mapper"
                            className="px-2 py-1 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent w-32"
                        />
                    </div>
                )}

                {/* Key Naming Convention Dropdown */}
                <div className="flex items-center gap-2">
                    <span className="text-gray-600 font-medium">Keys:</span>
                    <select
                        value={settings.keyNamingConvention}
                        onChange={(e) => onChange({ ...settings, keyNamingConvention: e.target.value as any })}
                        className="px-3 py-1 border border-gray-300 rounded-md text-sm font-medium focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white"
                    >
                        <option value="snake_case">snake_case</option>
                        <option value="camelCase">camelCase</option>
                        <option value="as-is">As-is</option>
                    </select>
                </div>

                {/* Info indicator */}
                <div className="ml-auto flex items-center gap-1.5 text-xs text-gray-500">
                    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                    <span>Settings auto-save</span>
                </div>
            </div>
        </div>
    );
};
