import PropTypes from 'prop-types';
import React, { useState } from 'react';
import Context from './Context';

function Provider(props) {
  const [data, setData] = useState([]);

  /* const fetchEndpoint = async () => {
    const info = await Api();
    // console.log(data);
    // console.log(data.results);
    setData(...data, [info]);
  }; */

  const context = { data, setData };
  const { children } = props;
  return (
    <Context.Provider value={ context }>
      {children}
    </Context.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
