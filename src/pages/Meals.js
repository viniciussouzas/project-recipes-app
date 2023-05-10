import React, { useContext } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import context from '../contexts/MyContext';
import CardsMeals from '../components/CardsMeals';
import CategoryButtons from '../components/CategoryButtons';

function Meals() {
  const { filterData, dataMeals, categoryMeals } = useContext(context);

  const verifyFilterResults = () => {
    if (filterData.length >= 1) {
      return <CardsMeals data={ filterData } />;
    }
  };

  return (
    <div>
      <Header title="Meals" searchIcon />
      <CategoryButtons data={ categoryMeals } />
      {filterData.length !== 0 ? verifyFilterResults()
        : <CardsMeals data={ dataMeals } />}
      <Footer />
    </div>
  );
}

export default Meals;
