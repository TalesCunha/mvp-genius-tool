
import React, { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { TrendingUp, Plus, Star, Users, Calendar } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import MobileNavbar from '@/components/MobileNavbar';
import Logo from '@/components/Logo';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { format } from 'date-fns';

interface MVP {
  id: string;
  title: string;
  description: string;
  location: string;
  image_url: string;
  created_at: string;
  validation_count: number;
  avg_rating: number;
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
        
        // Fetch MVPs with validation counts and average ratings
        const { data, error } = await supabase
          .from('mvps')
          .select('*, mvp_validations(*)');
        
        if (error) throw error;
        
        // Process the data to calculate validation count and average rating
        const processedMVPs = data?.map(mvp => {
          const validations = mvp.mvp_validations || [];
          const validationCount = validations.length;
          
          // Calculate average rating
          const totalRating = validations.reduce((sum: number, val: any) => 
            sum + (val.rating || 0), 0);
          const avgRating = validationCount > 0 ? 
            (totalRating / validationCount) : 0;
          
          return {
            ...mvp,
            validation_count: validationCount,
            avg_rating: avgRating,
            mvp_validations: undefined // Remove nested data
          };
        }) || [];
        
        setMvps(processedMVPs);

        // Fetch top MVPs by validation count
        const topMVPsList = [...processedMVPs]
          .sort((a, b) => b.validation_count - a.validation_count)
          .slice(0, 5)
          .map(mvp => ({
            id: mvp.id,
            title: mvp.title,
            validations: mvp.validation_count
          }));
        
        setTopMVPs(topMVPsList);
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
        <div className="animate-spin p-4">
          <svg className="w-8 h-8 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        </div>
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
                    <div className="w-full md:w-1/3 h-48 rounded-lg overflow-hidden bg-gray-100">
                      <img 
                        src={mvp.image_url || fallbackImage} 
                        alt={mvp.title} 
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = fallbackImage;
                        }}
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold mb-2">{mvp.title}</h3>
                      <p className="text-gray-600 mb-4">{mvp.description}</p>
                      
                      <div className="flex flex-wrap gap-3 mb-4">
                        {mvp.location && (
                          <span className="inline-flex items-center text-sm bg-gray-100 px-3 py-1 rounded-full">
                            <span className="mr-1">📍</span> {mvp.location}
                          </span>
                        )}
                        <span className="inline-flex items-center text-sm bg-gray-100 px-3 py-1 rounded-full">
                          <Calendar className="w-3.5 h-3.5 mr-1" />
                          {format(new Date(mvp.created_at), 'dd/MM/yyyy')}
                        </span>
                        <span className="inline-flex items-center text-sm bg-gray-100 px-3 py-1 rounded-full">
                          <Users className="w-3.5 h-3.5 mr-1" />
                          {mvp.validation_count} {mvp.validation_count === 1 ? 'validação' : 'validações'}
                        </span>
                        {mvp.avg_rating > 0 && (
                          <span className="inline-flex items-center text-sm bg-gray-100 px-3 py-1 rounded-full">
                            <Star className="w-3.5 h-3.5 mr-1 fill-yellow-400 text-yellow-400" />
                            {mvp.avg_rating.toFixed(1)}
                          </span>
                        )}
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <Button 
                          variant="outline"
                          size="sm"
                          onClick={() => navigate(`/mvp/${mvp.id}`)}
                          className="rounded-xl"
                        >
                          Ver detalhes
                        </Button>
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
                  topMVPs.map((mvp, index) => (
                    <div key={mvp.id} className="flex justify-between items-center py-2 px-3 rounded-lg hover:bg-gray-50">
                      <div className="flex items-center gap-3">
                        <span className="text-xs font-medium text-gray-500 bg-gray-100 w-5 h-5 rounded-full flex items-center justify-center">
                          {index + 1}
                        </span>
                        <span className="text-gray-800 font-medium">{mvp.title}</span>
                      </div>
                      <span className="text-sm text-gray-500 font-medium">{mvp.validations}</span>
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
