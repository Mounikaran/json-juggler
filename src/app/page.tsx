'use client'

import { useState, useEffect } from 'react'
import * as XLSX from 'xlsx'
import { processXlsxData, updateOrgMapper, testColumnConversion, debugMissingColumns } from '@/utils/xlsxConverter'
import { Header } from '@/components/features/Header'
import { JsonInput } from '@/components/features/JsonInput'
import { FileUploader } from '@/components/features/FileUploader'
import { ResultDisplay } from '@/components/features/ResultDisplay'
import { HelpModal } from '@/components/features/HelpModal'
import { Button } from '@/components/ui/Button'
import { InlineSettings } from '@/components/features/InlineSettings'
import { AppSettings, DEFAULT_SETTINGS, SETTINGS_STORAGE_KEY } from '@/types/settings'

export default function Home() {
  const [jsonInput, setJsonInput] = useState('')
  const [xlsxFile, setXlsxFile] = useState<File | null>(null)
  const [result, setResult] = useState<any>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [error, setError] = useState('')
  const [isHelpOpen, setIsHelpOpen] = useState(false)
  const [settings, setSettings] = useState<AppSettings>(DEFAULT_SETTINGS)

  // Load settings from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(SETTINGS_STORAGE_KEY)
      if (saved) {
        try {
          setSettings(JSON.parse(saved))
        } catch (e) {
          console.error('Failed to load settings:', e)
        }
      }
    }
  }, [])

  const handleSaveSettings = (newSettings: AppSettings) => {
    setSettings(newSettings)
    if (typeof window !== 'undefined') {
      localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(newSettings))
    }
  }

  const handleFileSelect = (file: File) => {
    setXlsxFile(file)
    setError('')
  }

  const handleClearFile = () => {
    setXlsxFile(null)
    setError('')
  }

  const handleJsonChange = (value: string) => {
    setJsonInput(value)

    // Only validate JSON if in Update Key mode
    if (settings.conversionMode === 'updateKey' && value.trim()) {
      try {
        JSON.parse(value)
        // Clear JSON-related errors if valid
        if (error && error.includes('JSON')) {
          setError('')
        }
      } catch (e) {
        setError('Invalid JSON format')
      }
    } else {
      // Clear JSON errors if not in Update Key mode or if empty
      if (error && error.includes('JSON')) {
        setError('')
      }
    }
  }

  const processFiles = async () => {
    // Validate inputs based on conversion mode
    if (!xlsxFile) {
      setError('Please upload a file')
      return
    }

    if (settings.conversionMode === 'updateKey') {
      if (!jsonInput.trim()) {
        setError('Please provide JSON input for update mode')
        return
      }
      if (!settings.targetKey.trim()) {
        setError('Please specify a target key in settings')
        return
      }
    }

    setIsProcessing(true)
    setError('')

    try {
      // Run column conversion tests for debugging
      testColumnConversion();

      // Read XLSX file
      const arrayBuffer = await xlsxFile.arrayBuffer()
      const workbook = XLSX.read(arrayBuffer, { type: 'array' })

      // Get first sheet
      const sheetName = workbook.SheetNames[0]
      console.log('Processing sheet:', sheetName);
      const worksheet = workbook.Sheets[sheetName]

      // Convert to array of arrays
      const rawData = XLSX.utils.sheet_to_json(worksheet, { header: 1 })
      console.log('Raw XLSX data:', rawData);

      // Process the data using our converter with naming convention
      const processedData = processXlsxData(rawData as any[][], settings.keyNamingConvention)
      console.log('Final processed data:', processedData);

      // Apply conversion mode
      if (settings.conversionMode === 'direct') {
        // Direct conversion: just return the processed data
        setResult(processedData)
      } else {
        // Update key mode: parse JSON and update the target key
        let parsedJson
        try {
          parsedJson = JSON.parse(jsonInput)
        } catch (e) {
          throw new Error('Invalid JSON format')
        }
        const updatedJson = { ...parsedJson, [settings.targetKey]: processedData }
        setResult(updatedJson)
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : 'An error occurred during processing')
    } finally {
      setIsProcessing(false)
    }
  }

  const clearAll = () => {
    setJsonInput('')
    setXlsxFile(null)
    setResult(null)
    setError('')
  }

  return (
    <div className="h-screen flex flex-col bg-gray-50 overflow-hidden">
      <Header onOpenHelp={() => setIsHelpOpen(true)} />
      <InlineSettings settings={settings} onChange={handleSaveSettings} />

      <main className="flex-1 overflow-hidden p-6">
        <div className="h-full max-w-[1800px] mx-auto grid grid-cols-12 gap-4">
          {/* Left Column: Input */}
          <div className="col-span-4 h-full flex flex-col gap-3">
            <div className={settings.conversionMode === 'updateKey' ? 'flex-1 min-h-0' : 'h-full'}>
              <FileUploader
                file={xlsxFile}
                onFileSelect={handleFileSelect}
                onClear={handleClearFile}
                fileType={settings.fileType}
              />
            </div>
            {settings.conversionMode === 'updateKey' && (
              <div className="flex-1 min-h-0">
                <JsonInput
                  value={jsonInput}
                  onChange={handleJsonChange}
                  error={error && error.includes('JSON') ? error : undefined}
                />
              </div>
            )}
          </div>

          {/* Center Column: Actions */}
          <div className="col-span-1 h-full flex flex-col items-center justify-center gap-4">
            <Button
              onClick={processFiles}
              disabled={isProcessing || !xlsxFile || (settings.conversionMode === 'updateKey' && !jsonInput.trim())}
              isLoading={isProcessing}
              className="w-full flex-col h-24 text-sm px-2"
              icon={
                <svg className="w-6 h-6 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              }
            >
              Process
            </Button>
            <Button
              variant="secondary"
              onClick={clearAll}
              className="w-full flex-col h-16 text-xs px-2"
              icon={
                <svg className="w-5 h-5 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              }
            >
              Clear
            </Button>

            {error && !error.includes('JSON') && (
              <div className="w-full mt-auto">
                <div className="bg-red-50 border border-red-200 rounded-lg p-2">
                  <div className="flex flex-col items-center text-center">
                    <svg className="w-4 h-4 text-red-400 mb-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                    <span className="text-xs text-red-800 font-medium">{error}</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Output */}
          <div className="col-span-7 h-full">
            <ResultDisplay result={result} />
          </div>
        </div>
      </main>

      <HelpModal isOpen={isHelpOpen} onClose={() => setIsHelpOpen(false)} />
    </div>
  )
}