import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import App from '../App';
/* import userEvent from '@testing-library/user-event'; */
import testData from '../../cypress/mocks/testData';
import userEvent from '@testing-library/user-event';

export const INPUT_FILTER_NAME = 'name-filter';
export const COLUMN_FILTER = 'column-filter';
export const COMPARISON_FILTER = 'comparison-filter';
export const VALUE_FILTER = 'value-filter';
export const BUTTON_FILTER = 'button-filter';
export const FILTER = 'filter';
export const BUTTON_REMOVE_FILTERS = 'button-remove-filters';
export const PLANET_NAME = 'planet-name';
export const SELECT_COLUMN_SORT = 'column-sort';
export const INPUT_SORT_DESC = 'column-sort-input-desc';
export const INPUT_SORT_ASC = 'column-sort-input-asc';
export const BUTTON_SORT = 'column-sort-button';
const ROWS_TOTAL = 11;
const ROWS_WITH_LETTER_O = 8;
const ROWS_WITH_LETTER_OO = 3;

const planets = testData.results;

/* const mockFetchSucess =()=> (jest.fn('fetch').mockResolvedValue(testData)); */
/* const mockFetchSucess =()=> (jest.spyOn(global, 'fetch'),global.fetch.mockResolvedValue(jest.fn('fetch').mockResolvedValue(testData))); */
const mockFetchSucess = jest.fn().mockImplementation((url) => {json: jest.fn().mockResolvedValue(
  testData)});

afterEach(()=>{
  window.localStorage.clear();
  jest.fn('fetch').mockRestore();
});
describe('Testa se antabela é devidamente renderizada, incluisve quando aplicado os filtros',()=>{
  test('1 - Crie um filtro de texto para a tabela',async()=>{
    await waitFor(()=> render(<App/>), { timeout: 1000});    
    render(<App/>);
    expect(screen.getAllByTestId(INPUT_FILTER_NAME)).toBeInTheDocument();

    userEvent.type(screen.getByTestId(INPUT_FILTER_NAME), /oo/i);/* 

    expect(screen.getByTestId(/tatooine/i)).toBeInTheDocument(); */

  });

  /* test('',async()=>{
    jest.fn('fetch').mockResolvedValue(testData);    
    render(<App/>)
  }); */
  /* test('',async()=>{
    jest.fn('fetch').mockResolvedValue(testData);    
    render(<App/>)
  }); */
});