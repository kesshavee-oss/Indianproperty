export interface Review {
  id: string;
  user: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Property {
  id: string;
  name: string;
  city: string;
  location: string;
  type: 'Apartment' | 'Villa' | 'Independent House' | 'Plot' | 'Commercial';
  price: string;
  priceValue: number; // in Lakhs for easier filtering
  area: string;
  bedrooms: string;
  image: string;
  gallery: {
    exterior: string;
    living: string;
    bedroom: string;
    kitchen: string;
    bathroom: string;
    balcony: string;
    surroundings: string;
    aerial: string;
  };
  description: string;
  amenities: string[];
  reviews?: Review[];
  isDeleted?: boolean;
}

export interface City {
  name: string;
  image: string;
  isDeleted?: boolean;
  totalProperties?: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
  photo?: string;
  phone?: string;
  signupDate: string;
  status: 'active' | 'disabled';
  savedProperties: string[];
  recentlyViewed: string[];
}

export type ViewState = 
  | 'home' 
  | 'browse' 
  | 'details' 
  | 'about' 
  | 'auth' 
  | 'user-dashboard' 
  | 'admin-dashboard' 
  | 'cities-page' 
  | 'careers' 
  | 'contact' 
  | 'help'
  | 'budget-homes'
  | 'luxury-homes';

export type AdminTab = 'overview' | 'properties' | 'add-property' | 'cities' | 'users' | 'analytics' | 'reports' | 'settings';
