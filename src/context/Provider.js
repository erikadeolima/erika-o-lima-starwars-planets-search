import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import Api from '../hooks/Api';
import Context from './Context';

function Provider({ children }) {
  // salva a results da minha API
  const [data, setData] = useState([]);
  // salva o filtro do input
  const [dados, setDados] = useState('');
  // salva os dados filtrados pelo input
  const [filtered, setFiltered] = useState([]);
  // salva os dados dos filtros numericos
  const [filterCollum, setFilterCollum] = useState({
    collumn: 'population',
    comparison: 'maior que',
    number: 0,
  });
  // salva os filtros numericos de forma que possa aplicar mais de um filtro
  const [numFilterParams, setNumFilterParams] = useState([]);

  // faz a requisição da API assim que minha pag carrega e seta ela no data
  useEffect(() => {
    const fetchApi = async () => {
      const info = await Api();
      const dataFilter = info.map(({ residents, ...rest }) => rest);
      setData(dataFilter);
    };
    fetchApi();
  }, [setData]);

  /* Setava o data no filtered, assim facilita a logica de renderização da minha tabela, mas substitui no prox useEffect
  useEffect(() => {
    setFiltered(data);
  }, [data]); */

  // seta os dados no filtered de acordo com o filtro do input, então faço uma comparação, caso n tenha nada no imput, eu somente seto o data no filtered, e renderizo ele.
  useEffect(() => {
    if (dados.length > 0) {
      return setFiltered(data.filter(
        ({ name }) => name.toLowerCase().includes(dados.toLowerCase()),
      ));
    }
    setFiltered(data);
  }, [dados, data]);

  useEffect(() => {
    // https://flexiple.com/javascript-filter-array/
    // https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach
    const resultsNumFilter = () => {
      if (numFilterParams.length > 0) {
        let dataClone = [...data];
        numFilterParams.forEach(({ collumn, comparison, number }) => {
          console.log(collumn, comparison, number);
          if (comparison === 'menor que') {
            dataClone = [...dataClone.filter(
              (planet) => Number(planet[collumn]) <= (Number(number) - 1),
            )];
          } else if (comparison === 'maior que') {
            dataClone = [...dataClone.filter(
              (planet) => Number(planet[collumn]) >= (Number(number) + 1),
            )];
          } else {
            dataClone = [...dataClone.filter(
              (planet) => Number(planet[collumn]) === Number(number),
            )];
          }
          return dataClone;
        });
        return setFiltered(dataClone);
      }
      setFiltered(data);
    };
    resultsNumFilter();
  }, [data, numFilterParams]);

  const context = {
    data,
    setData,
    dados,
    setDados,
    filtered,
    setFiltered,
    filterCollum,
    setFilterCollum,
    numFilterParams,
    setNumFilterParams,
  };
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
