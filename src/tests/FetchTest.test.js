import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import App from '../App';
import testData from '../../cypress/mocks/testData';

const planets = testData.results;

afterEach(()=>{
  jest.fn('fetch').mockRestore();
});
describe('Testa se é feita uma requisição para a API de forma correta',()=>{
  test('1 - Quando feita uma requisição para o endpoint `/planets` da API de Star Wars e preenche as colunas e linhas com os dados retornados, com exceção dos da coluna `residents`',async()=>{
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
    expect(screen.getAllByRole('columnheader')[1]).toHaveTextContent(/Rotation Period/i);
    expect(screen.getAllByRole('columnheader')[2]).toHaveTextContent(/Orbital Period/i);
    expect(screen.getAllByRole('columnheader')[3]).toHaveTextContent(/Diameter/i);
    expect(screen.getAllByRole('columnheader')[4]).toHaveTextContent(/Climate/i);
    expect(screen.getAllByRole('columnheader')[5]).toHaveTextContent(/Gravity/i);
    expect(screen.getAllByRole('columnheader')[6]).toHaveTextContent(/Terrain/i);
    expect(screen.getAllByRole('columnheader')[7]).toHaveTextContent(/Surface Water/i);
    expect(screen.getAllByRole('columnheader')[8]).toHaveTextContent(/Population/i);
    expect(screen.getAllByRole('columnheader')[9]).not.toHaveTextContent(/Residents/i);
    expect(screen.getAllByRole('columnheader')[9]).toHaveTextContent(/Films/i);
    expect(screen.getAllByRole('columnheader')[10]).toHaveTextContent(/Created/i);
    expect(screen.getAllByRole('columnheader')[11]).toHaveTextContent(/Edited/i);
    expect(screen.getAllByRole('columnheader')[12]).toHaveTextContent(/URL/i);
  });
});