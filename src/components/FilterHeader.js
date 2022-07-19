import React, { useContext } from 'react';
import Context from '../context/Context';

const collumnsOrder = [
  'population',
  'orbital_period',
  'diameter',
  'rotation_period',
  'surface_water',
];

function FilterHeader() {
  const {
    collumns,
    setFilterCollum,
    filterCollum,
    setNumFilterParams,
    numOrder,
    setNumOrder,
    setNumOrderParams,
  } = useContext(Context);

  const onHandleChange = ({ target: { name, value } }) => {
    setFilterCollum((prevState) => ({ ...prevState, [name]: value }));
  };

  const onHandleChangeOrder = ({ target: { name, value } }) => {
    setNumOrder((prevState) => ({ ...prevState, [name]: value }));
  };

  function setNumFilterParamsClick(e) {
    e.preventDefault();
    setNumFilterParams((prevState) => ([...prevState, filterCollum]));
    /* setFilterCollum({
      collumn: collumns[0],
      comparison: 'maior que',
      number: 0,
    }); */
  }

  function setNumOrderParamsClick(e) {
    e.preventDefault();
    if (setNumOrderParams !== 0) {
      setNumOrderParams([]);
      setNumOrderParams((prevState) => ([...prevState, numOrder]));
    } else {
      setNumOrderParams((prevState) => ([...prevState, numOrder]));
    }
  }

  return (
    <header>
      <form>

        <label htmlFor="column-filter">
          Coluna:
          <select
            id="column-filter"
            name="collumn"
            data-testid="column-filter"
            value={ filterCollum.collumn }
            onChange={ onHandleChange }
          >
            {collumns.map((collumn, index) => (
              <option
                key={ index }
                value={ collumn }
                data-testid="column-filter-option"
              >
                {collumn}
              </option>))}
          </select>
        </label>
        <label htmlFor="comparison-filter">
          Operador:
          <select
            id="comparison-filter"
            name="comparison"
            value={ filterCollum.comparison }
            data-testid="comparison-filter"
            onChange={ onHandleChange }
          >
            <option value="maior que">maior que</option>
            <option value="menor que">menor que</option>
            <option value="igual a">igual a</option>
          </select>
        </label>
        <label htmlFor="value-filter">
          <input
            id="value-filter"
            name="number"
            type="text"
            value={ filterCollum.number }
            data-testid="value-filter"
            onChange={ onHandleChange }
          />
        </label>
        <button
          id="button-filter"
          name="button-filter"
          type="submit"
          data-testid="button-filter"
          onClick={ setNumFilterParamsClick }
        >
          Filtrar
        </button>
      </form>
      <form>
        <label htmlFor="column-sort">
          Coluna:
          <select
            id="column-sort"
            name="collumn"
            data-testid="column-sort"
            value={ numOrder.collumn }
            onChange={ onHandleChangeOrder }
          >
            {collumnsOrder.map((coll, index) => (
              <option
                key={ index }
                value={ coll }
              >
                {coll}
              </option>))}
          </select>
        </label>
        <div>
          <label htmlFor="column-sort-input-asc">
            Ascendente:
            <input
              id="column-sort-input-asc"
              type="radio"
              name="sort"
              value="ASC"
              data-testid="column-sort-input-asc"
              onChange={ onHandleChangeOrder }
            />
          </label>
          <label htmlFor="column-sort-input-desc">
            Descendente:
            <input
              id="column-sort-input-desc"
              type="radio"
              name="sort"
              value="DESC"
              data-testid="column-sort-input-desc"
              onChange={ onHandleChangeOrder }
            />
          </label>
        </div>
        <button
          id="column-sort-button"
          name="column-sort-button"
          type="submit"
          data-testid="column-sort-button"
          onClick={ setNumOrderParamsClick }
        >
          Ordenar
        </button>

      </form>
    </header>
  );
}

export default FilterHeader;
