
import React, { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { TrendingUp, Plus } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import MobileNavbar from '@/components/MobileNavbar';
import Logo from '@/components/Logo';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

interface MVP {
  id: string;
  title: string;
  description: string;
  location: string;
  image_url: string;
  created_at: string;
}

const Feed = () => {
  const navigate = useNavigate();
  const { user, loading } = useAuth();
  const [mvps, setMvps] = useState<MVP[]>([]);
  const [topMVPs, setTopMVPs] = useState<{id: string, title: string, validations: number}[]>([]);
  const [loadingMVPs, setLoadingMVPs] = useState(true);

  useEffect(() => {
    if (!loading && !user) {
      navigate('/auth');
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    async function fetchMVPs() {
      try {
        setLoadingMVPs(true);
        const { data: mvpsData, error } = await supabase
          .from('mvps')
          .select('*')
          .order('created_at', { ascending: false });
        
        if (error) throw error;
        
        setMvps(mvpsData || []);

        // Fetch validation counts for top MVPs
        const { data: validationsData, error: validationsError } = await supabase
          .from('mvp_validations')
          .select('mvp_id, rating');
        
        if (validationsError) throw validationsError;

        // Process data to get top MVPs by validation count
        if (mvpsData && validationsData) {
          const mvpCountMap = new Map();
          
          validationsData.forEach(validation => {
            const count = mvpCountMap.get(validation.mvp_id) || 0;
            mvpCountMap.set(validation.mvp_id, count + 1);
          });

          const topMVPsArray = mvpsData
            .map(mvp => ({
              id: mvp.id,
              title: mvp.title,
              validations: mvpCountMap.get(mvp.id) || 0
            }))
            .sort((a, b) => b.validations - a.validations)
            .slice(0, 5);

          setTopMVPs(topMVPsArray);
        }
      } catch (error) {
        console.error('Error fetching MVPs:', error);
        toast({ 
          title: 'Erro', 
          description: 'Não foi possível carregar os MVPs',
          variant: 'destructive'
        });
      } finally {
        setLoadingMVPs(false);
      }
    }

    if (user) {
      fetchMVPs();
    }
  }, [user]);

  if (loading || loadingMVPs) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p>Carregando...</p>
      </div>
    );
  }

  // Fallback image for MVPs without an image
  const fallbackImage = "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=800&q=80";

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="fixed top-0 left-0 right-0 flex justify-between items-center px-4 py-3 bg-white/80 backdrop-blur-sm z-40 border-b">
        <Logo size="sm" />
        <div className="flex justify-end">
          <MobileNavbar />
        </div>
      </div>

      <div className="container px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1 space-y-6">
            {mvps.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500 mb-4">Nenhum MVP encontrado</p>
                <Button 
                  onClick={() => navigate('/create-mvp')}
                  className="rounded-xl"
                >
                  Criar seu primeiro MVP
                </Button>
              </div>
            ) : (
              mvps.map((mvp) => (
                <Card key={mvp.id} className="p-4 md:p-6 hover:shadow-md transition-shadow rounded-xl overflow-hidden">
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="w-full md:w-1/3 h-48 rounded-lg overflow-hidden">
                      <img 
                        src={mvp.image_url || fallbackImage} 
                        alt={mvp.title} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold mb-2">{mvp.title}</h3>
                      <p className="text-gray-600 mb-4">{mvp.description}</p>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-500">{mvp.location || 'Localização não especificada'}</span>
                        <Button 
                          onClick={() => navigate(`/test-mvp/${mvp.id}`)}
                          className="rounded-xl"
                        >
                          Testar MVP
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))
            )}
          </div>

          <div className="w-full lg:w-80 mb-8 lg:mb-0">
            <div className="bg-white rounded-xl p-6 shadow-sm sticky top-20">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                MVPs Mais Validados
              </h3>
              <div className="space-y-4">
                {topMVPs.length === 0 ? (
                  <p className="text-gray-500 text-sm">Nenhuma validação encontrada</p>
                ) : (
                  topMVPs.map((mvp) => (
                    <div key={mvp.id} className="flex justify-between items-center">
                      <span className="text-gray-800">{mvp.title}</span>
                      <span className="text-sm text-gray-500">{mvp.validations} validações</span>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-center mt-12">
          <Button asChild size="lg" className="shadow-lg rounded-xl">
            <Link to="/create-mvp">
              <Plus className="w-4 h-4 mr-2" />
              Adicionar MVP
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Feed;
