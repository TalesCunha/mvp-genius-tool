
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

const MVPInput = () => {
  const [idea, setIdea] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!idea.trim()) {
      toast({
        title: "Error",
        description: "Please enter your MVP idea",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    // Simulated API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    toast({
      title: "Success",
      description: "Your MVP idea has been submitted for validation",
    });
    setIsLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-3xl mx-auto space-y-6 animate-fadeIn">
      <div className="space-y-2">
        <label
          htmlFor="mvp-idea"
          className="text-sm font-medium text-gray-700 block"
        >
          Describe your MVP idea
        </label>
        <textarea
          id="mvp-idea"
          rows={5}
          className="w-full p-4 rounded-lg border border-gray-200 focus:ring-2 focus:ring-accent focus:border-transparent transition-all resize-none shadow-sm"
          placeholder="E.g., A mobile app for vegan food delivery with geolocation features..."
          value={idea}
          onChange={(e) => setIdea(e.target.value)}
        />
      </div>
      <Button
        type="submit"
        className="w-full bg-primary hover:bg-primary/90 text-white font-medium py-3 rounded-lg transition-all"
        disabled={isLoading}
      >
        {isLoading ? "Processing..." : "Generate MVP Validation"}
      </Button>
    </form>
  );
};

export default MVPInput;
