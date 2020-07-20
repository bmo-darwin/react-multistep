import React, { useState } from "react";
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

export default function MultiStep(props) {
  const stepsLen = props.steps.length;

  let showNavigation = true;
  if (props.showNavigation && props.showNavigation)
    showNavigation = props.showNavigation;

  const [stylesState, setStyles] = useState(getNavStyles(0, stepsLen));
  const [compState, setComp] = useState(0);
  const [buttonsState, setButtons] = useState(getButtonsState(0, stepsLen));

  const setStepState = (indx) => {
    setStyles(getNavStyles(indx, stepsLen));
    setComp(indx < props.steps.length ? indx : compState);
    setButtons(getButtonsState(indx, stepsLen));
  };

  const next = () => setStepState(compState + 1);
  const previous = () =>
    setStepState(compState > 0 ? compState - 1 : compState);
  const handleKeyDown = (evt) => (evt.which === 13 ? next(stepsLen) : {});

  const handleOnClick = (evt) => {
    if (
      evt.currentTarget.value === stepsLen - 1 &&
      compState === stepsLen - 1
    ) {
      setStepState(stepsLen);
    } else {
      setStepState(evt.currentTarget.value);
    }
  };

  const renderSteps = () =>
    props.steps.map((s, i) => (
      <li
        className={LiClass({ state: stylesState[i] })}
        onClick={(e) => {
          isValid(s) && handleOnClick(e);
        }}
        key={i}
        value={i}
      >
        <span>{s.name || i + 1}</span>
      </li>
    ));

  const renderNav = (show, index) =>
    show && (
      <div className="multistep-transition-btn-group">
        <button
          style={buttonsState.showPreviousBtn ? {} : { display: "none" }}
          onClick={previous}
          className="multistep-btn-prev"
        >
          Prev
        </button>

        <button
          style={buttonsState.showNextBtn ? {} : { display: "none" }}
          onClick={next}
          disabled={nextDisabled(props.steps[index])}
          className="multistep-btn-next"
        >
          Next
        </button>
      </div>
    );

  return (
    <div onKeyDown={handleKeyDown}>
      <Ol>{renderSteps()}</Ol>
      <div>{props.steps[compState].component}</div>
      <div>{renderNav(showNavigation, compState)}</div>
    </div>
  );
}

function isValid({ valid = undefined }) {
  return valid === undefined || valid;
}

function nextDisabled({ valid = undefined }) {
  return valid === false;
}
