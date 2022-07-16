import React, { useContext } from 'react';
import Context from '../context/Context';
import SearchHeader from './SearchHeader';
import FilterHeader from './FilterHeader';

function TableInfo() {
  const { filtered } = useContext(Context);

  return (
    <div>
      <SearchHeader />
      <FilterHeader />
      <table>
        <thead>
          <tr>
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
        <tbody>
          { filtered.map((planet, index) => (
            <tr key={ index }>
              <td name={ planet.name }>{planet.name}</td>
              <td name={ planet.rotation_period }>{planet.rotation_period}</td>
              <td name={ planet.orbital_period }>{planet.orbital_period}</td>
              <td name={ planet.diameter }>{planet.diameter}</td>
              <td name={ planet.climate }>{planet.climate}</td>
              <td name={ planet.gravity }>{planet.gravity}</td>
              <td name={ planet.terrain }>{planet.terrain}</td>
              <td name={ planet.surface_water }>{planet.surface_water}</td>
              <td name={ planet.population }>{planet.population}</td>
              <td name={ planet.films }>{planet.films}</td>
              <td name={ planet.created }>{planet.created}</td>
              <td name={ planet.edited }>{planet.edited}</td>
              <td name={ planet.url }>{planet.url}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

  );
}

export default TableInfo;
