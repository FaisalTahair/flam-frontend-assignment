import { TripPlan } from '../types/result';
import { validateResult } from './ValidResult';

export async function generateTripPlan(userInput: string): Promise<TripPlan> {
  const response = await fetch('http://localhost:5000/api/generate-trip', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ userInput }),
  });

  if (!response.ok) {
    throw new Error(`Server error: ${response.statusText}`);
  }

  const jsonResponse = await response.json();
  
  // Validate shape before returning
  const validated = validateResult(jsonResponse);
  if (!validated) {
    throw new Error('AI returned an invalid data shape.');
  }

  return validated;
}