import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import Api from '../hooks/Api';
import Context from './Context';

const collumnsArray = [
  'population',
  'orbital_period',
  'diameter',
  'rotation_period',
  'surface_water',
];
const MENOS_1 = -1;

let newCollumns = [...collumnsArray];

function Provider({ children }) {
  // salva a results da minha API
  const [data, setData] = useState([]);
  // salva o filtro do input
  const [dados, setDados] = useState('');
  // salva os dados filtrados pelo input
  const [filtered, setFiltered] = useState([]);
  // salva os filtros numericos
  const [collumns, setCollumns] = useState(collumnsArray);
  // salva os dados dos filtros numericos
  const [filterCollum, setFilterCollum] = useState({
    collumn: newCollumns[0],
    comparison: 'maior que',
    number: 0,
  });
  // salva os filtros numericos de forma que possa aplicar mais de um filtro
  const [numFilterParams, setNumFilterParams] = useState([]);
  // salva os filtros ordenados de forma que possa aplicar mais de um filtro
  const [numOrder, setNumOrder] = useState({
    collumn: 'population',
    sort: 'ASC',
  });
  // salva os dados dos filtros ordenados de forma que possa aplicar mais de um filtro
  const [numOrderParams, setNumOrderParams] = useState([]);

  // faz a requisição da API assim que minha pag carrega e seta ela no data
  useEffect(() => {
    const fetchApi = async () => {
      const info = await Api();
      const dataFilter = info.map(({ residents, ...rest }) => rest);
      /* const dataOrder = dataFilter.sort((a, b) => a.name - b.name); não func */
      const dataOrder = dataFilter.sort((a, b) => (a.name < b.name ? MENOS_1 : 1)); /* teste */
      setData(dataOrder);
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
          if (comparison === 'menor que') {
            dataClone = [...dataClone.filter(
              (planet) => Number(planet[collumn]) < (Number(number)),
            )];
          } else if (comparison === 'maior que') {
            dataClone = [...dataClone.filter(
              (planet) => Number(planet[collumn]) > (Number(number)),
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

  useEffect(() => {
    const resultsClearCollumn = () => {
      if (numFilterParams.length > 0) {
        numFilterParams.forEach(({ collumn }) => {
          newCollumns = [...newCollumns.filter((item) => item !== collumn)];
          return newCollumns;
        });
        setFilterCollum({
          collumn: newCollumns[0],
          comparison: 'maior que',
          number: 0,
        });
        return [setCollumns(newCollumns),
          setFilterCollum({
            collumn: newCollumns[0],
            comparison: 'maior que',
            number: 0,
          })];
      }
      setCollumns(collumnsArray);
      setFilterCollum({
        collumn: collumnsArray[0],
        comparison: 'maior que',
        number: 0,
      });
    };
    resultsClearCollumn();
  }, [numFilterParams]);

  /* numOrderParams.map(({ collumn, sort }) => {
    const dataUnknow = [...dataClone.filter((u) => u[collumn] === 'unknown')];
    console.log('unknow', dataUnknow);
    const dataKnow = [...dataClone.filter((u) => u[collumn] !== 'unknown')];
    console.log('know', dataKnow);
    if (sort === 'ASC') {
      const knowSort = dataKnow.sort(
        (a, b) => (Number(a[collumn]) - Number(b[collumn])),
      );
      return [...knowSort, ...dataUnknow];
      // https://blog.greenroots.info/5-ways-to-merge-arrays-in-javascript-and-their-differences
    }
    const knowSort = dataKnow.sort(
      (a, b) => (Number(b[collumn]) - Number(a[collumn])),
    );
    return [...knowSort, ...dataUnknow];

    ||

    const dataClone = [...data];
      if (numOrderParams.length !== 0) {
        numOrderParams.forEach(({ collumn, sort }) => {
          if (sort === 'ASC') {
            return dataClone
              .sort((a, b) => {
                const aValue = a[collumn] === 'unknown'
                  ? Number.POSITIVE_INFINITY : a[collumn];
                const bValue = b[collumn] === 'unknown'
                  ? Number.POSITIVE_INFINITY : b[collumn];
                return aValue - bValue;
              });
          }
          return dataClone
            .sort((a, b) => {
              const aValue = a[collumn] === 'unknown'
                ? Number.NEGATIVE_INFINITY : a[collumn];
              const bValue = b[collumn] === 'unknown'
                ? Number.NEGATIVE_INFINITY : b[collumn];
              return bValue - aValue;
            });
        });
        return setFiltered(dataClone);
      }
  }); */

  const orderA = (a, b, coll) => {
    if (a[coll] === 'unknown') {
      return Number.POSITIVE_INFINITY;
    }
    return Number(a[coll]) - Number(b[coll]);
  };
  const orderD = (a, b, coll) => {
    if (b[coll] === 'unknown') {
      return Number.NEGATIVE_INFINITY;
    }
    return Number(b[coll]) - Number(a[coll]);
  };
  useEffect(() => {
    const filterOrder = () => {
      // https://www.w3schools.com/jsref/jsref_sort.asp
      // https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Number/POSITIVE_INFINITY
      const dataClone = [...data];
      if (numOrderParams.length !== 0) {
        numOrderParams.forEach(({ collumn, sort }) => {
          if (sort === 'ASC') {
            return dataClone
              .sort((a, b) => orderA(a, b, collumn));
          }
          return dataClone
            .sort((a, b) => orderD(a, b, collumn));
        });
        return setFiltered(dataClone);
      }
      return setFiltered(data);
    };
    filterOrder();
  }, [data, numOrderParams]);

  const context = {
    data,
    setData,
    dados,
    setDados,
    collumns,
    setCollumns,
    filtered,
    setFiltered,
    filterCollum,
    setFilterCollum,
    numFilterParams,
    setNumFilterParams,
    numOrder,
    setNumOrder,
    numOrderParams,
    setNumOrderParams,
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
