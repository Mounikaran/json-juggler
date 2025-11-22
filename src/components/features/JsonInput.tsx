import React from "react";
import { Card } from "../ui/Card";

interface JsonInputProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

export const JsonInput: React.FC<JsonInputProps> = ({
  value,
  onChange,
  error,
}) => {
  return (
    <Card className="h-full flex flex-col">
      <div className="relative flex-1 min-h-0" style={{ minHeight: "100%" }}>
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder='Paste existing JSON here...\n\nExample:\n{\n  "org_mapper": [],\n  "other_data": "value"\n}'
          className={`absolute inset-0 w-full h-full p-4 bg-gray-50 border rounded-xl font-mono text-sm resize-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none ${
            error ? "border-red-300 focus:ring-red-200" : "border-gray-200"
          }`}
          spellCheck={false}
        />
        {error && (
          <div className="absolute bottom-4 right-4 bg-red-50 text-red-600 text-xs px-3 py-1.5 rounded-full border border-red-100 flex items-center shadow-sm animate-fade-in">
            <svg
              className="w-3 h-3 mr-1.5"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                clipRule="evenodd"
              />
            </svg>
            {error}
          </div>
        )}
      </div>
    </Card>
  );
};
