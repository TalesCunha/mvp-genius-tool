
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { User, ArrowLeft, Mail, MapPin, Calendar, Award } from 'lucide-react';

const UserProfile = () => {
  const navigate = useNavigate();
  
  const userInfo = {
    name: "João Silva",
    email: "joao.silva@email.com",
    location: "São Paulo, Brasil",
    joinDate: "Março 2023",
    badges: ["MVP Creator", "Early Adopter"],
    stats: {
      createdMVPs: 2,
      testedMVPs: 8,
      feedback: 12
    }
  };

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
            <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center">
              <User className="w-12 h-12 text-gray-500" />
            </div>
            <div className="text-center md:text-left">
              <h1 className="text-2xl font-bold">{userInfo.name}</h1>
              <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 mt-2 text-gray-600">
                <div className="flex items-center justify-center md:justify-start">
                  <Mail className="w-4 h-4 mr-1" />
                  <span>{userInfo.email}</span>
                </div>
                <div className="flex items-center justify-center md:justify-start">
                  <MapPin className="w-4 h-4 mr-1" />
                  <span>{userInfo.location}</span>
                </div>
              </div>
              <div className="flex items-center justify-center md:justify-start mt-2">
                <Calendar className="w-4 h-4 mr-1 text-gray-600" />
                <span className="text-gray-600">Membro desde {userInfo.joinDate}</span>
              </div>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-lg font-semibold mb-3">Conquistas</h2>
            <div className="flex flex-wrap gap-2">
              {userInfo.badges.map((badge) => (
                <div key={badge} className="flex items-center px-3 py-1 bg-gray-100 rounded-full">
                  <Award className="w-4 h-4 mr-1 text-accent" />
                  <span className="text-sm">{badge}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-3">Estatísticas</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="p-4 bg-gray-50 text-center rounded-xl">
                <div className="text-2xl font-bold">{userInfo.stats.createdMVPs}</div>
                <div className="text-sm text-gray-600">MVPs Criados</div>
              </Card>
              <Card className="p-4 bg-gray-50 text-center rounded-xl">
                <div className="text-2xl font-bold">{userInfo.stats.testedMVPs}</div>
                <div className="text-sm text-gray-600">MVPs Testados</div>
              </Card>
              <Card className="p-4 bg-gray-50 text-center rounded-xl">
                <div className="text-2xl font-bold">{userInfo.stats.feedback}</div>
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
