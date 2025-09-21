"use client"

import { useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import { CodeBlock } from '@/components/ui/code-block'

export const useEnhancedCodeBlocks = (containerRef: React.RefObject<HTMLElement>) => {
  useEffect(() => {
    if (!containerRef.current) return

    const container = containerRef.current
    const preElements = container.querySelectorAll('pre > code')

    preElements.forEach((codeElement) => {
      const preElement = codeElement.parentElement as HTMLPreElement
      if (!preElement || preElement.hasAttribute('data-enhanced')) return

      // Extract language from className (format: language-javascript)
      const className = codeElement.className || ''
      const languageMatch = className.match(/language-(\w+)/)
      let language = languageMatch ? languageMatch[1] : 'javascript'
      
      // Map HTML to markup for Prism.js compatibility
      if (language === 'html') {
        language = 'markup'
      }

      // Get the code content
      const code = codeElement.textContent || ''

      // Create a container for our React component
      const reactContainer = document.createElement('div')
      reactContainer.className = 'enhanced-code-block'
      
      // Mark as enhanced to avoid double processing
      preElement.setAttribute('data-enhanced', 'true')
      
      // Replace the pre element with our enhanced version
      preElement.parentNode?.replaceChild(reactContainer, preElement)

      // Render our React component
      const root = createRoot(reactContainer)
      root.render(
        <CodeBlock
          language={language}
          showLineNumbers={true}
          showCopyButton={true}
          showRunButton={language === 'javascript' || language === 'js'}
        >
          {code}
        </CodeBlock>
      )
    })

    // Cleanup function
    return () => {
      const enhancedBlocks = container.querySelectorAll('.enhanced-code-block')
      enhancedBlocks.forEach((block) => {
        const root = (block as any)._reactInternalFiber
        if (root) {
          root.unmount()
        }
      })
    }
  }, [containerRef])
}

export default useEnhancedCodeBlocks