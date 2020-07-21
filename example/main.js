import React, { useState } from "react";
import ReactDOM from "react-dom";
import { MultiStep } from "../react-multistep";
import "./css/custom.css";
import "./css/normilize.css";
import "./css/skeleton.css";
import StepOne from "./stepOne";
import StepTwo from "./stepTwo";
import StepThree from "./stepThree";
import StepFour from "./stepFour";

function useSteps() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const [email, setEmail] = useState("");
  const [emailConfirm, setEmailConfirm] = useState("");

  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const [checked, setChecked] = useState(false);

  return [
    {
      component: (
        <StepOne {...{ firstName, lastName, setFirstName, setLastName }} />
      ),
      name: "First",
      valid: firstName !== "" && lastName !== "",
    },
    {
      component: (
        <StepTwo {...{ email, setEmail, emailConfirm, setEmailConfirm }} />
      ),
      name: "Second",
      valid: email !== "" && emailConfirm !== "",
    },
    {
      component: (
        <StepThree
          {...{ password, setPassword, setPasswordConfirm, passwordConfirm }}
        />
      ),
      name: "Third",
      valid: password !== "" && passwordConfirm !== "",
    },
    {
      component: <StepFour {...{ checked, setChecked }} />,
      name: "Fourth",
      valid: !!checked,
    },
  ];
}

const App = () => {
  const validatedSteps = useSteps();
  const nonValidateSteps = useSteps().map(({ name, component }) => ({
    name,
    component,
  }));

  return (
    <div>
      <div className="container">
        <h5>Validated</h5>

        <MultiStep.Provider steps={validatedSteps}>
          <MultiStep.Status />
          <MultiStep.Step />
          <MultiStep.NavButtons />
        </MultiStep.Provider>
      </div>

      <hr />

      <div className="container">
        <h5>Non Validated</h5>

        <MultiStep.Provider steps={nonValidateSteps}>
          <MultiStep.Status />
          <MultiStep.Step />
          <MultiStep.NavButtons />
        </MultiStep.Provider>
      </div>

      <div className="container app-footer">
        <h6>Press 'Enter' or click on progress bar for next step.</h6>
        Code is on{" "}
        <a href="https://github.com/Srdjan/react-multistep" target="_blank">
          github
        </a>
      </div>
    </div>
  );
};
ReactDOM.render(<App />, document.getElementById("app"));
