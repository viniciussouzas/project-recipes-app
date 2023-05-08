import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import context from '../contexts/MyContext';
import CardsDrinks from '../components/CardsDrinks';

function Drinks() {
  const { filterData } = useContext(context);
  const history = useHistory();

  useEffect(() => {
    const verifyData = () => {
      if (filterData.length === 1) {
        history.push(`/drinks/${filterData[0].idDrink}`);
      }
    };
    verifyData();
  }, [filterData, history]);

  return (
    <div>
      <Header title="Drinks" searchIcon />
      { filterData.length > 1 && (
        <CardsDrinks />
      ) }
      <Footer />
    </div>
  );
}

export default Drinks;
