import React, { useContext, useEffect } from 'react';
import Context from '../context/Context';
import Api from '../hooks/Api';
import Loading from './Loading';

function TableInfo() {
  const { data, setData } = useContext(Context);

  useEffect(() => {
    const fetchApi = async () => {
      const info = await Api();
      const dataFilter = info.map(({ residents, ...rest }) => rest);
      setData(dataFilter);
    };
    fetchApi();
  }, [setData]);
  return (
    <div>
      {data.length === 0 ? (
        <Loading />
      ) : (
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
            {data.map((info, index) => (
              <tr key={ index }>
                <td name={ info.name }>{info.name}</td>
                <td name={ info.rotation_period }>{info.rotation_period}</td>
                <td name={ info.orbital_period }>{info.orbital_period}</td>
                <td name={ info.diameter }>{info.diameter}</td>
                <td name={ info.climate }>{info.climate}</td>
                <td name={ info.gravity }>{info.gravity}</td>
                <td name={ info.terrain }>{info.terrain}</td>
                <td name={ info.surface_water }>{info.surface_water}</td>
                <td name={ info.population }>{info.population}</td>
                <td name={ info.films }>{info.films}</td>
                <td name={ info.created }>{info.created}</td>
                <td name={ info.edited }>{info.edited}</td>
                <td name={ info.url }>{info.url}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>

  );
}

export default TableInfo;
