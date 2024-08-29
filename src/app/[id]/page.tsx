"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { BreedDetails, fetchBreedDetails, fetchBreedImages } from "@/util/api";
import Image from "next/image";
import DogDetailsCard from "@/components/DogDetailsCard";
import CatDetailsCard from "@/components/CatDetailsCard";
import { AnimalType } from "@/util/types";

interface BreedPageProps {
  params: {
    id: string;
  };
}

const BreedPage: React.FC<BreedPageProps> = ({ params }) => {
  const searchParams = useSearchParams();
  const type = searchParams.get("type") as "cat" | "dog" | null;
const animalType = type === "cat" ? AnimalType.CAT : AnimalType.DOG;
  const [breedDetails, setBreedDetails] = useState<BreedDetails | null>(null);
  const [breedImages, setBreedImages] = useState<string[]>([]);

  useEffect(() => {
    const loadBreedImages = async () => {
      if (
        breedDetails &&
        breedDetails.breeds &&
        breedDetails.breeds.length > 0 &&
        type
      ) {
        const images = await fetchBreedImages(
          breedDetails.breeds[0].id,
          animalType,
          10
        );
        setBreedImages(images);
      }
    };

    loadBreedImages();
  }, [breedDetails, type]);

  useEffect(() => {
    if (type) {
      const loadBreedDetails = async () => {
        const details = await fetchBreedDetails(params.id, animalType);
        setBreedDetails(details);
      };

      loadBreedDetails();
    }
  }, [params.id, type]);

  if (!breedDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
      <aside className="lg:col-span-1 bg-white p-4 rounded-lg shadow-md">
        <div className="relative w-full h-[300px] mb-4">
          <Image
            src={breedDetails.url ?? breedImages[0] ?? ""}
            alt={
              (breedDetails.breeds && breedDetails.breeds[0]?.name) || "Image"
            }
            fill
            className="rounded-lg object-cover"
            priority
          />
        </div>
        {animalType === AnimalType.DOG && breedDetails.breeds && (
          <DogDetailsCard details={breedDetails} />
        )}
        {animalType === AnimalType.CAT && breedDetails.breeds && (
          <CatDetailsCard details={breedDetails} />
        )}
      </aside>
      <section className="lg:col-span-2 bg-white p-4 rounded-lg shadow-md">
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {breedImages.map((image, index) => (
            <li key={index} className="w-full h-48 rounded-lg overflow-hidden">
              <img
                src={image}
                alt={`Image ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default BreedPage;
