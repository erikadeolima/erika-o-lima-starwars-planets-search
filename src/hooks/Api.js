/* import testData from '../mock/testData' */

const useApi = async () => {
  const response = await fetch('https://swapi-trybe.herokuapp.com/api/planets/');
  const json = await response.json();
  const { results } = json;
  // const json = testData;
  // const { results } = json;
  // console.log('MOCK');
  return results;
};

export default useApi;
