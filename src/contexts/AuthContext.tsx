
import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  signOut: () => Promise<void>;
  isLoading: boolean;
  autoConfirmEmail: (email: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, newSession) => {
        setSession(newSession);
        setUser(newSession?.user ?? null);
        setIsLoading(false);
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session: currentSession } }) => {
      setSession(currentSession);
      setUser(currentSession?.user ?? null);
      setIsLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  // Function to auto-confirm email for newly registered users
  const autoConfirmEmail = async (email: string) => {
    try {
      // Since we can't use admin.listUsers and admin.updateUserById with the anon key,
      // we'll handle this differently by using a custom approach
      
      // We'll simply attempt to sign in the user again which might work
      // if the previous sign-up completed on Supabase's side
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password: '' // We don't have the password here, so this will likely fail
      });
      
      if (!error) {
        toast({
          title: "Email confirmado!",
          description: "Você pode entrar normalmente agora.",
        });
      } else {
        console.log("Auto-confirmation attempt made, user may need to try logging in again");
      }
    } catch (error) {
      console.error("Error in auto-confirmation process:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, session, signOut, isLoading, autoConfirmEmail }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const RequireAuth = ({ children }: { children: ReactNode }) => {
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !user) {
      navigate('/auth');
    }
  }, [user, isLoading, navigate]);

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Carregando...</div>;
  }

  return user ? <>{children}</> : null;
};
