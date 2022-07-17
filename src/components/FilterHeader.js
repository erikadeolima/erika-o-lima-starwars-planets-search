import React, { useContext } from 'react';
import Context from '../context/Context';

function FilterHeader() {
  const {
    collumns,
    setFilterCollum,
    filterCollum,
    setNumFilterParams,
  } = useContext(Context);

  const onHandleChange = ({ target: { name, value } }) => {
    setFilterCollum((prevState) => ({ ...prevState, [name]: value }));
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
          id="addExpense"
          name="addExpense"
          type="submit"
          data-testid="button-filter"
          onClick={ setNumFilterParamsClick }
        >
          Filtrar
        </button>
      </form>
    </header>
  );
}

export default FilterHeader;
