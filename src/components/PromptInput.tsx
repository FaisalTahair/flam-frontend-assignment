import React, { useState } from 'react';

interface PromptInputProps {
  onSubmit: (prompt: string) => void;
  isLoading: boolean;
}

export const PromptInput: React.FC<PromptInputProps> = ({ onSubmit, isLoading }) => {
  const [input, setInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    onSubmit(input.trim());
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto mb-8 bg-white p-6 rounded-xl shadow-md border border-gray-100">
      <label className="block text-gray-700 font-semibold mb-2 text-sm uppercase tracking-wider">
        Describe Your Dream Trip
      </label>
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="e.g., A 3-day relaxing food and culture trip to Kyoto, Japan with a moderate budget..."
        rows={3}
        disabled={isLoading}
        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none resize-none text-gray-800 text-sm mb-4"
      />
      <div className="flex justify-between items-center">
        <span className="text-xs text-gray-400">Be descriptive for the best custom itinerary!</span>
        <button
          type="submit"
          disabled={isLoading || !input.trim()}
          className="bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-300 text-white font-medium px-6 py-2.5 rounded-lg transition-colors shadow-sm cursor-pointer disabled:cursor-not-allowed"
        >
          {isLoading ? 'Planning...' : 'Generate Itinerary'}
        </button>
      </div>
    </form>
  );
};