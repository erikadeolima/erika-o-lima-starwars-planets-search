import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import App from '../App';
/* import userEvent from '@testing-library/user-event'; */
import testData from '../../cypress/mocks/testData';
import userEvent from '@testing-library/user-event';

const INPUT_FILTER_NAME = 'name-filter';
const COLUMN_FILTER = 'column-filter';
const COMPARISON_FILTER = 'comparison-filter';
const VALUE_FILTER = 'value-filter';
const BUTTON_FILTER = 'button-filter';
const FILTER = 'filter';
const BUTTON_REMOVE_FILTERS = 'button-remove-filters';
const PLANET_NAME = 'planet-name';
const SELECT_COLUMN_SORT = 'column-sort';
const INPUT_SORT_DESC = 'column-sort-input-desc';
const INPUT_SORT_ASC = 'column-sort-input-asc';
const BUTTON_SORT = 'column-sort-button';
const ROWS_TOTAL = 11;
const ROWS_WITH_LETTER_O = 8;
const ROWS_WITH_LETTER_OO = 3;

const planets = testData.results;

const mockFetchSucess =()=> (jest.fn('fetch').mockResolvedValue(testData));
/* const mockFetchSucess =()=> (jest.spyOn(global, 'fetch'),global.fetch.mockResolvedValue(jest.fn('fetch').mockResolvedValue(testData))); */
/* const mockFetchSucess = jest.fn().mockImplementation((url) => {json: jest.fn().mockResolvedValue(
  testData)}); */

afterEach(()=>{
  window.localStorage.clear();
  jest.fn('fetch').mockRestore();
});
describe('Testa se a tabela é devidamente renderizada, incluisve quando aplicado os filtros',()=>{
  jest.setTimeout(30000);
  it('1 - Crie um filtro de texto para a tabela',async()=>{
    /* await waitFor(()=> jest.fn('fetch').mockResolvedValue(mockFetchSucess), { timeout: 100}); */
    global.fetch = jest.fn(
      () => Promise.resolve({
        json: () => Promise.resolve({
          results: planets,
        }),
      }),
    );

    render(<App/>);

    await waitFor (async ()=> await screen.findAllByTestId("planet-name"), { timeout:500});

    userEvent.type(screen.getByTestId(INPUT_FILTER_NAME), /o/i);
    
    await waitFor(async ()=> await screen.findAllByTestId("planet-name"),{ timeout: 3000});
    
    expect(screen.getAllByRole('row')).toHaveLength(8);
    
  });
  /* it('',async()=>{
    jest.fn('fetch').mockResolvedValue(testData);    
    render(<App/>)
  }); */
});