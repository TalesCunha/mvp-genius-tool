
import React from 'react';
import { Textarea } from '@/components/ui/textarea';

interface MVPFormSectionProps {
  title: string;
  fields: {
    label: string;
    placeholder: string;
  }[];
}

const MVPFormSection = ({ title, fields }: MVPFormSectionProps) => {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">{title}</h2>
      {fields.map((field, index) => (
        <div key={index}>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {field.label}
          </label>
          <Textarea 
            placeholder={field.placeholder}
            className="min-h-[100px]"
          />
        </div>
      ))}
    </div>
  );
};

export default MVPFormSection;
