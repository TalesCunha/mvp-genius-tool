
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Sparkles } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface AISuggestion {
  features: string[];
  techStack: string[];
  designTips: string[];
}

interface AISuggestionsProps {
  showSuggestions: boolean;
  setShowSuggestions: (show: boolean) => void;
}

const AISuggestions = ({ showSuggestions, setShowSuggestions }: AISuggestionsProps) => {
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

  return (
    <div>
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
        <Card className="p-4 bg-gray-50 mt-4">
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
  );
};

export default AISuggestions;
