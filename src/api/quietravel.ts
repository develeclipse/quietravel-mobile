// API Configuration
const API_BASE_URL = 'https://quietravel.vercel.app/api';

export interface Destination {
  id: string;
  name: string;
  slug: string;
  region: string;
  province: string;
  quietScore: number;
  subtitle?: string;
  description?: string;
  imageUrl?: string;
}

export interface POI {
  id: string;
  name: string;
  slug: string;
  type: string;
  quietScore: number;
  lat?: number;
  lng?: number;
  color: string;
  region: string;
}

// Fetch all destinations
export const getDestinations = async (): Promise<Destination[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/destinations`);
    if (!response.ok) throw new Error('Failed to fetch');
    return await response.json();
  } catch (error) {
    console.error('Error fetching destinations:', error);
    return [];
  }
};

// Search destinations
export const searchDestinations = async (query: string): Promise<Destination[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/search?q=${encodeURIComponent(query)}`);
    if (!response.ok) throw new Error('Search failed');
    const data = await response.json();
    return data.destinations || [];
  } catch (error) {
    console.error('Error searching:', error);
    return [];
  }
};

// Get single destination
export const getDestination = async (slug: string): Promise<Destination | null> => {
  try {
    const response = await fetch(`${API_BASE_URL}/destinations/${slug}`);
    if (!response.ok) return null;
    return await response.json();
  } catch (error) {
    console.error('Error fetching destination:', error);
    return null;
  }
};

// Match tours based on preferences
export const matchTours = async (preferences: {
  mood: string;
  duration: string;
  activities: string[];
  region: string;
}): Promise<any> => {
  try {
    const response = await fetch(`${API_BASE_URL}/tours/match`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(preferences),
    });
    if (!response.ok) throw new Error('Match failed');
    return await response.json();
  } catch (error) {
    console.error('Error matching tours:', error);
    return null;
  }
};
