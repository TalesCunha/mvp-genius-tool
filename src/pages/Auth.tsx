
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardContent, CardFooter, CardTitle, CardDescription } from '@/components/ui/card';
import { toast } from '@/hooks/use-toast';
import { Label } from '@/components/ui/label';
import Logo from '@/components/Logo';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

const Auth = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { autoConfirmEmail } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    try {
      // Try to sign in first
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        // Handle different error cases
        if (error.message.includes('Email not confirmed')) {
          // Try to auto-confirm the email
          await autoConfirmEmail(email);
          throw new Error("Tentando confirmar seu email automaticamente. Por favor, tente fazer login novamente em alguns segundos.");
        } else if (error.message.includes('Invalid login credentials')) {
          // Check if the user exists but with wrong password
          const { data: userData, error: userError } = await supabase.auth.signUp({
            email,
            password,
          });
          
          if (userError) {
            if (userError.message.includes('already registered')) {
              throw new Error("Senha incorreta. Por favor tente novamente.");
            }
            throw userError;
          }
          
          // If we got here, the user didn't exist and we created a new account
          await autoConfirmEmail(email);
          
          toast({
            title: "Conta criada!",
            description: "Uma nova conta foi criada com sucesso.",
          });
          navigate('/feed');
          return;
        }
        
        throw error;
      }

      toast({
        title: "Sucesso!",
        description: "Login realizado com sucesso.",
      });
      navigate('/feed');
    } catch (err: any) {
      setError(err.message || 'Erro ao fazer login');
      toast({
        title: "Erro",
        description: err.message || 'Erro ao fazer login',
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-sm">
        <CardHeader className="space-y-1">
          <div className="flex justify-center mb-4">
            <Logo size="md" />
          </div>
          <CardTitle className="text-2xl font-bold text-center">Login</CardTitle>
          <CardDescription className="text-center">
            Acesse sua conta no Global Test MVP
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-2 rounded-lg text-sm">
                {error}
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="rounded-xl"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Senha</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="rounded-xl"
                required
              />
            </div>
            <Button type="submit" className="w-full rounded-xl" disabled={isLoading}>
              {isLoading ? 'Entrando...' : 'Entrar'}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <div className="relative w-full flex items-center justify-center">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-gray-300" />
            </div>
            <span className="relative bg-card px-3 text-sm text-muted-foreground">
              ou
            </span>
          </div>
          <Button 
            variant="outline" 
            className="w-full rounded-xl" 
            onClick={() => navigate('/create-account')}
          >
            Criar conta
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Auth;
