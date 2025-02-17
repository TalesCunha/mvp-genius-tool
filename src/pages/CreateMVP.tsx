
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Calendar } from '@/components/ui/calendar';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';

const steps = [
  {
    id: 1,
    title: "Qual problema seu MVP resolve?",
    type: "text",
    placeholder: "Descreva o problema que seu MVP pretende solucionar...",
  },
  {
    id: 2,
    title: "Quem é seu público-alvo?",
    type: "select",
    options: ["Startups", "Empresas", "Consumidores Finais", "Estudantes"],
  },
  {
    id: 3,
    title: "Recursos essenciais",
    type: "checkbox",
    options: ["Login/Cadastro", "Pagamentos", "Chat", "Geolocalização", "Notificações"],
  },
  {
    id: 4,
    title: "Prazo para validação",
    type: "calendar",
  },
  {
    id: 5,
    title: "Nome do MVP",
    type: "text",
    placeholder: "Digite um nome para seu MVP...",
  },
];

const CreateMVP = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const progress = (currentStep / steps.length) * 100;

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const currentQuestion = steps[currentStep - 1];

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="container max-w-2xl px-4 py-8">
        <div className="space-y-8">
          <div className="space-y-2">
            <h2 className="text-2xl font-semibold text-center">
              {currentQuestion.title}
            </h2>
            <Progress value={progress} className="w-full" />
          </div>

          <div className="bg-white rounded-lg p-8 shadow-sm">
            {currentQuestion.type === "text" && (
              <Input
                placeholder={currentQuestion.placeholder}
                className="w-full"
              />
            )}

            {currentQuestion.type === "select" && (
              <div className="space-y-4">
                {currentQuestion.options?.map((option) => (
                  <div key={option} className="flex items-center space-x-2">
                    <Checkbox id={option} />
                    <label htmlFor={option} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      {option}
                    </label>
                  </div>
                ))}
              </div>
            )}

            {currentQuestion.type === "checkbox" && (
              <div className="space-y-4">
                {currentQuestion.options?.map((option) => (
                  <div key={option} className="flex items-center space-x-2">
                    <Checkbox id={option} />
                    <label htmlFor={option} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      {option}
                    </label>
                  </div>
                ))}
              </div>
            )}

            {currentQuestion.type === "calendar" && (
              <div className="flex justify-center">
                <Calendar
                  mode="single"
                  className="rounded-md border"
                />
              </div>
            )}
          </div>

          <div className="flex justify-between">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentStep === 1}
            >
              Anterior
            </Button>
            <Button
              onClick={handleNext}
              disabled={currentStep === steps.length}
            >
              {currentStep === steps.length ? "Finalizar" : "Próximo"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateMVP;
