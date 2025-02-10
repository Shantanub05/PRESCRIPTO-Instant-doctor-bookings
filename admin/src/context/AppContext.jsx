import { createContext } from 'react';
import PropTypes from 'prop-types';

export const AppContext = createContext();

const AppContextProvider = (props) => {
  const currency = '$';
  const calAge = (dob) => {
    const today = new Date();
    const birthDate = new Date(dob);

    let age = today.getFullYear() - birthDate.getFullYear()

    return age
  }

    const months = [
      '',
      'JAN',
      'FEB',
      'MAR',
      'APR',
      'MAY',
      'JUN',
      'JUL',
      'AUG',
      'SEP',
      'OCT',
      'NOV',
      'DEC',
    ];

    const slotDateFormat = (slotDate) => {
      const dateArray = slotDate.split('_');
      return (
        dateArray[0] + ' ' + months[Number(dateArray[1])] + ' ' + dateArray[2]
      );
    };
  const value = { calAge, slotDateFormat, currency };

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};
AppContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppContextProvider;
