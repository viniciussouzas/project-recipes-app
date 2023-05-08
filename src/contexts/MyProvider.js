import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import MyContext from './MyContext';

function Provider({ children }) {
  const [inputApi, setInputApi] = useState('');
  const [data, setData] = useState([]);
  const [filterData, setFilterData] = useState([]);

  const values = useMemo(() => ({
    inputApi,
    setInputApi,
    data,
    setData,
    filterData,
    setFilterData,
  }), [
    inputApi,
    setInputApi,
    data,
    setData,
    filterData,
    setFilterData,
  ]);

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
