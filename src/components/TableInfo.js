import React, { useContext } from 'react';
import Context from '../context/Context';
import SearchHeader from './SearchHeader';
import FilterHeader from './FilterHeader';
import AppliedFilters from './AppliedFilters';

function TableInfo() {
  const { filtered } = useContext(Context);

  return (
    <div>
      <div>
        <SearchHeader />
      </div>
      <div>
        <FilterHeader />
      </div>
      <div>
        <AppliedFilters />
      </div>
      <table>
        <thead data-testid="collumn-header">
          <tr data-testid="collumn-line">
            <th>Name</th>
            <th>Rotation Period</th>
            <th>Orbital Period</th>
            <th>Diameter</th>
            <th>Climate</th>
            <th>Gravity</th>
            <th>Terrain</th>
            <th>Surface Water</th>
            <th>Population</th>
            <th>Films</th>
            <th>Created</th>
            <th>Edited</th>
            <th>URL</th>
          </tr>
        </thead>
        <tbody data-testid="collumn-body">
          { filtered.map((planet, index) => (
            <tr key={ index } data-testid={ `planet-${index + 1}` }>
              <td data-testid="planet-name">{planet.name}</td>
              <td data-testid="rotation_period">{planet.rotation_period}</td>
              <td data-testid="orbital_period">{planet.orbital_period}</td>
              <td data-testid="diameter">{planet.diameter}</td>
              <td data-testid="climate">{planet.climate}</td>
              <td data-testid="gravity">{planet.gravity}</td>
              <td data-testid="terrain">{planet.terrain}</td>
              <td data-testid="surface_water">{planet.surface_water}</td>
              <td data-testid="population">{planet.population}</td>
              <td data-testid="films">{planet.films}</td>
              <td data-testid="created">{planet.created}</td>
              <td data-testid="edited">{planet.edited}</td>
              <td data-testid="url">{planet.url}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TableInfo;
