
import React, { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link, useNavigate } from 'react-router-dom';
import { User, Star, ArrowLeft, Loader2, AlertCircle, Eye, Users, Calendar } from 'lucide-react';
import MobileNavbar from '@/components/MobileNavbar';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { format } from 'date-fns';

interface MVPMetrics {
  views: number;
  testers: number;
  rating: number;
}

interface UserMVP {
  id: string;
  title: string;
  description: string;
  created_at: string;
  metrics: MVPMetrics;
}

const Profile = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [userMVPs, setUserMVPs] = useState<UserMVP[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUserMVPs() {
      if (!user) {
        navigate('/auth');
        return;
      }

      try {
        setLoading(true);
        
        // Fetch all MVPs created by the user with their validations
        const { data: mvpsData, error: mvpsError } = await supabase
          .from('mvps')
          .select('*, mvp_validations(*)')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false });
        
        if (mvpsError) throw mvpsError;
        
        // Process the data to create UserMVP objects with metrics
        const processedMVPs = mvpsData?.map(mvp => {
          const validations = mvp.mvp_validations || [];
          const testers = validations.length;
          
          // Calculate average rating
          const totalRating = validations.reduce((sum: number, val: any) => 
            sum + (val.rating || 0), 0);
          const avgRating = testers > 0 ? (totalRating / testers) : 0;
          
          return {
            id: mvp.id,
            title: mvp.title,
            description: mvp.description,
            created_at: mvp.created_at,
            metrics: {
              views: Math.floor(Math.random() * 100) + testers * 2, // Simulate views (random + based on testers)
              testers: testers,
              rating: avgRating,
            }
          };
        }) || [];
        
        setUserMVPs(processedMVPs);
      } catch (error) {
        console.error('Error fetching user MVPs:', error);
        toast({
          title: 'Erro',
          description: 'Não foi possível carregar seus MVPs',
          variant: 'destructive'
        });
      } finally {
        setLoading(false);
      }
    }

    fetchUserMVPs();
  }, [user, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-primary animate-spin" />
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

      <div className="container px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold">Meus MVPs</h1>
            <p className="text-gray-600">{userMVPs.length} {userMVPs.length === 1 ? 'MVP publicado' : 'MVPs publicados'}</p>
          </div>
          <Button 
            onClick={() => navigate('/create-mvp')}
            className="rounded-xl"
          >
            Criar novo MVP
          </Button>
        </div>

        <div className="grid gap-6">
          {userMVPs.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-xl shadow-sm">
              <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">Você ainda não criou nenhum MVP</h3>
              <p className="text-gray-500 mb-6">Comece criando seu primeiro MVP para receber feedback</p>
              <Button 
                onClick={() => navigate('/create-mvp')}
                className="rounded-xl"
              >
                Criar meu primeiro MVP
              </Button>
            </div>
          ) : (
            userMVPs.map((mvp) => (
              <Card key={mvp.id} className="p-6 hover:shadow-md transition-all rounded-xl">
                <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-2">{mvp.title}</h3>
                    <p className="text-gray-600 mb-3">{mvp.description}</p>
                    <div className="flex items-center text-sm text-gray-500">
                      <Calendar className="w-4 h-4 mr-1" />
                      <span>Criado em {format(new Date(mvp.created_at), 'dd/MM/yyyy')}</span>
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <div className="flex items-center gap-1 mb-2">
                      <Star className={`w-5 h-5 ${mvp.metrics.rating > 0 ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} />
                      <span className="font-medium">{mvp.metrics.rating > 0 ? mvp.metrics.rating.toFixed(1) : '-'}</span>
                    </div>
                    <div className="flex gap-4 text-sm">
                      <div className="flex items-center gap-1">
                        <Eye className="w-4 h-4 text-gray-400" />
                        <span>{mvp.metrics.views}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4 text-gray-400" />
                        <span>{mvp.metrics.testers}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex justify-between mt-6">
                  <Button 
                    variant="outline"
                    asChild
                  >
                    <Link to={`/test-mvp/${mvp.id}`}>
                      Visualizar teste
                    </Link>
                  </Button>
                  <Button 
                    asChild
                  >
                    <Link to={`/mvp/${mvp.id}`}>
                      Ver detalhes
                    </Link>
                  </Button>
                </div>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
