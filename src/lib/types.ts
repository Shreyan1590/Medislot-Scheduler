export interface Test {
  id: string;
  name: string;
  description: string;
  price: number;
  icon: string;
}

export interface Doctor {
  id: string;
  name: string;
  image: string;
  availability: string;
  specialties: string[];
}
