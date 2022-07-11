/* import { useEffect, useState } from 'react';

const useApi = async () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchPlanets = async () => {
      const response = await fetch('https://swapi-trybe.herokuapp.com/api/planets/');
      const json = await response.json();
      const { results } = json;
      setData(results);
    };
    fetchPlanets();
  }, []);

  return { data };
};

export default useApi; */

const useApi = async () => {
  const response = await fetch('https://swapi-trybe.herokuapp.com/api/planets/');
  const json = await response.json();
  const { results } = json;
  return results;
};

export default useApi;
