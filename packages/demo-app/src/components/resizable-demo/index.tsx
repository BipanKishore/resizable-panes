import React, { useEffect, useRef, useState } from "react";

import isEqual from "lodash/isEqual";
import {
  generatePaneModel,
  getInitialVisibility,
  getSelectListForPaneIds,
} from "../panes-generator";
import { RATIO, ResizablePanes } from "resizable-panes-react";
import { DemoHeader } from "../demo-header";
import {
  clearAllResizableComponentData,
  getInitialConfig,
  storeInitialConfig,
} from "./util";
import { SizeStateBar } from "../size-state-bar";
import { VisibilityButtons } from "../visibility-buttons";
import { ApiOperations } from "../api-operations";
import { findePanesSet } from "../../shared/pane-model-config-sets";
import { PaneModelConfig } from "../../shared/models";
import { SetSize } from "../api-operations/set-size";

export const ResizableDemo = () => {
  const [initialConfig, setInitialConfig] = useState<any>(getInitialConfig());

  const [paneComponentLists, setPaneComponentLists] = useState(
    generatePaneModel([])
  );

  const [paneIdsList, setPaneIdsList] = useState(getSelectListForPaneIds([]));

  const [paneVisibilityState, setPaneVisibilityState] = useState(
    getInitialVisibility([])
  );

  const [sizeStates, setSizeState] = useState({});

  const [currentSizes, setCurrentSizes] = useState<any>({});

  const [shouldMountResizable, setSholdMountResizable] = useState(false);

  const onMaxSize = (id: string) => {
    setSizeState((prev) => ({
      ...prev,
      [id]: "Max",
    }));
  };
  const onMinSize = (id: string) => {
    setSizeState((prev) => ({
      ...prev,
      [id]: "Min",
    }));
  };
  const onNormalSize = (id: string) => {
    setSizeState((prev) => ({
      ...prev,
      [id]: "",
    }));
  };

  const onUpdateInitalConfig = (updatedInitalConfig: any) => {
    const { activePanesSet } = updatedInitalConfig;

    const newPanesSet = findePanesSet(activePanesSet) as PaneModelConfig[];

    setInitialConfig((previousConfig: any) => {
      const initialConfigClone = {
        ...previousConfig,
      };

      const updatedInitalConfigClone = {
        ...updatedInitalConfig,
      };

      delete initialConfigClone.activePanesSet;
      delete updatedInitalConfigClone.activePanesSet;

      if (!isEqual(initialConfigClone, updatedInitalConfigClone)) {
        clearAllResizableComponentData();
      }

      return {
        ...updatedInitalConfig,
      };
    });
    storeInitialConfig(updatedInitalConfig);

    setSizeState({});
    setSholdMountResizable(false);
    const newPaneIdsList = getSelectListForPaneIds(newPanesSet);
    setPaneIdsList(newPaneIdsList);
    const newPaneVisibilityState = getInitialVisibility(newPanesSet);
    setPaneVisibilityState(newPaneVisibilityState);
    const newpPaneComponentLists = generatePaneModel(newPanesSet);
    setPaneComponentLists(newpPaneComponentLists);
    setTimeout(() => setSholdMountResizable(true), 1);
  };

  useEffect(() => {
    onUpdateInitalConfig(getInitialConfig());
  }, []);

  const apiRef = useRef<any>({});

  const updateVisibilityMap = (e: any) => {
    const { name, checked } = e;
    const previousState = paneVisibilityState[name];
    const currentSize = currentSizes[name]
    if (previousState === true && currentSize ===0) {
      apiRef.current.setSize(name, 150, RATIO);
    } else {
      apiRef.current.setVisibilities({
        ...paneVisibilityState,
        [name]: checked,
      });
    }
  };

  const vertical = initialConfig.vertical;

  return (
    <div className="h-100p w-100p px-6">
      <DemoHeader
        initialConfig={initialConfig}
        onUpdateInitalConfig={onUpdateInitalConfig}
      />

      <div className="h-96 w-100p mt-5">
        {shouldMountResizable && (
          <ResizablePanes
            onResize={setCurrentSizes}
            onResizeStop={setCurrentSizes}
            onReady={(api: any) => {
              apiRef.current = api;
            }}
            activeResizerClass=""
            storageApi={initialConfig.storageApiFlag ? sessionStorage : null}
            uniqueId={JSON.stringify(initialConfig)}
            {...initialConfig}
            resizerClass={`bg-slate-400 ${
              vertical ? "h-5/6 my-auto" : "w-5/6 mx-auto"
            }`}
            className="justify-center"
            onChangeVisibility={setPaneVisibilityState}
            onMaxSize={onMaxSize}
            onMinSize={onMinSize}
            onNormalSize={onNormalSize}
          >
            {paneComponentLists}
          </ResizablePanes>
        )}
      </div>

      <div>
        {vertical && (
          <SizeStateBar
            currentSizes={currentSizes}
            resizerSize={initialConfig.resizerSize}
            sizeStates={sizeStates}
          />
        )}
      </div>
      <VisibilityButtons
        selectIdsOption={paneIdsList}
        sizeStates={sizeStates}
        paneVisibilityState={paneVisibilityState}
        updateVisibilityMap={updateVisibilityMap}
      />
      <div className="grid grid-cols-2 mt-6">
        <ApiOperations apiRef={apiRef} selectIdsOption={paneIdsList} />
        <SetSize apiRef={apiRef} selectIdsOption={paneIdsList} />
      </div>
      <div className=" pb-10"></div>
    </div>
  );
};
