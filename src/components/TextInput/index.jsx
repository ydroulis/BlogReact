import Proptypes from 'prop-types';
import './styles.css';

export const TextInput = ({ searchValue, handleChange }) => {
  return (
    <input
      className="text-input"
      type="search"
      onChange={handleChange}
      value={searchValue}
      placeholder="Type your search"
    />
  );
};

TextInput.propTypes = {
  searchValue: Proptypes.string.isRequired,
  handleChange: Proptypes.func.isRequired,
};
