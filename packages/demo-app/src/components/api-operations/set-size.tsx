import React, { useEffect, useState } from "react";
import { SET_SIZE_LIST } from "../../shared/constant";
import { Select } from "../form-controls/select";
import TextField from "../form-controls/textfield";
import Button from "../form-controls/button";

export const SetSize = ({ apiRef, selectIdsOption }: any) => {
  const [newSize, setNewSize] = useState<number | null | "">("");

  const [selectedId, setSelectedId] = useState<any>(selectIdsOption[0]?.value);
  const [setSizeBehaviour, setSetSizeBehaviour] = useState(
    SET_SIZE_LIST[0].value
  );

  useEffect(() => {
    const [{ value = "" } = {}] = selectIdsOption;
    setSelectedId(value);
  }, [selectIdsOption]);

  const onChangeNewSize = () => {
    apiRef.current.setSize(selectedId, newSize, setSizeBehaviour);
  };

  const updateNewSize = (val: string) => {
      const numValue = parseInt(val);
      setNewSize(numValue);
  };

  return (

    <div className="w-10/12 md:w-full justify-self-center md:justify-self-end">
      <div className="p-2 grid md:gap-1 md:flex justify-end">
        <div className="">
          <div className="grid gap-4 md:flex">
          <Select
          valueKey="value"
          className=""
          list={selectIdsOption}
          id="paneId"
          value={selectedId}
          onChange={setSelectedId}
        />

        <Select
          className=""
          list={SET_SIZE_LIST}
          id="paneId"
          valueKey="value"
          value={setSizeBehaviour}
          onChange={setSetSizeBehaviour}
        />

        <TextField
          className=""
          placeholder="Size"
          value={newSize}
          name="newSize"
          onChange={updateNewSize}
          type="number"
        />

        <Button className="mt-0" onClick={onChangeNewSize} label="Change" />
          </div>
          <div className="font-normal w-full mt-2 text-center text-xs text-slate-500">
          It controls Resizable api's setSize method.
          </div>
        </div>
      </div>
    </div>

  );
};
