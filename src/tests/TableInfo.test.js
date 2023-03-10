import React from 'react';
import { render, screen, waitFor, fireEvent, getByAltText, getByRole, getByTestId, getAllByRole } from '@testing-library/react';
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

describe('Testa se a tabela é devidamente renderizada, incluisve quando aplicado os filtros',()=>{
  afterEach(()=>{
    window.localStorage.clear();
    jest.fn('fetch').mockRestore();
  });
  it('1 - Crie um filtro de texto para a tabela',async()=>{
    global.fetch = jest.fn(
      () => Promise.resolve({
        json: () => Promise.resolve({
          results: planets,
        }),
      }),
    );

    render(<App/>);

    await waitFor (async ()=> await screen.findAllByTestId("planet-name"), { timeout:500});

    const imputFilterName = screen.getByTestId(INPUT_FILTER_NAME);

    userEvent.type(screen.getByTestId(INPUT_FILTER_NAME), 'o');
    expect(screen.getAllByTestId("planet-name")[0]).toHaveTextContent(/coruscant/i);    
    expect(screen.getAllByRole('row')).toHaveLength(8);
    
    await waitFor(async ()=> await screen.findAllByTestId("planet-name"),{ timeout: 500});
    
    userEvent.type(screen.getByTestId(INPUT_FILTER_NAME), 'o');
    expect(screen.getAllByTestId("planet-name")[0]).toHaveTextContent(/naboo/i);
    expect(screen.getAllByRole('row')).toHaveLength(3);
  });
  it('2 - Crie e utilize-os com apenas o botão de filtrar',async()=>{
    global.fetch = jest.fn(
      () => Promise.resolve({
        json: () => Promise.resolve({
          results: planets,
        }),
      }),
    );

    render(<App/>);

    await waitFor (async ()=> await screen.findAllByTestId("planet-name"), { timeout:500});

    userEvent.selectOptions(screen.getByTestId(COLUMN_FILTER), ['population']);
    userEvent.selectOptions(screen.getByTestId(COMPARISON_FILTER), ['maior que']);
    userEvent.type(screen.getByTestId(VALUE_FILTER  ), '10000');
    userEvent.click(screen.getByTestId(BUTTON_FILTER));

    await waitFor (async ()=> await screen.findAllByTestId("planet-name"), { timeout:500});

    expect(screen.getAllByTestId("planet-name")[0]).toHaveTextContent(/alderaan/i);    
    expect(screen.getAllByRole('row')).toHaveLength(8);
    expect(screen.getAllByTestId('filter')).toHaveLength(1);
    
    
    userEvent.selectOptions(screen.getByTestId(COLUMN_FILTER), ['rotation_period',]);
    userEvent.selectOptions(screen.getByTestId(COMPARISON_FILTER), ['menor que']);
    userEvent.type(screen.getByTestId(VALUE_FILTER  ), '30');
    userEvent.click(screen.getByTestId(BUTTON_FILTER));

    await waitFor (async ()=> await screen.findAllByTestId("planet-name"), { timeout:500});

    expect(screen.getAllByTestId("planet-name")[0]).toHaveTextContent(/alderaan/i);    
    expect(screen.getAllByRole('row')).toHaveLength(8);
    expect(screen.getAllByTestId('filter')).toHaveLength(2);


    userEvent.selectOptions(screen.getByTestId(COLUMN_FILTER), ['orbital_period',]);
    userEvent.selectOptions(screen.getByTestId(COMPARISON_FILTER), ['menor que']);
    userEvent.type(screen.getByTestId(VALUE_FILTER  ), '5000');
    userEvent.click(screen.getByTestId(BUTTON_FILTER));

    await waitFor (async ()=> await screen.findAllByTestId("planet-name"), { timeout:500});

    expect(screen.getAllByTestId("planet-name")[0]).toHaveTextContent(/alderaan/i);    
    expect(screen.getAllByRole('row')).toHaveLength(7);
    expect(screen.getAllByTestId('filter')).toHaveLength(3);


    userEvent.selectOptions(screen.getByTestId(COLUMN_FILTER), ['diameter']);
    userEvent.selectOptions(screen.getByTestId(COMPARISON_FILTER), ['igual a']);
    userEvent.type(screen.getByTestId(VALUE_FILTER  ), '4900');
    userEvent.click(screen.getByTestId(BUTTON_FILTER));

    await waitFor (async ()=> await screen.findAllByTestId("planet-name"), { timeout:500});

    expect(screen.getAllByTestId("planet-name")[0]).toHaveTextContent(/endor/i);    
    expect(screen.getAllByRole('row')).toHaveLength(2);
    expect(screen.getAllByTestId('filter')).toHaveLength(4);
  });
});
