import React, { useState } from 'react';
import { TripPlan } from '../types/result';

interface ResultViewProps {
  trip: TripPlan;
  onReset: () => void;
}

export const ResultView: React.FC<ResultViewProps> = ({ trip, onReset }) => {
  // Local state to allow interactive modification (removing stops, expanding days)
  const [tripData, setTripData] = useState<TripPlan>(trip);

  const handleRemoveStop = (dayIndex: number, stopId: string) => {
    const updatedDays = [...tripData.days];
    updatedDays[dayIndex].stops = updatedDays[dayIndex].stops.filter(
      (stop) => stop.id !== stopId
    );
    setTripData({ ...tripData, days: updatedDays });
  };

  return (
    <div className="w-full max-w-3xl mx-auto space-y-6">
      {/* Trip Header Card */}
      <div className="bg-gradient-to-r from-indigo-600 to-violet-600 text-white p-6 rounded-2xl shadow-lg">
        <div className="flex justify-between items-start">
          <div>
            <span className="bg-white/20 text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider">
              Custom Itinerary
            </span>
            <h1 className="text-3xl font-bold mt-2">{tripData.destination}</h1>
            <p className="text-indigo-100 mt-2 text-sm leading-relaxed">{tripData.overview}</p>
          </div>
          <button
            onClick={onReset}
            className="bg-white/10 hover:bg-white/20 text-white text-xs font-medium px-4 py-2 rounded-lg transition-colors border border-white/20"
          >
            Plan Another Trip
          </button>
        </div>
        <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between text-sm">
          <span className="text-indigo-100">Estimated Budget:</span>
          <span className="font-semibold bg-white/20 px-3 py-1 rounded-lg">
            {tripData.totalEstimatedBudget}
          </span>
        </div>
      </div>

      {/* Days & Stops Breakdown */}
      <div className="space-y-6">
        {tripData.days.map((day, dayIndex) => (
          <div key={dayIndex} className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-100">
              <div>
                <span className="text-xs font-bold text-indigo-600 uppercase tracking-wide">
                  Day {day.dayNumber}
                </span>
                <h3 className="text-lg font-bold text-gray-800">{day.title}</h3>
              </div>
              <span className="text-xs text-gray-400 font-medium">
                {day.stops.length} stops planned
              </span>
            </div>

            {day.stops.length === 0 ? (
              <p className="text-sm text-gray-400 italic py-2">All stops for this day have been removed.</p>
            ) : (
              <div className="space-y-4">
                {day.stops.map((stop) => (
                  <div
                    key={stop.id}
                    className="flex items-start justify-between p-4 bg-gray-50 hover:bg-gray-100/80 transition-colors rounded-xl border border-gray-100"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <span className="text-xs font-semibold bg-indigo-100 text-indigo-700 px-2.5 py-0.5 rounded-md">
                          {stop.time}
                        </span>
                        {stop.category && (
                          <span className="text-xs font-medium bg-gray-200 text-gray-700 px-2 py-0.5 rounded-md">
                            {stop.category}
                          </span>
                        )}
                        {stop.estimatedCost && (
                          <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">
                            {stop.estimatedCost}
                          </span>
                        )}
                      </div>
                      <h4 className="font-semibold text-gray-800 text-base mt-1">{stop.title}</h4>
                      <p className="text-sm text-gray-600">{stop.description}</p>
                    </div>
                    <button
                      onClick={() => handleRemoveStop(dayIndex, stop.id)}
                      className="text-gray-400 hover:text-red-500 p-2 transition-colors ml-4"
                      title="Remove stop"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};