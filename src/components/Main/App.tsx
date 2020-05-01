import * as React from 'react';
import { useState } from 'react';
import './App.css';

import { StepperSimple, IStepperSimpleOption, StepperSimpleStyle } from '../StepperSimple/StepperSimple';

const stepperSimpleOptions: IStepperSimpleOption[] = [
  {
    text: "Vorlage aussuchen",
    icon: "FileTemplate"
  },
  {
    text: "Eigenschaften bearbeiten" ,
    icon: "PageEdit"
  },
  {
    text: "In Word Bearbeiten",
    icon: "WordLogo"
  },
  {
    text: "E-Mail bearbeiten",
    icon: "EditMail"
  },
  {
    text: "E-Mail verschicken",
    icon: "MailCheck"
  },
]

function App() {
  const [stepperIndex, setStepperIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [trigger, setTrigger] = useState("");

  const onChange = (value: number) => {
    if(value > -1 && value < stepperSimpleOptions.length) {
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
      <StepperSimple selectedIndex={stepperIndex} onChange={(value) => onChange(value)} items={stepperSimpleOptions} style={StepperSimpleStyle.Bar}/>

      <div className="body">
        Hallo Welt {stepperIndex} {trigger}
      </div>

      <div className="buttonContainer">
        <StepperSimple selectedIndex={stepperIndex} disabled={loading} onChange={(value) => onChange(value)} items={stepperSimpleOptions} style={StepperSimpleStyle.BackButton}/>
        <StepperSimple selectedIndex={stepperIndex} disabled={loading} onChange={(value) => onChange(value)} items={stepperSimpleOptions} style={StepperSimpleStyle.NextButton}/>
      </div>

    </div>
  );
}

export default App;
