import { evaluate } from "mathjs";

const INITIAL_STATE = {
  expr: "",
  lastOp: "",
  lastNum: {
    sign: true, // true: +, false: -,
    decimal: false, // true: double, false: int,
    coef: 0.1,
    decimalCount: 0,
    value: null
  },
  evaluated: false
};

/* adds a new digit to lastNum.value and returns a lastNum object */
function addDigit(num, digit) {
  if (!num.decimal) {
    return {
      ...num,
      value: num.value === null ? digit : num.value * 10 + digit
    };
  } else {
    return {
      ...num,
      value: num.value === null ? digit * num.coef : num.value + digit * num.coef,
      coef: num.coef / 10,
      decimalCount: num.decimalCount + 1
    };
  }
}

/* returns a number in string format */
export function getNum(num) {
  const signLetter = num.sign ? "" : "-";
  if (num.decimal && num.coef === 0.1) {
    return signLetter + (num.value === null ? "" : num.value) + ".";
  }
  return signLetter + (num.value === null ? "" : Number(num.value).toFixed(num.decimalCount));

}

/* handles state + action */
export const reducer = (state = INITIAL_STATE, action) => {
  const { symbol } = action;
  let changes = {};
  if (symbol === "-") {
    // Type 3
    if (state.lastNum.value === null) {
      changes = {
        lastNum: {
          ...state.lastNum,
          sign: !state.lastNum.sign
        },
        evaluated: false
      };
    } else {
      changes = {
        expr: state.expr + state.lastOp + getNum(state.lastNum),
        lastOp: "-",
        lastNum: INITIAL_STATE.lastNum,
        evaluated: false
      };
    }
  } else if (symbol === "+" || symbol === "*" || symbol === "/") {
    // Type 4
    if (state.lastNum.value === null) {
      changes = {
        lastOp: symbol,
        evaluated: false,
        lastNum: INITIAL_STATE.lastNum
      }
    } else {
      changes = {
        expr: state.expr + state.lastOp + getNum(state.lastNum),
        lastOp: symbol,
        lastNum: INITIAL_STATE.lastNum,
        evaluated: false
      };
    }

  } else if (symbol === "=") {
    // Type 5
    if (state.lastNum.value === null) {
      return state;
    }
    const curExpr = state.expr + state.lastOp + getNum(state.lastNum);
    const ans = Math.round(1000000000000 * evaluate(curExpr)) / 1000000000000;
    changes = {
      expr: ans.toString(),
      lastOp: "",
      lastNum: INITIAL_STATE.lastNum,
      evaluated: true
    }
  } else if (symbol === "AC") {
    // Type 6
    changes = {
      ...INITIAL_STATE,
    }
      ;
  } else if (symbol === ".") {
    // Type 7 
    if (state.lastNum.decimal) {
      return state;
    }

    if (state.evaluated) {
      return changes = {
        ...INITIAL_STATE,
        lastNum: {
          ...state.lastNum,
          decimal: true,
          value: 0,
        }
      };
    }
    changes = {
      lastNum: {
        ...state.lastNum,
        decimal: true,
      },
    };

  } else {
    let digit = parseInt(symbol);
    // Invalid action
    if (isNaN(digit)) {
      return state;
    };
    // Type 1 // input 0-9
    if (state.evaluated) {
      changes = {
        ...INITIAL_STATE,
        lastNum: {
          ...INITIAL_STATE.lastNum,
          value: digit
        }
      };
    } else {
      changes = {
        lastNum: addDigit(state.lastNum, digit)
      };
    }
  }
  return { ...state, ...changes };
};