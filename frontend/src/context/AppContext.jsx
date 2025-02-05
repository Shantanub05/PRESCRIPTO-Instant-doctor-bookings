import { createContext, useMemo } from 'react';
import PropTypes from 'prop-types';
import { doctors } from '../assets/assets';

export const AppContext = createContext();

const AppContextProvider = ({ children }) => {
  const value = useMemo(() => ({ doctors }), []);

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

AppContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppContextProvider;
