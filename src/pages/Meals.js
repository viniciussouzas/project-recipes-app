import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import context from '../contexts/MyContext';
import CardsMeals from '../components/CardsMeals';

function Meals() {
  const { filterData } = useContext(context);
  const history = useHistory();

  useEffect(() => {
    const verifyData = () => {
      if (filterData.length === 1) {
        console.log(filterData);
        history.push(`/meals/${filterData[0].idMeal}`);
      }
    };
    verifyData();
  }, [filterData, history]);

  const verifyFilterResults = () => {
    if (filterData.length > 1) {
      return <CardsMeals />;
    }
  };

  return (
    <div>
      <Header title="Meals" searchIcon />
      {filterData.length !== 0 ? verifyFilterResults() : <span>Olá</span>}
      <Footer />
    </div>
  );
}

export default Meals;
