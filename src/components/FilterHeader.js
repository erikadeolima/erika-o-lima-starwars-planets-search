import React from 'react';

function FilterHeader() {
  return (
    <header>
      <form onSubmit={ filterButton }>
        <label htmlFor="currency">
          Coluna:
          <select
            id="collum-filter"
            name="collum-filter"
            data-testid=""
            value={ collum }
            onChange={ onInputChange }
          >
            {colluns.map((collum) => (
              <option
                key={ collum }
                value={ collum }
              >
                {collum}
              </option>))}
          </select>
        </label>
        <label htmlFor="currency">
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
        </button>

      </form>
      {/* <form onSubmit={ filterButton }>
        <label htmlFor="currency">
          Ordenar:
          <select
            id="collum-filter"
            name="collum-filter"
            data-testid=""
            value={ collum }
            onChange={ onInputChange }
          >
            {colluns.map((collum) => (
              <option
                key={ collum }
                value={ collum }
              >
                {collum}
              </option>))}
          </select>
        </label>

        <button
          id="addExpense"
          name="addExpense"
          type="submit"
        >
          Ordenar
        </button>

      </form> */}
    </header>
  );
}

export default FilterHeader;
