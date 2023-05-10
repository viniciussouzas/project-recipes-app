import React from 'react';
import { useLocation } from 'react-router-dom';
import InProgressMeals from '../components/InProgressMeals';
import InProgressDrinks from '../components/InProgressDrink';

function InProgress(props) {
  const { pathname } = useLocation();
  const propsId = props;
  return (
    <div>
      {
        pathname && pathname === `/meals/${propsId.match.params.id}/in-progress`
          ? <InProgressMeals />
          : <InProgressDrinks />
      }
    </div>
  );
}

export default InProgress;
