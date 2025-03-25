
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { toast } from '@/hooks/use-toast';
import MVPHeader from '@/components/mvp/MVPHeader';
import FigmaImportDialog from '@/components/mvp/FigmaImportDialog';
import AISuggestions from '@/components/mvp/AISuggestions';
import MVPLinkInput from '@/components/mvp/MVPLinkInput';
import ImageUploader from '@/components/mvp/ImageUploader';
import { Loader2 } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Form, FormField, FormItem, FormLabel, FormControl } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';

interface FormValues {
  title: string;
  description: string;
  whatIsIt: string;
  whatProblemSolves: string;
  userInstructions: string;
  stepByStep: string;
  readyFeatures: string;
  availableFeatures: string;
  userExpectations: string;
  evaluationCriteria: string;
  location: string;
}

const CreateMVP = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [mvpUrl, setMvpUrl] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FormValues>({
    defaultValues: {
      title: '',
      description: '',
      whatIsIt: '',
      whatProblemSolves: '',
      userInstructions: '',
      stepByStep: '',
      readyFeatures: '',
      availableFeatures: '',
      userExpectations: '',
      evaluationCriteria: '',
      location: '',
    }
  });

  const handleSubmit = async (values: FormValues) => {
    if (!user) {
      toast({
        title: "Erro",
        description: "Você precisa estar logado para publicar um MVP",
        variant: "destructive"
      });
      navigate('/auth');
      return;
    }

    try {
      setIsSubmitting(true);

      // Prepare MVP data
      const mvpData = {
        user_id: user.id,
        title: values.title,
        description: values.description,
        mvp_url: mvpUrl,
        image_url: uploadedImage,
        location: values.location,
        instructions: `${values.userInstructions}\n\n${values.stepByStep}`,
        limitations: `${values.readyFeatures}\n\n${values.availableFeatures}`,
        test_objectives: `${values.userExpectations}\n\n${values.evaluationCriteria}`,
      };

      // Save MVP to Supabase
      const { data, error } = await supabase
        .from('mvps')
        .insert(mvpData)
        .select('id')
        .single();

      if (error) throw error;

      toast({
        title: "Sucesso!",
        description: "MVP publicado com sucesso.",
      });

      // Navigate to MVP details page
      navigate(`/mvp/${data.id}`);
    } catch (error) {
      console.error('Error saving MVP:', error);
      toast({
        title: "Erro",
        description: "Não foi possível publicar o MVP. Tente novamente.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container max-w-3xl px-4">
        <MVPHeader />

        <Card className="p-6 md:p-8 rounded-2xl shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Publicar Novo MVP</h1>
          </div>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
              <div className="space-y-6 bg-white p-6 rounded-xl border border-gray-100">
                <h2 className="text-xl font-semibold text-gray-800">Detalhes Básicos</h2>
                
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700">Título do MVP</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Um título curto e descritivo"
                          className="rounded-xl h-11"
                          required
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700">Descrição</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Descreva brevemente o que seu MVP faz"
                          className="min-h-[100px] rounded-xl"
                          required
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700">Localização (opcional)</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Cidade ou país onde o MVP foi desenvolvido"
                          className="rounded-xl h-11"
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                
                <MVPLinkInput mvpUrl={mvpUrl} setMvpUrl={setMvpUrl} />
                
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-700">Imagens do MVP</h3>
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

              <div className="space-y-6 bg-white p-6 rounded-xl border border-gray-100">
                <h2 className="text-xl font-semibold text-gray-800">1. Contexto do MVP</h2>
                
                <FormField
                  control={form.control}
                  name="whatIsIt"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700">O que é o MVP?</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Descreva brevemente seu produto ou serviço..."
                          className="min-h-[100px] rounded-xl"
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="whatProblemSolves"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700">Qual problema ele resolve?</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Explique o objetivo do MVP..."
                          className="min-h-[100px] rounded-xl"
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>

              <div className="space-y-6 bg-white p-6 rounded-xl border border-gray-100">
                <h2 className="text-xl font-semibold text-gray-800">2. Instruções de Uso</h2>
                
                <FormField
                  control={form.control}
                  name="userInstructions"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700">O que o usuário deve fazer?</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Forneça instruções claras..."
                          className="min-h-[100px] rounded-xl"
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="stepByStep"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700">Passo a passo</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Liste os passos necessários..."
                          className="min-h-[100px] rounded-xl"
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>

              <div className="space-y-6 bg-white p-6 rounded-xl border border-gray-100">
                <h2 className="text-xl font-semibold text-gray-800">3. Limitações do MVP</h2>
                
                <FormField
                  control={form.control}
                  name="readyFeatures"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700">O que está pronto?</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Descreva o estado atual do MVP..."
                          className="min-h-[100px] rounded-xl"
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="availableFeatures"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700">Funcionalidades disponíveis</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Liste as funcionalidades..."
                          className="min-h-[100px] rounded-xl"
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>

              <div className="space-y-6 bg-white p-6 rounded-xl border border-gray-100">
                <h2 className="text-xl font-semibold text-gray-800">4. Objetivo do Teste</h2>
                
                <FormField
                  control={form.control}
                  name="userExpectations"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700">O que você espera do usuário?</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Descreva suas expectativas..."
                          className="min-h-[100px] rounded-xl"
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="evaluationCriteria"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700">Critérios de avaliação</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Liste os critérios..."
                          className="min-h-[100px] rounded-xl"
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex justify-end pt-6">
                <Button
                  type="submit"
                  className="w-full sm:w-auto px-8 py-2.5 text-base"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Publicando...
                    </>
                  ) : (
                    "Publicar MVP"
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </Card>
      </div>
    </div>
  );
};

export default CreateMVP;
