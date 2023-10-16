import Proptypes from 'prop-types';
import './styles.css';

export const Button = ({ text, onClick, disabled = false }) => {
  return (
    <button className="button" onClick={onClick} disabled={disabled}>
      {text}
    </button>
  );
};

Button.defaultProps = {
  disabled: false,
};

Button.propTypes = {
  text: Proptypes.string.isRequired,
  onClick: Proptypes.func.isRequired,
  disabled: Proptypes.bool,
};

//CLASS COMPONENT

// export class Button extends Component {
//   render() {
//     const { text, onClick, disabled } = this.props;
//     return <button className="button" onClick={onClick} disabled={disabled}>{text}</button>;
//   }
// }
