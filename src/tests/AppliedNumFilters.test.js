import React from 'react';
import { render, screen, waitFor} from '@testing-library/react';
import App from '../App';
import testData from '../../cypress/mocks/testData';
import userEvent from '@testing-library/user-event';

const COLUMN_FILTER = 'column-filter';
const COMPARISON_FILTER = 'comparison-filter';
const VALUE_FILTER = 'value-filter';
const BUTTON_FILTER = 'button-filter';

const planets = testData.results;
describe('Testa se é possível remover filtros aplicados', ()=>{
  afterEach(()=>{
    window.localStorage.clear();
    jest.fn('fetch').mockRestore();
  });
  it('1 - Aplique diversos filtros numéricos e remova-os',async()=>{
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
    expect(screen.getAllByTestId('filter')[0]).toHaveTextContent(/[population,maior que,10000]/i);
    
    
    userEvent.selectOptions(screen.getByTestId(COLUMN_FILTER), ['rotation_period',]);
    userEvent.selectOptions(screen.getByTestId(COMPARISON_FILTER), ['menor que']);
    userEvent.type(screen.getByTestId(VALUE_FILTER  ), '30');
    userEvent.click(screen.getByTestId(BUTTON_FILTER));

    await waitFor (async ()=> await screen.findAllByTestId("planet-name"), { timeout:500});

    expect(screen.getAllByTestId("planet-name")[0]).toHaveTextContent(/alderaan/i);    
    expect(screen.getAllByRole('row')).toHaveLength(8);
    expect(screen.getAllByTestId('filter')).toHaveLength(2);
    expect(screen.getAllByTestId('filter')[1]).toHaveTextContent(/[rotation_period,menor que,30]/i);


    userEvent.selectOptions(screen.getByTestId(COLUMN_FILTER), ['orbital_period',]);
    userEvent.selectOptions(screen.getByTestId(COMPARISON_FILTER), ['menor que']);
    userEvent.type(screen.getByTestId(VALUE_FILTER  ), '5000');
    userEvent.click(screen.getByTestId(BUTTON_FILTER));

    await waitFor (async ()=> await screen.findAllByTestId("planet-name"), { timeout:500});

    expect(screen.getAllByTestId("planet-name")[0]).toHaveTextContent(/alderaan/i);    
    expect(screen.getAllByRole('row')).toHaveLength(7);
    expect(screen.getAllByTestId('filter')).toHaveLength(3);
    expect(screen.getAllByTestId('filter')[2]).toHaveTextContent(/[orbital_period,menor que,5000]/i);


    userEvent.selectOptions(screen.getByTestId(COLUMN_FILTER), ['diameter']);
    userEvent.selectOptions(screen.getByTestId(COMPARISON_FILTER), ['igual a']);
    userEvent.type(screen.getByTestId(VALUE_FILTER  ), '4900');
    userEvent.click(screen.getByTestId(BUTTON_FILTER));

    await waitFor (async ()=> await screen.findAllByTestId("planet-name"), { timeout:500});

    expect(screen.getAllByTestId("planet-name")[0]).toHaveTextContent(/endor/i);    
    expect(screen.getAllByRole('row')).toHaveLength(2);
    expect(screen.getAllByTestId('filter')).toHaveLength(4);
    expect(screen.getAllByTestId('filter')[3]).toHaveTextContent(/[diameter,igual a,4900]/i);


    expect(screen.getAllByRole('button',{name:'X'})).toHaveLength(4);
    userEvent.click(screen.getAllByRole('button',{name:'X'})[0]);

    expect(screen.getAllByRole('button',{name:'X'})).toHaveLength(3);
    userEvent.click(screen.getAllByRole('button',{name:'X'})[0]);

    expect(screen.getAllByRole('button',{name:'X'})).toHaveLength(2);
    userEvent.click(screen.getAllByRole('button',{name:'X'})[0]);

    expect(screen.getAllByRole('button',{name:'X'})).toHaveLength(1);
    userEvent.click(screen.getAllByRole('button',{name:'X'})[0]);

    expect(screen.queryByRole('button',{name:'X'}));
  });
})