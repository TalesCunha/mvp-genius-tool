
import React, { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { User, ArrowLeft, Mail, MapPin, Calendar, Award, Loader2 } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface UserStats {
  createdMVPs: number;
  testedMVPs: number;
  feedback: number;
}

interface ProfileData {
  id: string;
  first_name: string | null;
  last_name: string | null;
  email: string | null;
  country: string | null;
  created_at: string;
}

const UserProfile = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [stats, setStats] = useState<UserStats>({
    createdMVPs: 0,
    testedMVPs: 0,
    feedback: 0,
  });
  const [badges, setBadges] = useState<string[]>([]);

  useEffect(() => {
    async function fetchUserData() {
      if (!user) {
        navigate('/auth');
        return;
      }

      try {
        setLoading(true);

        // Fetch profile data
        const { data: profileData, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();

        if (profileError) throw profileError;
        setProfile(profileData);

        // Fetch MVPs created by user
        const { data: userMVPs, error: mvpsError } = await supabase
          .from('mvps')
          .select('id')
          .eq('user_id', user.id);

        if (mvpsError) throw mvpsError;

        // Fetch validations submitted by user
        const { data: validations, error: validationsError } = await supabase
          .from('mvp_validations')
          .select('id, feedback')
          .eq('user_id', user.id);

        if (validationsError) throw validationsError;

        // Calculate stats
        const feedbackCount = validations ? validations.filter(v => v.feedback).length : 0;
        
        setStats({
          createdMVPs: userMVPs?.length || 0,
          testedMVPs: validations?.length || 0,
          feedback: feedbackCount
        });

        // Assign badges based on activity
        const userBadges: string[] = [];
        if (userMVPs && userMVPs.length > 0) userBadges.push('MVP Creator');
        if (validations && validations.length >= 5) userBadges.push('Active Tester');
        if (feedbackCount >= 3) userBadges.push('Feedback Pro');
        // Add "Early Adopter" badge if account is older than 30 days
        if (profileData.created_at) {
          const creationDate = new Date(profileData.created_at);
          const thirtyDaysAgo = new Date();
          thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
          if (creationDate < thirtyDaysAgo) {
            userBadges.push('Early Adopter');
          }
        }
        
        setBadges(userBadges);
      } catch (error) {
        console.error('Error fetching user data:', error);
        toast({
          title: 'Erro',
          description: 'Não foi possível carregar os dados do usuário',
          variant: 'destructive',
        });
      } finally {
        setLoading(false);
      }
    }

    fetchUserData();
  }, [user, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-primary animate-spin" />
      </div>
    );
  }

  const fullName = profile ? 
    `${profile.first_name || ''} ${profile.last_name || ''}`.trim() : 
    'Usuário';
  
  const userLocation = profile?.country || 'Localização não especificada';
  const email = profile?.email || user?.email || 'Email não especificado';
  
  const formatJoinDate = (dateString: string) => {
    const date = new Date(dateString);
    const month = date.toLocaleString('pt-BR', { month: 'long' });
    const year = date.getFullYear();
    return `${month} ${year}`;
  };
  
  const joinDate = profile?.created_at ? 
    formatJoinDate(profile.created_at) : 
    'Data desconhecida';

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

      <div className="container max-w-2xl px-4 py-8">
        <Card className="p-6 rounded-xl">
          <div className="flex flex-col md:flex-row items-center gap-6 mb-8">
            <Avatar className="w-24 h-24">
              <AvatarImage src="" />
              <AvatarFallback className="bg-gray-200">
                <User className="w-12 h-12 text-gray-500" />
              </AvatarFallback>
            </Avatar>
            <div className="text-center md:text-left">
              <h1 className="text-2xl font-bold">{fullName}</h1>
              <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 mt-2 text-gray-600">
                <div className="flex items-center justify-center md:justify-start">
                  <Mail className="w-4 h-4 mr-1" />
                  <span>{email}</span>
                </div>
                <div className="flex items-center justify-center md:justify-start">
                  <MapPin className="w-4 h-4 mr-1" />
                  <span>{userLocation}</span>
                </div>
              </div>
              <div className="flex items-center justify-center md:justify-start mt-2">
                <Calendar className="w-4 h-4 mr-1 text-gray-600" />
                <span className="text-gray-600">Membro desde {joinDate}</span>
              </div>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-lg font-semibold mb-3">Conquistas</h2>
            <div className="flex flex-wrap gap-2">
              {badges.length > 0 ? (
                badges.map((badge) => (
                  <div key={badge} className="flex items-center px-3 py-1 bg-gray-100 rounded-full">
                    <Award className="w-4 h-4 mr-1 text-accent" />
                    <span className="text-sm">{badge}</span>
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-500">Nenhuma conquista ainda. Continue usando a plataforma!</p>
              )}
            </div>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-3">Estatísticas</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="p-4 bg-gray-50 text-center rounded-xl">
                <div className="text-2xl font-bold">{stats.createdMVPs}</div>
                <div className="text-sm text-gray-600">MVPs Criados</div>
              </Card>
              <Card className="p-4 bg-gray-50 text-center rounded-xl">
                <div className="text-2xl font-bold">{stats.testedMVPs}</div>
                <div className="text-sm text-gray-600">MVPs Testados</div>
              </Card>
              <Card className="p-4 bg-gray-50 text-center rounded-xl">
                <div className="text-2xl font-bold">{stats.feedback}</div>
                <div className="text-sm text-gray-600">Feedbacks Enviados</div>
              </Card>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default UserProfile;
