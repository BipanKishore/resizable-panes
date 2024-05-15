import React from "react";
import Button from "../form-controls/button";

export const ApiOperations = ({ apiRef, selectIdsOption }: any) => {
  const onRestore = () => {
    apiRef.current.restore();
  };

  const getState = () => {
    const state = apiRef.current.getState();
    console.log("Current State", state);
  };

  const getSizes = () => {
    const sizesMap = apiRef.current.getSizes();
    console.log("SizesMap", sizesMap);
  };

  const getVisibilitiesMap = () => {
    const map = apiRef.current.getVisibilities();
    console.log("VisibilitiesMap", map);
  };

  return (
    <div className="w-10/12 md:w-full justify-self-center md:justify-self-start">
      <div className="p-2 grid md:gap-1 md:flex">
        <div>
          <div className="grid gap-2 md:gap-4 md:flex">
            <Button onClick={onRestore} label="Restore" />
            <Button onClick={getState} md label="Get state" />
            <Button onClick={getSizes} label="Get sizes" />
            <Button onClick={getVisibilitiesMap} label="Get visibilities" />
          </div>
          <div className="font-normal w-full mt-2 text-center text-xs text-slate-500">
            Output is available in console.
          </div>
        </div>
      </div>
    </div>
  );
};
