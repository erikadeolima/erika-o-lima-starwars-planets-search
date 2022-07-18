import React, { useContext } from 'react';
import Context from '../context/Context';

function AppliedFilters() {
  const {
    numFilterParams,
    setNumFilterParams,
  } = useContext(Context);

  const removeFilter = ({ target: { value } }) => {
    console.log('entrou', value, numFilterParams);
    /* const filtersFilter = [...numFilterParams.forEach(() => {
      numFilterParams.filter(({ collumn }) => collumn !== value);
    })]; */
    const filtersFilter = [...numFilterParams.map(
      (obj) => obj,
    ).filter((i) => i.collumn !== value)];
    console.log(filtersFilter);
    setNumFilterParams(filtersFilter);
  };

  function removeAllFilterParamsClick(e) {
    e.preventDefault();
    setNumFilterParams([]);
  }

  return (
    <div>
      {numFilterParams.map(({ collumn, comparison, number }, index) => (
        <div key={ index } data-testid="filter">
          {`${collumn},${comparison},${number}`}
          <button
            type="button"
            value={ collumn }
            onClick={ removeFilter }
          >
            X
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={ removeAllFilterParamsClick }
        data-testid="button-remove-filters"
      >
        Remover FIltos
      </button>
    </div>
  );
}

export default AppliedFilters;
