import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import MyContext from './MyContext';

const INITIAL_STATE1 = {};
const INITIAL_STATE2 = {};

function Provider({ children }) {
  const [state1, setState1] = useState(INITIAL_STATE1);
  const [state2, setState2] = useState(INITIAL_STATE2);

  const values = useMemo(() => ({
    state1, state2, setState1, setState2,
  }), [state1, state2, setState1, setState2]);

  return (
    <MyContext.Provider value={ values }>
      {children}
    </MyContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node,
}.isRequired;

export default Provider;
