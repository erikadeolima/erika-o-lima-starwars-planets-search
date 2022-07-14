import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import Api from '../hooks/Api';
import Context from './Context';

function Provider({ children }) {
  const [data, setData] = useState([]);
  const [dados, setDados] = useState('');
  const [filtered, setFiltered] = useState([]);

  useEffect(() => {
    const fetchApi = async () => {
      const info = await Api();
      const dataFilter = info.map(({ residents, ...rest }) => rest);
      setData(dataFilter);
    };
    fetchApi();
  }, [setData]);

  /* useEffect(() => {
    setFiltered(data);
  }, [data]); */

  useEffect(() => {
    if (dados.length > 0) {
      return setFiltered(data.filter(
        ({ name }) => name.toLowerCase().includes(dados.toLowerCase()),
      ));
    }
    setFiltered(data);
  }, [dados, data]);

  const context = { data, setData, dados, setDados, filtered, setFiltered };
  return (
    <Context.Provider value={ context }>
      {children}
    </Context.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
