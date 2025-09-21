"use client"

import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Button } from '@/components/ui/button'
import { useToast } from '@/hooks/use-toast'
import { Check, Copy, Download, Play, TerminalSquare, CircleStop } from 'lucide-react'
import Prism from 'prismjs'

// Import common language support - only the ones that exist
import 'prismjs/components/prism-markup' // HTML
import 'prismjs/components/prism-javascript'
import 'prismjs/components/prism-typescript'
import 'prismjs/components/prism-jsx'
import 'prismjs/components/prism-tsx'
import 'prismjs/components/prism-css'
import 'prismjs/components/prism-json'
import 'prismjs/components/prism-bash'
import 'prismjs/components/prism-python'

// Import core Prism CSS (we'll override with our custom theme)
import 'prismjs/themes/prism.css'

interface CodeBlockProps {
  children: string
  language?: string
  filename?: string
  showLineNumbers?: boolean
  highlightLines?: number[]
  maxHeight?: number
  showCopyButton?: boolean
  showRunButton?: boolean
  onRun?: (code: string) => void
  className?: string
}

export const CodeBlock: React.FC<CodeBlockProps> = ({
  children,
  language = 'javascript',
  filename,
  showLineNumbers = true,
  highlightLines = [],
  maxHeight,
  showCopyButton = true,
  showRunButton = false,
  onRun,
  className = ''
}) => {
  const [copied, setCopied] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  const [isRunning, setIsRunning] = useState(false)
  const [output, setOutput] = useState<Array<{ type: 'log' | 'result' | 'error'; data: any[] }>>([])
  const workerRef = useRef<Worker | null>(null)
  const codeRef = useRef<HTMLElement>(null)
  const { toast } = useToast()

  const code = children.trim()

  useEffect(() => {
    if (codeRef.current) {
      Prism.highlightElement(codeRef.current)
    }
  }, [code, language])

  const copyToClipboard = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      toast({
        title: "Code copied!",
        description: "Code has been copied to your clipboard.",
        variant: "default",
      })
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      toast({
        title: "Copy failed",
        description: "Failed to copy code to clipboard.",
        variant: "destructive",
      })
    }
  }, [code, toast])

  const downloadCode = useCallback(() => {
    const blob = new Blob([code], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = filename || `code.${getFileExtension(language)}`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
    
    toast({
      title: "Download started",
      description: `Code saved as ${filename || `code.${getFileExtension(language)}`}`,
      variant: "default",
    })
  }, [code, filename, language, toast])

  // Run support for JS using a sandboxed Web Worker with console capture
  const canRun = useMemo(() => (showRunButton && ['javascript', 'js'].includes(language.toLowerCase())), [showRunButton, language])

  const terminateWorker = useCallback(() => {
    if (workerRef.current) {
      try { workerRef.current.terminate() } catch {}
      workerRef.current = null
    }
  }, [])

  const handleRun = useCallback(() => {
    if (onRun) {
      onRun(code)
      return
    }
    if (!canRun) return

    setIsRunning(true)
    setOutput([])

    const workerScript = `
      self.console.log = (...args) => self.postMessage({ type: 'log', data: args });
      self.console.error = (...args) => self.postMessage({ type: 'error', data: args });
      self.onmessage = (e) => {
        const src = e.data;
        try {
          const fn = new Function(src);
          const result = fn();
          if (typeof result !== 'undefined') {
            self.postMessage({ type: 'result', data: [result] });
          }
        } catch (err) {
          const msg = err && (err.stack || err.message) ? (err.stack || err.message) : String(err);
          self.postMessage({ type: 'error', data: [msg] });
        } finally {
          self.postMessage({ type: 'done', data: [] });
        }
      };
    `

    try {
      const blob = new Blob([workerScript], { type: 'text/javascript' })
      const url = URL.createObjectURL(blob)
      const worker = new Worker(url)
      workerRef.current = worker

      const timeout = setTimeout(() => {
        worker.postMessage('// timeout')
        terminateWorker()
        setIsRunning(false)
        setOutput(prev => prev.concat({ type: 'error', data: ['Execution timed out'] }))
      }, 3000)

      worker.onmessage = (e: MessageEvent) => {
        const { type, data } = e.data || {}
        if (type === 'done') {
          clearTimeout(timeout)
          terminateWorker()
          setIsRunning(false)
          return
        }
        if (type === 'log' || type === 'result' || type === 'error') {
          setOutput(prev => prev.concat({ type, data: Array.isArray(data) ? data : [data] }))
        }
      }

      worker.onerror = (err) => {
        clearTimeout(timeout)
        terminateWorker()
        setIsRunning(false)
        setOutput(prev => prev.concat({ type: 'error', data: [String(err.message || err)] }))
      }

      worker.postMessage(code)
    } catch (e: any) {
      // Fallback: run on main thread with console capture
      const originalLog = console.log
      const originalError = console.error
      try {
        setOutput([])
        ;(console as any).log = (...args: any[]) => setOutput(prev => prev.concat({ type: 'log', data: args }))
        ;(console as any).error = (...args: any[]) => setOutput(prev => prev.concat({ type: 'error', data: args }))
        const fn = new Function(code)
        const res = fn()
        if (typeof res !== 'undefined') setOutput(prev => prev.concat({ type: 'result', data: [res] }))
      } catch (err: any) {
        setOutput(prev => prev.concat({ type: 'error', data: [err?.message || String(err)] }))
      } finally {
        ;(console as any).log = originalLog
        ;(console as any).error = originalError
        setIsRunning(false)
      }
    }
  }, [onRun, code, canRun, terminateWorker])

  const getLanguageDisplayName = (lang: string): string => {
    const languageMap: Record<string, string> = {
      'javascript': 'JavaScript',
      'js': 'JavaScript',
      'typescript': 'TypeScript',
      'ts': 'TypeScript',
      'jsx': 'React JSX',
      'tsx': 'React TSX',
      'html': 'HTML',
      'markup': 'HTML',
      'css': 'CSS',
      'scss': 'SCSS',
      'json': 'JSON',
      'bash': 'Bash',
      'shell': 'Shell',
      'python': 'Python',
      'py': 'Python',
      'yaml': 'YAML',
      'xml': 'XML'
    }
    return languageMap[lang.toLowerCase()] || lang.toUpperCase()
  }

  const getFileExtension = (lang: string): string => {
    const extensionMap: Record<string, string> = {
      'javascript': 'js',
      'typescript': 'ts',
      'jsx': 'jsx',
      'tsx': 'tsx',
      'html': 'html',
      'markup': 'html',
      'css': 'css',
      'scss': 'scss',
      'json': 'json',
      'bash': 'sh',
      'python': 'py',
      'yaml': 'yml',
      'xml': 'xml'
    }
    return extensionMap[lang.toLowerCase()] || 'txt'
  }

  const lines = code.split('\n')
  const shouldShowExpand = maxHeight && lines.length > 20
  const displayLines = shouldShowExpand && !isExpanded ? lines.slice(0, 15) : lines

  return (
    <div
      className={`relative group rounded-lg overflow-hidden ${className}`}
      style={{
        backgroundColor: 'var(--code-bg)',
        border: '1px solid var(--code-border)'
      }}
    >
      {/* Header */}
      <div
        className="flex items-center justify-between px-4 py-2"
        style={{
          backgroundColor: 'var(--code-header-bg)',
          borderBottom: '1px solid var(--code-border)'
        }}
      >
        <div className="flex items-center space-x-3">
          {/* Traffic lights */}
          <div className="flex space-x-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500/90"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500/90"></div>
            <div className="w-3 h-3 rounded-full bg-green-500/90"></div>
          </div>
          
          {/* Filename or language */}
          <div className="flex items-center space-x-2">
            {filename && (
              <span className="text-sm font-medium" style={{ color: 'var(--code-foreground)' }}>{filename}</span>
            )}
            <span className="px-2 py-1 text-xs font-medium rounded"
              style={{ color: 'var(--code-foreground)', backgroundColor: 'var(--code-linenumber-bg)' }}
            >
              {getLanguageDisplayName(language)}
            </span>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex items-center space-x-1">
          {canRun && (
            <Button
              variant="ghost"
              size="sm"
              onClick={isRunning ? terminateWorker : handleRun}
              className="h-8 w-8 p-0"
              style={{ color: 'var(--code-foreground)' }}
            >
              {isRunning ? <CircleStop className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            </Button>
          )}
          
          <Button
            variant="ghost"
            size="sm"
            onClick={downloadCode}
            className="h-8 w-8 p-0"
            style={{ color: 'var(--code-foreground)' }}
          >
            <Download className="h-4 w-4" />
          </Button>

          {showCopyButton && (
            <Button
              variant="ghost"
              size="sm"
              onClick={copyToClipboard}
              className="h-8 w-8 p-0"
              style={{ color: 'var(--code-foreground)' }}
            >
              {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            </Button>
          )}
        </div>
      </div>

      {/* Code content */}
      <div 
        className="relative overflow-x-auto"
        style={{ maxHeight: maxHeight && !isExpanded ? maxHeight : undefined }}
      >
        <pre className="p-6 text-[13px] leading-7" style={{ backgroundColor: 'var(--code-bg)' }}>
          
          <code
            ref={codeRef}
            className={`language-${language} ${showLineNumbers ? 'pl-16' : 'pl-0'} block`}
            style={{ 
              color: 'var(--code-foreground)',
              background: 'transparent',
              textShadow: 'none',
              fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "DejaVu Sans Mono", "Fira Code", "Source Code Pro", "Roboto Mono", monospace'
            }}
          >
            {displayLines.join('\n')}
            {shouldShowExpand && !isExpanded && (
              <div className="mt-2 pt-2" style={{ borderTop: '1px solid var(--code-border)' }}>
                <span className="text-xs" style={{ color: 'var(--code-linenumber-fg)' }}>... {lines.length - 15} more lines</span>
              </div>
            )}
          </code>
        </pre>

        {/* Expand/Collapse button */}
        {shouldShowExpand && (
          <div className="absolute bottom-2 right-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-xs"
              style={{ backgroundColor: 'var(--code-header-bg)', borderColor: 'var(--code-border)', color: 'var(--code-foreground)' }}
            >
              {isExpanded ? 'Collapse' : `Show all ${lines.length} lines`}
            </Button>
          </div>
        )}
      </div>

      {/* Output panel */}
      {canRun && output.length > 0 && (
        <div style={{ borderTop: '1px solid var(--code-border)' }}>
          <div className="flex items-center gap-2 px-4 py-2" style={{ backgroundColor: 'var(--code-header-bg)' }}>
            <TerminalSquare className="h-4 w-4" style={{ color: 'var(--code-foreground)' }} />
            <span className="text-xs font-medium" style={{ color: 'var(--code-foreground)' }}>Output</span>
          </div>
          <div className="px-4 pb-3 pt-1 space-y-1">
            {output.map((line, idx) => (
              <div key={idx} className="text-[12px] leading-6 break-words" style={{ color: line.type === 'error' ? '#ef4444' : 'var(--code-foreground)' }}>
                {line.data.map((d, i) => (
                  <span key={i}>
                    {typeof d === 'string' ? d : JSON.stringify(d)}{i < line.data.length - 1 ? ' ' : ''}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default CodeBlock