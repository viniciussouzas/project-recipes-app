import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

function MealDetails() {
  const { id } = useParams(); // Hoock usado para pegar o ID que está na URL exemplo e logo em seguida fazer o fetch usando o mesmo

  useEffect(() => {
    const fetchApi = async () => {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
      const data = await response.json();
      console.log(data.meals);
      return data.meals;
    };
    fetchApi();
  });
  return (
    <div />
  );
}

export default MealDetails;
