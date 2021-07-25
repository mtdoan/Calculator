import "./Button.css";

const Button = ({ id, symbol, color, handleClick }) => {
  return (
    <div 
      id={id}
      className="button-wrapper" 
      style={{ backgroundColor: color }}
      onClick={() => handleClick(symbol)}>
      {symbol}
    </div>
  );
}

export default Button;