import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import App from '../App';
import testData from '../../cypress/mocks/testData';

const planets = testData.results;
const filmsAldreean = 'https://swapi-trybe.herokuapp.com/api/films/1/https://swapi-trybe.herokuapp.com/api/films/6/';
const urlAldreean = 'https://swapi-trybe.herokuapp.com/api/planets/2/';


describe('Testa se é feita uma requisição para a API de forma correta',()=>{

  afterEach(()=>{
    jest.fn('fetch').mockRestore();
  });

  it('1 - Quando feita uma requisição para o endpoint `/planets` da API de Star Wars e preenche as colunas e linhas com os dados retornados, com exceção dos da coluna `residents`',async()=>{
    global.fetch = jest.fn(
      () => Promise.resolve({
        json: () => Promise.resolve({
          results: planets,
        }),
      }),
    );
    
    render(<App/>);
    
    await waitFor(async ()=> await screen.findAllByTestId("planet-name"), { timeout: 1000});

    expect(screen.getAllByTestId("planet-name")).toHaveLength(planets.length);

    expect(screen.getAllByRole('columnheader')[0]).toHaveTextContent(/Name/i);
    expect(screen.getAllByTestId("planet-name")[0]).toHaveTextContent(/alderaan/i);

    expect(screen.getAllByRole('columnheader')[1]).toHaveTextContent(/Rotation Period/i);
    expect(screen.getAllByTestId("rotation_period")[0]).toHaveTextContent(/24/i);

    expect(screen.getAllByRole('columnheader')[2]).toHaveTextContent(/Orbital Period/i);
    expect(screen.getAllByTestId("orbital_period")[0]).toHaveTextContent(/364/i);

    expect(screen.getAllByRole('columnheader')[3]).toHaveTextContent(/Diameter/i);
    expect(screen.getAllByTestId("diameter")[0]).toHaveTextContent(/12500/i);

    expect(screen.getAllByRole('columnheader')[4]).toHaveTextContent(/Climate/i);
    expect(screen.getAllByTestId("climate")[0]).toHaveTextContent(/temperate/i);

    expect(screen.getAllByRole('columnheader')[5]).toHaveTextContent(/Gravity/i);
    expect(screen.getAllByTestId("gravity")[0]).toHaveTextContent(/1 standard/i);

    expect(screen.getAllByRole('columnheader')[6]).toHaveTextContent(/Terrain/i);
    expect(screen.getAllByTestId("terrain")[0]).toHaveTextContent(/grasslands/i);

    expect(screen.getAllByRole('columnheader')[7]).toHaveTextContent(/Surface Water/i);
    expect(screen.getAllByTestId("surface_water")[0]).toHaveTextContent(/40/i);

    expect(screen.getAllByRole('columnheader')[8]).toHaveTextContent(/Population/i);
    expect(screen.getAllByTestId("population")[0]).toHaveTextContent(/2000000000/i);

    expect(screen.getAllByRole('columnheader')[9]).not.toHaveTextContent(/Residents/i);

    expect(screen.getAllByRole('columnheader')[9]).toHaveTextContent(/Films/i);
    expect(screen.getAllByTestId("films")[0]).toHaveTextContent(filmsAldreean);

    expect(screen.getAllByRole('columnheader')[10]).toHaveTextContent(/Created/i);
    expect(screen.getAllByTestId("created")[0]).toHaveTextContent(/2014-12-10T11:35:48.479000Z/i);

    expect(screen.getAllByRole('columnheader')[11]).toHaveTextContent(/Edited/i);
    expect(screen.getAllByTestId("edited")[0]).toHaveTextContent(/2014-12-20T20:58:18.420000Z/i);

    expect(screen.getAllByRole('columnheader')[12]).toHaveTextContent(/URL/i);
    expect(screen.getAllByTestId("url")[0]).toHaveTextContent(urlAldreean);
  });
});