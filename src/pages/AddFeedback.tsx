
import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { ArrowLeft, StarIcon, Send, Loader2 } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

const AddFeedback = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { user } = useAuth();
  const [rating, setRating] = useState<number>(0);
  const [hover, setHover] = useState<number | null>(null);
  const [feedback, setFeedback] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [mvpTitle, setMvpTitle] = useState('');

  useEffect(() => {
    const fetchMVPTitle = async () => {
      if (!id) return;
      
      try {
        const { data, error } = await supabase
          .from('mvps')
          .select('title')
          .eq('id', id)
          .single();
          
        if (error) throw error;
        if (data) setMvpTitle(data.title);
      } catch (error) {
        console.error('Error fetching MVP title:', error);
      }
    };
    
    fetchMVPTitle();
  }, [id]);

  const handleSubmitFeedback = async () => {
    if (!user) {
      toast({
        title: "Erro",
        description: "Você precisa estar logado para enviar feedback",
        variant: "destructive"
      });
      navigate('/auth');
      return;
    }

    if (rating === 0) {
      toast({
        title: "Erro",
        description: "Por favor, dê uma avaliação ao MVP",
        variant: "destructive"
      });
      return;
    }

    if (feedback.trim() === '') {
      toast({
        title: "Erro",
        description: "Por favor, adicione um comentário",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from('mvp_validations')
        .insert({
          mvp_id: id,
          user_id: user.id,
          rating,
          feedback
        });

      if (error) throw error;

      toast({
        title: "Feedback enviado!",
        description: "Obrigado por avaliar este MVP",
      });
      
      navigate(`/test-mvp/${id}`);
    } catch (error) {
      console.error('Error submitting feedback:', error);
      toast({
        title: "Erro",
        description: "Não foi possível enviar seu feedback",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="fixed top-0 left-0 p-4 z-50">
        <Button 
          variant="outline" 
          className="bg-white/80 backdrop-blur-sm rounded-xl"
          onClick={() => navigate(`/test-mvp/${id}`)}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Voltar
        </Button>
      </div>

      <div className="container max-w-2xl px-4 py-8">
        <Card className="p-6 rounded-xl">
          <h1 className="text-2xl font-bold mb-2">Adicionar Feedback</h1>
          {mvpTitle && <p className="text-gray-600 mb-6">Para: {mvpTitle}</p>}
          
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Sua Avaliação
              </label>
              <div className="flex space-x-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    className="focus:outline-none"
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHover(star)}
                    onMouseLeave={() => setHover(null)}
                  >
                    <StarIcon 
                      className={`w-8 h-8 ${
                        (hover !== null ? hover >= star : rating >= star)
                          ? 'text-yellow-400 fill-yellow-400'
                          : 'text-gray-300'
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Seu Comentário
              </label>
              <Textarea 
                placeholder="Compartilhe sua experiência com este MVP..."
                className="min-h-[150px] rounded-xl"
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Anexar Imagens (opcional)
              </label>
              <Input
                type="file"
                accept="image/*"
                multiple
                className="mb-2 rounded-xl"
              />
              <p className="text-sm text-gray-500">
                Você pode anexar capturas de tela ou outras imagens para ilustrar seu feedback
              </p>
            </div>

            <Button 
              onClick={handleSubmitFeedback}
              className="w-full rounded-xl"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Enviando...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4 mr-2" />
                  Enviar Feedback
                </>
              )}
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default AddFeedback;
