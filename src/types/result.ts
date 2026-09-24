export interface Stop {
  id: string;
  time: string;
  title: string;
  description: string;
  category: string;
  estimatedCost: string;
}

export interface DayPlan {
  dayNumber: number;
  title: string;
  stops: Stop[];
}

export interface TripPlan {
  destination: string;
  overview: string;
  totalEstimatedBudget: string;
  days: DayPlan[];
}