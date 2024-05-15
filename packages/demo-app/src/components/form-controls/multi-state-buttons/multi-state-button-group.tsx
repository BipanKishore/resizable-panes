import React from "react";
import { MultiStateButton } from "./multi-state-button";
import { ISelectList } from "../select";

interface IPanesVisibilityState {
  stateMap: any;
  onClick: any;
  selectIdsOption: ISelectList[];
  sizeStates: {
    [key: string]: string | number | null;
  };
}

export const PanesVisibilityState = ({
  stateMap,
  onClick,
  selectIdsOption,
  sizeStates,
}: IPanesVisibilityState) => {
  return (
    <div className="place-self-center">
      {selectIdsOption.map(({ label, paneClasses }) => (
        <MultiStateButton
          sizeStates={sizeStates}
          key={label}
          name={label}
          state={stateMap[label]}
          //className={`${paneClasse} `}
          statesClass={paneClasses}
          onClick={onClick}
        />
      ))}
    </div>
  );
};
