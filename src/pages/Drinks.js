import React, { useContext } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import context from '../contexts/MyContext';
import CardsDrinks from '../components/CardsDrinks';
import CategoryButtons from '../components/CategoryButtons';

function Drinks() {
  const { filterData, dataDrinks, categoryDrinks } = useContext(context);

  const verifyFilterResults = () => {
    if (filterData.length > 1) {
      return <CardsDrinks data={ filterData } />;
    }
  };

  return (
    <div>
      <Header title="Drinks" searchIcon />
      <CategoryButtons data={ categoryDrinks } />
      {filterData.length !== 0 ? verifyFilterResults()
        : <CardsDrinks data={ dataDrinks } />}
      <Footer />
    </div>
  );
}

export default Drinks;
