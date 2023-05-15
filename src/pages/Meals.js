import React, { useContext } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import context from '../contexts/MyContext';
import CategoryButtons from '../components/CategoryButtons';
import Recipes from '../components/Recipes';

function Meals() {
  const { filterData, dataMeals, categoryMeals } = useContext(context);

  const verifyFilterResults = () => {
    if (filterData.length >= 1) {
      return <Recipes data={ filterData } pageTypes="meals" />;
    }
  };

  return (
    <div>
      <Header title="Meals" searchIcon />
      <CategoryButtons data={ categoryMeals } />
      {filterData.length !== 0 ? verifyFilterResults()
        : <Recipes data={ dataMeals } pageTypes="meals" />}
      <Footer />
    </div>
  );
}

export default Meals;
