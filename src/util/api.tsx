import { CAT_API, DOG_API } from "./constants";
import { Animal, AnimalType } from "./types";

export interface BreedDetails {
  id: string;
  name: string;
  url: string;
  images: string[];
  description?: string; 
  bred_for?: string; 
  breed_group?: string; 
  breeds: [
    {
      url: string;
      name: string;
      id: string;
    }
  ];
}

export const fetchAnimals = async (): Promise<Animal[]> => {
  const catUrl = `${CAT_API}/images/search?limit=6&has_breeds=1`;
  const dogUrl = `${DOG_API}/images/search?limit=6&has_breeds=1`;

  const results = await Promise.allSettled([
    fetch(catUrl, {
      headers: {
        "x-api-key": process.env.NEXT_PUBLIC_CAT_API_KEY || "",
      },
    }),
    fetch(dogUrl, {
      headers: {
        "x-api-key": process.env.NEXT_PUBLIC_DOG_API_KEY || "",
      },
    }),
  ]);

  const [catResult, dogResult] = results;

  let cats: Animal[] = [];
  let dogs: Animal[] = [];

  if (catResult.status === "fulfilled") {
    const catData = await catResult.value.json();  
    cats = catData.map((item: any) => ({
      id: item.id,
      name: item.breeds?.[0]?.name || "Unknown Cat Breed",
      imageUrl: item?.url || "",
      breeds: item.breeds?.[0]?.name || "Unknown Cat Breed",
      breads_id: item.breeds?.[0]?.id || "",
      type: AnimalType.CAT,
    }));
  }

  if (dogResult.status === "fulfilled") {
    const dogData = await dogResult.value.json();  
    dogs = dogData.map((item: any) => ({
      id: item.id,
      name: item.breeds?.[0]?.name || "Unknown Dog Breed",
      imageUrl: item?.url || "/placeholder.png",
      breeds: item.breeds?.[0]?.name || "Unknown Dog Breed",
      breads_id: item.breeds?.[0]?.id || "",
      type: AnimalType.DOG,
    }));
  }

  return [...cats, ...dogs];
};


export const fetchBreedDetails = async (
  id: string,
  type: AnimalType.CAT | AnimalType.DOG
): Promise<BreedDetails> => {
  let breedUrl = "";
  let apiKey = "";

  if (type === AnimalType.CAT) {
    breedUrl = `${CAT_API}/images/${id}`;
    apiKey = process.env.NEXT_PUBLIC_CAT_API_KEY || "";
  } else if (type === AnimalType.DOG) {
    breedUrl = `${DOG_API}/images/${id}`;
    apiKey = process.env.NEXT_PUBLIC_DOG_API_KEY || "";
  } else {
    throw new Error("Invalid breed type");
  }

  const response = await fetch(breedUrl, {
    headers: {
      "x-api-key": apiKey,
    },
  });

  const data = await response.json();
  return data;
};

export const fetchBreedImages = async (
  breed_id: string,
  type: AnimalType.CAT | AnimalType.DOG,
  limit: number = 10
): Promise<string[]> => {
  let imagesUrl = "";
  let apiKey = "";

  if (type === AnimalType.CAT) {
    imagesUrl = `${CAT_API}/images/search?limit=${limit}&breed_ids=${breed_id}`;
    apiKey = process.env.NEXT_PUBLIC_CAT_API_KEY || "";
  } else if (type === AnimalType.DOG) {
    imagesUrl = `${DOG_API}/images/search?limit=${limit}&breed_ids=${breed_id}`;
    apiKey = process.env.NEXT_PUBLIC_DOG_API_KEY || "";
  } else {
    throw new Error("Invalid breed type");
  }

  const response = await fetch(imagesUrl, {
    headers: {
      "x-api-key": apiKey,
    },
  });

  const data = await response.json();
  const images = data.map((item: any) => item.url);
  return images;
};
