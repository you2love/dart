'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';

interface CodeBlockProps {
  code: string;
  language: string;
  title?: string;
}

export default function CodeBlock({ code, language, title }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const success = await navigator.clipboard.writeText(code);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="code-block">
      <div className="flex justify-between items-center px-3 py-2 bg-gray-900 border-b border-gray-700">
        <span className="text-gray-300 text-xs font-medium font-mono">{title || language}</span>
        <button
          onClick={handleCopy}
          className={cn(
            "bg-gray-700 text-gray-300 border border-gray-600 px-2 py-0.5 rounded text-xs font-semibold cursor-pointer transition-all duration-150",
            "hover:bg-gray-600 hover:border-gray-500 active:scale-95",
            copied && "bg-green-600 border-green-500"
          )}
        >
          {copied ? '已复制!' : '复制'}
        </button>
      </div>
      <pre className="p-4 overflow-x-auto m-0">
        <code className="font-mono text-sm leading-relaxed text-gray-200 whitespace-pre">
          {code}
        </code>
      </pre>
    </div>
  );
}