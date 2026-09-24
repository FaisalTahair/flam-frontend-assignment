import { TripPlan } from '../types/result';

export function validateResult(raw: any): TripPlan | null {
  try {
    // If it's a string, parse it first
    const data = typeof raw === 'string' ? JSON.parse(raw) : raw;

    if (!data || typeof data !== 'object') return null;
    if (typeof data.destination !== 'string') return null;
    if (typeof data.overview !== 'string') return null;
    if (!Array.isArray(data.days)) return null;

    // Validate days and stops structure
    for (const day of data.days) {
      if (typeof day.dayNumber !== 'number') return null;
      if (typeof day.title !== 'string') return null;
      if (!Array.isArray(day.stops)) return null;

      for (const stop of day.stops) {
        if (typeof stop.id !== 'string') return null;
        if (typeof stop.time !== 'string') return null;
        if (typeof stop.title !== 'string') return null;
        if (typeof stop.description !== 'string') return null;
      }
    }

    return data as TripPlan;
  } catch (err) {
    console.error('Validation/Parse error:', err);
    return null;
  }
}