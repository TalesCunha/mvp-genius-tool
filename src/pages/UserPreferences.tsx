
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { toast } from '@/hooks/use-toast';
import { Checkbox } from '@/components/ui/checkbox';
import Logo from '@/components/Logo';
import { supabase } from '@/integrations/supabase/client';

const userTypes = [
  {
    id: 'developer',
    label: 'Desenvolvedor',
    description: 'Quero testar meus produtos e receber feedback'
  },
  {
    id: 'company',
    label: 'Empresa',
    description: 'Quero validar ideias e melhorar nossos produtos'
  },
  {
    id: 'tester',
    label: 'Testador',
    description: 'Quero testar produtos e dar feedback'
  }
];

const interests = [
  { id: 'mobile-apps', label: 'Aplicativos Móveis' },
  { id: 'web-apps', label: 'Aplicações Web' },
  { id: 'games', label: 'Jogos' },
  { id: 'ai-tools', label: 'Ferramentas de IA' },
  { id: 'productivity', label: 'Produtividade' },
  { id: 'social', label: 'Redes Sociais' },
];

const UserPreferences = () => {
  const navigate = useNavigate();
  const [userType, setUserType] = useState<string | null>(null);
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    // Check if user is authenticated
    const checkUser = async () => {
      const { data } = await supabase.auth.getSession();
      if (!data.session) {
        navigate('/auth');
        return;
      }
      setUser(data.session.user);
    };
    
    checkUser();
  }, [navigate]);

  const handleInterestChange = (id: string) => {
    setSelectedInterests(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  const handleSubmit = async () => {
    if (!userType) {
      toast({
        title: "Selecione um tipo de usuário",
        description: "Por favor, selecione como você usará a plataforma",
        variant: "destructive",
      });
      return;
    }

    if (!user) {
      toast({
        title: "Usuário não autenticado",
        description: "Por favor, faça login novamente",
        variant: "destructive",
      });
      navigate('/auth');
      return;
    }

    setIsLoading(true);
    
    try {
      // Get user data from localStorage
      const userData = JSON.parse(localStorage.getItem('newUserData') || '{}');
      
      // Create or update profile in Supabase
      const { error } = await supabase
        .from('profiles')
        .upsert({
          id: user.id,
          full_name: `${userData.firstName || ''} ${userData.lastName || ''}`.trim(),
          username: userData.email?.split('@')[0] || `user_${Math.random().toString(36).substring(2, 9)}`,
          location: userData.country || null,
        });

      if (error) {
        throw error;
      }
      
      toast({
        title: "Preferências salvas!",
        description: "Sua conta foi configurada com sucesso.",
      });
      
      // Clear temporary storage
      localStorage.removeItem('newUserData');
      
      // Navigate to feed
      navigate('/feed');
    } catch (error: any) {
      toast({
        title: "Erro ao salvar preferências",
        description: error.message || "Ocorreu um erro ao salvar suas preferências.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <div className="flex justify-center mb-2">
            <Logo size="sm" />
          </div>
          <CardTitle className="text-2xl text-center font-bold">Suas Preferências</CardTitle>
          <CardDescription className="text-center">
            Conte-nos como você usará o Global Test MVP
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <h3 className="font-medium text-sm">Como você usará nossa plataforma?</h3>
            <RadioGroup 
              value={userType || ''} 
              onValueChange={setUserType}
              className="space-y-3"
            >
              {userTypes.map(type => (
                <div key={type.id} className="flex items-start space-x-2 border rounded-xl p-3 hover:border-primary cursor-pointer" onClick={() => setUserType(type.id)}>
                  <RadioGroupItem value={type.id} id={type.id} className="mt-1" />
                  <div className="grid gap-1.5">
                    <Label htmlFor={type.id} className="font-medium cursor-pointer">{type.label}</Label>
                    <p className="text-sm text-muted-foreground">{type.description}</p>
                  </div>
                </div>
              ))}
            </RadioGroup>
          </div>
          
          <div className="space-y-4">
            <h3 className="font-medium text-sm">Quais são seus interesses?</h3>
            <div className="grid grid-cols-2 gap-3">
              {interests.map(interest => (
                <div key={interest.id} className="flex items-center space-x-2 border rounded-xl p-3 hover:border-primary cursor-pointer" onClick={() => handleInterestChange(interest.id)}>
                  <Checkbox 
                    id={interest.id} 
                    checked={selectedInterests.includes(interest.id)}
                    onCheckedChange={() => handleInterestChange(interest.id)}
                  />
                  <Label htmlFor={interest.id} className="cursor-pointer">{interest.label}</Label>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button 
            onClick={handleSubmit} 
            className="w-full rounded-xl"
            disabled={isLoading}
          >
            {isLoading ? "Salvando..." : "Concluir Cadastro"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default UserPreferences;
