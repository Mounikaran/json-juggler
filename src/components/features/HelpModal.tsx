import React from 'react';
import { Modal } from '../ui/Modal';

interface HelpModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const HelpModal: React.FC<HelpModalProps> = ({ isOpen, onClose }) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose} title="How to use Org File Mapper">
            <div className="space-y-8">
                <div className="space-y-4">
                    <div className="flex items-start space-x-4">
                        <div className="w-8 h-8 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center flex-shrink-0 font-bold">1</div>
                        <div>
                            <h4 className="font-semibold text-gray-900">Input JSON Data</h4>
                            <p className="text-gray-600 mt-1">Paste your JSON data into the left panel. This data must contain the structure you want to preserve. The <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm font-mono text-indigo-600">org_mapper</code> key will be updated with the new data.</p>
                        </div>
                    </div>

                    <div className="flex items-start space-x-4">
                        <div className="w-8 h-8 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center flex-shrink-0 font-bold">2</div>
                        <div>
                            <h4 className="font-semibold text-gray-900">Upload Excel File</h4>
                            <p className="text-gray-600 mt-1">Drag and drop or select your XLSX file. The application will automatically process column names to match the required format (snake_case).</p>
                        </div>
                    </div>

                    <div className="flex items-start space-x-4">
                        <div className="w-8 h-8 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center flex-shrink-0 font-bold">3</div>
                        <div>
                            <h4 className="font-semibold text-gray-900">Process & Export</h4>
                            <p className="text-gray-600 mt-1">Click the &quot;Process Files&quot; button to merge the data. The result will appear in the right panel, ready to be copied to your clipboard.</p>
                        </div>
                    </div>
                </div>

                <div className="bg-gray-50 rounded-xl p-6 border border-gray-100">
                    <h4 className="font-semibold text-gray-900 mb-3">Column Name Conversion Rules</h4>
                    <ul className="space-y-2 text-sm text-gray-600">
                        <li className="flex items-center">
                            <svg className="w-4 h-4 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            Spaces & special chars → underscores (e.g., &quot;First Name&quot; → &quot;first_name&quot;)
                        </li>
                        <li className="flex items-center">
                            <svg className="w-4 h-4 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            CamelCase → snake_case (e.g., &quot;EmailAddress&quot; → &quot;email_address&quot;)
                        </li>
                        <li className="flex items-center">
                            <svg className="w-4 h-4 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            &quot;#&quot; column is converted to &quot;id&quot; and removed from final output
                        </li>
                    </ul>
                </div>
            </div>
        </Modal>
    );
};
