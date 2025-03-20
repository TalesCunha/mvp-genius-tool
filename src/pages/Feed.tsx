
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { TrendingUp, Plus, User, LogOut } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';

const Feed = () => {
  const navigate = useNavigate();
  const mockMVPs = [
    {
      id: 1,
      title: "App de Delivery na Índia",
      description: "Precisamos de testadores para validar nossa solução de delivery com foco em comida vegana Indiana.",
      location: "Mumbai, Índia",
      testers: 45,
      image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 2,
      title: "Fintech para Microempreendedores",
      description: "Solução financeira focada em pequenos negócios do sudeste asiático.",
      location: "Singapura",
      testers: 32,
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80"
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

  const handleLogout = () => {
    toast({
      title: "Logout realizado",
      description: "Você foi desconectado com sucesso"
    });
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="fixed top-0 right-0 p-4 z-50 flex gap-2">
        <Button asChild variant="outline" className="bg-white/80 backdrop-blur-sm">
          <Link to="/profile">
            <User className="w-4 h-4 mr-2" />
            Perfil
          </Link>
        </Button>
        <Button variant="outline" className="bg-white/80 backdrop-blur-sm" onClick={handleLogout}>
          <LogOut className="w-4 h-4 mr-2" />
          Sair
        </Button>
      </div>

      <div className="container px-4 py-8">
        <div className="flex gap-8">
          <div className="flex-1 space-y-6">
            {mockMVPs.map((mvp) => (
              <Card key={mvp.id} className="p-6 hover:shadow-md transition-shadow">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="w-full md:w-1/3 h-48 rounded-md overflow-hidden">
                    <img 
                      src={mvp.image} 
                      alt={mvp.title} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-2">{mvp.title}</h3>
                    <p className="text-gray-600 mb-4">{mvp.description}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500">{mvp.location}</span>
                      <Button onClick={() => navigate(`/test-mvp/${mvp.id}`)}>
                        Testar MVP
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>

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

        <div className="flex justify-center mt-12">
          <Button asChild size="lg" className="shadow-lg">
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
