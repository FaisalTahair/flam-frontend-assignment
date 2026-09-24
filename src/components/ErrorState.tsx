import React from 'react';

interface ErrorStateProps {
  message: string;
  onRetry: () => void;
}

export const ErrorState: React.FC<ErrorStateProps> = ({ message, onRetry }) => {
  return (
    <div className="w-full max-w-md mx-auto my-8 p-6 bg-red-50 border border-red-200 rounded-xl text-center shadow-sm">
      <div className="text-red-500 text-4xl mb-2">⚠️</div>
      <h3 className="text-lg font-semibold text-red-800 mb-1">Something went wrong</h3>
      <p className="text-sm text-red-600 mb-4">{message}</p>
      <button
        onClick={onRetry}
        className="bg-red-600 hover:bg-red-700 text-white text-sm font-medium px-5 py-2 rounded-lg transition-colors shadow-sm"
      >
        Try Again
      </button>
    </div>
  );
};