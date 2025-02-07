import { createContext } from 'react';
import PropTypes from 'prop-types';

export const AdminContext = createContext();

const AdminContextProvider = (props) => {
  const value = {};

  return (
    <AdminContext.Provider value={value}>{props.children}</AdminContext.Provider>
  );
};
AdminContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AdminContextProvider;
