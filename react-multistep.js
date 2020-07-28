import React, { createContext, useState, useContext, useEffect } from "react";
import PropTypes from "prop-types";
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

const StateCtx = createContext();
const DispatchCtx = createContext();

export const MultiStep = {
  Provider,
  Status,
  Step,
  NavButtons,
};

function Provider({
  steps,
  showNavigation = undefined,
  children,
  activeStep = 0,
  handleStep,
}) {
  const totalSteps = steps.length;

  const [{ buttons, styles }, setNavState] = useNavStates(totalSteps);

  useEffect(() => {
    setNavState(activeStep);
  }, [activeStep]);

  const stateCtx = {
    showNavigation: showNavigation === undefined ? true : !!showNavigation,
    totalSteps,
    steps,
    activeStep,
    buttons,
    styles,
  };

  const handleKeyDown = (e) => e.which === 13 && handleStep(totalSteps - 1);

  return (
    <StateCtx.Provider value={stateCtx}>
      <DispatchCtx.Provider value={handleStep}>
        <div onKeyDown={handleKeyDown}>{children}</div>
      </DispatchCtx.Provider>
    </StateCtx.Provider>
  );
}

const StepType = PropTypes.shape({
  component: PropTypes.node.isRequired,
  name: PropTypes.string,
  valid: PropTypes.bool,
});

Provider.propTypes = {
  children: PropTypes.node.isRequired,
  showNavigation: PropTypes.bool,
  steps: PropTypes.arrayOf(StepType).isRequired,
  activeStep: PropTypes.number,
  handleStep: PropTypes.func.isRequired,
};

function useNavStates(totalSteps, initialStep = 0) {
  const update = (step) => ({
    buttons: getButtonsState(step, totalSteps),
    styles: getNavStyles(step, totalSteps),
  });

  const [state, setState] = useState(update(initialStep));

  return [state, (step) => setState(update(step))];
}

function Status() {
  const { steps, activeStep, styles, totalSteps } = useContext(StateCtx);
  const handleStep = useContext(DispatchCtx);

  const handleOnClick = (e) => {
    if (
      e.currentTarget.value === totalSteps - 1 &&
      activeStep === totalSteps - 1
    ) {
      handleStep(stepsLen - 1);
    } else {
      handleStep(parseInt(e.currentTarget.value));
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
  const { activeStep, steps } = useContext(StateCtx);

  return (
    <div className={className} style={style}>
      {steps[activeStep].component}
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
  const { buttons, steps, activeStep, showNavigation } = useContext(StateCtx);
  const handleStep = useContext(DispatchCtx);

  return showNavigation ? (
    <div className={className} style={style}>
      <button
        style={buttons.showPreviousBtn ? prevStyle : { display: "none" }}
        onClick={(e) => handleStep(activeStep - 1)}
        className={prevClassName}
      >
        Prev
      </button>

      <button
        style={buttons.showNextBtn ? nextStyle : { display: "none" }}
        onClick={(e) => handleStep(activeStep + 1)}
        disabled={nextDisabled(steps[activeStep])}
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
