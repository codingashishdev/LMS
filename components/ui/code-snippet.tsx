"use client"

import React from 'react'
import { CodeBlock } from './code-block'

interface CodeSnippetProps {
  children: string
  language?: string
  filename?: string
  showLineNumbers?: boolean
  highlightLines?: number[]
  className?: string
}

export const CodeSnippet: React.FC<CodeSnippetProps> = ({
  children,
  language = 'javascript',
  filename,
  showLineNumbers = true,
  highlightLines = [],
  className = ''
}) => {
  return (
    <div className={`my-8 ${className}`}>
      <CodeBlock
        language={language}
        filename={filename}
        showLineNumbers={showLineNumbers}
        highlightLines={highlightLines}
        showCopyButton={true}
        showRunButton={language === 'javascript' || language === 'js'}
        onRun={language === 'javascript' || language === 'js' ? (code) => {
          try {
            // Create a function that logs to console and shows result
            const result = new Function(code)()
            console.log('Code executed:', result)
          } catch (error) {
            console.error('Code execution error:', error)
          }
        } : undefined}
      >
        {children}
      </CodeBlock>
    </div>
  )
}

export default CodeSnippet