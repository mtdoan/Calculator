import "./Calculator.css";
import Button from "./components/Button";
import Input from "./components/Input";
import { getNum } from "./reducers/Reducer";

/* displays UI components */
function Calculator(props) {
  const { value, onAction } = props;
  const buttonColor = "#f2a33c";
  const text = value.lastNum.sign
    ? (value.lastNum.value === null
      ? value.lastOp : getNum(value.lastNum))
    : (value.lastNum.value === null
      ? "-" : getNum(value.lastNum));

  const result = value.expr + value.lastOp + getNum(value.lastNum);
  console.log(value);

  return (
    <div className="Calculator">
      <div className="calc-wrapper">
        <Input id="display" text={text} result={result.length === 0 ? 0 : result} />

        <div className="row">
          <Button id="seven" className="" symbol="7" handleClick={onAction} />
          <Button id="eight" className="" symbol="8" handleClick={onAction} />
          <Button id="nine" className="" symbol="9" handleClick={onAction} />
          <Button id="divide" className="" symbol="/" color={buttonColor} handleClick={onAction} />
        </div>

        <div className="row">
          <Button id="four" className="" symbol="4" handleClick={onAction} />
          <Button id="five" className="" symbol="5" handleClick={onAction} />
          <Button id="six" className="" symbol="6" handleClick={onAction} />
          <Button id="multiply" className="" symbol="*" color={buttonColor} handleClick={onAction} />
        </div>

        <div className="row">
          <Button id="one" className="" symbol="1" handleClick={onAction} />
          <Button id="two" className="" symbol="2" handleClick={onAction} />
          <Button id="three" className="" symbol="3" handleClick={onAction} />
          <Button id="add" className="" symbol="+" color={buttonColor} handleClick={onAction} />
        </div>

        <div className="row">
          <Button id="zero" className="" symbol="0" handleClick={onAction} />
          <Button id="decimal" className="" symbol="." handleClick={onAction} />
          <Button id="equals" className="" symbol="=" handleClick={onAction} />
          <Button id="subtract" className="" symbol="-" color={buttonColor} handleClick={onAction} />
        </div>
        <Button id="clear" className="" symbol="AC" color="coral" handleClick={onAction} />
      </div>
    </div>
  );
}

export default Calculator;



