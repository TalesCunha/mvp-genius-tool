
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link, useNavigate } from 'react-router-dom';
import { User, Star, ArrowLeft } from 'lucide-react';
import MobileNavbar from '@/components/MobileNavbar';

const Profile = () => {
  const navigate = useNavigate();
  const userMVPs = [
    {
      id: 1,
      title: "App de Fitness Gamificado",
      description: "Aplicativo que transforma exercícios em missões e recompensas",
      metrics: {
        views: 234,
        testers: 45,
        rating: 4.5
      }
    },
    {
      id: 2,
      title: "Marketplace de Designs",
      description: "Plataforma para compra e venda de designs exclusivos",
      metrics: {
        views: 189,
        testers: 32,
        rating: 4.2
      }
    }
  ];

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
          {userMVPs.map((mvp) => (
            <Link key={mvp.id} to={`/mvp/${mvp.id}`}>
              <Card className="p-6 hover:shadow-md transition-all rounded-xl">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-semibold mb-2">{mvp.title}</h3>
                    <p className="text-gray-600">{mvp.description}</p>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    <span className="font-medium">{mvp.metrics.rating}</span>
                  </div>
                </div>
                <div className="flex gap-6 text-sm text-gray-500">
                  <span>{mvp.metrics.views} visualizações</span>
                  <span>{mvp.metrics.testers} testadores</span>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;
