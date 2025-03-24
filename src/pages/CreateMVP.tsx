
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { toast } from '@/hooks/use-toast';
import MVPHeader from '@/components/mvp/MVPHeader';
import FigmaImportDialog from '@/components/mvp/FigmaImportDialog';
import AISuggestions from '@/components/mvp/AISuggestions';
import MVPLinkInput from '@/components/mvp/MVPLinkInput';
import MVPFormSection from '@/components/mvp/MVPFormSection';
import ImageUploader from '@/components/mvp/ImageUploader';

const CreateMVP = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [mvpUrl, setMvpUrl] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Sucesso!",
      description: "MVP publicado com sucesso.",
    });
    navigate('/feed');
  };

  const formSections = [
    {
      title: "1. Contexto do MVP",
      fields: [
        {
          label: "O que é o MVP?",
          placeholder: "Descreva brevemente seu produto ou serviço..."
        },
        {
          label: "Qual problema ele resolve?",
          placeholder: "Explique o objetivo do MVP..."
        }
      ]
    },
    {
      title: "2. Instruções de Uso",
      fields: [
        {
          label: "O que o usuário deve fazer?",
          placeholder: "Forneça instruções claras..."
        },
        {
          label: "Passo a passo",
          placeholder: "Liste os passos necessários..."
        }
      ]
    },
    {
      title: "3. Limitações do MVP",
      fields: [
        {
          label: "O que está pronto?",
          placeholder: "Descreva o estado atual do MVP..."
        },
        {
          label: "Funcionalidades disponíveis",
          placeholder: "Liste as funcionalidades..."
        }
      ]
    },
    {
      title: "4. Objetivo do Teste",
      fields: [
        {
          label: "O que você espera do usuário?",
          placeholder: "Descreva suas expectativas..."
        },
        {
          label: "Critérios de avaliação",
          placeholder: "Liste os critérios..."
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container max-w-3xl px-4">
        <MVPHeader />

        <Card className="p-6 rounded-2xl shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Publicar Novo MVP</h1>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <MVPFormSection 
                title={formSections[0].title} 
                fields={formSections[0].fields} 
              />
              
              <MVPLinkInput mvpUrl={mvpUrl} setMvpUrl={setMvpUrl} />
              
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Imagens do MVP</h3>
                <ImageUploader onImageChange={setUploadedImage} />
                
                <div className="flex justify-end mt-2">
                  <FigmaImportDialog 
                    isOpen={isDialogOpen} 
                    onOpenChange={setIsDialogOpen} 
                  />
                </div>
              </div>
              
              <AISuggestions 
                showSuggestions={showSuggestions}
                setShowSuggestions={setShowSuggestions}
              />
            </div>

            {formSections.slice(1).map((section, index) => (
              <MVPFormSection 
                key={index} 
                title={section.title} 
                fields={section.fields} 
              />
            ))}

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
