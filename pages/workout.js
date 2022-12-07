import { useState } from 'react'

const kgColour = 'green'
const lbsColour = 'lightblue'
const buttonStyle = {
  backgroundColor: 'lightblue',
  color: 'white',
  margin: 10,
  width: 70,
  height: 50,
}
const numStyle = {
  color: 'lightblue',
  fontSize: 30,
}

const unitStyle = {
  color: 'lightblue',
  fontSize: 15,
}

function lbsToKg(lbs) {
  return lbs * 0.45359237
}

function kgToLbs(kg) {
  return kg * 2.20462262
}

function getOptimalLetterSpacing(textLength) {
  return (2 - textLength) * 1.2
}

const Screen = ({ value }) => {
  var _numStyleLbs = { ...numStyle, color: lbsColour }
  var _numStyleKg = { ...numStyle, color: kgColour }
  var _unitStyleLbs = { ...unitStyle, color: lbsColour }
  var _unitStyleKg = { ...unitStyle, color: kgColour }
  _numStyleLbs.fontSize = _numStyleLbs.fontSize * 1.5
  _numStyleKg.fontSize = _numStyleKg.fontSize * 1.5
  return (
    <>
      <text style={_numStyleLbs}>{value.toFixed(0).toString()}</text>
      <text style={_unitStyleLbs}>lbs </text>
      <text style={_numStyleKg}> {lbsToKg(value).toFixed(0).toString()}</text>
      <text style={_unitStyleKg}>kg </text>
    </>
  )
}

const AddButtonLbs = ({ value, calculator }) => {
  const letterSpacing = getOptimalLetterSpacing(value.toString().length)
  const _buttonStyle = { ...buttonStyle, backgroundColor: lbsColour }
  const _fontStyle = { fontSize: numStyle.fontSize, letterSpacing: letterSpacing }
  function onClick() {
    calculator.setAns(calculator.calculaterAnswer + value)
  }
  return (
    <button onClick={onClick} style={_buttonStyle}>
      <text style={_fontStyle}>+{value !== undefined ? value.toString() : 'undefined value'}</text>
    </button>
  )
}

const AddButtonKgs = ({ value, calculator }) => {
  const letterSpacing = getOptimalLetterSpacing(value.toString().length)
  const _buttonStyle = { ...buttonStyle, backgroundColor: kgColour }
  const _fontStyle = { fontSize: numStyle.fontSize, letterSpacing: letterSpacing }
  function onClick() {
    calculator.setAns(calculator.calculaterAnswer + kgToLbs(value))
  }
  return (
    <button onClick={onClick} style={_buttonStyle}>
      <text style={_fontStyle}>+{value !== undefined ? value.toString() : 'undefined value'}</text>
    </button>
  )
}

const ResetButton = ({ onClick }) => {
  const _buttonStyle = { ...buttonStyle, backgroundColor: 'red' }
  const letterSpacing = getOptimalLetterSpacing('Undo'.length)
  const _fontStyle = { fontSize: numStyle.fontSize, letterSpacing: letterSpacing }
  return (
    <button onClick={onClick} style={_buttonStyle}>
      <text style={_fontStyle}>Rst</text>
    </button>
  )
}

const UndoButton = ({ onClick }) => {
  const _buttonStyle = { ...buttonStyle, backgroundColor: 'orange' }
  const letterSpacing = getOptimalLetterSpacing('Undo'.length)
  const _fontStyle = { fontSize: numStyle.fontSize, letterSpacing: letterSpacing }
  return (
    <button onClick={onClick} style={_buttonStyle}>
      <text style={_fontStyle}>Undo</text>
    </button>
  )
}

export default function Workout() {
  const [calculaterAnswer, __setCalculaterAnswer] = useState(0) // in lbs
  const [calculatorPrevAnswers, __setCalculatorPrevAnswers] = useState([]) // elements are in lbs

  class Calculator {
    constructor(
      calculaterAnswer,
      __setCalculaterAnswer,
      calculatorPrevAnswers,
      __setCalculatorPrevAnswers
    ) {
      this.calculaterAnswer = calculaterAnswer
      this.__setCalculaterAnswer = __setCalculaterAnswer
      this.calculatorPrevAnswers = calculatorPrevAnswers
      this.__setCalculatorPrevAnswers = __setCalculatorPrevAnswers
    }
    setAns(value) {
      this.__setCalculatorPrevAnswers([...this.calculatorPrevAnswers, this.calculaterAnswer])
      this.__setCalculaterAnswer(value)
    }
    undoAns() {
      this.__setCalculaterAnswer(
        this.calculatorPrevAnswers.length > 0
          ? this.calculatorPrevAnswers[this.calculatorPrevAnswers.length - 1]
          : 0
      )
      this.__setCalculatorPrevAnswers(this.calculatorPrevAnswers.slice(0, -1))
    }

    resetAns() {
      this.__setCalculaterAnswer(0)
      this.__setCalculatorPrevAnswers([])
    }
  }

  const calculator = new Calculator(
    calculaterAnswer,
    __setCalculaterAnswer,
    calculatorPrevAnswers,
    __setCalculatorPrevAnswers
  )

  return (
    <div>
      <ResetButton onClick={() => calculator.resetAns()} />
      <UndoButton onClick={() => calculator.undoAns()} />
      <Screen value={calculaterAnswer} />
      <br />
      <AddButtonLbs value={90} calculator={calculator} />
      <AddButtonLbs value={50} calculator={calculator} />
      <AddButtonLbs value={30} calculator={calculator} />
      <AddButtonLbs value={20} calculator={calculator} />
      <br />
      <AddButtonLbs value={45} calculator={calculator} />
      <AddButtonLbs value={25} calculator={calculator} />
      <AddButtonLbs value={15} calculator={calculator} />
      <AddButtonLbs value={10} calculator={calculator} />
      <br />
      <AddButtonLbs value={5} calculator={calculator} />
      <AddButtonLbs value={2.5} calculator={calculator} />
      <AddButtonKgs value={20} calculator={calculator} />
      <AddButtonKgs value={15} calculator={calculator} />
      <br />
      <AddButtonKgs value={50} calculator={calculator} />
      <AddButtonKgs value={40} calculator={calculator} />
      <AddButtonKgs value={30} calculator={calculator} />
      <AddButtonKgs value={20} calculator={calculator} />
      <br />
      <AddButtonKgs value={25} calculator={calculator} />
      <AddButtonKgs value={20} calculator={calculator} />
      <AddButtonKgs value={15} calculator={calculator} />
      <AddButtonKgs value={10} calculator={calculator} />
      <br />
      <AddButtonKgs value={5} calculator={calculator} />
      <AddButtonKgs value={2.5} calculator={calculator} />
      <AddButtonKgs value={1.25} calculator={calculator} />
      <AddButtonLbs value={1.25} calculator={calculator} />
      <br />
    </div>
  )
}

export async function getStaticProps() {
  return {
    props: {},
  }
}
