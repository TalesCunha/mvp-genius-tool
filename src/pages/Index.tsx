
import React, { useState } from 'react';
import MVPInput from '../components/MVPInput';
import Dashboard from '../components/Dashboard';

const Index = () => {
  const [hasSubmitted, setHasSubmitted] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container px-4 py-12">
        <div className="text-center mb-12 animate-fadeIn">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            AI MVP Validator
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Transform your ideas into validated MVPs with AI-powered insights and real-time metrics
          </p>
        </div>
        
        <div className="max-w-6xl mx-auto">
          <MVPInput />
          
          <div className="mt-16">
            <h2 className="text-2xl font-semibold text-gray-900 mb-8">
              Validation Metrics
            </h2>
            <Dashboard />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
