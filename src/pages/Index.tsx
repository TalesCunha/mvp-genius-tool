
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Logo from '@/components/Logo';

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-50/90" />
          <div className="w-full h-full bg-[url('https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80')] bg-cover bg-center animate-pulse" />
        </div>
        
        <div className="container px-4 relative z-10">
          <div className="flex flex-col items-center mb-8">
            <Logo size="lg" />
          </div>
          <div className="text-center space-y-8 animate-fadeIn">
            <h1 className="text-6xl font-bold text-gray-900 mb-4">
              Teste seu MVP por todo o mundo!
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Valide suas ideias com usuários reais de diferentes países e culturas.
              Transforme seu MVP em um produto global.
            </p>
            <Button asChild size="lg" className="mt-8">
              <Link to="/auth">
                Começar Agora
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
