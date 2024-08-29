export enum AnimalType {
  DOG = "dog",
  CAT = "cat"
}

export interface CatBreedCardProps {
  name: string;
  imageUrl: string;
  id: string;
  breads_id: string | number;
  type: string;
}


export interface Animal {
  id: string;
  name: string;
  imageUrl: string;
    breeds: [];
  breads_id: string;
  type: string;
}

export interface BreedDetails { 
  bred_for?: string; 
  breed_group?: string; 
  life_span?: string;
  temperament?: string;
  breeds: Array<{
     description?: string; 
    id: string;
    name: string;
    url: string;
    bred_for?: string;
    breed_group?: string; 
    life_span?: string;
    temperament?: string;
  }>;
}
