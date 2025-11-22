import React, { useRef } from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';

interface FileUploaderProps {
    file: File | null;
    onFileSelect: (file: File) => void;
    onClear: () => void;
    fileType?: 'xlsx' | 'csv';
}

export const FileUploader: React.FC<FileUploaderProps> = ({ file, onFileSelect, onClear, fileType = 'xlsx' }) => {
    const fileInputRef = useRef<HTMLInputElement>(null);
    
    const fileExtension = fileType === 'csv' ? '.csv' : '.xlsx,.xls';
    const fileTypeLabel = fileType === 'csv' ? 'CSV' : 'XLSX';

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        const droppedFile = e.dataTransfer.files?.[0];
        if (droppedFile) {
            onFileSelect(droppedFile);
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        if (selectedFile) {
            onFileSelect(selectedFile);
        }
    };

    return (
        <Card className="h-full flex flex-col">
            <div className="p-6 flex-1 flex flex-col min-h-0">
                <div
                    className={`border-2 border-dashed rounded-xl p-4 text-center transition-all duration-200 flex-1 flex flex-col justify-center ${
                        file
                            ? 'border-indigo-300 bg-indigo-50/50'
                            : 'border-gray-200 hover:border-indigo-400 hover:bg-gray-50'
                    }`}
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
                >
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept={fileExtension}
                        onChange={handleFileChange}
                        className="hidden"
                    />

                    {file ? (
                        <div className="flex items-center justify-between px-4 animate-fade-in">
                            <div className="flex items-center space-x-4">
                                <div className="w-10 h-10 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center flex-shrink-0">
                                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                </div>
                                <div className="text-left">
                                    <p className="font-medium text-gray-900 truncate max-w-[200px]">{file.name}</p>
                                    <p className="text-xs text-gray-500">{(file.size / 1024).toFixed(1)} KB • {fileTypeLabel}</p>
                                </div>
                            </div>
                            <Button variant="ghost" onClick={onClear} className="text-red-500 hover:text-red-600 hover:bg-red-50 text-sm px-3 py-1">
                                Remove
                            </Button>
                        </div>
                    ) : (
                        <div className="flex items-center justify-center space-x-6">
                            <div className="flex items-center space-x-4">
                                <div className="w-12 h-12 bg-gray-100 text-gray-400 rounded-full flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                    </svg>
                                </div>
                                <div className="text-left">
                                    <p className="text-gray-600 font-medium text-sm">Upload {fileTypeLabel} file</p>
                                    <p className="text-xs text-gray-400 mt-0.5">Drag and drop or click to browse</p>
                                </div>
                            </div>
                            <Button variant="secondary" onClick={() => fileInputRef.current?.click()} className="text-sm py-2 px-4">
                                Browse
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </Card>
    );
};
