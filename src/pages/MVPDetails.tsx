
import React from 'react';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Jan', rating: 4.2 },
  { name: 'Fev', rating: 4.3 },
  { name: 'Mar', rating: 4.5 },
  { name: 'Abr', rating: 4.4 },
  { name: 'Mai', rating: 4.6 },
  { name: 'Jun', rating: 4.8 },
];

const comments = [
  {
    id: 1,
    user: "Alice Silva",
    avatar: "",
    comment: "Interface muito intuitiva! Adorei a experiência de uso.",
    rating: 5,
    date: "2024-03-15"
  },
  {
    id: 2,
    user: "João Santos",
    avatar: "",
    comment: "Boa ideia, mas precisa melhorar a performance em dispositivos móveis.",
    rating: 4,
    date: "2024-03-14"
  }
];

const MVPDetails = () => {
  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="container px-4 py-8">
        <Card className="p-6 mb-8">
          <h1 className="text-2xl font-bold mb-6">App de Fitness Gamificado</h1>
          
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-semibold mb-4">Avaliações ao Longo do Tempo</h2>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="name" stroke="#666" />
                    <YAxis stroke="#666" domain={[0, 5]} />
                    <Tooltip />
                    <Line 
                      type="monotone" 
                      dataKey="rating" 
                      stroke="#22c55e" 
                      strokeWidth={2}
                      dot={{ fill: '#22c55e' }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div>
              <h2 className="text-lg font-semibold mb-4">Feedbacks dos Usuários</h2>
              <div className="space-y-4">
                {comments.map((comment) => (
                  <Card key={comment.id} className="p-4">
                    <div className="flex items-start gap-4">
                      <Avatar>
                        <AvatarFallback>{comment.user[0]}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-medium">{comment.user}</span>
                          <span className="text-sm text-gray-500">{comment.date}</span>
                        </div>
                        <p className="text-gray-600">{comment.comment}</p>
                        <div className="mt-2 flex items-center">
                          <span className="text-sm text-gray-500">Avaliação: {comment.rating}/5</span>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default MVPDetails;
