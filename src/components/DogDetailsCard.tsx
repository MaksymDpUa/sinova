import React from "react";
import { BreedDetails } from "@/util/types";

interface DogDetailsCardProps {
  details: BreedDetails;
}

const DogDetailsCard: React.FC<DogDetailsCardProps> = ({ details }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">{details.breeds[0].name}</h1>
      <p className="text-gray-700 mb-2">
        <strong>Bred for:</strong> {details.breeds[0].bred_for}
      </p>
      <p className="text-gray-700 mb-2">
        <strong>Breed group:</strong> {details.breeds[0].breed_group}
      </p>
      <p className="text-gray-700 mb-2">
        <strong>Life span:</strong> {details.breeds[0].life_span}
      </p>
      <p className="text-gray-700 mb-2">
        <strong>Temperament:</strong> {details.breeds[0].temperament}
      </p>
    </div>
  );
};

export default DogDetailsCard;
