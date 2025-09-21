"use client"

import { CodeSnippet } from '@/components/ui/code-snippet'

export default function CodeTestPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Enhanced Code Snippets Test</h1>
      
      <div className="space-y-8">
        <div>
          <h2 className="text-2xl font-semibold mb-4">JavaScript Example</h2>
          <CodeSnippet 
            language="javascript" 
            filename="example.js"
            highlightLines={[2, 5]}
          >
{`// Enhanced JavaScript code example
const greeting = "Hello, World!";

function sayHello() {
  console.log(greeting);  // This line is highlighted
  return greeting;
}

sayHello();`}
          </CodeSnippet>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-4">React TypeScript Example</h2>
          <CodeSnippet 
            language="tsx" 
            filename="Button.tsx"
          >
{`import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary';
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  onClick, 
  variant = 'primary' 
}) => {
  return (
    <button 
      className={\`btn btn-\${variant}\`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};`}
          </CodeSnippet>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-4">CSS Example</h2>
          <CodeSnippet 
            language="css" 
            filename="styles.css"
          >
{`.button {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border: none;
  border-radius: 8px;
  color: white;
  padding: 12px 24px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.button:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
}

.button:active {
  transform: translateY(0);
}`}
          </CodeSnippet>
        </div>
      </div>
      
      <div className="mt-12 p-6 bg-blue-50 rounded-lg border border-blue-200">
        <h3 className="text-lg font-semibold text-blue-900 mb-2">Test the Features!</h3>
        <ul className="text-blue-700 space-y-1">
          <li>• Click the copy icon to copy code to clipboard</li>
          <li>• Click the download icon to save code as a file</li>
          <li>• Try the run button on JavaScript examples</li>
          <li>• Notice the syntax highlighting and line numbers</li>
        </ul>
      </div>
    </div>
  )
}