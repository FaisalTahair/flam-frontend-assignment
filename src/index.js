import React, { useState, useRef } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

function TripPlannerMain() {
  const [trip, setTrip] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [userInput, setUserInput] = useState('');

  const requestIdRef = useRef(0);

  const handleGenerate = async (e) => {
    e.preventDefault();
    if (!userInput.trim()) return;
    
    const currentRequestId = ++requestIdRef.current;
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('http://localhost:5000/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          prompt: userInput,
          destination: userInput,
          userInput: userInput 
        }),
      });
      const data = await response.json();
      if (currentRequestId !== requestIdRef.current) return;
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate itinerary.');
      }
      
      setTrip(data);
    } catch (err) {
      if (currentRequestId !== requestIdRef.current) return;
      setError(err.message || 'Failed to generate itinerary. Please try again.');
    } finally {
      if (currentRequestId === requestIdRef.current) {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50/30 to-blue-50/40 text-gray-900 py-12 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-10">
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">
            AI Trip <span className="text-indigo-600">Planner</span>
          </h1>
          <p className="text-gray-500 mt-2 text-sm max-w-lg mx-auto">
            Describe your travel aspirations and get an instant, fully interactive day-by-day itinerary.
          </p>
        </header>

        {!trip && !isLoading && (
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
            <form onSubmit={handleGenerate} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Where would you like to go and what do you want to do?
                </label>
                <textarea
                  rows={4}
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  placeholder="e.g., A 3-day food and culture trip to Tokyo for two people..."
                  className="w-full rounded-xl border border-gray-300 p-4 focus:ring-2 focus:ring-indigo-500 focus:outline-none shadow-sm"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-indigo-600 text-white py-3 px-6 rounded-xl font-semibold hover:bg-indigo-700 shadow-lg shadow-indigo-100 transition duration-200"
              >
                Generate Trip Plan
              </button>
            </form>
          </div>
        )}

        {isLoading && (
          <div className="bg-white rounded-2xl shadow-xl p-12 text-center border border-gray-100">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-indigo-600 border-t-transparent"></div>
            <p className="mt-4 text-gray-700 font-semibold text-lg">Crafting your dream itinerary with AI...</p>
            <p className="text-gray-400 text-sm mt-1">This may take a few seconds.</p>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 p-6 rounded-2xl shadow-sm text-center">
            <p className="font-medium">{error}</p>
            <button 
              onClick={() => setError(null)}
              className="mt-4 bg-red-600 text-white py-2 px-6 rounded-xl text-sm font-semibold hover:bg-red-700 transition"
            >
              Try Again
            </button>
          </div>
        )}

        {trip && !isLoading && !error && (
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100 space-y-6">
            <div className="flex justify-between items-center border-b pb-4">
              <h2 className="text-2xl font-bold text-gray-900">Your Custom Itinerary</h2>
              <button
                onClick={() => setTrip(null)}
                className="bg-gray-100 text-gray-700 py-2 px-4 rounded-xl text-sm font-semibold hover:bg-gray-200 transition"
              >
                Plan Another Trip
              </button>
            </div>
            <div className="space-y-4">
              <pre className="bg-gray-50 p-6 rounded-xl text-xs overflow-auto max-h-[500px] text-gray-800 border border-gray-200 font-mono">
                {JSON.stringify(trip, null, 2)}
              </pre>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

const rootElement = document.getElementById('root');
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <TripPlannerMain />
    </React.StrictMode>
  );
}