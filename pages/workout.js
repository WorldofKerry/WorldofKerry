import { useState } from 'react'

const kgColour = 'green'
const lbsColour = 'lightblue'
const buttonStyle = {
  backgroundColor: 'lightblue',
  color: 'white',
  margin: 10,
  width: 120,
  height: 100,
}
const numStyle = {
  color: 'lightblue',
  fontSize: 45,
}

const unitStyle = {
  color: 'lightblue',
  fontSize: 50,
}

function lbsToKg(lbs) {
  return lbs * 0.45359237
}

function kgToLbs(kg) {
  return kg * 2.20462262
}

const Screen = ({ value }) => {
  var numStyleLbs = { ...numStyle, color: lbsColour }
  var numStyleKg = { ...numStyle, color: kgColour }
  var unitStyleLbs = { ...unitStyle, color: lbsColour }
  var unitStyleKg = { ...unitStyle, color: kgColour }
  numStyleLbs.fontSize = numStyleLbs.fontSize * 1.5
  numStyleKg.fontSize = numStyleKg.fontSize * 1.5
  return (
    <>
      <text style={numStyleLbs}>{value.toFixed(0).toString()}</text>
      <text style={unitStyleLbs}>lbs </text>
      <text style={numStyleKg}> {lbsToKg(value).toFixed(0).toString()}</text>
      <text style={unitStyleKg}>kg </text>
    </>
  )
}

const AddButtonLbs = ({ value, calculator }) => {
  // const fontSize = Math.min(
  //   (2 / value.toString().length) * buttonStyle.fontSize,
  //   buttonStyle.fontSize
  // )
  const _buttonStyle = { ...buttonStyle, backgroundColor: lbsColour }
  const _fontStyle = { fontSize: 45 }
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
  // const fontSize = Math.min(
  //   (2 / value.toString().length) * buttonStyle.fontSize,
  //   buttonStyle.fontSize
  // )
  const _buttonStyle = { ...buttonStyle, backgroundColor: kgColour }
  const _fontStyle = { fontSize: 45 }
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
  const _fontStyle = { fontSize: numStyle.fontSize }
  return (
    <button onClick={onClick} style={_buttonStyle}>
      <text style={_fontStyle}>Rst</text>
    </button>
  )
}

const UndoButton = ({ onClick }) => {
  const _buttonStyle = { ...buttonStyle, backgroundColor: 'orange' }
  const _fontStyle = { fontSize: numStyle.fontSize }
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
