import React, { useContext } from 'react';
import Context from '../context/Context';

function SearchHeader() {
  const { setDados } = useContext(Context);

  return (
    <header>
      <form>
        <input
          id="name-filter"
          type="text"
          data-testid="name-filter"
          onChange={ ({ target: { value } }) => setDados(value) }
        />
      </form>
    </header>
  );
}

export default SearchHeader;
