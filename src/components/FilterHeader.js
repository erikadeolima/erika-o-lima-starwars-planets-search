import React, { useContext } from 'react';

function FilterHeader() {
  const { search } = useContext(Context);
  return (
    <header>
      <form onSubmit={ filterButton }>
        <label htmlFor="currency">
          Coluna:
          <select
            id="name-filter"
            name="name-filter"
            data-testid="name-filter"
            value={ collum }
            onChange={ onInputChange }
          >
            {data.map((collum) => (
              <option
                key={ collum }
                value={ collum }
              >
                {collum}
              </option>))}
          </select>
        </label>
        {/* <label htmlFor="currency">
          Operador:
          <select
            id="method"
            name="method"
            data-testid="method-input"
            value={ method }
            onChange={ onInputChange }
          >
            <option>Selecione um método de Pagamento</option>
            <option value="menor que">Menor que</option>
            <option value="maior que">Maior que</option>
            <option value="igual a">Igual a</option>
          </select>
        </label>
        <input
          id="value"
          name="value"
          type="text"
          data-testid="value-input"
          value={ value }
          onChange={ onInputChange }
        />
        <button
          id="addExpense"
          name="addExpense"
          type="submit"
        >
          Filtrar
        </button> */}

      </form>
    </header>
  );
}

export default FilterHeader;
