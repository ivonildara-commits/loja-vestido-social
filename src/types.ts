export interface Dress {
  id: string;
  name: string;
  category: "Casamento" | "Formatura" | "Debutante" | "Gala / Coquetel";
  silhouette: "Sereia" | "Princesa" | "Evasê" | "Fluído & Reto";
  priceRange: string; // Ex: "Aluguel a partir de R$ 980" / "Venda sob consulta"
  description: string;
  details: string[];
  image: string;
  colors: { name: string; hex: string }[];
  fabrics: string[];
  rating: number;
}

export interface AdviserResponse {
  recommendationLetter: string;
  idealSilhouettes: string[];
  suggestedColors: string[];
  accessoriesAdvice: string;
  makeupAndHair: string;
}

export interface Appointment {
  id: string;
  clientName: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  dressId?: string;
  status: "Pendente" | "Confirmado";
  notes?: string;
}
