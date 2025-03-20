
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/hooks/use-toast';
import { Sparkles, Upload, FileImage, ArrowLeft } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface AISuggestion {
  features: string[];
  techStack: string[];
  designTips: string[];
}

const CreateMVP = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [figmaUrl, setFigmaUrl] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const mockSuggestions: AISuggestion = {
    features: [
      "Sistema de gamificação com pontos e ranking",
      "Integração com wearables", 
      "Programa de recompensas por milestone"
    ],
    techStack: [
      "React Native para app mobile",
      "Firebase para backend",
      "Stripe para pagamentos"
    ],
    designTips: [
      "Use cores vibrantes para elementos de gamificação",
      "Mantenha interface limpa e focada em ações principais",
      "Adicione micro-animações para feedback"
    ]
  };

  const handleGenerateSuggestions = () => {
    setShowSuggestions(true);
    toast({
      title: "Sugestões geradas!",
      description: "A IA analisou seu MVP e gerou recomendações.",
    });
  };

  const handleImportFromFigma = () => {
    if (!figmaUrl) {
      toast({
        title: "URL necessário",
        description: "Por favor, insira uma URL do Figma válida",
        variant: "destructive"
      });
      return;
    }

    setIsDialogOpen(false);
    
    toast({
      title: "Imagens importadas!",
      description: "As imagens do seu projeto Figma foram importadas com sucesso.",
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Sucesso!",
      description: "MVP publicado com sucesso.",
    });
    navigate('/feed');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container max-w-3xl px-4">
        <Button 
          variant="ghost" 
          className="mb-4 rounded-full hover:bg-gray-100" 
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Voltar
        </Button>

        <Card className="p-6 rounded-2xl shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Publicar Novo MVP</h1>
            
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
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
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">1. Contexto do MVP</h2>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  O que é o MVP?
                </label>
                <Textarea 
                  placeholder="Descreva brevemente seu produto ou serviço..."
                  className="min-h-[100px]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Qual problema ele resolve?
                </label>
                <Textarea 
                  placeholder="Explique o objetivo do MVP..."
                  className="min-h-[100px]"
                />
              </div>

              <Button
                type="button"
                variant="secondary"
                className="w-full"
                onClick={handleGenerateSuggestions}
              >
                <Sparkles className="w-4 h-4 mr-2" />
                Gerar Sugestões com IA
              </Button>

              {showSuggestions && (
                <Card className="p-4 bg-gray-50">
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-sm font-medium mb-2">Features Recomendadas</h3>
                      <ul className="list-disc pl-5 text-sm text-gray-600 space-y-1">
                        {mockSuggestions.features.map((feature, index) => (
                          <li key={index}>{feature}</li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h3 className="text-sm font-medium mb-2">Stack Tecnológica Sugerida</h3>
                      <ul className="list-disc pl-5 text-sm text-gray-600 space-y-1">
                        {mockSuggestions.techStack.map((tech, index) => (
                          <li key={index}>{tech}</li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h3 className="text-sm font-medium mb-2">Dicas de Design</h3>
                      <ul className="list-disc pl-5 text-sm text-gray-600 space-y-1">
                        {mockSuggestions.designTips.map((tip, index) => (
                          <li key={index}>{tip}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </Card>
              )}
            </div>

            <div className="space-y-4">
              <h2 className="text-xl font-semibold">2. Instruções de Uso</h2>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  O que o usuário deve fazer?
                </label>
                <Textarea 
                  placeholder="Forneça instruções claras..."
                  className="min-h-[100px]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Passo a passo
                </label>
                <Textarea 
                  placeholder="Liste os passos necessários..."
                  className="min-h-[100px]"
                />
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-xl font-semibold">3. Limitações do MVP</h2>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  O que está pronto?
                </label>
                <Textarea 
                  placeholder="Descreva o estado atual do MVP..."
                  className="min-h-[100px]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Funcionalidades disponíveis
                </label>
                <Textarea 
                  placeholder="Liste as funcionalidades..."
                  className="min-h-[100px]"
                />
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-xl font-semibold">4. Objetivo do Teste</h2>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  O que você espera do usuário?
                </label>
                <Textarea 
                  placeholder="Descreva suas expectativas..."
                  className="min-h-[100px]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Critérios de avaliação
                </label>
                <Textarea 
                  placeholder="Liste os critérios..."
                  className="min-h-[100px]"
                />
              </div>
            </div>

            <div className="flex justify-end pt-6">
              <Button type="submit">
                Publicar MVP
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default CreateMVP;
