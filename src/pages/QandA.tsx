
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, MessageCircle, ThumbsUp } from 'lucide-react';
import MobileNavbar from '@/components/MobileNavbar';

// Sample data for Q&A
const sampleQuestions = [
  {
    id: 1,
    question: "Quanto custa o plano pro?",
    answer: "O plano pro custa R$49,90 por mês, com acesso a todas as funcionalidades avançadas e prioridade no suporte.",
    likes: 24,
    date: "3 dias atrás"
  },
  {
    id: 2,
    question: "Como fazer o teste A/B no meu MVP?",
    answer: "Para fazer o teste A/B, vá até a seção de 'Configurações' do seu MVP, clique em 'Testes A/B' e siga as instruções para configurar as duas versões que deseja testar.",
    likes: 18,
    date: "1 semana atrás"
  },
  {
    id: 3,
    question: "É possível integrar com outras ferramentas?",
    answer: "Sim, temos integrações com várias ferramentas como Google Analytics, Hotjar, Mixpanel, entre outras. Vá até a seção de 'Integrações' para configurar.",
    likes: 12,
    date: "2 semanas atrás"
  },
  {
    id: 4,
    question: "Como exportar os feedbacks dos usuários?",
    answer: "Na página do seu MVP, vá até a aba 'Feedbacks', clique no botão 'Exportar' no canto superior direito e escolha o formato desejado (CSV ou XLS).",
    likes: 9,
    date: "1 mês atrás"
  }
];

const QandA = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [questions, setQuestions] = useState(sampleQuestions);
  const [newQuestion, setNewQuestion] = useState('');

  const filteredQuestions = questions.filter(q => 
    q.question.toLowerCase().includes(searchTerm.toLowerCase()) || 
    q.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSubmitQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newQuestion.trim()) return;
    
    const newEntry = {
      id: questions.length + 1,
      question: newQuestion,
      answer: "Esta pergunta está aguardando resposta da nossa equipe.",
      likes: 0,
      date: "Agora mesmo"
    };
    
    setQuestions([newEntry, ...questions]);
    setNewQuestion('');
  };

  const handleLike = (id: number) => {
    setQuestions(questions.map(q => 
      q.id === id ? { ...q, likes: q.likes + 1 } : q
    ));
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <MobileNavbar />
      
      <div className="container max-w-4xl px-4 pt-16">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold mb-2">Perguntas e Respostas</h1>
          <p className="text-gray-500">Encontre respostas para as dúvidas mais comuns ou faça sua própria pergunta</p>
        </div>
        
        <div className="relative mb-8">
          <Search className="absolute left-3 top-3 text-gray-400" size={20} />
          <Input 
            placeholder="Buscar perguntas e respostas..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 py-6 rounded-xl"
          />
        </div>
        
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Faça sua pergunta</CardTitle>
            <CardDescription>
              Nossa equipe responderá o mais breve possível
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmitQuestion} className="flex gap-2">
              <Input 
                placeholder="Digite sua pergunta aqui..." 
                value={newQuestion}
                onChange={(e) => setNewQuestion(e.target.value)}
                className="flex-1"
              />
              <Button type="submit">Enviar</Button>
            </form>
          </CardContent>
        </Card>
        
        <h2 className="text-xl font-bold mb-4">Perguntas Frequentes</h2>
        
        <div className="space-y-4">
          {filteredQuestions.length === 0 ? (
            <div className="text-center py-10">
              <MessageCircle className="mx-auto h-12 w-12 text-gray-300" />
              <p className="mt-4 text-gray-500">Nenhuma pergunta encontrada com os termos buscados</p>
            </div>
          ) : (
            filteredQuestions.map((q) => (
              <Card key={q.id} className="transition-all hover:shadow-md">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">{q.question}</CardTitle>
                    <span className="text-xs text-gray-400">{q.date}</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 mb-4">{q.answer}</p>
                  <div className="flex justify-between items-center">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => handleLike(q.id)}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      <ThumbsUp size={16} className="mr-2" />
                      {q.likes}
                    </Button>
                    <Button variant="ghost" size="sm">Compartilhar</Button>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default QandA;
