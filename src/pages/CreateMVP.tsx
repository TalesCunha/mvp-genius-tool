
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/hooks/use-toast';

const CreateMVP = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Sucesso!",
      description: "MVP publicado com sucesso.",
    });
    navigate('/feed');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container max-w-3xl px-4">
        <Card className="p-6">
          <h1 className="text-2xl font-bold mb-6">Publicar Novo MVP</h1>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">1. Contexto do MVP</h2>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  O que é o MVP?
                </label>
                <Textarea 
                  placeholder="Descreva brevemente seu produto ou serviço..."
                  className="min-h-[100px]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Qual problema ele resolve?
                </label>
                <Textarea 
                  placeholder="Explique o objetivo do MVP..."
                  className="min-h-[100px]"
                />
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-xl font-semibold">2. Instruções de Uso</h2>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  O que o usuário deve fazer?
                </label>
                <Textarea 
                  placeholder="Forneça instruções claras..."
                  className="min-h-[100px]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Passo a passo
                </label>
                <Textarea 
                  placeholder="Liste os passos necessários..."
                  className="min-h-[100px]"
                />
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-xl font-semibold">3. Limitações do MVP</h2>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  O que está pronto?
                </label>
                <Textarea 
                  placeholder="Descreva o estado atual do MVP..."
                  className="min-h-[100px]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Funcionalidades disponíveis
                </label>
                <Textarea 
                  placeholder="Liste as funcionalidades..."
                  className="min-h-[100px]"
                />
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-xl font-semibold">4. Objetivo do Teste</h2>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  O que você espera do usuário?
                </label>
                <Textarea 
                  placeholder="Descreva suas expectativas..."
                  className="min-h-[100px]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Critérios de avaliação
                </label>
                <Textarea 
                  placeholder="Liste os critérios..."
                  className="min-h-[100px]"
                />
              </div>
            </div>

            <div className="flex justify-end pt-6">
              <Button type="submit">
                Publicar MVP
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default CreateMVP;
