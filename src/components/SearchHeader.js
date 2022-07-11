import React from 'react';

function SearchHeader() {
  return (
    <header>
      <form onSubmit={ filterButton }>
        <input
          id="value"
          name="value"
          type="text"
          data-testid="value-input"
          value={ value }
          onChange={ onInputChange }
        />
      </form>
    </header>
  );
}

export default SearchHeader;
