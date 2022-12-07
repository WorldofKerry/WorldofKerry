import { useState } from 'react'

const buttonStyle = { backgroundColor: 'lightblue', color: 'white', fontSize: 50, margin: 10 }

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
  const numStyle = {
    color: 'lightblue',
    fontSize: 80,
  }
  return (
    <>
      <text style={numStyle}>{value !== undefined ? value.toFixed(0).toString() : 0}</text>
      <text style={unitStyle}>lbs</text>
      <text style={numStyle}>{value !== undefined ? lbsToKg(value).toFixed(0).toString() : 0}</text>
      <text style={unitStyle}>kg</text>
    </>
  )
}

const AddButton = ({ value, onClick }) => {
  return (
    <button onClick={onClick} style={buttonStyle}>
      <text>+{value.toString()}</text>
    </button>
  )
}

const ResetButton = ({ onClick }) => {
  return (
    <button onClick={onClick} style={buttonStyle}>
      <text>Reset</text>
    </button>
  )
}

const UndoButton = ({ onClick }) => {
  return (
    <button onClick={onClick} style={buttonStyle}>
      <text>Undo</text>
    </button>
  )
}

export default function Workout() {
  const [calculaterAnswer, __setCalculaterAnswer] = useState(0)
  const [calculatorPrevAnswers, __setCalculatorPrevAnswers] = useState([])

  function setCalculaterAnswer(value) {
    __setCalculatorPrevAnswers([...calculatorPrevAnswers, calculaterAnswer])
    __setCalculaterAnswer(value)
  }

  function undoCalculaterAnswer() {
    __setCalculaterAnswer(calculatorPrevAnswers[calculatorPrevAnswers.length - 1])
    __setCalculatorPrevAnswers(calculatorPrevAnswers.slice(0, -1))
  }

  function resetCalculaterAnswer() {
    __setCalculaterAnswer(0)
    __setCalculatorPrevAnswers([])
  }

  return (
    <div>
      {/* <h1 style={{ color: 'lightblue', fontSize: 50 }}>Calculator</h1> */}
      <ResetButton onClick={() => resetCalculaterAnswer()} />
      <UndoButton onClick={() => undoCalculaterAnswer()} />
      <Screen value={calculaterAnswer} />
      <br />
      <AddButton value={45} onClick={() => setCalculaterAnswer(calculaterAnswer + 45)} />
      <AddButton value={25} onClick={() => setCalculaterAnswer(calculaterAnswer + 25)} />
      <AddButton value={15} onClick={() => setCalculaterAnswer(calculaterAnswer + 15)} />
      <AddButton value={10} onClick={() => setCalculaterAnswer(calculaterAnswer + 10)} />
      <AddButton value={5} onClick={() => setCalculaterAnswer(calculaterAnswer + 5)} />
      <text style={unitStyle}>lbs</text>
      <br />
      <AddButton value={90} onClick={() => setCalculaterAnswer(calculaterAnswer + 90)} />
      <AddButton value={50} onClick={() => setCalculaterAnswer(calculaterAnswer + 50)} />
      <AddButton value={30} onClick={() => setCalculaterAnswer(calculaterAnswer + 30)} />
      <AddButton value={20} onClick={() => setCalculaterAnswer(calculaterAnswer + 20)} />
      <AddButton value={2.5} onClick={() => setCalculaterAnswer(calculaterAnswer + 2.5)} />
      <text style={unitStyle}>lbs</text>
      <br />
      <AddButton value={25} onClick={() => setCalculaterAnswer(calculaterAnswer + kgToLbs(25))} />
      <AddButton value={20} onClick={() => setCalculaterAnswer(calculaterAnswer + kgToLbs(20))} />
      <AddButton value={15} onClick={() => setCalculaterAnswer(calculaterAnswer + kgToLbs(15))} />
      <AddButton value={10} onClick={() => setCalculaterAnswer(calculaterAnswer + kgToLbs(10))} />
      <AddButton value={5} onClick={() => setCalculaterAnswer(calculaterAnswer + kgToLbs(5))} />
      <text style={unitStyle}>kg</text>
      <br />
      <AddButton value={50} onClick={() => setCalculaterAnswer(calculaterAnswer + kgToLbs(50))} />
      <AddButton value={40} onClick={() => setCalculaterAnswer(calculaterAnswer + kgToLbs(40))} />
      <AddButton value={30} onClick={() => setCalculaterAnswer(calculaterAnswer + kgToLbs(30))} />
      <AddButton value={20} onClick={() => setCalculaterAnswer(calculaterAnswer + kgToLbs(20))} />
      <AddButton value={10} onClick={() => setCalculaterAnswer(calculaterAnswer + kgToLbs(10))} />
      <text style={unitStyle}>kg</text>
    </div>
  )
}

export async function getStaticProps() {
  return {
    props: {},
  }
}
