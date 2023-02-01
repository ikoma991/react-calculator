import { Parser } from "https://cdn.skypack.dev/expr-eval@2.0.2";

const buttons = [
{
  id: "zero",
  text: "0" },

{
  id: "one",
  text: "1" },

{
  id: "two",
  text: "2" },

{
  id: "three",
  text: "3" },

{
  id: "four",
  text: "4" },

{
  id: "five",
  text: "5" },

{
  id: "six",
  text: "6" },

{
  id: "seven",
  text: "7" },

{
  id: "eight",
  text: "8" },

{
  id: "nine",
  text: "9" },

{
  id: "decimal",
  text: "." },

{
  id: "add",
  text: "+" },

{
  id: "subtract",
  text: "-" },

{
  id: "divide",
  text: "/" },

{
  id: "multiply",
  text: "X" }];


const removeLastLetter = fn => fn(
(state) =>
state.substring(0, state.length - 1));

const CalculatorButton = ({
  id,
  text,
  setDisplay,
  display,
  result,
  setResult }) =>
{
  const operators = ['+', '-', '/', 'X'];
  const digits = ['0', '1', '2', '3', '4', '5',
  '6', '7', '8', '9', '.'];
  const isNumber = digits.includes(text);
  const isOperator = operators.includes(text);

  const handleDigit = () => {
    const addNumber = (num, currNum, totalNum) => {

      const checkFormat = n => Number.
      isFinite(
      Number.
      parseFloat(n)) &&

      !isNaN(n);

      const numberNotZeroAndDecimal = () => num !== "0" &&
      num !== ".";
      const maxLength = 15;

      if (isOperator) return;
      if (currNum.length == maxLength)
      return alert("Max Digit Length reached!");

      if (currNum.length === 1 && currNum[0] == "0") {
        if (numberNotZeroAndDecimal()) {
          setDisplay(num);
          setResult(state => state + num);
        }
        if (num == '.') {
          setDisplay(state => state + num);
          setResult(state => state + "0.");
        }
      } else if (checkFormat(currNum)) {
        setDisplay(state => state + num);
        setResult(state => state + num);
      } else {
        removeLastLetter(setDisplay);
        removeLastLetter(setResult);
        if (currNum[currNum.length - 1] == ".") {
          setDisplay(state => state + num);
          setResult(state => state + num);
        }
      }

    };
    addNumber(text, display, result);
  };


  const handleOperator = () => {

    const lastResultCharacter = result[result.length - 1];

    const checkNotOp = character => {
      const operatorsAndDecimal = ['+', '-', '*', '/'];
      return !operatorsAndDecimal.
      includes(character);
    };

    const checkNegative = (txt, res, checkNotOpFn) => {
      const secondLastChar = res[res.length - 2];
      const lastChar = res[res.length - 1];
      if (txt !== "-") return false;
      if (!checkNotOpFn(lastChar) &&
      !checkNotOpFn(secondLastChar)) return false;
      return true;
    };

    const replaceLastOperator = (n, txt) =>
    setResult(state => {
      const newStr = state.
      substring(0, state.length - n);
      if (txt == 'X') {
        return newStr + "*";
      }
      return newStr + txt;
    });

    if (result.length !== 0) {
      setDisplay("0");
      if (checkNotOp(lastResultCharacter)) {
        switch (text) {
          case 'X':
            setResult(state => state + "*");
            break;
          default:
            setResult(state => state + text);}

      } else if (checkNegative(text, result, checkNotOp)) {
        setResult(state => state + "-");
      } else {
        replaceLastOperator(1, text);
        if (!checkNotOp(lastResultCharacter) && result.length >= 3) {
          replaceLastOperator(2, text);
        }
      }
    }
  };
  return /*#__PURE__*/(
    React.createElement("button", {
      id: id,
      onClick:
      isNumber ?
      handleDigit :
      handleOperator },

    text));


};

const App = () => {
  const [display, setDisplay] = React.useState("0");
  const [result, setResult] = React.useState("");

  const handleClear = () => {
    setResult("");
    setDisplay("0");
  };

  const handleEqual = () => {
    const calculation = Parser.evaluate(result);
    if (calculation) {
      setDisplay(calculation);
      setResult(calculation);
    }
  };

  return /*#__PURE__*/(
    React.createElement("div", { id: "main-container" }, /*#__PURE__*/
    React.createElement("div", { id: "sub-container" }, /*#__PURE__*/
    React.createElement("div", { id: "display-container" }, /*#__PURE__*/
    React.createElement("div", { id: "result" }, result), /*#__PURE__*/
    React.createElement("input", {
      type: "text",
      id: "display",
      disabled: true,
      value: display }), /*#__PURE__*/
    React.createElement("div", null)), /*#__PURE__*/

    React.createElement("div", { id: "buttons-container" }, /*#__PURE__*/
    React.createElement("button", { id: "clear", onClick: handleClear }, "AC"), /*#__PURE__*/
    React.createElement("button", { id: "equals", onClick: handleEqual }, "="),

    buttons.
    map((el) => /*#__PURE__*/
    React.createElement(CalculatorButton, {
      id: el.id,
      text: el.text,
      display: display,
      setDisplay: setDisplay,
      result: result,
      setResult: setResult }))))));





};

ReactDOM.render( /*#__PURE__*/React.createElement(App, null), document.getElementById("root"));