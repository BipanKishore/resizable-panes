import React from "react";
// import { VISIBLE, ZIPPED } from "../../../shared/constant";
import { joinClassName } from "../../../shared/utils";

const stateClass: any = {
  false: "text-slate-700 hiddenClass ",
  ring: "", //'ring-cyan-950',
  zipped: "text-cyan-300 border-cyan-300  zippedClass",
  container: "bg-cyan-300",
  true: "text-cyan-600 border-cyan-600 visibleClass",
};

export const MultiStateButton = ({
  name,
  className,
  state,
  onClick,
  label,
}: any) => {
  const onClickBtn = () => {
    console.log(state)
    onClick({
      name,
      checked: !state,
    });
  };

  const className1 = joinClassName({
    [className]: true,
    " md:font-bold md:py-1 md:px-4 md:mx-4 mx-2 px-2 rounded ":
      true,
    [stateClass[state]]: true,
  });

  return (
    <button
      className={className1}
      data-cy={`checkbox-${name}`}
      onClick={onClickBtn}
    >
      {label || name}
    </button>
  );
};
