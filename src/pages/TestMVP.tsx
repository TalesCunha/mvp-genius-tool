
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, MessageSquarePlus, ExternalLink } from 'lucide-react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';

const TestMVP = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const mvpDetails = {
    title: "App de Delivery na Índia",
    context: "Este MVP é uma solução de delivery focada no mercado indiano, especialmente para restaurantes veganos.",
    instructions: "1. Acesse o protótipo através do link\n2. Tente realizar um pedido completo\n3. Explore as opções de filtro por tipo de culinária\n4. Teste o sistema de avaliação de restaurantes",
    limitations: "- Pagamento simulado apenas com cartão de crédito\n- Disponível apenas em inglês no momento\n- Entregas simuladas em Mumbai",
    objectives: "- Validar a usabilidade do processo de pedido\n- Avaliar a clareza das informações dos restaurantes\n- Testar a eficiência do sistema de filtros",
    testLink: "https://exemplo.com/mvp-delivery"
  };

  const handleAccessPrototype = () => {
    toast({
      title: "Em breve!",
      description: "O acesso ao protótipo estará disponível em breve."
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="fixed top-0 left-0 p-4 z-50">
        <Button 
          variant="outline" 
          className="bg-white/80 backdrop-blur-sm"
          onClick={() => navigate('/feed')}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Voltar
        </Button>
      </div>

      <div className="container max-w-4xl px-4 py-8">
        <div className="space-y-6">
          <Card className="p-6">
            <h1 className="text-2xl font-bold mb-6">{mvpDetails.title}</h1>
            
            <div className="space-y-8">
              <section>
                <h2 className="text-lg font-semibold mb-3">Contexto</h2>
                <p className="text-gray-600">{mvpDetails.context}</p>
              </section>

              <section>
                <h2 className="text-lg font-semibold mb-3">Instruções</h2>
                <div className="text-gray-600 whitespace-pre-line">
                  {mvpDetails.instructions}
                </div>
              </section>

              <section>
                <h2 className="text-lg font-semibold mb-3">Limitações</h2>
                <div className="text-gray-600 whitespace-pre-line">
                  {mvpDetails.limitations}
                </div>
              </section>

              <section>
                <h2 className="text-lg font-semibold mb-3">Objetivos</h2>
                <div className="text-gray-600 whitespace-pre-line">
                  {mvpDetails.objectives}
                </div>
              </section>

              <section>
                <h2 className="text-lg font-semibold mb-3">Link para Teste</h2>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={handleAccessPrototype}
                >
                  Acessar Protótipo
                  <ExternalLink className="w-4 h-4 ml-2" />
                </Button>
              </section>
            </div>
          </Card>

          <div className="flex justify-center">
            <Button 
              size="lg"
              asChild
              className="gap-2"
            >
              <Link to={`/add-feedback/${id}`}>
                <MessageSquarePlus className="w-5 h-5" />
                Adicionar Feedback
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestMVP;
