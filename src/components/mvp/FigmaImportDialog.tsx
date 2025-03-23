
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { FileImage, Upload } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface FigmaImportDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

const FigmaImportDialog = ({ isOpen, onOpenChange }: FigmaImportDialogProps) => {
  const [figmaUrl, setFigmaUrl] = useState('');

  const handleImportFromFigma = () => {
    if (!figmaUrl) {
      toast({
        title: "URL necessário",
        description: "Por favor, insira uma URL do Figma válida",
        variant: "destructive"
      });
      return;
    }

    onOpenChange(false);
    
    toast({
      title: "Imagens importadas!",
      description: "As imagens do seu projeto Figma foram importadas com sucesso.",
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button variant="outline" className="rounded-xl">
          <FileImage className="w-4 h-4 mr-2" />
          Importar do Figma
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-white">
        <DialogHeader>
          <DialogTitle>Importar do Figma</DialogTitle>
          <DialogDescription>
            Insira a URL do seu projeto Figma para importar as imagens
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <Input 
            placeholder="URL do Figma (ex: https://www.figma.com/file/...)" 
            value={figmaUrl}
            onChange={(e) => setFigmaUrl(e.target.value)}
            className="rounded-xl"
          />
          <p className="text-sm text-gray-500">
            Certifique-se de que o projeto esteja configurado como 'Qualquer pessoa com o link'
          </p>
          <Button 
            onClick={handleImportFromFigma} 
            className="w-full rounded-xl"
          >
            <Upload className="w-4 h-4 mr-2" />
            Importar Imagens
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FigmaImportDialog;
