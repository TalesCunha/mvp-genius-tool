
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { TrendingUp, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';

const Feed = () => {
  const mockMVPs = [
    {
      id: 1,
      title: "App de Delivery na Índia",
      description: "Precisamos de testadores para validar nossa solução de delivery com foco em comida vegana Indiana.",
      location: "Mumbai, Índia",
      testers: 45,
    },
    {
      id: 2,
      title: "Fintech para Microempreendedores",
      description: "Solução financeira focada em pequenos negócios do sudeste asiático.",
      location: "Singapura",
      testers: 32,
    }
  ];

  const topMVPs = [
    {
      id: 1,
      title: "EduTech Brasil",
      validations: 234,
    },
    {
      id: 2,
      title: "HealthTech Japão",
      validations: 189,
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="container px-4 py-8">
        <div className="mb-6">
          <Button asChild className="flex items-center gap-2">
            <Link to="/create-mvp">
              <Plus className="w-4 h-4" />
              Adicionar Postagem
            </Link>
          </Button>
        </div>
        
        <div className="flex gap-8">
          {/* Main Feed */}
          <div className="flex-1 space-y-6">
            {mockMVPs.map((mvp) => (
              <Card key={mvp.id} className="p-6 hover:shadow-md transition-shadow">
                <h3 className="text-xl font-semibold mb-2">{mvp.title}</h3>
                <p className="text-gray-600 mb-4">{mvp.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">{mvp.location}</span>
                  <Button onClick={() => alert('Em breve!')}>
                    Testar MVP
                  </Button>
                </div>
              </Card>
            ))}
          </div>

          {/* Sidebar */}
          <div className="w-80 hidden lg:block">
            <div className="bg-white rounded-lg p-6 shadow-sm sticky top-20">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                MVPs Mais Validados
              </h3>
              <div className="space-y-4">
                {topMVPs.map((mvp) => (
                  <div key={mvp.id} className="flex justify-between items-center">
                    <span className="text-gray-800">{mvp.title}</span>
                    <span className="text-sm text-gray-500">{mvp.validations} validações</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Feed;
