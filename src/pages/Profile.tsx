
import React, { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link, useNavigate } from 'react-router-dom';
import { User, Star, ArrowLeft, Loader2, AlertCircle } from 'lucide-react';
import MobileNavbar from '@/components/MobileNavbar';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

interface MVPMetrics {
  views: number;
  testers: number;
  rating: number;
}

interface UserMVP {
  id: string;
  title: string;
  description: string;
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
        
        // Fetch all MVPs created by the user
        const { data: mvpsData, error: mvpsError } = await supabase
          .from('mvps')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false });
        
        if (mvpsError) throw mvpsError;
        
        // Fetch all validations for the user's MVPs
        const mvpIds = mvpsData.map(mvp => mvp.id);
        
        let validationsData: any[] = [];
        if (mvpIds.length > 0) {
          const { data, error: validationsError } = await supabase
            .from('mvp_validations')
            .select('*')
            .in('mvp_id', mvpIds);
          
          if (validationsError) throw validationsError;
          validationsData = data || [];
        }
        
        // Process the data to create UserMVP objects with metrics
        const processedMVPs = mvpsData.map(mvp => {
          // Filter validations for this specific MVP
          const mvpValidations = validationsData.filter(v => v.mvp_id === mvp.id);
          
          // Calculate metrics
          const testers = mvpValidations.length;
          const totalRating = mvpValidations.reduce((sum, v) => sum + (v.rating || 0), 0);
          const avgRating = testers > 0 ? totalRating / testers : 0;
          
          return {
            id: mvp.id,
            title: mvp.title,
            description: mvp.description,
            metrics: {
              views: Math.floor(Math.random() * 100) + testers * 2, // Simulate views (random + based on testers)
              testers: testers,
              rating: avgRating,
            }
          };
        });
        
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
        <div className="flex items-center gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold">Meus MVPs</h1>
            <p className="text-gray-600">{userMVPs.length} MVPs publicados</p>
          </div>
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
              <Link key={mvp.id} to={`/mvp/${mvp.id}`}>
                <Card className="p-6 hover:shadow-md transition-all rounded-xl">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-semibold mb-2">{mvp.title}</h3>
                      <p className="text-gray-600">{mvp.description}</p>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className={`w-5 h-5 ${mvp.metrics.rating > 0 ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} />
                      <span className="font-medium">{mvp.metrics.rating > 0 ? mvp.metrics.rating.toFixed(1) : '-'}</span>
                    </div>
                  </div>
                  <div className="flex gap-6 text-sm text-gray-500">
                    <span>{mvp.metrics.views} visualizações</span>
                    <span>{mvp.metrics.testers} testadores</span>
                  </div>
                </Card>
              </Link>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
