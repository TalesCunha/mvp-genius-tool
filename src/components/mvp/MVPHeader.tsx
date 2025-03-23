
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import Logo from '@/components/Logo';

const MVPHeader = () => {
  const navigate = useNavigate();
  
  return (
    <div className="flex justify-between items-center mb-6">
      <Logo size="sm" />
      <Button 
        variant="ghost" 
        className="rounded-full hover:bg-gray-100" 
        onClick={() => navigate(-1)}
      >
        <ArrowLeft className="w-5 h-5 mr-2" />
        Voltar
      </Button>
    </div>
  );
};

export default MVPHeader;
