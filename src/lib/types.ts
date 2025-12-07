// Галерея
export interface CamperImage {
  thumb: string;
  original: string;
}

// Відгуки
export interface Review {
  reviewer_name: string;
  reviewer_rating: number;
  comment: string;
}

// Основний Camper
export interface Camper {
  id: string;
  name: string;
  price: number;
  rating: number;
  location: string;
  description: string;

  // Details
  form: string;
  length: string;
  width: string;
  height: string;
  tank: string;
  consumption: string;

  // Features
  transmission: string;
  engine: string;
  AC: boolean;
  bathroom: boolean;
  kitchen: boolean;
  TV: boolean;
  radio: boolean;
  refrigerator: boolean;
  microwave: boolean;
  gas: boolean;
  water: boolean;

  // Media + Reviews
  gallery: CamperImage[];
  reviews: Review[];
}

// Фільтри
export type CamperFilters = {
  location?: string;
  form?: string;
  transmission?: string;
  engine?: string;

  AC?: boolean;
  bathroom?: boolean;
  kitchen?: boolean;
  TV?: boolean;
  radio?: boolean;
  refrigerator?: boolean;
  microwave?: boolean;
  gas?: boolean;
  water?: boolean;
};

// API
export interface FetchCampersParams extends CamperFilters {
  page?: number;
  limit?: number;
}

