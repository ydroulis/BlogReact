import './styles.css';

export const Button = ({ text, onClick, disabled }) => {
  return <button className="button" onClick={onClick} disabled={disabled}>{text}</button>
}

//CLASS COMPONENT

// export class Button extends Component {
//   render() {
//     const { text, onClick, disabled } = this.props;
//     return <button className="button" onClick={onClick} disabled={disabled}>{text}</button>;
//   }
// }
