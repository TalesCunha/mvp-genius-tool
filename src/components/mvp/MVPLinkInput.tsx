
import React from 'react';
import { Input } from '@/components/ui/input';
import { Link as LinkIcon } from 'lucide-react';

interface MVPLinkInputProps {
  mvpUrl: string;
  setMvpUrl: (url: string) => void;
}

const MVPLinkInput = ({ mvpUrl, setMvpUrl }: MVPLinkInputProps) => {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Link do MVP
      </label>
      <Input 
        placeholder="URL onde seu MVP está hospedado (ex: https://meu-mvp.com)"
        value={mvpUrl}
        onChange={(e) => setMvpUrl(e.target.value)}
        className="rounded-xl h-11"
      />
      <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
        <p className="text-sm text-blue-700 mb-2">
          <strong>Não tem um MVP ainda?</strong> Crie um protótipo rapidamente com o Lovable.
        </p>
        <p className="text-sm text-blue-600">
          <a 
            href="https://lovable.dev" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center hover:underline"
          >
            <LinkIcon className="w-4 h-4 mr-1" /> Visite lovable.dev
          </a>
        </p>
      </div>
    </div>
  );
};

export default MVPLinkInput;
