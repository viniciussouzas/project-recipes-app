import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import context from '../contexts/MyContext';
import CardsMeals from '../components/CardsMeals';

function Meals() {
  const { filterData, clickedFilter } = useContext(context);
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

  const renderResults = () => {
    const NUMBER = 2000;
    if (filterData.length > 1) {
      return <CardsMeals />;
    }
    setTimeout(() => {

    }, NUMBER);

    if (filterData.length === 0) {
      global.alert('Sorry, we haven\'t found any recipes for these filters.');
    }
  };

  return (
    <div>
      <Header title="Meals" searchIcon />
      {clickedFilter ? renderResults() : <span>Olá</span>}
      <Footer />
    </div>
  );
}

export default Meals;
