'use client';

import { ClipboardIcon, TrashIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';

interface SnippetActionsProps {
  snippetId: number;
  snippetCode: string;
  onDelete: (id: number) => void;
}

export default function SnippetActions({ snippetId, snippetCode, onDelete }: SnippetActionsProps) {
  const [isCopied, setIsCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(snippetCode);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <>
      <button 
        className="text-gray-600 hover:text-gray-800"
        title="Copy to clipboard"
        onClick={copyToClipboard}
      >
        {isCopied ? 'Copied!' : <ClipboardIcon className="h-5 w-5" />}
      </button>

      <button 
        className="text-red-600 hover:text-gray-800"
        title="Delete snippet"
        onClick={() => onDelete(snippetId)}
      >
        <TrashIcon className="h-5 w-5" />
      </button>
    </>
  );
}