
export type UserType = 'participant' | 'organizer';

export interface User {
  id: string;
  name: string;
  username?: string;
  email: string;
  phone?: string;
  documentType: 'cpf' | 'cnpj';
  documentNumber: string;
  birthDate?: string;
  userType: UserType;
  profileImage?: string;
  pageUrl?: string;
  description?: string;
}

export interface Event {
  id: string;
  title: string;
  category: string;
  description: string;
  capacity: number;
  ticketPrice: number;
  points: number;
  address: {
    cep: string;
    number: string;
    state: string;
    city: string;
    street: string;
    neighborhood: string;
    complement?: string;
  };
  startDate: string;
  endDate: string;
  salesStartDate: string;
  salesEndDate: string;
  status: 'active' | 'inactive';
  organizerId: string;
  imageUrl: string;
  venue?: string;
}

export interface Category {
  id: string;
  name: string;
}

export interface FaqCategory {
  id: string;
  title: string;
  icon: string;
  questions: FaqQuestion[];
}

export interface FaqQuestion {
  id: string;
  question: string;
  answer: string;
}
