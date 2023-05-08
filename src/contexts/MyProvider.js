import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import MyContext from './MyContext';

function Provider({ children }) {
  const [inputApi, setInputApi] = useState('');
  const [data, setData] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [clickedFilter, setClickedFilter] = useState(false);

  const values = useMemo(() => ({
    inputApi,
    setInputApi,
    data,
    setData,
    filterData,
    setFilterData,
    clickedFilter,
    setClickedFilter,
  }), [
    inputApi,
    setInputApi,
    data,
    setData,
    filterData,
    setFilterData,
    clickedFilter,
    setClickedFilter]);

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
