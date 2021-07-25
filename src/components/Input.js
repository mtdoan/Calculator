import "./Input.css";

const Input = ({ id, text, result }) => {
  return (
    <div className="input-wrapper">
      <div id={id} className="result">  
        <h1>{result}</h1>
      </div>

      <div className="text">
        <h3>{text}</h3>
      </div>
    </div>
  )    
}

export default Input;