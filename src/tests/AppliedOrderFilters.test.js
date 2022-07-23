import React from 'react';
import { render, screen, waitFor} from '@testing-library/react';
import App from '../App';
import testData from '../../cypress/mocks/testData';
import userEvent from '@testing-library/user-event';

const COLUMN_SORT = 'column-sort';
const ASC_ORDER = 'column-sort-input-asc';
const DESC_ORDER = 'column-sort-input-desc';
const BUTTON_SORT = 'column-sort-button';

const planets = testData.results;

describe('Testa se é possível aplicar filtros ordenados', ()=>{
  afterEach(()=>{
    window.localStorage.clear();
    jest.fn('fetch').mockRestore();
  });
  it('1 - Aplique diversos filtros ordenados',async()=>{
    global.fetch = jest.fn(
      () => Promise.resolve({
        json: () => Promise.resolve({
          results: planets,
        }),
      }),
    );

    render(<App/>);

    await waitFor (async ()=> await screen.findAllByTestId("planet-name"), { timeout:500});

    userEvent.selectOptions(screen.getByTestId(COLUMN_SORT), ['population']);
    userEvent.click(screen.getByTestId(ASC_ORDER));
    userEvent.click(screen.getByTestId(BUTTON_SORT));

    await waitFor (async ()=> await screen.findAllByTestId("planet-name"), { timeout:500});

    expect(screen.getAllByTestId("planet-name")[0]).toHaveTextContent(/yavin iv/i);
    expect(screen.getAllByTestId("population")[0]).toHaveTextContent(/1000/i);
    expect(screen.getAllByTestId("planet-name")[1]).toHaveTextContent(/tatooine/i);
    expect(screen.getAllByTestId("population")[1]).toHaveTextContent(/200000/i);
    expect(screen.getAllByTestId("planet-name")[2]).toHaveTextContent(/bespin/i);
    expect(screen.getAllByTestId("population")[2]).toHaveTextContent(/6000000/i);
    
    
    userEvent.selectOptions(screen.getByTestId(COLUMN_SORT), ['population']);
    userEvent.click(screen.getByTestId(DESC_ORDER));
    userEvent.click(screen.getByTestId(BUTTON_SORT));

    await waitFor (async ()=> await screen.findAllByTestId("planet-name"), { timeout:500});

    expect(screen.getAllByTestId("planet-name")[0]).toHaveTextContent(/Coruscant/i);
    expect(screen.getAllByTestId("population")[0]).toHaveTextContent(/1000000000000/i);
    expect(screen.getAllByTestId("planet-name")[1]).toHaveTextContent(/naboo/i);
    expect(screen.getAllByTestId("population")[1]).toHaveTextContent(/4500000000/i);
    expect(screen.getAllByTestId("planet-name")[2]).toHaveTextContent(/alderaan/i);
    expect(screen.getAllByTestId("population")[2]).toHaveTextContent(/2000000000/i);
    expect(screen.getAllByTestId("planet-name")[9]).toHaveTextContent(/dagobah/i);
    expect(screen.getAllByTestId("population")[9]).toHaveTextContent(/unknown/i);


    userEvent.selectOptions(screen.getByTestId(COLUMN_SORT), ['diameter']);
    userEvent.click(screen.getByTestId(ASC_ORDER));
    userEvent.click(screen.getByTestId(BUTTON_SORT));

    await waitFor (async ()=> await screen.findAllByTestId("planet-name"), { timeout:500});

    expect(screen.getAllByTestId("planet-name")[0]).toHaveTextContent(/endor/i);
    expect(screen.getAllByTestId("diameter")[0]).toHaveTextContent(/4900/i);
    expect(screen.getAllByTestId("planet-name")[1]).toHaveTextContent(/hoth/i);
    expect(screen.getAllByTestId("diameter")[1]).toHaveTextContent(/7200/i);
    expect(screen.getAllByTestId("planet-name")[2]).toHaveTextContent(/dagobah/i);
    expect(screen.getAllByTestId("diameter")[2]).toHaveTextContent(/8900/i);
    expect(screen.getAllByTestId("planet-name")[9]).toHaveTextContent(/Bespin/i);
    expect(screen.getAllByTestId("diameter")[9]).toHaveTextContent(/118000/i);

    userEvent.selectOptions(screen.getByTestId(COLUMN_SORT), ['diameter']);
    userEvent.click(screen.getByTestId(DESC_ORDER));
    userEvent.click(screen.getByTestId(BUTTON_SORT));

    await waitFor (async ()=> await screen.findAllByTestId("planet-name"), { timeout:500});

    expect(screen.getAllByTestId("planet-name")[0]).toHaveTextContent(/Bespin/i);
    expect(screen.getAllByTestId("diameter")[0]).toHaveTextContent(/118000/i);
    expect(screen.getAllByTestId("planet-name")[1]).toHaveTextContent(/Kamino/i);
    expect(screen.getAllByTestId("diameter")[1]).toHaveTextContent(/19720/i);
    expect(screen.getAllByTestId("planet-name")[2]).toHaveTextContent(/Alderaan/i);
    expect(screen.getAllByTestId("diameter")[2]).toHaveTextContent(/12500/i);
    expect(screen.getAllByTestId("planet-name")[9]).toHaveTextContent(/Endor/i);
    expect(screen.getAllByTestId("diameter")[9]).toHaveTextContent(/4900/i);
  });
})