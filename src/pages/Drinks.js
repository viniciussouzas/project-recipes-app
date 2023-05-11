import React, { useContext } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import context from '../contexts/MyContext';
import CategoryButtons from '../components/CategoryButtons';
import Recipes from '../components/Recipes';

function Drinks() {
  const { filterData, dataDrinks, categoryDrinks } = useContext(context);

  const verifyFilterResults = () => {
    if (filterData.length > 1) {
      return <Recipes data={ filterData } pageTypes="drinks" />;
    }
  };

  return (
    <div>
      <Header title="Drinks" searchIcon />
      <CategoryButtons data={ categoryDrinks } />
      {filterData.length !== 0 ? verifyFilterResults()
        : <Recipes data={ dataDrinks } pageTypes="drinks" />}
      <Footer />
    </div>
  );
}

export default Drinks;
