import { ReactElement } from "react";
import { joinClassName } from "../../shared/utils";

const SkeletonItem = ({ sizeStates, currentSizes, paneId }: any) => {
  const className = joinClassName({
    "text-xs text-center text-sm font-bold": true,
    "text-blue-600": sizeStates[paneId] === "Min",
    "text-red-600": sizeStates[paneId] === "Max",
    "text-slate-600": !["Min", "Max", ""].includes(sizeStates[paneId]),
  });

  return (
    <div
      className={className}
      style={{
        width: `${currentSizes[paneId]}px`,
      }}
    >
      {currentSizes[paneId] !== 0 ?  parseInt(currentSizes[paneId]) : ""}
    </div>
  );
};

export const SizeStateBar = (props: any) => {
  const { resizerSize, currentSizes, sizeStates } = props;

  const skeleton: ReactElement[] = [];

  Object.keys(currentSizes).forEach((key, i) =>
    skeleton.push(
      <SkeletonItem
        key={i + key}
        paneId={key}
        sizeStates={sizeStates}
        currentSizes={currentSizes}
      />,
      <div
      key={i+key+i}
        // className="h-1"
        style={{
          width: `${resizerSize}px`,
        }}
      ></div>
    )
  );
  skeleton.pop();
  
  return <div className="flex mt-1 h-4 justify-center">{skeleton}</div>;
};
