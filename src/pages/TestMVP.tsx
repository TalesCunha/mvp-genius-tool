
import React, { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, MessageSquarePlus, ExternalLink, Loader2 } from 'lucide-react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface MVPData {
  id: string;
  title: string;
  description: string;
  context?: string;
  instructions: string | null;
  limitations: string | null;
  test_objectives: string | null;
  mvp_url: string | null;
}

const TestMVP = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [mvpDetails, setMvpDetails] = useState<MVPData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMVPData = async () => {
      if (!id) {
        toast({
          title: "Erro",
          description: "ID do MVP não encontrado",
          variant: "destructive"
        });
        navigate('/feed');
        return;
      }

      try {
        const { data, error } = await supabase
          .from('mvps')
          .select('*')
          .eq('id', id)
          .single();

        if (error) {
          throw error;
        }

        if (data) {
          setMvpDetails(data);
        } else {
          toast({
            title: "Erro",
            description: "MVP não encontrado",
            variant: "destructive"
          });
          navigate('/feed');
        }
      } catch (error) {
        console.error('Error fetching MVP data:', error);
        toast({
          title: "Erro",
          description: "Não foi possível carregar os dados do MVP",
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchMVPData();
  }, [id, navigate]);

  const handleAccessPrototype = () => {
    if (mvpDetails?.mvp_url) {
      window.open(mvpDetails.mvp_url, '_blank');
    } else {
      toast({
        title: "Link indisponível",
        description: "Este MVP não possui um link para teste."
      });
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex flex-col items-center gap-2">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p>Carregando dados do MVP...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="fixed top-0 left-0 p-4 z-50">
        <Button 
          variant="outline" 
          className="bg-white/80 backdrop-blur-sm rounded-xl"
          onClick={() => navigate('/feed')}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Voltar
        </Button>
      </div>

      {mvpDetails && (
        <div className="container max-w-4xl px-4 py-8">
          <div className="space-y-6">
            <Card className="p-6 rounded-xl">
              <h1 className="text-2xl font-bold mb-6">{mvpDetails.title}</h1>
              
              <div className="space-y-8">
                <section>
                  <h2 className="text-lg font-semibold mb-3">Contexto</h2>
                  <p className="text-gray-600">{mvpDetails.description}</p>
                </section>

                {mvpDetails.instructions && (
                  <section>
                    <h2 className="text-lg font-semibold mb-3">Instruções</h2>
                    <div className="text-gray-600 whitespace-pre-line">
                      {mvpDetails.instructions}
                    </div>
                  </section>
                )}

                {mvpDetails.limitations && (
                  <section>
                    <h2 className="text-lg font-semibold mb-3">Limitações</h2>
                    <div className="text-gray-600 whitespace-pre-line">
                      {mvpDetails.limitations}
                    </div>
                  </section>
                )}

                {mvpDetails.test_objectives && (
                  <section>
                    <h2 className="text-lg font-semibold mb-3">Objetivos</h2>
                    <div className="text-gray-600 whitespace-pre-line">
                      {mvpDetails.test_objectives}
                    </div>
                  </section>
                )}

                {mvpDetails.mvp_url && (
                  <section>
                    <h2 className="text-lg font-semibold mb-3">Link para Teste</h2>
                    <Button 
                      variant="outline" 
                      className="w-full rounded-xl"
                      onClick={handleAccessPrototype}
                    >
                      Acessar Protótipo
                      <ExternalLink className="w-4 h-4 ml-2" />
                    </Button>
                  </section>
                )}
              </div>
            </Card>

            <div className="flex justify-center">
              <Button 
                size="lg"
                asChild
                className="gap-2 rounded-xl"
              >
                <Link to={`/add-feedback/${id}`}>
                  <MessageSquarePlus className="w-5 h-5" />
                  Adicionar Feedback
                </Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TestMVP;
