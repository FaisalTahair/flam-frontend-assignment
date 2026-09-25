import React, { useState, useRef } from 'react';
import { PromptInput } from './components/PromptInput';
import { LoadingState } from './components/LoadingState';
import { ErrorState } from './components/ErrorState';
import { ResultView } from './components/resultview';
import { generateTripPlan } from './lib/api';
import { TripPlan } from './types/result';

export function TripPlannerMain() {
  const [trip, setTrip] = useState<TripPlan | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const requestIdRef = useRef(0);

  const handleGenerate = async (userInput: string) => {
    const currentRequestId = ++requestIdRef.current;
    setIsLoading(true);
    setError(null);

    try {
      const data = await generateTripPlan(userInput);
      if (currentRequestId !== requestIdRef.current) return;
      setTrip(data);
    } catch (err: any) {
      if (currentRequestId !== requestIdRef.current) return;
      setError(err.message || 'Failed to generate itinerary. Please try again.');
    } finally {
      if (currentRequestId === requestIdRef.current) {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50/40 text-gray-900 py-12 px-4 sm:px-6">
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
          <PromptInput onSubmit={handleGenerate} isLoading={isLoading} />
        )}
        {isLoading && <LoadingState />}
        {error && <ErrorState message={error} onRetry={() => setError(null)} />}
        {trip && !isLoading && !error && (
          <ResultView trip={trip} onReset={() => setTrip(null)} />
        )}
      </div>
    </div>
  );
}
export default TripPlannerMain;