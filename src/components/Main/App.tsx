import * as React from 'react';
import { useState } from 'react';
import './App.css';

import { StepperSimple, IStepperSimpleOption, StepperSimpleDesign } from '../StepperSimple/StepperSimple';

const stepperSimpleOptions: IStepperSimpleOption[] = [
  {
    text: "step 1 dadada"
  },
  {
    text: "step 2 lalala"
  },
  {
    text: "step 3 lalala"
  },
]

function App() {
  const [stepperIndex, setStepperIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [trigger, setTrigger] = useState("");

  const onChange = (value: number) => {
    if(value > 0 && value < stepperSimpleOptions.length) {
      setStepperIndex(value);
    }

    if(value >= stepperSimpleOptions.length) {
      setLoading(true);
      setTrigger("Triggered");
      // trigger any function

    }
  }
  return (
    <div className="App">
      <StepperSimple selectedIndex={stepperIndex} onChange={(value) => onChange(value)} items={stepperSimpleOptions} design={StepperSimpleDesign.Bar}/>

      <div>Hallo Welt {stepperIndex} {trigger}</div>

      <StepperSimple selectedIndex={stepperIndex} disabled={loading} noBack={true} onChange={(value) => onChange(value)} items={stepperSimpleOptions} design={StepperSimpleDesign.Button}/>

    </div>
  );
}

export default App;
