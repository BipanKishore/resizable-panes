import { Pane } from "resizable-panes-react";
import { PaneModelConfig } from "../../../src/shared/models";
import React from "react";
import { Loading } from "../Loading";
import { paneClasses } from "./pane-css";
import { ISelectList } from "../form-controls/select";



export const generatePaneModel = (list: PaneModelConfig[]) => {
  const paneComponentLists = list.map(({ size, minSize, maxSize }, index) => {

    return (
      <Pane
      className={`${paneClasses[index % (paneClasses.length -1)].container} text-center text-2xl text-white rounded-lg`}
      id={`P${index}`}
      key={index}
      maxSize={maxSize}
      minSize={minSize}
      size={size}
    >
      <div className="mt-8 text-slate-700">
        {<h2>{`P${index}`}</h2>}
        <Loading />
      </div>
    </Pane>
    )
  }

  );

  return paneComponentLists;
};

export const getInitialVisibility = (list: any[]) => {
  const initalVisibility: any = {};

  list.forEach((_, index) => {
    initalVisibility[`P${index}`] = true;
  });

  return initalVisibility;
};

export const getSelectListForPaneIds = (list: PaneModelConfig[]) => {
  const selectList: ISelectList[] = [];
  list.forEach((_, index) => {
    selectList.push({
      paneClasses: paneClasses[index],
      label: `P${index}`,
      value: `P${index}`,
    });
  });
  return selectList;
};
