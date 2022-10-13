import React from "react";

type IconProps = {
  name: string;
};

export const Icon = ({ name }: IconProps) => (
  <i className={`fa-solid fa-${name}`} role="presentation" />
);
export default Icon;
