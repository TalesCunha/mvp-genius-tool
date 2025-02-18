
import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AlertCircle, TrendingUp, Users } from 'lucide-react';

interface Feedback {
  strengths: string[];
  weaknesses: string[];
  marketComparison: {
    metric: string;
    value: number;
    benchmark: number;
  }[];
}

interface AIPersona {
  name: string;
  age: number;
  country: string;
  preference: string;
  feedback: string;
}

const AIFeedback = () => {
  const mockFeedback: Feedback = {
    strengths: [
      "Interface intuitiva e clean",
      "Proposta de valor clara",
      "Processo de onboarding eficiente"
    ],
    weaknesses: [
      "Falta call-to-action mais evidente",
      "Fluxo de checkout complexo",
      "Poucos elementos de gamificação"
    ],
    marketComparison: [
      {
        metric: "Taxa de Conversão",
        value: 2.1,
        benchmark: 2.8
      },
      {
        metric: "Retenção D1",
        value: 45,
        benchmark: 40
      }
    ]
  };

  const mockPersonas: AIPersona[] = [
    {
      name: "Yumi Tanaka",
      age: 28,
      country: "Japão",
      preference: "Design minimalista",
      feedback: "A interface está muito poluída para os padrões que estou acostumada. Sugiro reduzir elementos visuais."
    },
    {
      name: "Marcus Schmidt",
      age: 34,
      country: "Alemanha",
      preference: "Eficiência e praticidade",
      feedback: "O processo de checkout poderia ser mais otimizado. Muitos cliques desnecessários."
    }
  ];

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <AlertCircle className="w-5 h-5" />
          Análise de IA
        </h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-3">Pontos Fortes</h3>
            <div className="space-y-2">
              {mockFeedback.strengths.map((strength, index) => (
                <Badge key={index} variant="secondary" className="mr-2">
                  {strength}
                </Badge>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-3">Pontos a Melhorar</h3>
            <div className="space-y-2">
              {mockFeedback.weaknesses.map((weakness, index) => (
                <Badge key={index} variant="outline" className="mr-2">
                  {weakness}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-6">
          <h3 className="text-sm font-medium text-gray-500 mb-3 flex items-center gap-2">
            <TrendingUp className="w-4 h-4" />
            Comparação com o Mercado
          </h3>
          <div className="space-y-3">
            {mockFeedback.marketComparison.map((comparison, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-sm">{comparison.metric}</span>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">
                    {comparison.value}%
                  </span>
                  <span className="text-xs text-gray-500">
                    (Benchmark: {comparison.benchmark}%)
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <Users className="w-5 h-5" />
          Feedback de Personas Globais
        </h2>
        
        <div className="space-y-4">
          {mockPersonas.map((persona, index) => (
            <Card key={index} className="p-4">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 className="font-medium">{persona.name}</h3>
                  <p className="text-sm text-gray-500">
                    {persona.age} anos, {persona.country}
                  </p>
                </div>
                <Badge variant="secondary">
                  {persona.preference}
                </Badge>
              </div>
              <p className="text-sm text-gray-600">
                {persona.feedback}
              </p>
            </Card>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default AIFeedback;
