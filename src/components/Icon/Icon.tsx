type IconProps = {
  name: string;
};

export const Icon = ({ name }: IconProps) => (
  <i className={`fa-solid fa-lg fa-${name}`} role="presentation"></i>
);
export default Icon;
