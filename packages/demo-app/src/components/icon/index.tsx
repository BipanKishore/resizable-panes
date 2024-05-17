import React from "react";
import { ICONS_MAP } from "./icon-list";

interface IIcon {
  name: string;
  url: string;
  className?: string;
  onClick?: any;
  width?: number
}

export const Icon = (props: IIcon) => {
  const { name, width = 20, url, className = 'ml-2', ...otherProps } = props;
  return (
    <a className={className} href={url}>
      <span>
        <img
          alt=""
          // height="20px"
          src={ICONS_MAP[name]}
          width={`${width}px`}
          {...otherProps}
        />
      </span>
    </a>
  );
};
