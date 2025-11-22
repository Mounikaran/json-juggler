import React, { useState } from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';

interface ResultDisplayProps {
    result: any | null;
}

export const ResultDisplay: React.FC<ResultDisplayProps> = ({ result }) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        if (result) {
            navigator.clipboard.writeText(JSON.stringify(result, null, 2));
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    return (
        <Card className="h-full flex flex-col">
            <div className="relative flex-1 h-full min-h-0 bg-gray-900 rounded-xl overflow-hidden shadow-inner border border-gray-800">
                {result ? (
                    <>
                        {/* Copy button - floating top-right */}
                        <div className="absolute top-3 right-3 z-10">
                            <Button
                                variant={copied ? "secondary" : "primary"}
                                onClick={handleCopy}
                                className="text-sm py-2 px-4 shadow-lg"
                                icon={
                                    copied ? (
                                        <svg className="w-4 h-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                    ) : (
                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                                        </svg>
                                    )
                                }
                            >
                                {copied ? 'Copied!' : 'Copy'}
                            </Button>
                        </div>
                        <pre className="absolute inset-0 p-6 overflow-auto text-sm font-mono text-green-400 selection:bg-green-900 selection:text-white">
                            {JSON.stringify(result, null, 2)}
                        </pre>
                    </>
                ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center space-y-3">
                            <div className="w-16 h-16 mx-auto bg-gray-800 rounded-full flex items-center justify-center">
                                <svg className="w-8 h-8 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                            </div>
                            <div>
                                <p className="text-gray-500 font-medium">No output yet</p>
                                <p className="text-gray-600 text-sm mt-1">Upload a file and click Process</p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </Card>
    );
};
