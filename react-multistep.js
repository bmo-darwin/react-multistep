import React, { createContext, useReducer, useContext } from "react";
import { css, styled, setup } from "goober";
setup(React.createElement);

const Ol = styled("ol")`
  margin: 0;
  padding-bottom: 2.2rem;
  list-style-type: none;
`;

const LiClass = (props) => css`
  display: inline-block;
  text-align: center;
  line-height: 4.5rem;
  padding: 0 0.7rem;
  cursor: pointer;

  color: ${props.state === "todo" ? "silver" : "black"};
  border-bottom: 4px solid ${props.state === "todo" ? "silver" : "#33C3F0"};

  &:before {
    position: relative;
    bottom: -3.99rem;
    float: left;
    left: 50%;

    ${
      props.state === "todo"
        ? 'content: "\u039F";'
        : props.state === "doing"
        ? 'content: "\u2022";'
        : 'content: "\u2713";'
    }
    color: ${props.state === "todo" ? "silver" : "white"};
    background-color: ${props.state === "todo" ? "white" : "#33C3F0"};  
    width: 1.2em;
    line-height: ${props.state === "todo" ? "1.2em" : "1.4em"};
    border-radius: ${props.state === "todo" ? "0" : "1.2em"};
  }
  &:hover,
  &::before {
    color: #0FA0CE;
  }
  &:after {
    content: "\\00a0\\00a0";
  }   
  span {
    padding: 0 1.5rem;
  }
`;
const getNavStyles = (indx, length) => {
  let styles = [];
  for (let i = 0; i < length; i++) {
    if (i < indx) {
      styles.push("done");
    } else if (i === indx) {
      styles.push("doing");
    } else {
      styles.push("todo");
    }
  }
  return styles;
};

const getButtonsState = (indx, length) => {
  if (indx > 0 && indx < length - 1) {
    return {
      showPreviousBtn: true,
      showNextBtn: true,
    };
  } else if (indx === 0) {
    return {
      showPreviousBtn: false,
      showNextBtn: true,
    };
  } else {
    return {
      showPreviousBtn: true,
      showNextBtn: false,
    };
  }
};

const StepContext = createContext({
  step: 0,
  buttons: {},
  styles: {},
});

function stepReducer(numSteps) {
  const btnState = (index) => getButtonsState(index, numSteps);
  const styleState = (index) => getNavStyles(index, numSteps);

  return (state = {}, action) => {
    switch (action.type) {
      case "INCREMENT":
        const step = state.step + 1;

        return {
          step: step < numSteps ? step : state.step,
          buttons: btnState(step),
          styles: styleState(step),
        };

      case "DECREMENT":
        const stepTo = state.step - 1;

        return {
          step: stepTo > -1 ? stepTo : state.step,
          buttons: btnState(stepTo),
          styles: styleState(stepTo),
        };

      case "JUMP":
        return {
          step: action.step,
          buttons: btnState(action.step),
          styles: styleState(action.step),
        };

      default:
        return state;
    }
  };
}

export const MultiStep = {
  Provider,
  Status,
  Step,
  NavButtons,
};

function Provider({ steps, showNavigation = undefined, children }) {
  const stepsLen = steps.length;
  const reducer = stepReducer(stepsLen);

  const [{ step, buttons, styles }, dispatch] = useReducer(reducer, {
    step: 0,
    buttons: getButtonsState(0, stepsLen),
    styles: getNavStyles(0, stepsLen),
  });

  const ctx = {
    showNavigation: showNavigation === undefined ? true : !!showNavigation,
    stepsLen,
    steps,
    step,
    buttons,
    styles,
    next: () => dispatch({ type: "INCREMENT" }),
    previous: () => dispatch({ type: "DECREMENT" }),
    jump: (index) => dispatch({ type: "JUMP", step: index }),
  };

  const handleKeyDown = (e) =>
    e.which === 13 ? dispatch({ type: "JUMP", step: stepsLen - 1 }) : {};

  return (
    <StepContext.Provider value={ctx}>
      <div onKeyDown={handleKeyDown}>{children}</div>
    </StepContext.Provider>
  );
}

function Status() {
  const { steps, step, styles, stepsLen, jump } = useContext(StepContext);

  const handleOnClick = (e) => {
    if (e.currentTarget.value === stepsLen - 1 && step === stepsLen - 1) {
      jump(stepsLen - 1);
    } else {
      jump(parseInt(e.currentTarget.value));
    }
  };

  return (
    <Ol>
      {steps.map((s, i) => (
        <li
          className={LiClass({ state: styles[i] })}
          onClick={(e) => {
            isValid(s) && handleOnClick(e);
          }}
          key={i}
          value={i}
        >
          <span>{s.name || i + 1}</span>
        </li>
      ))}
    </Ol>
  );
}

function Step({ className = "", style = {} }) {
  const { step, steps } = useContext(StepContext);

  return (
    <div className={className} style={style}>
      {steps[step].component}
    </div>
  );
}

function NavButtons({
  style = {},
  className = "",
  prevStyle = {},
  prevClassName = "",
  nextStyle = {},
  nextClassName = "",
}) {
  const { buttons, steps, step, showNavigation, next, previous } = useContext(
    StepContext
  );

  return showNavigation ? (
    <div className={className} style={style}>
      <button
        style={buttons.showPreviousBtn ? prevStyle : { display: "none" }}
        onClick={previous}
        className={prevClassName}
      >
        Prev
      </button>

      <button
        style={buttons.showNextBtn ? nextStyle : { display: "none" }}
        onClick={next}
        disabled={nextDisabled(steps[step])}
        className={nextClassName}
      >
        Next
      </button>
    </div>
  ) : null;
}

function isValid({ valid = undefined }) {
  return valid === undefined || valid;
}

function nextDisabled({ valid = undefined }) {
  return valid === false;
}
